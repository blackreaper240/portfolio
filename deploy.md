name: Deploy Portafolio to Netlify

on:
  push:
    branches:
      - main
    paths:
      - 'index.html'
      - 'css/**'
      - 'js/**'
      - 'img/**'
      - '.github/workflows/**'

  pull_request:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Descargar codigo del repositorio
        uses: actions/checkout@v4

      - name: Desplegar sitio en Netlify
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: '.'
          production-deploy: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Despliegue automatico via GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
