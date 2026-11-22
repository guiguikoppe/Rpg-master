# A Capela das Duas Prisões — site de mesa

Site estático (HTML + CSS + JavaScript puro, **sem build e sem dependências**) para mestrar a aventura *A Capela das Duas Prisões* (D&D 3.5). Tem **dois sites em um**: a tela do mestre, com todos os segredos, e a tela dos jogadores, bem menor, só com o que eles já podem ver.

---

## Como abrir no VS Code

```bash
code capela-das-duas-prisoes
```

Depois, uma das duas:

- **Rápido:** botão direito em `index.html` → abrir no navegador (funciona direto, inclusive o salvamento).
- **Recomendado:** instale a extensão **Live Server** e use *Open with Live Server*.

Para publicar depois, arraste a pasta para Netlify Drop, Vercel ou GitHub Pages.

---

## Os dois modos

| | **Modo Mestre** (17 telas) | **Modo Jogadores** (5 telas) |
|---|---|---|
| **Menu** | Painel, A verdade, Preparo, Cronograma, NPCs, Pistas, Mapa, Puzzles, Locais, Fichas, Relógio do selo, Improviso, Documentos, Iniciativa e dados, Finais, Guia rápido, Diário | Início, Mapa, Lugares, Como jogar, Dados |
| Senha | pede a senha (padrão: `mestre`) | livre |
| Segredos, fichas, finais | ✅ | — |

O site sempre abre no Modo Jogadores. Troque o modo nas duas teclas do topo da barra lateral. **Ir para jogadores é livre; voltar ao mestre pede a senha.** O conteúdo secreto não é gerado no Modo Jogadores (não é só escondido por CSS), então não adianta abrir o inspetor do navegador.

> Senha padrão: **mestre**. Troque em *Guia rápido → Trocar senha do mestre* antes de deixar a tela com os jogadores.

---

## O mapa

O mapa ilustrado de Valebruma é a tela principal da aba **Mapa**, com **pontos dourados clicáveis** sobre a arte:

**Vila** · **Capela** · **Floresta Antiga** · **Moinho do Alto** · **Ponte de Valebruma** · **Círculo de Pedras** · **Casa de Elaria (abandonada)** · **Estrada para Darsen** — e a **Biblioteca afastada**, que fica fora do mapa e aparece como etiqueta.

- Clique no ponto (ou no nome abaixo do mapa) para abrir a descrição do lugar.
- O botão de lupa no canto abre o mapa inteiro em tela cheia.
- No **Modo Mestre** cada ponto mostra ◉ (visível aos jogadores) ou ○ (escondido); revelar é um clique, na hora.
- No **Modo Jogadores** só aparecem os lugares já revelados — o resto do mapa fica limpo, sem interrogações.
- Abaixo do mapa está a **planta da capela** (salão, torre, cripta, entrada subterrânea), também clicável.

Os quatro lugares novos que o mapa trouxe já vêm com narração, pontos de interesse e notas de mestre — inclusive a **Casa de Elaria**, que é a melhor cena de recompensa para um grupo curioso (dá uma segunda prova de confiança para o guardião).

---

## Novidades no lado do mestre

- **Relógio do selo** — medidor de tensão de 0 a 6 com a descrição de cada etapa (rachaduras, ar frio, o vigia acorda, sonhos na vila, a pedra cede, a prisão abre) e quando avançar. Fica no painel inicial e tem tela própria.
- **Improviso** — cinco tabelas roláveis (rumores d12, encontros na floresta d10, o que o guardião faz d8, detalhes da capela d10, bolsos dos aldeões d8), sorteio de **nomes de aldeões** com um trejeito, e **sete cenas de leitura** prontas para ler em voz alta.
- **Pistas** agora funcionam como controle de entrega: ◉ marca o que o grupo já recebeu, e o painel conta quantas foram entregues.
- **Locais e mapa** com revelação individual por clique.

## Do lado dos jogadores

Só o essencial: a história em uma frase, o **mapa** que eles já conhecem, os **lugares**, os **documentos** em pergaminho, as **regras de bolso** e os **dados**.

---

## Conteúdo incluído

- História completa do manual (verdade, três peças do selo, o que descobrir), preparação e equilíbrio, cronograma de 4h30.
- 7 NPCs com o que querem, o que sabem, como falam e o segredo de cada um.
- Rede de pistas: 4 conclusões × 3 pistas.
- **7 puzzles** — os três do manual ampliados (catálogo, porta dos juramentos, mecanismo da torre) + **quatro novos** (coro dos nove sinos, prancha dos nomes, a água que sobe, o voto de silêncio), cada um com falha para frente, complicação e dica de condução.
- **Vilões com ficha completa**: Oren Vantiel (ND 6), Irmão Cássio (ND 5), O Guardião da Vigília (ND 5, com 4 ajustes), guardiãs de pedra, lobos sombrios, verme da umidade, cães de Darsen e a Sombra sob a Capela.
- 11 locais, 10 documentos para entregar, 4 finais, guia rápido, diário, iniciativa e dados.
- O manual original em PDF em `manual/`.

---

## Estrutura

```
capela-das-duas-prisoes/
├── index.html                 # casca, barra lateral e barra do topo
├── README.md
├── manual/                    # o PDF original do mestre
└── assets/
    ├── css/style.css          # tema, mapa, pergaminhos, tabelas
    ├── img/mapa-valebruma.jpg # a arte do mapa (fornecida por você)
    └── js/
        ├── data.js            # TODO o conteúdo (locais, tabelas, cenas, selo, fichas)
        ├── store.js           # estado, persistência, senha, revelações, selo
        ├── ui.js              # modais, formulários, avisos
        ├── map.js             # mapa ilustrado com pontos + planta da capela
        ├── tools.js           # iniciativa e dados
        ├── views.js           # telas do mestre e dos jogadores
        └── app.js             # rotas, modos, relógio, backup
```

## Personalizar

- **Texto da aventura:** tudo em `assets/js/data.js`.
- **Posição dos pontos no mapa:** campo `spot: { x, y, side }` de cada local em `data.js` — `x`/`y` em **porcentagem** da imagem, `side` = `left`, `right`, `top` ou `bottom` para o rótulo.
- **Trocar o mapa:** substitua `assets/img/mapa-valebruma.jpg` mantendo o mesmo nome.
- **Cores:** variáveis CSS no topo de `assets/css/style.css`.
- **Tabelas e cenas:** arrays `tables` e `scenes` em `data.js` (adicione quantas quiser).

Boa sessão. Deixe os jogadores desconfiarem do guardião — e dê a eles a chance de descobrir o que a capela realmente protege.
