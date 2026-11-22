/* =========================================================
   data.js — todo o conteúdo da aventura
   A Capela das Duas Prisões · D&D 3.5
   ========================================================= */
window.ADV = (function () {
  'use strict';

  return {

    meta: {
      title: 'A Capela das Duas Prisões',
      subtitle: 'Aventura investigativa de fantasia sombria',
      system: 'Dungeons & Dragons 3.5',
      group: '4 personagens de nível 5 + 1 personagem de nível 2',
      duration: '4 a 5 horas',
      tone: 'Mistério, exploração, tensão e combate moderado',
      place: 'Vila de Valebruma',
      pitch: 'Uma vila pede ajuda contra um guardião de pedra que passou a atacar. Mas o guardião não é o monstro — é a fechadura. E alguém roubou a chave.'
    },

    /* ---------------------------------------------------
       2. A VERDADE DA AVENTURA (segredo do mestre)
       --------------------------------------------------- */
    truth: {
      pitch: 'O guardião ataca porque o sino foi roubado; o sino mantém a prisão estável; matar o guardião antes de restaurar o selo pode libertar a entidade maior.',
      paragraphs: [
        'Décadas atrás, cavaleiros exploradores encontraram na floresta uma estrutura quadrada de pedra, com uma entrada subterrânea. Uma entidade colossal emergia dali. Os cavaleiros fugiram e encontraram Elaria, uma feiticeira que vivia isolada e conhecia a ameaça.',
        'Elaria e os cavaleiros criaram um sistema de contenção. Construíram uma capela sobre a entrada, instalaram um sino encantado e criaram um guardião mágico para proteger o santuário. A capela, o sino e o guardião trabalham juntos: a capela ancora o selo, o sino estabiliza o encantamento e o guardião impede que a prisão seja violada.',
        'Com o tempo, a região virou uma vila. A tradição de conservar a capela permaneceu, mas o motivo foi esquecido. O conhecimento completo ficou num livro na biblioteca afastada. Um comerciante ganancioso roubou o sino e o vendeu a um comprador itinerante. Sem o sino, o guardião perdeu parte da orientação mágica e tornou-se hostil; a entidade subterrânea começou a despertar.',
        'O guardião não é inocente de todos os atos: ele está desregulado e pode ferir pessoas. Mas sua função original é proteger a vila. Se for destruído enquanto o selo está enfraquecido, a entidade maior escapa.'
      ],
      pieces: [
        { name: 'Capela', fn: 'Ancora o encantamento à estrutura subterrânea.', fail: 'A prisão perde estabilidade gradualmente.' },
        { name: 'Sino', fn: 'Sincroniza e estabiliza o selo.', fail: 'O guardião fica desorientado e a prisão enfraquece.' },
        { name: 'Guardião', fn: 'Protege a capela e impede violações.', fail: 'Se destruído antes da restauração, a entidade pode escapar.' }
      ],
      discover: [
        'O sino foi roubado.',
        'O guardião foi criado por Elaria.',
        'O sino é parte de um selo.',
        'Há algo maior preso sob a capela.',
        'Matar o guardião antes de restaurar o selo é perigoso.'
      ],
      note: 'Eles podem não descobrir tudo — mas devem ter pistas suficientes para tomar uma decisão informada.'
    },

    /* ---------------------------------------------------
       1. PREPARAÇÃO E EQUILÍBRIO
       --------------------------------------------------- */
    prep: {
      intro: 'A aventura foi pensada para cinco jogadores: quatro personagens de nível 5 e uma personagem de nível 2 interpretada por alguém sem experiência. Como as classes ainda não foram definidas, os blocos usam números diretos e opções de ajuste.',
      principles: [
        'Não use ataques que matem ou incapacitem automaticamente um personagem de nível 2.',
        'Evite que inimigos concentrem todos os ataques na iniciante: a criatura ameaça, bloqueia caminhos ou reage a quem se aproxima.',
        'Dê à personagem iniciante tarefas com impacto: notar símbolos, conversar com o guardião, operar mecanismos, proteger um NPC.',
        'Se o combate estiver difícil, faça um inimigo recuar, gastar uma rodada se reposicionando ou aceitar negociação.',
        'Se o grupo estiver vencendo fácil, acrescente terreno difícil ou um objetivo sob pressão — não aumente PV sem necessidade.'
      ],
      adjustments: [
        { situation: 'Grupo sem cura confiável', fix: 'Reduza os PV dos inimigos em 15% e coloque uma poção de cura menor antes da capela.' },
        { situation: 'Grupo com muitos conjuradores', fix: 'Dê cobertura parcial aos inimigos e use corredores/colunas; não aumente resistência mágica.' },
        { situation: 'Jogadores experientes e bem equipados', fix: 'Acrescente um guardião menor na cripta ou uma complicação de cenário.' },
        { situation: 'A iniciante está em risco', fix: 'O guardião avisa antes de atacar, recua ou muda o foco para proteger a capela. Permita cobertura e ajuda de aliados.' }
      ],
      newcomer: [
        'Antes da sessão, explique em 2 minutos: ela pode perguntar o que percebe, dizer o que tenta fazer e rolar dados quando o mestre pedir.',
        'Não precisa conhecer todas as regras.',
        'Combine um sinal simples para pedir uma pausa ou ajuda.',
        'Evite transformar um erro de regra em punição dentro da ficção.'
      ]
    },

    /* ---------------------------------------------------
       3. CRONOGRAMA
       --------------------------------------------------- */
    timeline: [
      { time: '00:00–00:25', key: 'Contrato', text: 'Apresente a missão, a recompensa e a nova integrante. A prefeita relata ataques e pede que a capela seja preservada.' },
      { time: '00:25–01:10', key: 'Vila', text: 'Investigue a cena do ataque, fale com moradores e descubra o sumiço do sino. As pistas apontam para o comerciante e para a biblioteca.' },
      { time: '01:10–02:10', key: 'Biblioteca afastada', text: 'Encontre o livro de Elaria. Puzzle dos registros e revelação parcial sobre o guardião e o sino.' },
      { time: '02:10–03:25', key: 'Capela', text: 'Explore o salão, resolva a porta dos juramentos e enfrente os guardiões da cripta. Descubra a entrada subterrânea.' },
      { time: '03:25–04:25', key: 'Decisão final', text: 'Confronto/negociação com o guardião. Recuperar o sino, derrotá-lo ou recuar.' },
      { time: '04:25–04:30', key: 'Epílogo', text: 'Mostre as consequências imediatas e encerre com uma imagem memorável.' }
    ],
    timelineNote: 'Se o tempo estiver acabando: corte a batalha opcional da floresta, faça a pista da biblioteca conduzir diretamente à capela. Não corte o momento de decisão final: ele é o centro emocional da aventura.',

    /* ---------------------------------------------------
       4. NPCs
       --------------------------------------------------- */
    npcs: [
      {
        id: 'mara', name: 'Prefeita Mara Vell', role: 'Contratante', where: 'Praça de Valebruma',
        wants: 'Proteger a vila e evitar pânico.',
        knows: ['A capela precisa ser conservada, mas não sabe por quê.', 'Contrata os caçadores: 300 po no total, mais hospedagem.', 'Sabe dos ataques e teme que o guardião desça à vila.'],
        secret: 'Ela já pediu a um caçador anterior que destruísse o guardião. Ele voltou em pedaços, e ela nunca contou isso a ninguém.',
        voice: 'Fala com urgência, em frases curtas. Nunca senta enquanto fala da capela.',
        open: 'Uma mulher de meia-idade, casaco bom demais para uma vila de pedra. Pede ajuda e mascara o medo com burocracia.'
      },
      {
        id: 'aldren', name: 'Aldren Voss', role: 'Comerciante', where: 'Casa do comerciante, perto da praça',
        wants: 'Não ser punido.',
        knows: ['Roubou e vendeu o sino por 180 po a um comprador itinerante chamado Oren.', 'Guarda um recibo com o símbolo de uma casa de leilões em Darsen.', 'Sabe que o sino "fazia barulho estranho na carroça".'],
        secret: 'Além do sino, ele entregou a Oren o mapa das galerias subterrâneas que estava num baú da capela — e não contou isso para ninguém.',
        voice: 'Tenta parecer ofendido. Responde perguntas com perguntas. Suor na testa quando se fala da torre.',
        open: 'Um homem de mãos macias e casaco apertado, que oferece bebida antes de qualquer pergunta.'
      },
      {
        id: 'tovan', name: 'Irmão Tovan', role: 'Bibliotecário', where: 'Biblioteca afastada',
        wants: 'Preservar os livros.',
        knows: ['Conhece o título do livro de Elaria, mas não o conteúdo.', 'Permite consulta se os personagens forem respeitados ou ajudarem a proteger a biblioteca.'],
        secret: 'Ele já leu o livro uma vez, há vinte anos, e escondeu a página final num livro de salmos para "ninguém fazer uma tolice".',
        voice: 'Cuidadoso com livros, mede as palavras. Corrige quem chama a biblioteca de depósito.',
        open: 'Um homem magro coberto de poeira de papel, com as mãos sempre ocupadas dobrando um marcador.'
      },
      {
        id: 'edda', name: 'Edda', role: 'Anciã da vila', where: 'Casa de Edda, na saída norte',
        wants: 'Que ouçam a cantiga.',
        knows: ['Lembra uma cantiga sobre uma feiticeira que "fez um vigia de pedra".', 'Acredita que seja folclore, mas recita sem teste.'],
        secret: 'Ela viu o guardião se ajoelhar para uma mulher de cabelo branco quando era criança — e a mulher a viu também.',
        voice: 'Fala em imagens e provérbios. Nunca responde direto quando uma metáfora serve.',
        open: 'Uma mulher pequena de xale vermelho, que oferece sopa e fala como quem conta um segredo que já é público.'
      },
      {
        id: 'edric', name: 'Sir Edric', role: 'Descendente dos cavaleiros', where: 'Solar em ruínas, atrás da capela',
        wants: 'Lavar ou honrar o nome da família.',
        knows: ['Possui uma cópia incompleta do diário da expedição.', 'Sabe que os cavaleiros fizeram um juramento, mas não entende o selo.'],
        secret: 'O juramento da família é "primeiro o juramento, depois a proteção, por fim o vínculo" — ele acha que é um lema de honra, não a ordem de um mecanismo.',
        voice: 'Formal até o exagero. Trata todos por "senhor" ou "senhora" e nunca se senta sem pedir licença.',
        open: 'Um homem alto de armadura enferrujada e capa boa no colo, como se fosse uma relíquia emprestada.'
      },
      {
        id: 'oren-npc', name: 'Oren Vantiel', role: 'Comprador itinerante', where: 'Estrada de Darsen / capela',
        wants: 'Vender o que existe do outro lado.',
        knows: ['Comprou o sino de Aldren por 180 po.', 'Sabe que o sino "canta" quando se aproxima da capela.', 'Pagou por um mapa das galerias subterrâneas.'],
        secret: 'Já abriu correspondência com a casa de leilões de Darsen: há compradores para "um fragmento de deus". Ele volta à capela para checar o produto.',
        voice: 'Cordial, rápido, com muitas perguntas. Chama todos de "meu caro".',
        open: 'Um homem de casaco de viagem e dedos cheios de anéis baratos, que sabe o preço de tudo.'
      },
      {
        id: 'guardiao-npc', name: 'O Guardião da Vigília', role: 'Constructo de Elaria', where: 'Capela',
        wants: 'Cumprir a ordem que perdeu.',
        knows: ['Responde a palavras-chave: "Elaria", "sino", "vigília" e "proteger".', 'Não sabe onde o sino foi vendido.', 'Sabe que algo está errado, mas não consegue nomear o que falta.'],
        secret: 'Se ouvir "restauraremos o sino" E vir uma pista verdadeira do livro, hesita por uma rodada inteira.',
        voice: 'Frases curtas e repetidas, como uma ordem antiga: "A vigília continua. A vigília não termina."',
        open: 'Uma estátua de três metros com luz fraca no peito, movendo-se devagar como quem carrega peso.'
      }
    ],

    /* ---------------------------------------------------
       5. PISTAS
       --------------------------------------------------- */
    clueGroups: [
      {
        id: 'sino', conclusion: 'O sino desapareceu',
        items: [
          { id: 'c-s1', text: 'Na torre, há marcas recentes de corrente e poeira limpa em volta do suporte vazio.', source: 'Capela — torre' },
          { id: 'c-s2', text: 'Aldren evita olhar para a capela e mente sobre uma venda.', source: 'Aldren Voss' },
          { id: 'c-s3', text: 'Um morador ouviu uma carroça saindo na noite do roubo, pesada demais para carga comum.', source: 'Moradores / praça' }
        ]
      },
      {
        id: 'criador', conclusion: 'O guardião foi criado por Elaria',
        items: [
          { id: 'c-g1', text: 'O livro de Elaria descreve a criação do guardião, com um desenho do símbolo no peito.', source: 'Biblioteca — livro de Elaria' },
          { id: 'c-g2', text: 'Um símbolo de construtor arcano aparece no peito do guardião.', source: 'Observação do guardião' },
          { id: 'c-g3', text: 'Edda recorda a cantiga do "vigia feito pela feiticeira".', source: 'Edda' }
        ]
      },
      {
        id: 'selo', conclusion: 'O sino faz parte de um selo',
        items: [
          { id: 'c-se1', text: 'O livro explica o mecanismo: capela, sino e guardião são três partes da mesma prisão.', source: 'Biblioteca — livro de Elaria' },
          { id: 'c-se2', text: 'Inscrições na cripta mostram sino, capela e prisão unidos por uma corrente esculpida.', source: 'Cripta' },
          { id: 'c-se3', text: 'O guardião se acalma quando alguém promete restaurar o sino.', source: 'Contato com o guardião' }
        ]
      },
      {
        id: 'perigo', conclusion: 'Matar o guardião é perigoso',
        items: [
          { id: 'c-p1', text: 'A advertência final do livro: "o vigia é a última dobradiça".', source: 'Biblioteca — página final' },
          { id: 'c-p2', text: 'Um mural mostra o guardião entre a vila e uma sombra subterrânea.', source: 'Capela — mural' },
          { id: 'c-p3', text: 'Ao sofrer dano, o chão vibra e uma voz profunda responde alguma coisa.', source: 'Qualquer dano ao guardião' }
        ]
      }
    ],
    clueRule: 'Use a regra das três pistas: para cada conclusão essencial ofereça pelo menos três caminhos. Não exija um teste para entregar uma pista central; testes determinam rapidez, detalhe ou vantagem.',
    emergencyClue: 'Se a mesa ficar travada por mais de 10 minutos, deixe um NPC oferecer uma pista concreta, mas não a solução inteira. Exemplo: "O livro fala de três coisas que precisam permanecer juntas: a capela, o sino e o vigia."',

    /* ---------------------------------------------------
       6. PUZZLES (originais + ampliados)
       --------------------------------------------------- */
    puzzles: [
      {
        id: 'cat', code: 'A', title: 'O catálogo da biblioteca', place: 'Biblioteca afastada', kind: 'Investigação',
        goal: 'Descobrir qual dos três relatos é o livro de Elaria antes que o tempo da mesa acabe.',
        players: 'Três livros de expedição lado a lado na mesa de leitura: "Terras do Norte", "Relatos da Primeira Expedição" e "Crônicas da Vila". Entre eles, um papel solto com a letra fina de Elaria: "Procure o relato que veio antes da vila, mas depois da primeira fuga."',
        handouts: ['h-catalogo'],
        dcs: [
          { skill: 'Conhecimento (história) CD 12', result: 'Revela que a vila foi fundada depois da primeira expedição — e antes das crônicas.' },
          { skill: 'Procurar CD 14', result: 'Encontra um fundo falso no catálogo, com a ficha de retirada assinada por "E." há quarenta anos.' },
          { skill: 'Conhecimento (arcano) CD 15', result: 'Percebe que as margens do livro certo reagem à luz da vela — tinta encantada.' }
        ],
        solution: [
          'A resposta é "Relatos da Primeira Expedição": a primeira fuga veio antes da fundação da vila, e as crônicas da vila são posteriores a tudo.',
          'Abrir o livro certo revela as anotações de Elaria e a primeira menção às "três partes que não podem se separar".',
          'No fundo falso do catálogo há a ficha de retirada: a página final foi retirada e está "guardada com os salmos" (gancho para o Irmão Tovan).'
        ],
        fail: 'Não bloqueie o livro. Se falharem, o Irmão Tovan encontra o volume depois de uma cena curta — mas cobra um favor: que a capela não seja queimada.',
        twist: 'Se alguém mexer nos livros sem licença, Tovan interrompe a leitura e exige que ajudem a proteger a biblioteca (uma janela quebrada, umidade, um vizinho curioso).',
        gm: 'Este puzzle ensina o grupo a ler pistas em texto. Deixe o papel de Elaria circular na mesa como handout impresso.'
      },
      {
        id: 'porta', code: 'B', title: 'A porta dos três juramentos', place: 'Capela — cripta', kind: 'Lógico',
        goal: 'Abrir a porta de pedra que leva à cripta sem acordar o guardião errado.',
        players: 'Na porta subterrânea há três símbolos em discos de pedra: espada, escudo e sino. A inscrição, gasta pelo tempo, ainda é legível: "Primeiro o juramento, depois a proteção, por fim o vínculo." Cada símbolo só pode ser pressionado uma vez.',
        handouts: ['h-inscricao-porta', 'h-edric'],
        dcs: [
          { skill: 'Conhecimento (religião) CD 13', result: 'Reconhece a fórmula como um juramento de ordem de cavalaria, não como uma senha mágica.' },
          { skill: 'Conhecimento (arcano) CD 15', result: 'Percebe que o sino é o "vínculo": o último disco é o que liga o mecanismo à prisão.' },
          { skill: 'Ouvir CD 12', result: 'Nota que o eco dentro da cripta responde na ordem em que os discos afundam.' }
        ],
        solution: [
          'Ordem correta: espada → escudo → sino (juramento, proteção, vínculo).',
          'Se alguém recitar em voz alta o lema de Sir Edric enquanto pressiona, a porta abre sem ruído nenhum — e o guardião não desperta.',
          'Cada disco só funciona uma vez: se errarem, precisam esperar a pedra "respirar" (uma rodada) antes de tentar de novo.'
        ],
        fail: 'A porta emite um toque ensurdecedor: todos ficam atordoados por 1 rodada (sem dano obrigatório). Após duas falhas, uma inscrição secundária aparece sob o pó e sugere a ordem.',
        twist: 'A terceira pressão correta faz o chão vibrar uma vez — algo lá embaixo "vira a cabeça" para o barulho. Conte essa tensão mesmo no acerto.',
        gm: 'Improviso: se o grupo pressionar os três ao mesmo tempo, a porta abre e o guardião chega em 3 rodadas. Não é punição — é ritmo.'
      },
      {
        id: 'mecanismo', code: 'C', title: 'O mecanismo da torre', place: 'Capela — torre', kind: 'Mecânico',
        goal: 'Preparar o suporte para receber o sino sem romper o selo.',
        players: 'Três correntes descem do teto da torre até um anel de ferro no chão. A inscrição no anel: "Devolva o que foi tomado; mantenha o que foi prometido; não desperte o que foi selado." O suporte do sino está torto, o contrapeso pendurado por um fio, e a corrente que desce para a prisão gira livre.',
        handouts: ['h-inscricao-torre'],
        dcs: [
          { skill: 'Procurar CD 15', result: 'Identifica qual corrente faz o quê: a do centro (sino), a do contrapeso, a da prisão.' },
          { skill: 'Conhecimento (arcano) CD 16', result: 'Entende que a corrente da prisão deve ficar travada — soltá-la é o que a entidade quer.' },
          { skill: 'Ofício (funilaria/ferreiro) CD 14', result: 'Permite corrigir o suporte sem gastar uma rodada extra de tensão.' }
        ],
        solution: [
          'Passo 1 — centralizar o suporte do sino (corrente do centro, dois homens ou uma alavanca).',
          'Passo 2 — fixar o contrapeso antes de mexer em qualquer outra coisa.',
          'Passo 3 — deixar a corrente da prisão travada. Nunca soltar, nem "para ver o que acontece".',
          'Com isso resolvido, o mecanismo pode receber o sino sem romper o selo.'
        ],
        fail: 'Uma vibração revela que algo está vivo sob a capela. Não liberte a entidade automaticamente: aplique uma consequência de tensão (rachaduras, vento que puxa para baixo, uma voz) e permita nova tentativa com CD +2.',
        twist: 'O contrapeso cede na terceira tentativa: alguém precisa segurá-lo (teste de Força CD 15) enquanto outro trabalha. A iniciante pode ser quem percebe o fio cedendo — e avisa a tempo.',
        gm: 'Desenhe as três correntes no mapa da capela e deixe os jogadores moverem marcadores. O puzzle fica muito mais claro no visual.'
      },
      {
        id: 'coro', code: 'D', title: 'O coro dos nove sinos', place: 'Capela — cripta', kind: 'Lógico / sensorial',
        goal: 'Abrir o relicário que guarda o símbolo de Elaria (a prova de confiança do guardião).',
        players: 'Nove sinos pequenos pendem de uma viga de pedra, cada um com uma fita de cor desbotada. No mural ao lado, quatro figuras ajoelhadas usam mantos de cores diferentes, em ordem, do mais escuro ao mais claro. O relicário no centro tem nove encaixes, e nenhum está pressionado.',
        handouts: ['h-mural'],
        dcs: [
          { skill: 'Observar CD 13', result: 'Percebe que cada fita corresponde a um manto do mural.' },
          { skill: 'Conhecimento (religião) CD 15', result: 'Identifica as cores como as vestes das quatro ordens do juramento.' },
          { skill: 'Ouvir CD 16', result: 'Nota que um dos sinos está rachado e não deve ser tocado.' }
        ],
        solution: [
          'Toque apenas os quatro sinos das cores do mural, na ordem em que aparecem (do escuro ao claro).',
          'Os cinco restantes são "vozes" — tocá-los faz o coro responder errado.',
          'Ao tocar a sequência certa, o relicário abre e revela o símbolo de Elaria (prova para o guardião).'
        ],
        fail: 'Um acorde dissonante ecoa pela cripta: o guardião se aproxima (chega em 2 rodadas) e todos ficam abalados (−1 em testes por 1 cena). O relicário continua fechado — dá para tentar de novo depois de afastar o guardião.',
        twist: 'O sino rachado, se tocado, se parte e deixa uma lâmina de bronze solta: serve como arma improvisada contra constructos (dano contundente) ou como prova da passagem do tempo.',
        gm: 'Se a mesa for musical, toque a sequência em um copo com água ou peça aos jogadores que batam na mesa em ritmo. Dura menos de um minuto e vira memória.'
      },
      {
        id: 'nomes', code: 'E', title: 'A prancha dos nomes', place: 'Capela — cripta', kind: 'Dedução',
        goal: 'Descobrir quais cavaleiros quebraram o juramento e restaurar a placa que revela a frase do juramento.',
        players: 'Uma laje de pedra com nove nomes gravados. Três foram raspados até ficar ilegíveis, e três plaquetas soltas jazem no chão com nomes de cavaleiros. O diário de Sir Edric fala de "três que fugiram na primeira noite". O estandarte da ordem, no salão, tem nove estrelas — e três estão apagadas.',
        handouts: ['h-edric', 'h-placa'],
        dcs: [
          { skill: 'Conhecimento (nobreza) CD 14', result: 'Reconhece os sobrenomes das famílias que desapareceram da região.' },
          { skill: 'Procurar CD 13', result: 'Encontra marcas de cinzel recentes: alguém raspou os nomes há poucos anos.' },
          { skill: 'Intuição CD 12', result: 'Percebe que um dos nomes soltos é de um ancestral de Sir Edric — e ele fica pálido quando percebe.' }
        ],
        solution: [
          'Cruzar as três estrelas apagadas do estandarte com os três nomes que faltam na laje.',
          'Colocar as plaquetas nos espaços certos revela, em relevo, a frase completa do juramento: "Primeiro o juramento, depois a proteção, por fim o vínculo."',
          'Esta frase é a chave falada da Porta dos Três Juramentos (puzzle B) e a senha que faz o guardião hesitar.'
        ],
        fail: 'Colocar a plaqueta errada faz a laje afundar 2 cm e travar: um teste de Força CD 15 (ou uma alavanca improvisada) libera. Nada se perde.',
        twist: 'Sir Edric, se estiver presente, tenta impedir que o nome do ancestral seja exposto. Isso rende uma cena de roleplay: convencê-lo vale mais que qualquer teste.',
        gm: 'Este puzzle conecta investigação e cripta. Se o grupo pulou a biblioteca, use-o para entregar o juramento e não travar a porta B.'
      },
      {
        id: 'agua', code: 'F', title: 'A água que sobe', place: 'Capela — entrada subterrânea', kind: 'Pressão / tempo',
        goal: 'Liberar a passagem alagada e chegar à entrada da prisão antes que a água suba.',
        players: 'Três válvulas de bronze na parede de um corredor que desce. A água já cobre os tornozelos e sobe um dedo a cada respiração. Uma quarta alavanca, sem marcação, fica ao lado de um lampião rachado. Do fundo vem um som de pedra raspando pedra.',
        handouts: ['h-valvulas'],
        dcs: [
          { skill: 'Procurar CD 14', result: 'Percebe que a alavanca sem marcação é a que trava a comporta de cima.' },
          { skill: 'Conhecimento (arquitetura/engenharia) CD 15', result: 'Entende a lógica: uma válvula abre, duas fecham — abrir todas afoga o corredor.' },
          { skill: 'Força CD 15', result: 'Gira uma válvula emperrada sem gastar uma rodada extra.' }
        ],
        solution: [
          'Fechar a válvula 1 (a que alimenta a cisterna), abrir a 2 (dreno lateral) e manter a 3 fechada.',
          'Alguém precisa segurar o lampião e a corrente do teto durante toda a operação — trabalho perfeito para a personagem de nível 2.',
          'Com a água baixando, o corredor fica transitável por 3 rodadas antes de voltar a subir.'
        ],
        fail: 'Se errarem, a água cobre o corredor: todos recuam e perdem tempo (marque uma cena). Ninguém se afoga — a consequência é atraso, barulho e a certeza de que algo lá embaixo ouviu.',
        twist: 'O Verme da Umidade vive no dreno lateral e sai quando a válvula 2 é aberta. Encontro opcional de 3 rodadas — ou uma chance de negociar com carne crua.',
        gm: 'Marque a água em uma trilha de 1 a 6 na mesa e avance um passo por rodada ou por erro. A pressão do tempo é o puzzle, não a matemática.'
      },
      {
        id: 'voto', code: 'G', title: 'O voto de silêncio', place: 'Qualquer — com o guardião', kind: 'Social',
        goal: 'Acalmar o guardião sem combate, decidindo o final da aventura.',
        players: 'O guardião para a três metros, a luz do peito pulsando como um coração lento. Ele repete: "A vigília continua. A vigília não termina." Espera. Não ataca. Espera.',
        handouts: ['h-livro-final'],
        dcs: [
          { skill: 'Diplomacia CD 15', result: 'Uma promessa sincera de restaurar o sino o faz hesitar por 1 rodada.' },
          { skill: 'Conhecimento (arcano) CD 16', result: 'Permite citar a frase do livro de Elaria e ser reconhecido como "da casa dela".' },
          { skill: 'Intuição CD 13', result: 'Percebe que ele responde a quatro palavras: Elaria, sino, vigília e proteger.' }
        ],
        solution: [
          'Sucesso 1 — dizer "Elaria" e mostrar o símbolo: o guardião se ajoelha.',
          'Sucesso 2 — mostrar a pista do livro e prometer restaurar o sino: ele hesita e baixa os braços.',
          'Sucesso 3 — recitar o juramento completo: ele entrega a passagem e fica em vigília.',
          'Três sucessos narrativos restauram a confiança. Não exija três testes: use a conversa como teste único, com bônus por cada prova mostrada.'
        ],
        fail: 'Se o grupo atacar, ele responde com o Pulso de Contenção (sem dano) e recua para a torre. Se for reduzido a 15 PV, para e exige que provem a intenção — última chance de diálogo.',
        twist: 'Se Oren estiver presente e o grupo hesitar, ele grita que o guardião é "só uma máquina velha" e ataca — forçando a escolha.',
        gm: 'Este é o clímax emocional. Diminua a música, fale baixo, e deixe o silêncio trabalhar. Não peça iniciativa se a cena for conversa.'
      }
    ],

    puzzleRules: [
      { title: 'Falha para frente', text: 'Nenhum puzzle deste site bloqueia a história. Toda falha custa tempo, barulho, recurso ou tensão — nunca a aventura.' },
      { title: 'Três caminhos', text: 'Cada conclusão essencial tem três fontes possíveis. Se uma porta fechar, outra pista já está plantada.' },
      { title: 'Testes dão detalhe', text: 'A rolagem define rapidez, detalhe ou vantagem. A pista central vem de graça para quem procura.' },
      { title: 'A iniciante resolve', text: 'Todo puzzle tem um passo que serve à personagem de nível 2: segurar a corrente, notar o fio, falar com o guardião, operar a alavanca.' }
    ],

    /* ---------------------------------------------------
       7. LOCAIS
       --------------------------------------------------- */
    places: [
      {
        id: 'vila', name: 'Vila de Valebruma', type: 'Vila', map: { x: 306, y: 296 }, spot: { x: 28, y: 50.5, side: 'bottom' },
        narration: 'A vila parece tranquila à luz do dia, mas as janelas estão fechadas e as conversas cessam quando vocês mencionam a capela. Ao longe, a torre se ergue entre árvores antigas. O lugar parece menos abandonado do que esquecido.',
        points: ['Praça e mural de avisos', 'Casa do comerciante', 'Torre da capela', 'Casa de Edda'],
        gm: 'Deixe claro que a vila quer ajuda, mas teme que os caçadores provoquem o guardião. Ninguém sabe por que a capela é importante — só que é.',
        open: 'Casas de pedra cinzenta, uma praça com um mural cheio de avisos antigos e uma torre que se vê de qualquer ponto.'
      },
      {
        id: 'biblioteca', name: 'Biblioteca afastada', type: 'Biblioteca', offmap: true,
        narration: 'A biblioteca é uma construção estreita, com janelas cobertas por trepadeiras. O ar cheira a papel úmido e cera. No catálogo, um espaço vazio interrompe uma sequência de registros de expedições.',
        points: ['Catálogo e mesa de leitura', 'Estante de expedições', 'Arquivo dos salmos'],
        gm: 'O livro não deve parecer mágico à primeira vista. Sua importância vem do conteúdo e das anotações de Elaria nas margens.',
        open: 'Uma biblioteca pequena e teimosa, com mais livros do que prateleiras e um bibliotecário que conhece todos pelo cheiro.'
      },
      {
        id: 'capela', name: 'A Capela das Duas Prisões', type: 'Capela', map: { x: 520, y: 165 }, spot: { x: 61, y: 37.5, side: 'right' },
        narration: 'A capela está inteira, mas há rachaduras novas no chão. O sino não está na torre. Marcas de arrasto atravessam o pó e terminam numa porta de pedra quadrada, quase escondida sob o altar.',
        points: ['Salão principal (pistas visuais)', 'Cripta (puzzle e guardiões)', 'Torre (mecanismo)', 'Entrada subterrânea (sinais da entidade)'],
        gm: 'A capela ancora o selo. Cada rachadura nova é um relógio: descreva uma a mais a cada cena de tensão para mostrar a prisão cedendo.',
        open: 'Uma capela de pedra escura, com um altar simples e um chão que range. O suporte do sino está vazio.'
      },
      {
        id: 'cripta', name: 'Cripta e juramentos', type: 'Subsolo', map: { x: 640, y: 210 },
        narration: 'A escada desce em espiral e termina numa sala baixa, com nove nichos vazios e um mural de cavaleiros ajoelhados. No centro, uma laje com nomes raspados. O ar é seco — seco demais para um lugar alagado.',
        points: ['Porta dos três juramentos', 'Coro dos nove sinos', 'Prancha dos nomes', 'Dois guardiões menores'],
        gm: 'Aqui ficam dois puzzles e o primeiro combate real. Se a iniciante estiver exposta, use apenas um guardião menor.',
        open: 'Uma sala baixa de pedra, com nichos vazios e um mural de cavaleiros ajoelhados. O ar é seco demais.'
      },
      {
        id: 'torre', name: 'Torre do Sino', type: 'Torre', map: { x: 440, y: 120 },
        narration: 'A torre é oca por dentro. Três correntes descem até um anel de ferro no chão, e o suporte do sino está torto. Lá em cima, o vento assobia por uma fenda que não deveria existir.',
        points: ['Mecanismo das três correntes', 'Marcas de corrente no suporte vazio', 'Fenda no alto'],
        gm: 'A torre é o lugar mais alto e o mais silencioso. Use o som do vento para dar solidão antes do clímax.',
        open: 'Uma torre oca, com três correntes e um suporte vazio. O vento assobia por uma fenda no alto.'
      },
      {
        id: 'entrada', name: 'Entrada subterrânea', type: 'Prisão', map: { x: 520, y: 265 },
        narration: 'O ar que sobe da abertura é frio e tem cheiro de pedra molhada. Muito abaixo, algo enorme se move uma única vez. O som não parece um rugido — parece uma montanha mudando de posição.',
        points: ['Corredor alagado (puzzle F)', 'Comportas e válvulas', 'A fenda além da grade'],
        gm: 'Não mostre a entidade inteira. O desconhecido é mais eficaz e permite encerrar a aventura sem outro combate.',
        open: 'Uma abertura quadrada sob o altar, com ar frio e um som profundo que não parece um rugido.'
      },
      {
        id: 'floresta', name: 'Floresta Antiga', type: 'Mata', map: { x: 210, y: 480 }, spot: { x: 41.7, y: 18.5, side: 'bottom' },
        narration: 'A trilha se estreita entre troncos cobertos de musgo. Pegadas fundas demais para cães comuns cruzam o caminho e somem entre raízes. Algo está seguindo o grupo desde a curva do rio.',
        points: ['Trilha de caça', 'Encontro opcional: 2 lobos sombrios'],
        gm: 'Encontro opcional. Se o grupo estiver cansado ou sem cura, use apenas 1 lobo — ou nenhum.',
        open: 'Uma floresta densa e úmida, com pegadas grandes demais para cães comuns.'
      },
      {
        id: 'estrada', name: 'Estrada para Darsen', type: 'Estrada', map: { x: 880, y: 540 }, spot: { x: 93, y: 79, side: 'left' },
        narration: 'A estrada sai da vila e some na curva do rio. Na noite do roubo, uma carroça pesada passou por aqui — e voltou dias depois, mais leve e mais apressada.',
        points: ['Rastro de carroça', 'Casa de leilões de Darsen (fora do mapa)', 'Rota de Oren'],
        gm: 'Gancho para uma continuação: o leilão em Darsen e quem pagaria por "um fragmento de deus".',
        open: 'Uma estrada de terra batida que leva à cidade grande. Passa carroça, passa notícia, passa problema.'
      },
      {
        id: 'moinho', name: 'Moinho do Alto', type: 'Moinho', spot: { x: 11.9, y: 36, side: 'right' },
        narration: 'As velas do moinho giram devagar, mesmo sem vento. O moleiro para o trabalho quando vocês chegam e limpa as mãos no avental três vezes antes de falar. Atrás dele, um saco de farinha está aberto — e tem marcas de mãos pequenas dentro.',
        points: ['Moleiro Ossian e a família', 'Vista da estrada e da ponte', 'Saco de farinha revirado'],
        gm: 'Ossian viu a carroça passar carregada e voltar leve, e ouviu um zunido de metal vindo da caixa. Ele dá a pista em troca de proteção: os filhos estão com medo do guardião. Se o grupo for gentil, ele empresta um burro.',
        open: 'Um moinho de velas compridas no alto do campo, com sacos de farinha na porta e um moleiro que não dorme bem.'
      },
      {
        id: 'ponte', name: 'Ponte de Valebruma', type: 'Ponte', spot: { x: 50.5, y: 72.5 },
        narration: 'A ponte de pedra cruza o rio em três arcos, coberta de limo. Do lado de cá, a estrada da vila; do lado de lá, a estrada de Darsen. É o único ponto seco num raio de uma légua — e todo mundo em Valebruma sabe disso.',
        points: ['Único cruzamento do rio', 'Rastro de carroça sobre o limo', 'Ponto de encontro da milícia (Final C)'],
        gm: 'Use a ponte para encontros: Oren chegando com os cães de Darsen, um aldeão fugindo, ou a milícia se reunindo no Final C. Se o grupo bloquear a ponte, ninguém entra nem sai da vila — inclusive o sino.',
        open: 'Uma ponte velha de pedra sobre o rio, com limo nos arcos e marcas de rodas no chão.'
      },
      {
        id: 'menires', name: 'Círculo de Pedras', type: 'Ruínas', spot: { x: 80.4, y: 62.5, side: 'top' },
        narration: 'Nove pedras fincadas em círculo, três delas caídas. As que continuam de pé têm nomes gravados, gastos pela chuva — e as três caídas estão voltadas para a capela. No centro, a terra é mais escura e nada cresce.',
        points: ['Nove pedras, três caídas', 'Nomes dos cavaleiros gravados', 'Centro sem vegetação'],
        gm: 'Aqui está a pista alternativa da Prancha dos Nomes (puzzle E): os três nomes caídos são os três que fugiram. Também é onde Elaria deixou uma marca de giz que ainda responde a Conhecimento (arcano). Se o grupo perdeu o relicário, o símbolo de Elaria pode ser refeito aqui com Conhecimento (arcano) CD 18 e uma noite de trabalho.',
        open: 'Um círculo de pedras antigas em cima de uma colina, com nomes gastos e a terra nua no meio.'
      },
      {
        id: 'casa-elaria', name: 'Casa de Elaria (abandonada)', type: 'Ruína arcana', spot: { x: 77.8, y: 14.6, side: 'bottom' },
        narration: 'A casa é grande demais para uma pessoa só e está vazia há décadas. As janelas foram fechadas por dentro com tábuas. Na oficina, há uma bancada coberta de pó e, sobre ela, o desenho de um guardião de três metros — com o peito aberto e um sino no lugar do coração.',
        points: ['Oficina de Elaria', 'Desenho técnico do guardião', 'Carta nunca enviada', 'Símbolo de Elaria gravado no batente'],
        gm: 'Cena de recompensa para grupos curiosos: aqui há uma segunda prova de confiança (o símbolo gravado no batente, que se pode copiar com Carvão e papel) e a carta em que Elaria escreve "se o sino for tomado, fale com ele antes de quebrá-lo". O lugar é assombrado apenas pela tristeza: nada ataca, exceto o tempo. Gaste 10 minutos de mesa aqui e o Final A fica muito mais provável.',
        open: 'Uma casa senhorial abandonada no alto da colina, com janelas tapadas por dentro e uma oficina cheia de pó.'
      }
    ],

    /* ---------------------------------------------------
       8. FICHAS E CRIATURAS
       --------------------------------------------------- */
    creatures: [
      {
        id: 'guardiao', name: 'O Guardião da Vigília', tag: 'ANTAGONISTA', nd: '5', type: 'Constructo Grande',
        intro: 'Não é um vilão: é a fechadura viva da prisão. Ataca porque o sino sumiu. O combate é opcional — e matá-lo pode ser o pior final.',
        stat: {
          dv: '6d10+18 (51 PV)', init: '+1', speed: '9 m', ca: '18 (toque 10, desprevenido 17)',
          bba: '+4', atk: 'Pancada +8 corpo a corpo (1d8+4)', fullAtk: 'Pancada +8 (1d8+4)',
          space: '4,5 m / 3 m', sa: 'Pulso de contenção, RD 5/mágica, visão no escuro 18 m, imunidades de constructo',
          saves: 'Fort +2, Ref +3, Vont +2',
          abilities: { 'For': 18, 'Des': 12, 'Con': '—', 'Int': 6, 'Sab': 12, 'Car': 8 },
          skills: 'Ouvir +6, Observar +8',
          env: 'Capela das Duas Prisões', org: 'Solitário (único)', treasure: 'Nenhum — o símbolo no peito, se removido, apaga o guardião'
        },
        abilities: [
          { name: 'Pulso de contenção (1/3 rodadas)', text: 'Criaturas a até 3 m fazem Reflexos CD 14 ou são empurradas 3 m e ficam caídas. Não causa dano. A habilidade se anuncia com luz no peito, dando oportunidade de reação.' },
          { name: 'Prioridade de vigília', text: 'Prioriza impedir acesso à torre. Não ataca quem está caído.' },
          { name: 'Hesitação', text: 'Se alguém disser "restauraremos o sino" e mostrar uma pista do livro, hesita por 1 rodada inteira.' },
          { name: 'Rendição', text: 'Se reduzido a 15 PV, para e exige que os personagens provem sua intenção.' }
        ],
        tactics: 'Abre com o pulso para afastar, nunca para matar. Fica entre o grupo e a torre. Se a iniciante se aproximar sozinha, avisa antes de atacar ("A vigília não permite") e recua para bloquear.',
        adjustments: [
          { when: 'Pouca cura ou poucos recursos', do: 'Use 40 PV, retire RD 5/mágica e limite o pulso a uma vez.' },
          { when: 'Boa cura e dano alto', do: 'Use 55 PV e mantenha a RD. Acrescente cobertura, não ataques extras.' },
          { when: 'Iniciante em risco', do: 'Avisa antes do pulso, evita focar nela e pode interromper o combate para falar.' },
          { when: 'Decide conversar', do: 'Uma pista correta + promessa sincera basta para hesitar. Três sucessos narrativos restauram a confiança.' }
        ]
      },
      {
        id: 'oren', name: 'Oren Vantiel, o Colecionador', tag: 'VILÃO (opção 1)', nd: '6', type: 'Humano Ladino 6',
        intro: 'O comprador do sino. Volta à capela para conferir "o produto" e transformar uma prisão em leilão. Vilão perfeito para uma mesa que gosta de negociar e perseguir.',
        stat: {
          dv: '6d6+6 (27 PV)', init: '+7', speed: '9 m', ca: '18 (toque 14, desprevenido 15)',
          bba: '+4', atk: 'Espada curta +1 +8 (1d6+2, 19–20) ou besta de mão +7 (1d4+1)',
          fullAtk: 'Espada curta +8/+3 (1d6+2)',
          space: '1,5 m / 1,5 m', sa: 'Ataque furtivo +3d6, evasão, esquiva sobrenatural, encontrar armadilhas',
          saves: 'Fort +3, Ref +9, Vont +4',
          abilities: { 'For': 12, 'Des': 17, 'Con': 12, 'Int': 14, 'Sab': 10, 'Car': 15 },
          skills: 'Avaliação +11, Blefar +13, Diplomacia +10, Abrir Fechaduras +12, Furtividade +12, Observar +9, Sentir Motivação +9, Usar Item Mágico +11',
          feats: 'Iniciativa Aprimorada, Esquiva, Mobilidade, Foco em Perícia (Blefar), Ataque em Movimento',
          env: 'Estrada de Darsen', org: 'Com 2 cães de Darsen', treasure: 'Anel de proteção +2, espada curta +1, 2 poções de curar ferimentos moderados, 240 po, o sino lacrado'
        },
        abilities: [
          { name: 'O sino lacrado', text: 'Carrega o sino numa caixa forrada de palha. Enquanto a caixa estiver fechada, o sino não "canta" — mas vibra perto da capela (Percepção CD 12).' },
          { name: 'Contraproposta', text: 'Oferece 200 po pelo silêncio do grupo, ou o dobro para "só olharem para o outro lado". Aceitar é uma escolha legítima com consequências.' },
          { name: 'Rota de fuga', text: 'Bomba de fumaça + Ataque em Movimento + Evasão: se chegar a 8 PV, foge para a estrada. Persegui-lo é uma cena inteira.' }
        ],
        tactics: 'Nunca luta até a morte. Começa com conversa, usa os cães como tela, tenta separar o grupo e foge com o sino se perder. Pode ser convencido a devolver o sino (Diplomacia CD 18, ou 180 po + 100 de "lucro perdido", ou Intimidação CD 20 com uma ameaça crível).',
        adjustments: [
          { when: 'Grupo quer combate curto', do: 'Deixe-o sozinho, sem os cães, e com 22 PV.' },
          { when: 'Grupo gosta de intriga', do: 'Dê a ele um contrato assinado da casa de leilões: a ameaça é maior que ele.' },
          { when: 'O grupo já tem o sino', do: 'Ele aparece para roubá-lo de volta durante a noite, no acampamento.' }
        ]
      },
      {
        id: 'cassio', name: 'Irmão Cássio, o Orelha da Fenda', tag: 'VILÃO (opção 2)', nd: '5', type: 'Humano Clérigo 5',
        intro: 'Alternativa a Oren: um fanático que acredita que a entidade é divina e que o guardião é um anjo caído a ser libertado. Perfeito para uma mesa de horror religioso.',
        stat: {
          dv: '5d8+10 (35 PV)', init: '+1', speed: '6 m', ca: '17 (toque 11, desprevenido 16)',
          bba: '+3', atk: 'Maça pesada +5 (1d8+2)',
          fullAtk: 'Maça pesada +5 (1d8+2)',
          space: '1,5 m / 1,5 m', sa: 'Magias, domínio da Fenda, expulsar mortos-vivos 4/dia',
          saves: 'Fort +6, Ref +2, Vont +8',
          abilities: { 'For': 14, 'Des': 12, 'Con': 14, 'Int': 10, 'Sab': 17, 'Car': 13 },
          skills: 'Concentração +10, Conhecimento (religião) +8, Cura +9, Diplomacia +6, Intimidar +6',
          feats: 'Vontade de Ferro, Foco em Magia (conjuração), Combate Defensivo',
          env: 'Arredores da capela', org: 'Com 2 servos ossudos', treasure: 'Símbolo da Fenda (foco), cota de malha +1, escudo leve, 60 po, o diário de Elaria transcrito'
        },
        abilities: [
          { name: 'Sussurro Entrópico (domínio da Fenda, à vontade)', text: 'Alvo a 9 m: −2 em todos os testes por 1 rodada; Vont CD 15 nega. Ele usa isso para "convencer" os indecisos.' },
          { name: 'Toque da Fenda (1/dia)', text: 'Toque corpo a corpo: 3d6 de dano; Ref CD 15 reduz à metade. Ele guarda para o guardião, não para o grupo.' },
          { name: 'Magias preparadas', text: '0—detectar magia, ler magia, orientação, resistência, virtude. 1º—comando, curar ferimentos leves ×2, escudo da fé. 2º—silêncio, imobilizar pessoa, escuridão. 3º—animar mortos, dissipar magia, praga.' },
          { name: 'Fraqueza de fé', text: 'Se seu símbolo for quebrado (ou o silêncio for dissipado em público), perde 1 rodada e fica −2 em tudo pelo resto do combate.' },
          { name: 'Servos ossudos (2)', text: 'Esqueletos Médios: DV 1d12 (6 PV); CA 13; mordida/garra +1 (1d4+1); RD 5/contundente; imunidades de morto-vivo. ND 1/3 cada.' }
        ],
        tactics: 'Abre com silêncio nos conjuradores, depois escuridão para separar o grupo. Fala durante o combate, oferecendo "salvação" à iniciante. Não recua: é sua hora sagrada. Se o guardião aparecer, tenta comandá-lo e falha — cena importante.',
        adjustments: [
          { when: 'Grupo sem conjurador', do: 'Troque silêncio por bênção e escuridão por auxílio.' },
          { when: 'Sessão de 4h', do: 'Use-o no lugar do encontro da cripta, não junto com o guardião.' },
          { when: 'Quer um vilão recorrente', do: 'Dê a ele uma poção de invisibilidade e deixe-o fugir com o diário transcrito.' }
        ]
      },
      {
        id: 'guardias', name: 'Guardiãs de Pedra', tag: 'CONSTRUCTO', nd: '2 cada', type: 'Constructo Pequeno',
        intro: 'Duas sentinelas da cripta. Não perseguem: bloqueiam. Podem ser desligadas com o painel de símbolos.',
        stat: {
          dv: '3d10+10 (26 PV)', init: '+0', speed: '6 m', ca: '16 (toque 11, desprevenido 16)',
          bba: '+2', atk: 'Pancada +4 (1d6+2)', fullAtk: 'Pancada +4 (1d6+2)',
          space: '1,5 m / 1,5 m', sa: 'RD 3/—, visão no escuro 18 m, imunidades de constructo',
          saves: 'Fort +1, Ref +1, Vont +1',
          abilities: { 'For': 14, 'Des': 10, 'Con': '—', 'Int': '—', 'Sab': 10, 'Car': 1 },
          env: 'Cripta', org: 'Par (ou uma, se o grupo estiver sem recursos)', treasure: 'Fragmentos de pedra encantada (15 po cada)'
        },
        abilities: [
          { name: 'Bloqueio', text: 'Tenta bloquear a passagem e empurrar intrusos para longe do mecanismo. Não persegue além da cripta.' },
          { name: 'Desligar', text: 'Ação de rodada completa + Conhecimento (arcano) CD 15 (ou uso correto das inscrições) desliga uma guardiã.' }
        ],
        tactics: 'Formam parede na frente do mecanismo. Atacam quem tenta passar, ignoram quem recua. Se uma cair, a outra recua um passo e continua bloqueando.',
        adjustments: [
          { when: 'Grupo sem recursos', do: 'Use apenas uma guardiã.' },
          { when: 'Grupo muito forte', do: 'Acrescente uma terceira, mas sem aumentar o dano.' },
          { when: 'Quer ensinar o puzzle', do: 'Deixe uma delas com o painel de símbolos acessível nas costas.' }
        ]
      },
      {
        id: 'lobos', name: 'Lobos Sombrios', tag: 'FERA', nd: '2 cada', type: 'Animal Médio',
        intro: 'Encontro opcional da floresta. Servem para dar ritmo e gastar recursos antes da capela.',
        stat: {
          dv: '2d8+4 (13 PV)', init: '+2', speed: '12 m', ca: '14 (toque 12, desprevenido 12)',
          bba: '+1', atk: 'Mordida +3 (1d6+2)', fullAtk: 'Mordida +3 (1d6+2)',
          space: '1,5 m / 1,5 m', sa: 'Queda (trip) no acerto, faro, visão na penumbra',
          saves: 'Fort +5, Ref +5, Vont +1',
          abilities: { 'For': 14, 'Des': 15, 'Con': 15, 'Int': 2, 'Sab': 12, 'Car': 6 },
          skills: 'Furtividade +4, Observar +5, Ouvir +5',
          env: 'Floresta', org: 'Matilha (2)', treasure: 'Nenhum'
        },
        abilities: [
          { name: 'Cercar', text: 'Rosnam, cercam e tentam afastar intrusos. Não perseguem personagens caídos.' },
          { name: 'Recuar', text: 'Se ficar abaixo de 5 PV ou perder um aliado, recua.' }
        ],
        tactics: 'Dois lobos: um chama atenção, o outro contorna. Atacam o último da fila, nunca a iniciante isolada — a menos que ela se separe do grupo.',
        adjustments: [
          { when: 'Grupo cansado ou sem cura', do: 'Use apenas 1 lobo, ou corte o encontro.' },
          { when: 'Tempo curto', do: 'Corte inteiro: a aventura não depende dele.' }
        ]
      },
      {
        id: 'verme', name: 'Verme da Umidade', tag: 'ABERRAÇÃO (opcional)', nd: '3', type: 'Aberração Grande',
        intro: 'Mora no dreno lateral do corredor alagado. Entra em cena quando a válvula 2 é aberta — ou para dar pressão ao puzzle F.',
        stat: {
          dv: '5d8+10 (32 PV)', init: '+1', speed: '6 m, escalada 6 m', ca: '15 (toque 10, desprevenido 14)',
          bba: '+3', atk: 'Mordida +6 (1d8+3 mais 1d6 ácido)', fullAtk: 'Mordida +6 (1d8+3 mais 1d6 ácido)',
          space: '3 m / 3 m', sa: 'Cuspe ácido, visão no escuro 18 m',
          saves: 'Fort +6, Ref +2, Vont +4',
          abilities: { 'For': 16, 'Des': 12, 'Con': 14, 'Int': 3, 'Sab': 11, 'Car': 5 },
          skills: 'Furtividade +8 (em pedra molhada), Escalar +11',
          env: 'Corredor alagado', org: 'Solitário', treasure: 'Nenhum'
        },
        abilities: [
          { name: 'Cuspe ácido (1/2 rodadas)', text: 'Ataque de toque à distância +4, alcance 6 m: 1d6 de dano de ácido.' },
          { name: 'Disfarce de pedra', text: 'Parado na água, parece uma pedra molhada (Observar CD 18 para notar antes de ser atacado).' }
        ],
        tactics: 'Ataca quem está mais perto da água, tenta agarrar (não tem agarrar melhorado: use Força oposta) e arrastar para o dreno. Recua se sofrer dano de fogo.',
        adjustments: [
          { when: 'Puzzle já está tenso', do: 'Deixe-o apenas como ameaça: um som, uma ondulação, nada mais.' },
          { when: 'Grupo quer combate', do: 'Deixe-o agarrar e arrastar — objetivo é resgate, não dano.' }
        ]
      },
      {
        id: 'sombra', name: 'A Sombra sob a Capela', tag: 'ENTIDADE', nd: '—', type: 'Colossal (não combatível)',
        intro: 'Não é um combate desta sessão. Ela existe para sustentar o mistério e os finais. Não entregue ficha aos jogadores: descreva sinais.',
        stat: {
          dv: '— (não combatível nesta aventura)', init: '—', speed: '—', ca: '—',
          bba: '—', atk: 'Ataques comuns não a ferem', fullAtk: '—',
          space: 'Colossal', sa: 'Presença: tremores, escombros, vento que puxa para baixo',
          saves: '—',
          abilities: { 'For': '—', 'Des': '—', 'Con': '—', 'Int': '?', 'Sab': '?', 'Car': '?' },
          env: 'Sob a capela', org: 'Única', treasure: '—'
        },
        abilities: [
          { name: 'Não é um monstro de iniciativa', text: 'O objetivo dos personagens é fugir, selar ou sobreviver — nunca vencer em combate.' },
          { name: 'Sinais, não ficha', text: 'Rachaduras que se movem, vento que puxa para baixo, uma sombra além da abertura, um som profundo. Uma única mão colossal é o máximo de imagem que você deve mostrar.' },
          { name: 'Se escapar (Final B)', text: 'Descreva a consequência em imagens, não em regras: a torre se inclina, a luz muda, a vila começa a se esvaziar.' }
        ],
        tactics: 'Se precisar de referência para uma aparição breve: qualquer ataque de área causa 2d6 de dano por desabamento, e o teste é Reflexos CD 15. Nada mais.',
        adjustments: [
          { when: 'Jogadores insistem em atacar', do: 'Descreva o ataque atravessando fumaça e a mão fechando acima deles. Corte para a fuga.' },
          { when: 'Quer continuar a campanha', do: 'Use o Final "Selo incompleto" como gancho.' }
        ]
      },
      {
        id: 'caes', name: 'Cães de Darsen', tag: 'CAPANGA', nd: '2 cada', type: 'Humano Guerreiro 2',
        intro: 'Dois mercenários contratados por Oren. Cobram por dia, não por lealdade.',
        stat: {
          dv: '2d10+4 (15 PV)', init: '+1', speed: '6 m', ca: '16 (toque 11, desprevenido 15)',
          bba: '+2', atk: 'Espada longa +5 (1d8+2, 19–20)', fullAtk: 'Espada longa +5 (1d8+2)',
          space: '1,5 m / 1,5 m', sa: '—',
          saves: 'Fort +5, Ref +1, Vont +1',
          abilities: { 'For': 15, 'Des': 12, 'Con': 14, 'Int': 9, 'Sab': 10, 'Car': 8 },
          skills: 'Intimidar +3, Observar +4, Escalar +3',
          feats: 'Foco em Arma (espada longa), Ataque Poderoso',
          env: 'Estrada / capela', org: 'Par', treasure: 'Cota de escamas, escudo pesado, 12 po cada'
        },
        abilities: [
          { name: 'Contrato', text: 'Lutam enquanto o pagamento durar. Se Oren cair, 50% de chance de recuarem (role ou decida pelo ritmo).' }
        ],
        tactics: 'Formam linha na frente de Oren, tentam derrubar (trip) e cobrir a fuga dele. Nunca perseguem para dentro da capela.',
        adjustments: [
          { when: 'Grupo pequeno', do: 'Use apenas um cão.' },
          { when: 'Grupo forte', do: 'Dê-lhes escudo torre e cobertura — não mais PV.' }
        ]
      }
    ],

    /* ---------------------------------------------------
       9. FINAIS
       --------------------------------------------------- */
    endings: [
      {
        id: 'A', title: 'O sino retorna', text: 'Os personagens recuperam o sino e usam o livro para restaurar o mecanismo. O guardião volta a proteger a capela. A entidade permanece presa. A vila celebra, sem compreender completamente o que foi evitado.',
        image: 'O sino toca uma vez, limpo e profundo. Sob a capela, uma sombra se recolhe para a escuridão.'
      },
      {
        id: 'B', title: 'O guardião é destruído', text: 'A morte do guardião rompe a defesa externa. A prisão se abre. A entidade maior começa a emergir. Não transforme isso em punição arbitrária: mostre que os personagens tomaram uma decisão coerente com as informações que possuíam, mas que as pistas ignoradas tinham alertado para o risco.',
        image: 'A torre se inclina. Uma mão colossal surge da abertura, e o sino ausente parece tocar em algum lugar muito abaixo.'
      },
      {
        id: 'C', title: 'A vila se volta contra o guardião', text: 'Os personagens não recuperam o sino nem derrotam o guardião. Os moradores, assustados, formam uma milícia. O guardião se mantém na capela e a entidade continua despertando. A sessão termina com a vila prestes a atacar seu próprio protetor.',
        image: 'Tochas avançam pela estrada. O guardião ergue os braços para impedir a entrada. Sob os pés de todos, a terra pulsa uma vez.'
      },
      {
        id: 'D', title: 'Selo incompleto (alternativo)', text: 'Se os jogadores recuperarem o sino, mas não resolverem o mecanismo, o guardião pode ajudar a ganhar tempo. A prisão não se rompe imediatamente, mas a vila precisará continuar a aventura para concluir a restauração. É um encerramento com esperança e gancho.',
        image: 'O sino está de volta ao suporte, torto, e ainda assim canta uma vez. O guardião se ajoelha — e continua ajoelhado, esperando.'
      }
    ],

    /* ---------------------------------------------------
       10. GUIA RÁPIDO
       --------------------------------------------------- */
    quickGuide: {
      before: [
        'Leia a verdade da campanha e escolha quais pistas cada NPC entrega.',
        'Tenha o livro de Elaria impresso ou aberto para consultar.',
        'Decida se o combate opcional da floresta vai acontecer.',
        'Explique à jogadora iniciante que ela pode perguntar e descrever ações sem dominar as regras.',
        'Deixe os três finais visíveis apenas para você.'
      ],
      during: [
        'Dê uma pista quando a mesa ficar travada.',
        'Não esconda informação essencial atrás de uma única rolagem.',
        'Alterne investigação, conversa, exploração e combate.',
        'Mostre que o guardião reage a palavras e ações ligadas ao sino.',
        'Se a sessão passar de 4h30, encurte deslocamentos e elimine encontros opcionais.'
      ],
      rewards: [
        '300 po de recompensa coletiva da prefeita.',
        '1 poção de curar ferimentos leves para o grupo, encontrada na biblioteca ou na capela.',
        'Um símbolo de Elaria que pode funcionar como prova de confiança do guardião.',
        'Reconhecimento da vila e hospedagem gratuita.'
      ],
      sentence: 'O guardião ataca porque o sino foi roubado; o sino mantém a prisão estável; matar o guardião antes de restaurar o selo pode libertar a entidade maior.'
    },

    /* ---------------------------------------------------
       HANDOUTS (para os jogadores)
       --------------------------------------------------- */
    handouts: [
      {
        id: 'h-catalogo', title: 'Nota de Elaria no catálogo', kind: 'Biblioteca',
        body: '“Procure o relato que veio antes da vila, mas depois da primeira fuga.\n\nO que foge primeiro não escreve primeiro. Quem chega depois é que conta a história — e mente um pouco.”\n\n— E.'
      },
      {
        id: 'h-inscricao-porta', title: 'Inscrição na porta de pedra', kind: 'Cripta',
        body: '“PRIMEIRO O JURAMENTO,\nDEPOIS A PROTEÇÃO,\nPOR FIM O VÍNCULO.\n\nCada palavra uma vez. Cada pedra, um dono.”'
      },
      {
        id: 'h-inscricao-torre', title: 'Inscrição no anel da torre', kind: 'Torre',
        body: '“DEVOLVA O QUE FOI TOMADO.\nMANTENHA O QUE FOI PROMETIDO.\nNÃO DESPERTE O QUE FOI SELADO.”\n\nTrês correntes. Nenhuma delas perdoa pressa.'
      },
      {
        id: 'h-edric', title: 'Fragmento do diário de Sir Edric', kind: 'Documento',
        body: '“Terceiro dia. Achamos a pedra quadrada no bosque e o buraco que respira.\n\nJuramos ali, os nove, sobre a espada e o escudo. O lema da ordem, aquele que meu pai repetia sem entender:\n\n— primeiro o juramento, depois a proteção, por fim o vínculo.\n\nTrês irmãos fugiram na primeira noite. Não escrevo seus nomes aqui. Que a pedra escreva.”'
      },
      {
        id: 'h-mural', title: 'O mural dos quatro mantos', kind: 'Cripta',
        body: 'Quatro figuras ajoelhadas, pintadas em ocre e cinza.\n\n1. Manto de barro (escuro)\n2. Manto de sangue seco\n3. Manto de folha\n4. Manto de cal (claro)\n\nTodas seguram um sino pequeno. Nenhuma tem rosto.'
      },
      {
        id: 'h-placa', title: 'A placa dos nove nomes', kind: 'Cripta',
        body: 'Nove nomes gravados na laje. Três foram raspados até virar cicatriz na pedra.\n\nPlaquetas soltas no chão:\n· VELL, ALDRIC\n· MARROW, SENA\n· TORV, HALDEN\n\nNo estandarte do salão, nove estrelas — três apagadas.'
      },
      {
        id: 'h-valvulas', title: 'Marcas nas válvulas', kind: 'Subsolo',
        body: 'Três válvulas de bronze, gastas por mãos antigas.\n\nI — leva à cisterna (seta apontando para cima)\nII — leva ao dreno (seta apontando para baixo)\nIII — sem seta, só uma gota gravada\n\nAo lado, uma alavanca sem marcação e um lampião rachado.'
      },
      {
        id: 'h-livro-final', title: 'Página final do livro de Elaria', kind: 'Livro',
        body: '“A capela é a âncora. O sino é o pulso. O vigia é a última dobradiça.\n\nSe o sino for tomado, o vigia enlouquece — mas continua vigiando, porque é isso que ele é.\n\nNão o destruam. Um guarda morto é uma porta aberta.\n\nSe eu não estiver mais aqui: falem com ele. Ele lembra do meu nome.”\n\n— Elaria, da casa da pedra quadrada'
      },
      {
        id: 'h-cantiga', title: 'A cantiga de Edda', kind: 'Vila',
        body: '“Pedra quadrada, buraco fundo,\nsete cavaleiros voltaram do mundo.\n\nUma mulher branca, de mão de gelo,\nfez um vigia de pedra e de zelo.\n\nSino de bronze, sino de prata,\nquem leva o sino leva a chave da mata.\n\nNove juraram, três fugiram,\nseis ficaram — e nunca dormiram.”'
      },
      {
        id: 'h-recibo', title: 'Recibo do leilão de Darsen', kind: 'Documento',
        body: 'CASA DE LEILÕES VANTIEL & FILHOS — DARSEN\n\nRecibo nº 44 — Lote: “sino de bronze, inscrições, origem rural”\nComprador: O. Vantiel\nValor: 180 po\nObservação do avaliador: “Objeto ressoa sem ser tocado. Verificar procedência.”\n\nAssinado: A. Vantiel, avaliador'
      }
    ],

    /* ---------------------------------------------------
       Regras rápidas para os jogadores
       --------------------------------------------------- */
    /* ---------------------------------------------------
       RELÓGIO DO SELO — medidor de tensão
       --------------------------------------------------- */
    seal: {
      intro: 'A prisão cede em etapas. Use como relógio de tensão: avance um passo quando o grupo errar um puzzle, demorar demais, fizer barulho na cripta ou gastar muito tempo na vila. Nunca avance por punição — avance para lembrar que o mundo anda.',
      stages: [
        { level: 0, title: 'Selo íntegro', text: 'Nada acontece. A capela range como qualquer prédio velho.', hint: 'Estado inicial da sessão.' },
        { level: 1, title: 'Rachaduras finas', text: 'Poeira cai do teto em fios. Os cães da vila param de latir para a torre.', hint: 'Primeiro erro de puzzle ou primeira cena na capela.' },
        { level: 2, title: 'Ar frio', text: 'O ar fica frio perto do altar mesmo de dia. As velas queimam azul.', hint: 'Depois do primeiro combate na cripta.' },
        { level: 3, title: 'O vigia acorda', text: 'O guardião passa a atacar à vista. Não negocia mais de longe: espera na porta.', hint: 'Quando o grupo ignorar duas pistas seguidas.' },
        { level: 4, title: 'Sonhos na vila', text: 'Aldeões acordam dizendo que ouviram o próprio nome vindo do chão. Um deles some.', hint: 'Depois do puzzle da água ou de abrir a cripta.' },
        { level: 5, title: 'A pedra cede', text: 'Abalo de dez segundos. A porta dos juramentos range sozinha. Todos os testes na capela têm −1.', hint: 'Quando a mesa demorar mais de 30 min na decisão final.' },
        { level: 6, title: 'A prisão abre', text: 'Vá para o Final B ou C. Descreva a torre inclinando e não mostre a criatura inteira.', hint: 'Fim de linha: pague o que foi prometido.' }
      ]
    },

    /* ---------------------------------------------------
       IMPROVISO — tabelas e cenas prontas
       --------------------------------------------------- */
    tables: [
      {
        id: 'rumores', title: 'Rumores na vila', die: 12,
        note: 'Entregue como conversa de taverna. Cada rumor é meia-verdade.',
        rows: [
          'O guardião desceu até o curral do velho Ossian e ficou uma hora parado, olhando as ovelhas.',
          'Dizem que o sino foi vendido. Dizem também que quem vendeu não era ladrão de verdade, só um homem com dívidas.',
          'A água do poço ficou fria. Fria de doer os dentes.',
          'A prefeita já mandou outro grupo antes. Ninguém fala neles.',
          'Passa um caixeiro todo mês comprando “coisas antigas”. Paga bem demais por coisa sem valor.',
          'Meu avô dizia que a capela não é uma capela. É uma tampa.',
          'Desde a noite do roubo, os cães não latem mais para a torre. Só abaixam a cabeça.',
          'As rachaduras do chão da capela estão maiores. Eu medi com a mão.',
          'A biblioteca do sul tem um livro que fala da fundação. O irmão Tovan não empresta nem para rezar.',
          'Sir Edric carrega um diário do bisavô no bolso. É a única coisa que ele tem.',
          'Tem leilão de coisa estranha em Darsen. Meu cunhado viu um sino de bronze na lista.',
          'Se o guardião quer alguma coisa, por que não pede? Ele fala, sabia? Fala baixinho.'
        ]
      },
      {
        id: 'floresta', title: 'Na Floresta Antiga', die: 10,
        note: 'Use nos deslocamentos. Metade é sabor, metade é pressão.',
        rows: [
          'Pegadas fundas demais para cães comuns atravessam a trilha e somem entre raízes.',
          'Um veado morto, sem sinal de luta, com o pescoço virado para a capela.',
          'Um caçador da vila, perdido, que passa a seguir o grupo por medo de voltar sozinho.',
          'Dois lobos sombrios cercam o grupo (encontro opcional — use um se a mesa estiver cansada).',
          'Uma árvore marcada com o símbolo do construtor arcano, meio tomada pelo musgo.',
          'Chuva de repente: a trilha vira lama. Terreno difícil por uma cena.',
          'Duas crianças colhendo cogumelo, longe demais de casa. Elas sabem o caminho da capela “pelo atalho”.',
          'Um tronco oco com um alforje velho: metade de um mapa das galerias subterrâneas.',
          'Silêncio total — nenhum pássaro. Ouvir CD 10 revela um zumbido grave sob o chão.',
          'Uma pilha de pedras com nove marcas. Alguém contou os cavaleiros, e alguém contou de novo depois.'
        ]
      },
      {
        id: 'guardiao', title: 'O que o guardião faz quando é observado', die: 8,
        note: 'Nunca ataque sem telegrafar. Estas ações substituem iniciativa quando a cena é tensão.',
        rows: [
          'Fica imóvel entre o grupo e a torre, sem se virar.',
          'Repete “A vigília continua” e não se move um dedo.',
          'A luz do peito pulsa mais rápido quando o sino é mencionado.',
          'Ergue a mão devagar e aponta para o suporte vazio.',
          'Dá um passo na direção de quem estiver mais perto da torre — e só um passo.',
          'Ajoelha-se, uma única vez, se ouvir “Elaria”.',
          'Vira a cabeça para o chão, como quem escuta algo abaixo. Fica assim por uma rodada inteira.',
          'Ignora completamente quem está caído, mesmo a um palmo de distância.'
        ]
      },
      {
        id: 'capela', title: 'Sons, cheiros e detalhes da capela', die: 10,
        note: 'Um detalhe por sala. É isso que faz o lugar parecer vivo.',
        rows: [
          'Cheiro de cera velha e pedra fria.',
          'Um fio de vento que sobe do chão perto do altar e apaga velas.',
          'Penas de corvo no banco da terceira fila, arrumadas em círculo.',
          'O eco responde meio segundo atrasado. Sempre.',
          'Marcas de arrasto que atravessam o pó e terminam na porta de pedra.',
          'Um banco com nove nomes entalhados — três deles riscados com faca.',
          'O suporte do sino balança sozinho ao meio-dia.',
          'Rachaduras com pó branco nas bordas. Sal. Alguém já tentou selar por fora.',
          'Um sino pequeno de bronze, rachado, esquecido atrás do altar.',
          'Flores frescas no altar. Ninguém em Valebruma admite ter trazido.'
        ]
      },
      {
        id: 'bolsos', title: 'O que há nos bolsos dos aldeões', die: 8,
        note: 'Sabor, pistas acidentais e um ou outro item útil.',
        rows: [
          'Um cordão com três dentes de animal. O dono diz que “afasta o que anda embaixo”.',
          'Uma moeda estrangeira de Darsen, com o brasão da casa de leilões.',
          'Um pedaço de giz amarelo. Alguém marcou portas na vila.',
          'Uma chave pequena, sem fechadura conhecida. Serve na cripta, se o grupo descobrir onde.',
          'Um bilhete com um nome de mulher e um número de dias.',
          'Um dente de leite embrulhado em pano, guardado “para dar sorte”.',
          'Uma conta de taverna não paga, de 7 po. O aldeão oferece em troca de silêncio.',
          'Um pedaço de bronze com inscrição — metade de uma palavra. A outra metade está na capela.'
        ]
      }
    ],

    names: {
      first: ['Ossian', 'Berta', 'Halden', 'Nesse', 'Tobias', 'Mira', 'Corvo', 'Sena', 'Aldric', 'Vale', 'Ilsa', 'Dorn', 'Perrin', 'Ada', 'Roque', 'Yara'],
      last: ['Vell', 'Voss', 'Tovan', 'Marrow', 'Torv', 'Cerdan', 'Bruma', 'Sal', 'Cinza', 'Ferrant'],
      trait: ['fala baixo e olha o chão', 'ri antes de responder', 'cheira a cebola e fumo', 'tem as mãos sujas de tinta', 'nunca tira o gorro', 'conta tudo em ordem inversa', 'gagueja quando mente', 'carrega uma faca de pão como se fosse arma']
    },

    scenes: [
      {
        id: 'sc-contrato', title: 'Abertura — o contrato', when: '00:00, na praça',
        text: '“A prefeita põe três sacos de moedas em cima da mesa e não tira a mão de cima deles.\n\n— Não quero que matem nada. Quero que a capela continue de pé.\n\nEla olha pela janela, na direção da torre, e acrescenta, mais baixo: — Se der para não conversar com ele, melhor. Se der para conversar, pior ainda.”'
      },
      {
        id: 'sc-noite', title: 'A primeira noite na vila', when: 'Depois do primeiro dia',
        text: '“Valebruma dorme cedo e dorme junto. As janelas fecham uma depois da outra, como olhos.\n\nQuando a última luz se apaga, o sino da capela — que não existe mais — balança uma vez. Ninguém na rua comenta. Todos ouviram.”'
      },
      {
        id: 'sc-torre', title: 'A torre vazia', when: 'Ao subir a torre',
        text: '“O suporte está vazio e limpo. Limpo demais: a poeira em volta desenha o contorno de um sino que não está ali.\n\nA corda de badalo ainda balança, devagar, como se alguém tivesse acabado de soltá-la.”'
      },
      {
        id: 'sc-guardiao', title: 'O guardião aparece', when: 'Primeiro contato',
        text: '“A estátua se move antes de vocês decidirem se ela estava se movendo.\n\nTrês metros de pedra, e a luz no peito bate como um coração cansado. Ela não ergue os braços. Só diz, com uma voz que vem do chão:\n\n— A vigília continua. A vigília não termina.”'
      },
      {
        id: 'sc-porta', title: 'A porta dos juramentos se abre', when: 'Puzzle B resolvido',
        text: '“A última pedra afunda com um suspiro.\n\nA porta não range: ela desliza, como se estivesse aliviada. Do outro lado, uma escada desce para o escuro, e o ar que sobe tem gosto de moeda velha.”'
      },
      {
        id: 'sc-abertura', title: 'O que sobe da abertura', when: 'Primeira vez na entrada subterrânea',
        text: '“O ar que sobe é frio e cheira a pedra molhada.\n\nMuito abaixo, algo enorme se move uma única vez. Não é um rugido. É uma montanha mudando de posição — e depois um silêncio que parece esperar resposta.”'
      },
      {
        id: 'sc-final', title: 'Se o sino voltar', when: 'Final A',
        text: '“O sino toca uma vez. Limpo, profundo, sem eco.\n\nOs moradores param na rua, surpresos, como quem ouve o próprio nome num lugar onde não deveria. Sob a capela, uma sombra se recolhe para a escuridão. Ninguém viu nada. Todos dormem melhor.”'
      }
    ],

    rules: [
      { title: 'Como jogar', text: 'Descreva o que você tenta fazer. O mestre pede uma rolagem quando o resultado é incerto e interessante: d20 + modificador da perícia contra uma CD.' },
      { title: 'CDs comuns', text: 'Fácil 10 · Médio 15 · Difícil 20 · Muito difícil 25. Se você tem tempo e não há risco, o mestre pode simplesmente dizer que funciona.' },
      { title: 'Vantagem na ficção', text: 'Descrever bem, usar uma ferramenta, ajudar um companheiro ou ter uma pista na mão dá bônus (+2) ou reduz a CD. Isso vale mais que sorte nos dados.' },
      { title: 'Ajudar outro personagem', text: 'Você pode usar sua ação para ajudar: o aliado ganha +2 no teste. Duas pessoas segurando uma corrente valem mais que uma.' },
      { title: 'O que sua ficha tem', text: 'PV (vida), CA (dificuldade de ser acertado), iniciativa (ordem no combate), perícias (o que você sabe fazer) e ideias (o que você já descobriu).' },
      { title: 'Regra de ouro da mesa', text: 'Pergunte o que você percebe, diga o que tenta fazer, role quando pedirem. Não precisa saber todas as regras para jogar bem.' }
    ]
  };
})();
