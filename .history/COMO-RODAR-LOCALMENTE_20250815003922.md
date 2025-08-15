# 🖥️ Como Rodar Localmente

## 📋 Pré-requisitos

Você pode rodar de várias formas. Escolha a que for mais fácil para você:

## 🚀 Método 1: Servidor HTTP Simples (Recomendado)

### Se você tem Python instalado:

```bash
# Python 3
python -m http.server 8000

# Python 2 (mais antigo)
python -m SimpleHTTPServer 8000
```

### Se você tem Node.js instalado:

```bash
# Instalar um servidor simples
npm install -g http-server

# Rodar o servidor
http-server -p 8000
```

### Se você tem PHP instalado:

```bash
php -S localhost:8000
```

Depois, acesse: **http://localhost:8000**

## 🌐 Método 2: Extensão do VS Code

Se você usa VS Code:

1. Instale a extensão **"Live Server"**
2. Clique com botão direito no arquivo `index.html`
3. Selecione **"Open with Live Server"**
4. A página abrirá automaticamente no navegador

## 📁 Método 3: Abrir Diretamente (Limitado)

⚠️ **ATENÇÃO**: Este método pode não carregar as imagens devido a restrições de CORS do navegador.

1. Navegue até a pasta do projeto
2. Clique duas vezes em `index.html`
3. A página abrirá no navegador

**Problema**: Navegadores modernos bloqueiam o carregamento de arquivos locais por segurança.

## 🔧 Testando com Imagens

1. **Adicione fotos de teste** na pasta `images/`:
   ```
   images/
   ├── foto1.jpg
   ├── foto2.png
   └── nossa-viagem.jpeg
   ```

2. **Configure o script.js**:
   ```javascript
   const imageList = [
       'foto1.jpg',
       'foto2.png',
       'nossa-viagem.jpeg'
   ];
   ```

3. **Inicie o servidor** (método 1 ou 2)

4. **Acesse no navegador**: http://localhost:8000

## 🔍 Debugando Problemas

### Se as imagens não aparecem:

1. **Abra o Console** (F12 → Console)
2. **Procure por erros** como:
   ```
   ❌ Imagem não encontrada: images/foto1.jpg
   💡 Verifique se o nome está correto e se o arquivo existe na pasta images/
   ```

3. **Verifique**:
   - ✅ Arquivo existe na pasta `images/`
   - ✅ Nome no `imageList` está exato (com extensão)
   - ✅ Não há caracteres especiais ou espaços
   - ✅ Extensão está correta (.jpg, .png, etc.)

### Se o contador não funciona:

- ✅ Verifique se a data no `script.js` está correta:
  ```javascript
  const startDate = new Date('2022-05-15');
  ```

## 📱 Testando Responsividade

1. **Abra as Ferramentas de Desenvolvedor** (F12)
2. **Ative o modo responsivo** (Ctrl+Shift+M)
3. **Teste diferentes tamanhos**:
   - 📱 Mobile: 375x667
   - 📱 Tablet: 768x1024
   - 🖥️ Desktop: 1920x1080

## ⚡ Dicas de Performance

- **Otimize suas imagens** antes de testar
- **Use formatos WebP** para melhor compressão
- **Mantenha imagens abaixo de 2MB** cada

## 🚀 Quando Estiver Pronto

Depois de testar localmente:

1. **Commit das mudanças**:
   ```bash
   git add .
   git commit -m "Adicionar fotos e configurar slideshow"
   git push origin main
   ```

2. **Configurar GitHub Pages**:
   - Settings → Pages → Source: "Deploy from branch"
   - Branch: `main`
   - Pasta: `/ (root)`

3. **Aguardar deploy** (2-10 minutos)

4. **Acessar**: https://yan-luca.github.io/vic-yan

---

💡 **Dica**: Sempre teste localmente antes de fazer push para evitar surpresas no GitHub Pages!
