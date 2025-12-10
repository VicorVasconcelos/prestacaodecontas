# 📋 Sistema de Prestação de Contas - Manual de Uso

## 🎯 O que é este sistema?

Este é um formulário online para enviar notas fiscais, recibos e comprovantes diretamente para o Google Drive de forma organizada e automática.

---

## 📦 Arquivos do Sistema

- **whatsapp_export_form (1).html** - Página do formulário (abrir no navegador)
- **google-apps-script-backend.gs** - Código do servidor (configurar no Google Apps Script)
- **README.md** - Este manual de instruções

---

## ⚙️ Como Configurar (Primeira vez)

### Passo 1: Configurar o Google Apps Script

1. Acesse: https://script.google.com
2. Clique em **"Novo projeto"**
3. Apague todo o código que aparecer
4. Abra o arquivo `google-apps-script-backend.gs` e copie todo o conteúdo
5. Cole no editor do Google Apps Script
6. Clique em **"Implantar"** > **"Nova implantação"**
7. Em "Tipo", selecione **"Aplicativo da Web"**
8. Configure:
   - **Executar como:** Você mesmo
   - **Quem tem acesso:** Qualquer pessoa
9. Clique em **"Implantar"**
10. **Copie a URL** que aparecer (ex: https://script.google.com/macros/s/...)
11. Clique em **"Concluído"**

### Passo 2: Atualizar a URL no Formulário

1. Abra o arquivo `whatsapp_export_form (1).html` com um editor de texto (Bloco de Notas, VSCode, etc.)
2. Procure pela linha que contém: `https://script.google.com/macros/s/AKfycbx...`
3. Substitua pela URL que você copiou no Passo 1
4. Salve o arquivo

### Passo 3: Obter o ID da Pasta do Google Drive

1. Acesse seu Google Drive
2. Crie uma pasta onde os arquivos serão salvos
3. Abra a pasta
4. Copie o ID da pasta da URL (o código entre `/folders/` e o final)
   - Exemplo: `https://drive.google.com/drive/folders/1_iUe4TwHF9B...`
   - O ID é: `1_iUe4TwHF9B...`
5. Abra o arquivo HTML e procure por: `const folderId = "..."`
6. Substitua o ID pela pasta que você criou
7. Salve o arquivo

---

## 🚀 Como Usar o Formulário

### Para o Usuário Final

1. **Abra o arquivo HTML** no navegador (duplo clique)
2. **Preencha todos os campos:**
   - Nome Completo
   - E-mail
   - UF (Estado)
   - Município
   - Projeto (ENEM ou ENADE)
   - Número da Coordenação
   - CPF (somente números)
   - Tipo do Kit (KLI, KLA ou AJC)
   - Valor da Nota
   - Tipo de Arquivo (Nota Fiscal, Recibo, etc.)
3. **Selecione os arquivos** (pode selecionar vários ao mesmo tempo)
4. Clique em **"ENVIAR ARQUIVOS"**
5. Aguarde a mensagem de sucesso ✓

---

## 📁 Como os Arquivos São Organizados

Os arquivos são salvos automaticamente no Google Drive com esta estrutura:

```
Pasta Principal/
  └── ENEM_25_42897569808_KLA/
      ├── nota_fiscal_1.pdf
      ├── nota_fiscal_2.jpg
      └── metadata.txt (informações do envio)
```

**Nome das pastas:** `PROJETO_EVENTO_CPF_KIT`

**Exemplo:** `ENEM_25_42897569808_KLA`

---

## 📄 O que contém o metadata.txt?

Cada pasta criada terá um arquivo `metadata.txt` com todas as informações:

```
=== PRESTAÇÃO DE CONTAS ===

Nome Completo: João da Silva Santos
E-mail: joao.silva@email.com
CPF: 42897569808
UF: SP
Município: São Paulo
Projeto: ENEM
Número da Coordenação: 25
Tipo do Kit: KLA
Tipo de Arquivo: Nota Fiscal
Valor da Nota: R$ 150.00
Data do Upload: 10/12/2025 14:30:00
Quantidade de Arquivos: 3
```

---

## ⚠️ Avisos Importantes

### ✅ Múltiplos Arquivos
- Você pode enviar vários arquivos de uma vez
- O sistema aceita imagens (JPG, PNG) e PDFs

### 🔄 Reenvio
- Se tentar enviar novamente com os mesmos dados (CPF + Coordenação), o sistema pedirá confirmação
- Os novos arquivos **substituirão** os anteriores

### 👥 Vários Usuários
- O sistema suporta até 20 pessoas enviando ao mesmo tempo sem problemas

---

## 🔧 Atualizando o Sistema

Se você fez alterações no código do Google Apps Script:

1. Acesse: https://script.google.com
2. Abra seu projeto
3. Clique em **"Implantar"** > **"Gerenciar implantações"**
4. Clique no ícone de **edição** (lápis)
5. Em **"Versão"**, selecione **"Nova versão"**
6. Clique em **"Implantar"**
7. Pronto! As mudanças já estão ativas

---

## 🆘 Problemas Comuns

### "Erro ao enviar arquivos"
- Verifique se a URL do Google Apps Script está correta no HTML
- Confirme que o ID da pasta do Google Drive está correto
- Certifique-se de que todos os campos obrigatórios estão preenchidos

### "A pasta é criada mas os arquivos não aparecem"
- Reimplante o Google Apps Script com uma nova versão
- Verifique se você deu permissão para o script acessar o Google Drive

### "Arquivo muito grande"
- O sistema funciona melhor com arquivos até 50MB
- Para arquivos maiores, comprima antes de enviar

---

## 📞 Suporte

Em caso de dúvidas ou problemas, entre em contato com o administrador do sistema.

---

**Versão:** 1.0  
**Data:** Dezembro de 2025  
**Desenvolvido para:** Prestação de Contas ENEM/ENADE
