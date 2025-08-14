# 📷 Como Adicionar Suas Fotos no GitHub Pages

## ⚠️ Limitação do GitHub Pages

O GitHub Pages **NÃO permite** que o JavaScript descubra automaticamente quais arquivos existem numa pasta por questões de segurança. Por isso, você **DEVE** listar manualmente suas imagens.

## 📝 Tutorial Passo a Passo

### 1. **Upload das Fotos**
- Coloque suas fotos nesta pasta `images/`
- Use nomes simples e sem espaços: `foto1.jpg`, `nossa-viagem.png`, etc.

### 2. **Editar script.js**
No arquivo `script.js`, procure por esta linha:
```javascript
const imageList = [
```

### 3. **Adicionar Suas Imagens**
Substitua o array vazio pelos nomes das suas fotos:

**❌ Antes (vazio):**
```javascript
const imageList = [
    // ⚠️  ATENÇÃO: Se deixar vazio, a página mostrará as instruções de como adicionar fotos
];
```

**✅ Depois (com suas fotos):**
```javascript
const imageList = [
    'nossa-primeira-foto.jpg',
    'viagem-praia.png',
    'aniversario-2023.jpeg',
    'passeio-no-parque.jpg',
    'jantar-romantico.png',
    'foto-casamento.jpg'
];
```

### 4. **Commit e Push**
- Salve o arquivo `script.js`
- Faça commit das mudanças
- Push para o GitHub
- Aguarde alguns minutos para o GitHub Pages atualizar

## 🎯 Dicas Importantes

✅ **Nomes de arquivo:**
- Use apenas letras, números, hífens e underscores
- Evite espaços e acentos
- Exemplos: `foto1.jpg`, `nossa-viagem.png`, `aniversario_2023.jpeg`

✅ **Ordem no slideshow:**
- As fotos aparecerão na ordem que você listar
- Primeira do array = primeira do slideshow

✅ **Formatos suportados:**
- JPG/JPEG (mais comum)
- PNG (melhor qualidade)
- GIF (com animações)
- WebP (formato moderno)

## 🔧 Testando Localmente

Se quiser testar antes de fazer push:
1. Abra o `index.html` no navegador
2. Abra o Console do Desenvolvedor (F12)
3. Se aparecer erro `❌ Imagem não encontrada`, verifique o nome no `imageList`

## 📱 Resultado Final

Depois de configurado corretamente:
- ✅ Slideshow funcionando perfeitamente
- ✅ Sem erros 404
- ✅ Carregamento rápido
- ✅ Controle total sobre suas fotos
