# ConcurSim
 
# 1. Identificação do Projeto 
- Nome do Projeto: ConcurSim
- Autor: Kellen E. Steindorff Jhanke
- Orientador: Dieison Soares Silveira 
- Data Aprovação: ___

# 2. Introdução e Visão Geral 

O ConcurSim é um aplicativo mobile voltado para candidatos a concursos públicos que desejam praticar por meio de simulados de questões objetivas.

O projeto nasce da dificuldade recorrente de candidatos em:

- organizar os estudos de forma contínua;
- localizar questões relacionadas às matérias cobradas em editais;
- acompanhar a evolução do desempenho ao longo do tempo.

O MVP concentra-se em oferecer uma experiência simples para gerar simulados por matéria, responder questões e visualizar o desempenho agregado por matéria e histórico de simulados.

# 3. Objetivos do Projeto

## Objetivo Geral

Disponibilizar um aplicativo Android que auxilie candidatos a concursos públicos a praticarem questões por meio de simulados por matéria, com registro e visualização de desempenho.

## Objetivos Específicos (MVP)

- Permitir cadastro e autenticação de usuários utilizando e-mail e senha, integrando com Firebase Authentication.
- Armazenar dados básicos do usuário (uid, e-mail, nome) na coleção `users` do Cloud Firestore.
- Listar matérias disponíveis a partir da coleção `materias` do Firestore, carregadas dinamicamente.
- Permitir a geração de simulados por matéria, utilizando as questões cadastradas na coleção `questoes`.
- Permitir que o usuário responda às questões do simulado (uma por vez, com navegação anterior/próxima).
- Calcular acertos e nota do simulado, armazenando o resultado na coleção `simulados`.
- Exibir, na aba “Progresso”, o desempenho agregado por matéria (quantidade de simulados, média de notas, taxa de acertos) e uma lista dos últimos simulados realizados.
- Manter uma interface simples e intuitiva, permitindo o uso mesmo por usuários com pouca experiência técnica.

# 4. Escopo do Projeto

## 4.1 Entregáveis

- Aplicativo mobile (MVP) capaz de:
  - realizar cadastro, login e logout de usuários;
  - listar matérias cadastradas no Firestore;
  - gerar simulados por matéria;
  - registrar e armazenar resultados de simulados;
  - apresentar o progresso do usuário por matéria e últimos simulados.
- Script de seed para popular as coleções `materias` e `questoes` no Firestore (arquivo `seedFirestore.js`, utilizado apenas em desenvolvimento).
- Documentação técnica do software (arquitetura, modelagem de dados, diagramas e instruções básicas de instalação/execução).

## 4.2 Requisitos Funcionais (implementados no MVP)

- **RF001 – Cadastro de usuário**  
  O sistema deve permitir que o usuário se cadastre utilizando e-mail, senha e nome, integrando com Firebase Authentication e registrando os dados na coleção `users`.

- **RF002 – Autenticação e sessão**  
  O sistema deve permitir que o usuário faça login com e-mail e senha, mantenha a sessão ativa enquanto autenticado e realize logout quando desejar.

- **RF003 – Listagem de matérias**  
  O sistema deve listar as matérias disponíveis para simulado a partir da coleção `materias` do Firestore, exibindo apenas matérias ativas, em ordem alfabética.

- **RF004 – Geração de simulado por matéria**  
  O sistema deve permitir que o usuário gere um simulado ao selecionar uma matéria na aba “Explorar”, carregando todas as questões disponíveis daquela matéria na coleção `questoes`.

- **RF005 – Resolução de simulado**  
  O sistema deve exibir as questões do simulado uma por vez, permitindo ao usuário selecionar uma alternativa e navegar entre “Anterior” e “Próxima” até o fim do simulado.

- **RF006 – Validação e finalização de simulado**  
  O sistema deve impedir a finalização do simulado caso existam questões sem resposta e, ao finalizar, calcular a quantidade de acertos e a nota em escala de 0 a 10.

- **RF007 – Armazenamento do resultado do simulado**  
  O sistema deve armazenar, na coleção `simulados`, para cada simulado realizado:
  - `userId`,
  - `materiaId`, `materiaNome`,
  - `totalQuestoes`,
  - `acertos`,
  - `score`,
  - `createdAt`, `completedAt`,
  - array de `respostas` contendo:
    - `questaoId`,
    - `respostaUsuarioIndex`,
    - `respostaUsuarioTexto`,
    - `gabarito`,
    - `correta`.

