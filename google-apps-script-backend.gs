/**
 * Google Apps Script para receber arquivos do formulário de Prestação de Contas
 * 
 * INSTRUÇÕES DE INSTALAÇÃO:
 * 1. Abra https://script.google.com
 * 2. Crie um novo projeto
 * 3. Cole este código
 * 4. Clique em "Implantar" > "Nova implantação"
 * 5. Tipo: "Aplicativo da Web"
 * 6. Executar como: Você mesmo
 * 7. Quem tem acesso: Qualquer pessoa
 * 8. Copie a URL da implantação e substitua no HTML
 */

function doPost(e) {
  try {
    // Parse do corpo da requisição
    const data = JSON.parse(e.postData.contents);
    
    const folderId = data.folderId;
    const nomeCompleto = data.nomeCompleto;
    const email = data.email;
    const uf = data.uf;
    const municipio = data.municipio;
    const projeto = data.projeto;
    const evento = data.evento;
    const cpf = data.cpf;
    const kit = data.kit;
    const valorNota = data.valorNota;
    const tipoArquivo = data.tipoArquivo;
    const files = data.files;
    const forceOverwrite = data.forceOverwrite || false;
    
    // Validar dados obrigatórios
    if (!folderId || !nomeCompleto || !email || !uf || !municipio || !projeto || !evento || !cpf || !kit || !valorNota || !tipoArquivo || !files || files.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Dados incompletos"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Acessar a pasta principal do Drive
    const mainFolder = DriveApp.getFolderById(folderId);
    
    // Criar nome da pasta no formato: PROJETO_EVENTO_CPF_KIT (ex: ENEM_25_42897569808_KLA)
    const folderName = `${projeto}_${evento}_${cpf}_${kit}`;
    const targetFolder = getOrCreateFolder(mainFolder, folderName);
    
    // Verificar se já existem arquivos nesta pasta
    const existingFiles = targetFolder.getFiles();
    if (existingFiles.hasNext() && !forceOverwrite) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "exists",
        message: "Já existem arquivos para este CPF e evento"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Se forceOverwrite = true, deletar arquivos existentes
    if (forceOverwrite) {
      while (existingFiles.hasNext()) {
        const file = existingFiles.next();
        file.setTrashed(true);
      }
    }
    
    // Salvar cada arquivo
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const fileData = files[i];
      const fileName = fileData.name;
      const mimeType = fileData.type;
      const base64Data = fileData.data;
      
      // Converter base64 para blob
      const blob = Utilities.newBlob(
        Utilities.base64Decode(base64Data),
        mimeType,
        fileName
      );
      
      // Criar arquivo no Drive
      const file = targetFolder.createFile(blob);
      
      // Adicionar descrição com metadados
      file.setDescription(
        `Nome: ${nomeCompleto}\n` +
        `E-mail: ${email}\n` +
        `UF: ${uf}\n` +
        `Município: ${municipio}\n` +
        `Projeto: ${projeto}\n` +
        `Evento: ${evento}\n` +
        `CPF: ${cpf}\n` +
        `Kit: ${kit}\n` +
        `Tipo de Arquivo: ${tipoArquivo}\n` +
        `Valor: R$ ${valorNota}\n` +
        `Data Upload: ${new Date().toLocaleString('pt-BR')}`
      );
      
      uploadedFiles.push({
        name: fileName,
        id: file.getId(),
        url: file.getUrl()
      });
    }
    
    // Criar arquivo de metadata na pasta
    createMetadataFile(targetFolder, {
      nomeCompleto,
      email,
      uf,
      municipio,
      projeto,
      evento,
      cpf,
      kit,
      valorNota,
      tipoArquivo,
      dataUpload: new Date().toLocaleString('pt-BR'),
      quantidadeArquivos: files.length
    });
    
    // Retornar sucesso
    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      message: "Arquivos enviados com sucesso",
      files: uploadedFiles,
      folder: targetFolder.getUrl()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Erro: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Obtém uma pasta existente ou cria uma nova
 */
function getOrCreateFolder(parentFolder, folderName) {
  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(folderName);
}

/**
 * Cria um arquivo de texto com os metadados do envio
 */
function createMetadataFile(folder, metadata) {
  const metadataContent = 
    `=== PRESTAÇÃO DE CONTAS ===\n\n` +
    `Nome Completo: ${metadata.nomeCompleto}\n` +
    `E-mail: ${metadata.email}\n` +
    `CPF: ${metadata.cpf}\n` +
    `UF: ${metadata.uf}\n` +
    `Município: ${metadata.municipio}\n` +
    `Projeto: ${metadata.projeto}\n` +
    `Número da Coordenação: ${metadata.evento}\n` +
    `Tipo do Kit: ${metadata.kit}\n` +
    `Tipo de Arquivo: ${metadata.tipoArquivo}\n` +
    `Valor da Nota: R$ ${metadata.valorNota}\n` +
    `Data do Upload: ${metadata.dataUpload}\n` +
    `Quantidade de Arquivos: ${metadata.quantidadeArquivos}\n`;
  
  // Verificar se já existe metadata.txt e deletar
  const existingMetadata = folder.getFilesByName("metadata.txt");
  while (existingMetadata.hasNext()) {
    existingMetadata.next().setTrashed(true);
  }
  
  // Criar novo arquivo
  folder.createFile("metadata.txt", metadataContent, MimeType.PLAIN_TEXT);
}

/**
 * Função para testar o script (opcional)
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "API de Upload de Prestação de Contas está funcionando"
  })).setMimeType(ContentService.MimeType.JSON);
}
