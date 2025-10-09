# ConcurSim
 
# 1. Identificação do Projeto 
- Nome do Projeto: ConcurSim
- Autor: Kellen E. Steindorff Jhanke
- Orientador: Dieison Soares Silveira 
- Data Aprovação: 

# 2. Introdução e Visão Geral 
O projeto nasce da dificuldade recorrente de candidatos em organizar estudos, localizar questões por banca/assunto e acompanhar a evolução do desempenho. 

# 3. Objetivos do Projeto
- Disponibilizar um app Android simples e estável para montar e realizar simulados personalizados por filtros de questões (banca organizadora, nível de               escolaridade do cargo).
- Registrar e apresentar desempenho (acertos/erros e histórico básico)
- Possibilitar uso intuitivo, mesmo para usuários com pouca experiência técnica.
 
# 4. Escopo do Projeto

## Entregáveis:
- Software de geração de simulado, que permite a resolução de questões, apresenta a resposta correta de cada uma e registra o histórico de resoluções
- Documentação técnica do software.
 
## Requisitos:
- **Funcionais:**
  - RF001: Permitir que o usuário selecione os seguintes filtros para gerar os simulados: banca organizadora, nível de escolaridade do cargo e matéria (legislação,     informática)
  - RF002: Criação de simulados personalizados com base em filtros e quantidade de questões definidas pelo usuário
  - RF003: O usuário deve responder às questões através do simulado gerado
  - RF004: Exibir a resposta correta após a resolução de cada questão
  - RF005: Armazenar o histórico de simulados resolvidos pelo usuário com data, acertos e erros

- **Não Funcionais:**
  - RNF001: O sistema deve estar disponível 24 horas por dia, 7 dias por semana.
  - RNF002: O sistema deve ser responsivo, funcionar corretamente em diferentes tamanhos de tela e resoluções.

## Exclusões:
- **Requisitos Funcionais:**
  - RF001: O sistema deve permitir que usuários se cadastrem utilizando e-mail e senha.
  - RF002: O sistema deve permitir que apenas usuários autenticados possam utilizar suas funcionalidades.
  - RF003: O sistema deve permitir a busca de questões por cargo
  - RF006: O sistema deve exibir as questões uma por vez, permitindo pular e voltar.
  - RF008: O sistema deve armazenar o histórico de questões resolvidas pelo usuário com porcentagem de desempenho por matéria.
  - RF009: O sistema deve enviar notificações automáticas para revisão quando o desempenho em uma matéria for inferior a 50%.


- **Não Funcionais:**
  - RNF003: A geração do simulado não deve levar mais do que 5 segundos (após clicar no botão “gerar”).
  - RNF004: O sistema deve garantir a proteção dos dados dos usuários por meio de criptografia.
 
# 5. Recursos Necessários
- **Pessoas:**
  - Desenvolvedor (1)
  - Orientador (1)

- **Infraestrutura e Ferramentas:**
  - Banco de dados: Firebase (Firestore)
  - Front-end: React Native
  - Back-end: Node.js
  - IDE: Visual Studio Code
  - build/debug/emulador: Android Studio e SDK
  - Controle de versão : Git e GitHub