- **RF008 – Visualização de progresso por matéria**  
  O sistema deve apresentar, na aba “Progresso”, um resumo do desempenho por matéria, contendo:
  - quantidade de simulados realizados por matéria;
  - média de notas por matéria;
  - taxa de acertos (percentual) por matéria.

- **RF009 – Histórico de últimos simulados**  
  O sistema deve exibir, na aba “Progresso”, uma lista dos últimos simulados realizados pelo usuário (até um limite configurado no código), com:
  - matéria,
  - nota,
  - acertos/total de questões,
  - data e hora de conclusão formatadas.

- **RF010 – Tratamento de estados especiais**  
  O sistema deve:
  - exibir mensagem apropriada quando o usuário não estiver logado e tentar acessar o progresso;
  - exibir mensagem/componentes específicos quando o usuário ainda não tiver simulados concluídos (ex. `SemSimulado`).

## 4.3 Requisitos Não Funcionais (MVP)

- **RNF001 – Plataforma**  
  O sistema deve ser executado em dispositivos Android compatíveis com aplicações desenvolvidas em React Native utilizando Expo.

- **RNF002 – Persistência de dados**  
  Todos os dados permanentes do sistema (usuários, matérias, questões, simulados) devem ser armazenados no Firebase (Authentication + Cloud Firestore).

- **RNF003 – Desempenho percebido**  
  As operações de carregamento de matérias, questões, simulados e progresso devem ocorrer em tempo considerado aceitável pelo usuário final, sem travamentos aparentes na interface, embora não exista, nesta fase, uma meta numérica formal de tempo máximo de resposta.

- **RNF004 – Interface e usabilidade**  
  A interface deve ser legível e utilizável em diferentes tamanhos de tela de dispositivos Android, utilizando componentes responsivos do React Native e navegação por abas (Expo Router).

## 4.4 Exclusões de Escopo (funcionalidades não contempladas no MVP)

### Exclusões Funcionais

As funcionalidades abaixo **não** fazem parte do escopo do MVP atual, ainda que possam ser consideradas em versões futuras:

- **EF001 – Filtros avançados de simulado**  
  Filtragem de questões por banca organizadora, cargo, nível de escolaridade ou outros metadados além da matéria.

- **EF002 – Escolha de quantidade de questões**  
  Possibilidade de o usuário definir a quantidade de questões do simulado (por exemplo, 5, 10, 15).  
  No MVP, o simulado utiliza todas as questões disponíveis para a matéria selecionada.

- **EF003 – Gabarito detalhado após cada questão**  
  Exibição da resposta correta imediatamente após cada questão ou tela específica de revisão.

- **EF004 – Estatísticas avançadas por questão**  
  Telas específicas para visualização de desempenho por questão individual (além das estatísticas agregadas por matéria e lista de últimos simulados).

- **EF005 – Notificações automáticas e revisão guiada**  
  Envio de notificações (push) para lembrar o usuário de revisar conteúdos com baixo desempenho, ou implementações de curva de esquecimento/revisão espaçada.

- **EF006 – Outras plataformas**  
  Versão Web e iOS.

### Exclusões Não Funcionais

- **ENF001 – Meta formal de tempo máximo de resposta**  
  Não há, neste MVP, uma exigência quantitativa de tempo máximo para geração de simulados ou carregamento de dados; o foco é garantir uma experiência fluida para o usuário, dentro das limitações do ambiente de desenvolvimento.

- **ENF002 – Criptografia adicional de dados no app**  
  Não há implementação de criptografia customizada no lado do aplicativo; o MVP utiliza apenas os mecanismos de segurança padrão de comunicação segura (HTTPS/TLS) fornecidos pelo Firebase e pela plataforma.

- **ENF003 – Garantia formal de alta disponibilidade**  
  Não há garantia formal de disponibilidade contínua do sistema; a disponibilidade depende dos serviços de backend utilizados (Firebase) e do ambiente de execução do aplicativo.

# 5. Recursos Necessários

- **Pessoas:**
  - 1 Desenvolvedor responsável pela implementação do aplicativo e integração com Firebase.
  - 1 Orientador responsável pelo acompanhamento técnico e metodológico do projeto.

- **Tecnologia e Ferramentas:**
  - Ambiente de desenvolvimento com Node.js, npm ou yarn.
  - Expo / React Native para desenvolvimento mobile.
  - Conta no Firebase (Authentication + Cloud Firestore).
  - Editor de código (Visual Studio Code).
  - Git e GitHub para controle de versão do código-fonte.
