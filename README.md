# SELLINTEL AI — Projeto integrado

Este pacote reúne numa única aplicação a base das versões anteriores.

## Módulos
1. Contas e autenticação
2. Product Radar / SELL SCORE
3. Offer Builder
4. Faceless Content Engine
5. Checkout de demonstração
6. Sales Dashboard
7. Segurança e arquitetura para pagamentos
8. API/backend para futura pesquisa externa

## Executar
Requer Node.js 18+.

```bash
npm install
npm start
```

Abra `http://localhost:3000`.

## O que está pronto
O núcleo funciona como uma aplicação web única. A conta e os produtos são guardados no backend local.

## O que ainda precisa de configuração para ser um produto comercial
- alojamento/cloud;
- domínio e HTTPS;
- PostgreSQL/Supabase ou equivalente;
- email de verificação e recuperação de palavra-passe;
- provider de identidade/sessões robustas;
- fontes/APIs de pesquisa de mercado autorizadas;
- contas comerciais aprovadas nos provedores de pagamento escolhidos;
- webhooks de pagamento verificados;
- políticas legais, privacidade e termos;
- monitorização, backups e rate limiting.

O checkout incluído é propositalmente apenas de demonstração: não cobra dinheiro.

## Regra de dados
O sistema não deve inventar procura, vendas ou tendências. Cada dado externo futuro deve guardar fonte e data.

## Fluxo final
Pesquisa → Score → Oferta → Conteúdo sem rosto → Checkout → Venda → Métricas → Aprendizagem → novo teste.

Não existe garantia de vendas; o sistema serve para priorizar hipóteses e medir testes.
