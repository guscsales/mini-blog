This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Publicando um post

O conteúdo é file-based e o **git é o CMS**: cada post é um markdown em `.cms/`, e o site é gerado a partir desses arquivos no build.

Para publicar ou despublicar, edite o frontmatter do arquivo e faça deploy:

```yaml
---
title: Meu post
publishedAt: 2026-03-02
status: published   # published | draft — omitido = published
---
```

Posts com `status: draft` não aparecem na listagem nem no detalhe.

Fluxo: editar o `.md` → commit → push → deploy. Não existe endpoint para mudar o status em runtime, e isso é intencional: em serverless o filesystem é read-only, e num servidor comum a escrita sumiria no próximo deploy e faria o repositório divergir do site.
