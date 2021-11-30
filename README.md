# Marvel Comics Vue 3

Sistema simples que consome a API da Marvel para fornecer uma listagem de quadrinhos, com opção de envio para uma localização no mapa. (Desenvolvido para o teste de front-end na empresa Brisanet)

## Rodando o projeto

* **Instalação e configuração**

    1. Instale os pacotes usando `npm install` ou `yarn`
    2. Crie uma cópia do arquivo `.env.exampĺe` e renomeie para `.env`
    3. Preencha as keys da API da Marvel e do Google Maps
    4. Rode no ambiente de desenvolvimento usando `npm run dev` ou `yarn dev`

* **Build**

    1. Faça a build usando `npm run build` ou `yarn build`
    2. Veja o preview usando `npm run serve` ou `yarn serve`

## Solução adotada

Foi utilizado como arquitetura de projeto uma intepretação do `Clean Architecture` proposto por Robert C. Martin, assim como outros padrões de projetos comummente utilizados.

### Entidades

* ComicEntity

```ts
  id: number;
  title: string;
  price: number;
  description: string | null;
  imageURL: string;
  creators: Array<string>;
  characters: Array<string>;
```

### Casos de uso

* GetComicsList

```ts
GetComicsList {
  execute({
    limit: number;
    offset: number;
    where?: {
      titleStartsWith?: string;
    }
  }: GetComicsListPort): Paginated<ComicEntity>;
}
```

### Ferramentas utilizadas

* Vue
* Vue-Router
* Vuex
* Axios
* Google Maps API
* TailwindCSS
* HeadlessUI
* Heroicons
