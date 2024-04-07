# ToTopProgress Button

Botão **ir para o topo** da página com barra de progresso baseada no tamanho da página.

Demo: [https://rogeriocastro.github.io/to-top-progress/](https://rogeriocastro.github.io/to-top-progress/)

<p align="center"><img src="https://raw.githubusercontent.com/RogerioCastro/to-top-progress/main/src/assets/to-top-progress.png"></p>

## Instalação

Baixe o arquivo de produção da biblioteca que está localizado no diretório [`/dist`](/dist) e acrescente-o à `HEAD` da página. 

```html
<head>
  ...
  <script src="to-top-progress.min.js"></script>
  ...
</head>
```

## Utilização

Ao final do corpo da página insira o script de inicialização e configuração da biblioteca.

```html
<body>
  <script>
    const btnToTop = new ToTopProgress({
      container: 'body'
    });
  </script>
</body>
```

## API

```javascript
const btnToTop = new ToTopProgress(options);
```

`options` é um objeto que contém as propriedades de inicialização/configuração da biblioteca.

### Configurações (objeto `options`)

| Propriedade | Tipo | Descrição |
| ----------- | ---- | --------- |
| `container` | `string` | Container HTML onde o botão será incluído (query selector). Valor padrão: `'body'`. |
| `observerContainer` | `string` | Container HTML que terá seu redimensionamento observado (query selector). Valor padrão: `'body'`. |
| `minScrollHeight` | `number` | Quantidade, em pixels, da rolagem para que o botão seja exibido. Valor padrão: `200`. |
| `custonClass` | `string` | Classe a ser adiconada ao container do botão. Valor padrão: `null`. |
| `color` | `string` | Cor dos elementos do botão (CSS color). Valor padrão: `'#ff00ff'`. |
| `colorBackground` | `string` | Cor de fundo do botão (CSS color). Valor padrão: `null`. |
| `colorHover` | `string` | Cor dos elementos do botão ao passar o mouse sobre (CSS color). Valor padrão: `null`. |
| `colorTrack` | `string` | Cor da trilha sob a barra de progresso (CSS color). Valor padrão: `'#80818540'`. |

## Desenvolvimento

Essa biblioteca foi desenvolvida utilizando [vite](https://vitejs.dev/) para o empacotamento.

```bash
# Dependências
$ npm install

# Servidor de desenvolvimento
$ npm run dev

# Build de produção
$ npm run build
```

> O comando `npm run build` irá gerar o arquivo de produção `to-top-progress.min.js`, no diretório [`/dist`](/dist).

## Créditos

[Sandbox Template](https://preview.themeforest.net/item/sandbox-modern-multipurpose-vue-nuxtjs-3-template/full_screen_preview/51057440).

## License

MIT &copy; Rogério Castro
