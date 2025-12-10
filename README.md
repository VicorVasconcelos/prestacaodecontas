# Prestação de Contas - Sistema de Upload de Arquivos

Sistema web para prestação de contas com upload de múltiplos arquivos para o Google Drive, desenvolvido com Google Apps Script e HTML/CSS/JavaScript.

## 📋 Descrição

Sistema de formulário web para coleta e organização de documentos de prestação de contas (notas fiscais, recibos, cupons) relacionados a projetos ENEM e ENADE. Os arquivos são armazenados automaticamente no Google Drive com nomenclatura padronizada e controle de duplicidade.

## ✨ Funcionalidades

- ✅ Formulário web responsivo e moderno
- ✅ Upload de múltiplos arquivos (imagens e PDFs)
- ✅ Validação de campos obrigatórios
- ✅ Detecção de duplicidade por CPF e número de coordenação
- ✅ Nomenclatura automática de arquivos: `PROJETO_EVENTO_CPF_KIT_VALOR`
- ✅ Organização automática no Google Drive
- ✅ Confirmação de sobrescrita de arquivos existentes
- ✅ Feedback visual durante o processo de upload

## 🗂️ Estrutura de Arquivos

```
prestacaodecontas/
├── Index-GAS.html              # Interface web (versão Google Apps Script)
├── index.html                  # Interface web (versão standalone)
├── Code.gs                     # Backend Google Apps Script (versão 1)
├── google-apps-script-backend.gs  # Backend Google Apps Script (versão 2 - com controle de duplicidade)
└── README.md                   # Este arquivo
```

## 📝 Campos do Formulário

### Informações Pessoais
- **Nome Completo**: Nome do responsável pela prestação de contas
- **E-mail**: E-mail para contato
- **CPF**: Apenas números (11 dígitos)

### Informações de Localização
- **UF (Estado)**: Dropdown com todos os estados brasileiros
- **Município**: Nome da cidade

### Informações do Projeto
- **Projeto**: ENEM ou ENADE
- **N° da Coordenação**: Número identificador da coordenação
- **Tipo do Kit**: 
  - KLI - Kit Limpeza
  - KLA - Kit Lanche
  - AJC - Apoio Logístico

### Informações Financeiras
- **Valor da Nota**: Valor em reais (formato decimal)
- **Tipo de Arquivo**:
  - Nota Fiscal
  - Recibo
  - Nota Fiscal e Recibo
  - Cupom Fiscal
  - Valor Devolvido para o CEBRASPE

### Arquivos
- **Upload de Arquivos**: Múltiplos arquivos (imagens e PDFs)

## 🔧 Configuração

### 1. Google Apps Script

1. Acesse [Google Apps Script](https://script.google.com/)
2. Crie um novo projeto
3. Copie o conteúdo de `google-apps-script-backend.gs` para o editor
4. Copie o conteúdo de `Index-GAS.html` como um arquivo HTML
5. Atualize o `folderId` no HTML com o ID da sua pasta do Google Drive
6. Implante como aplicativo web:
   - Clique em **Implantar** > **Nova implantação**
   - Tipo: **Aplicativo da Web**
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**

### 2. ID da Pasta do Google Drive

No arquivo `Index-GAS.html`, localize e atualize:

```javascript
const folderId = "SEU_ID_DA_PASTA_AQUI";
```

Para obter o ID da pasta:
1. Abra a pasta no Google Drive
2. O ID está na URL: `https://drive.google.com/drive/folders/ID_DA_PASTA`

## 🎯 Padrão de Nomenclatura

Os arquivos são renomeados automaticamente seguindo o padrão:

```
PROJETO_EVENTO_CPF_KIT_VALOR
```

**Exemplo**: `ENEM_25_35404973587_KLI_150.50.pdf`

## 🔒 Controle de Duplicidade

O sistema verifica arquivos existentes com base em:
- CPF
- Número da Coordenação

Se detectar duplicidade:
- Exibe um alerta ao usuário
- Solicita confirmação para sobrescrever
- Permite cancelar o envio

## 🎨 Design

- Interface moderna e responsiva
- Gradientes coloridos (azul e laranja)
- Feedback visual de status (sucesso, erro, carregando)
- Animações suaves
- Compatível com dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Google Apps Script
- **Armazenamento**: Google Drive
- **Conversão**: FileReader API (Base64)

## 📱 Compatibilidade

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móveis (iOS/Android)

## 🚀 Como Usar

1. Acesse a URL do aplicativo web implantado
2. Preencha todos os campos obrigatórios
3. Selecione um ou mais arquivos
4. Clique em "Enviar Arquivos"
5. Aguarde a confirmação de sucesso

## ⚠️ Observações Importantes

- Todos os campos são obrigatórios
- O CPF deve conter apenas números (11 dígitos)
- Arquivos aceitos: imagens e PDFs
- Múltiplos arquivos podem ser enviados simultaneamente
- Em caso de duplicidade, será solicitada confirmação para sobrescrever

## 📄 Licença

Este projeto é de uso interno e proprietário.

## 👤 Autor

Victor Vasconcelos

## 📅 Última Atualização

Dezembro de 2025
