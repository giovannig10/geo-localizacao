# 🗺️ Sistema de Geolocalização e Rotas

Projeto Next.js com integração Mapbox para geolocalização e traçado de rotas.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Mapbox (gratuita)

## 🚀 Como rodar o projeto

### Passo 1: Clonar ou baixar o projeto

```bash
git clone <url-do-repositorio>
cd geo-localizacao
```

### Passo 2: Instalar as dependências

```bash
npm install
```

Ou se preferir usar yarn:

```bash
yarn install
```

### Passo 3: Configurar o Token do Mapbox

1. Acesse [Mapbox](https://account.mapbox.com/access-tokens/)
2. Crie uma conta ou faça login
3. Copie seu **Access Token**
4. Abra o arquivo `.env.local` na raiz do projeto
5. Substitua o token de exemplo pelo seu token real:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=seu_token_aqui
```

### Passo 4: Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Ou com yarn:

```bash
yarn dev
```

O servidor será iniciado em [http://localhost:3000](http://localhost:3000)

## 📱 Páginas do projeto

### Home - [http://localhost:3000](http://localhost:3000)

- Página inicial com navegação para os módulos
- Design moderno e responsivo

### Page1 - Geolocalização - [http://localhost:3000/page1](http://localhost:3000/page1)

- Detecta automaticamente sua localização
- Exibe mapa interativo
- Marcador com popup personalizado
- Informações de latitude e longitude

### Page2 - Traçar Rota - [http://localhost:3000/page2](http://localhost:3000/page2)

- Sistema de busca de endereços
- Cálculo de rotas otimizadas
- Informações de distância e duração
- Marcadores de origem e destino

## 🎯 Como usar

### Geolocalização (Page1)

1. Acesse `/page1`
2. Permita o acesso à localização quando solicitado
3. Clique no marcador vermelho para ver o popup

### Traçar Rota (Page2)

1. Acesse `/page2`
2. Digite o endereço de **origem** (ex: "Av. Paulista, São Paulo")
3. Digite o endereço de **destino** (ex: "Aeroporto de Guarulhos")
4. Clique em **Calcular Rota**
5. Visualize a rota traçada com distância e duração

## 🔧 Solução de problemas

### Erro: "next is not recognized"

Execute primeiro: `npm install`

### Erro: "Erro ao obter localização"

- Permita o acesso à localização no navegador
- Certifique-se de usar `localhost` ou HTTPS

### Mapa não carrega

- Verifique se o token do Mapbox está correto no `.env.local`
- Confirme sua conexão com a internet
- Abra o console do navegador (F12) para ver erros específicos

### Rota não é traçada

- Use endereços mais específicos (cidade, estado)
- Verifique se o token tem permissões para Geocoding e Directions API

## 🛠️ Tecnologias utilizadas

- **Next.js 15.5.4** - Framework React
- **React 19.1.0** - Biblioteca JavaScript
- **Mapbox GL JS** - Mapas interativos
- **Mapbox Geocoding API** - Conversão de endereços
- **Mapbox Directions API** - Cálculo de rotas

## 📦 Scripts disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
```

## 📂 Estrutura do projeto

```
src/
├── app/
│   ├── page.jsx          # Home
│   ├── page1/
│   │   ├── page.jsx      # Geolocalização
│   │   └── page1.module.css
│   └── page2/
│       ├── page.jsx      # Traçar Rota
│       └── page2.module.css
└── ...
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

---

Desenvolvido por Giovanni Gonçalves
