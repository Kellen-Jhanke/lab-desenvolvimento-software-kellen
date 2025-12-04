# ConcurSim
 
# 1. Identificação do Projeto 
- **Nome do Projeto:** ConcurSim  
- **Autor:** Kellen E. Steindorff Jhanke  
- **Orientador:** Dieison Soares Silveira  
- **Data de aprovação:** ___  

# 2. Introdução e Visão Geral 

O **ConcurSim** é um aplicativo mobile voltado para candidatos a concursos públicos que desejam praticar por meio de **simulados de questões objetivas**.

O projeto nasce da dificuldade recorrente de candidatos em:

- organizar os estudos de forma contínua;
- localizar questões relacionadas às matérias cobradas em editais;
- acompanhar a evolução do desempenho ao longo do tempo.

O **MVP** concentra-se em oferecer uma experiência simples para:

- gerar simulados por matéria (ex.: Legislação, Informática);
- responder questões diretamente no app;
- registrar os resultados de cada simulado;
- visualizar o desempenho agregado por matéria e os últimos simulados realizados.

# 3. Objetivos do Projeto

## 3.1 Objetivo Geral

Disponibilizar um aplicativo Android que auxilie candidatos a concursos públicos a praticarem questões por meio de simulados por matéria, com **registro** e **visualização** do desempenho.

## 3.2 Objetivos Específicos (MVP)

- Permitir **cadastro** e **autenticação** de usuários utilizando e-mail e senha, integrando com **Firebase Authentication**.
- Armazenar dados básicos do usuário (`uid`, `email`, `name`) na coleção `users` do **Cloud Firestore**.
- Listar matérias disponíveis a partir da coleção `materias` do Firestore, carregadas dinamicamente em ordem alfabética.
- Permitir a geração de **simulados por matéria**, utilizando as questões cadastradas na coleção `questoes`.
- Permitir que o usuário responda às questões do simulado, **uma por vez**, com navegação entre **Anterior** e **Próxima**.
- Calcular **acertos** e **nota** do simulado e armazenar o resultado na coleção `simulados`.
- Exibir, na aba **“Progresso”**, o desempenho agregado por matéria (quantidade de simulados, média de notas, taxa de acertos) e uma lista dos **últimos simulados** realizados.
- Manter uma interface simples e intuitiva, permitindo o uso mesmo por usuários com pouca experiência técnica.

# 4. Escopo do Projeto
O escopo do projeto está documentado no arquivo [Escopo.md](https://github.com/Kellen-Jhanke/lab-desenvolvimento-software-kellen/blob/main/Escopo.md)

# 5. Tecnologias

As principais tecnologias utilizadas no desenvolvimento do ConcurSim são:

- **Frontend / Mobile**
  - [React Native](https://reactnative.dev/)
  - [Expo](https://expo.dev/)
  - [Expo Router](https://expo.github.io/router/) (navegação baseada em arquivos)
  - Hooks com ViewModels (`useSimuladoViewModel`, `useProgressoViewModel`)
  - Context API (`UserDetailContext`) para estado de usuário

- **Backend como serviço**
  - [Firebase Authentication](https://firebase.google.com/products/auth)
  - [Cloud Firestore](https://firebase.google.com/products/firestore)
  - [Firebase Admin SDK](https://firebase.google.com/docs/admin)  (utilizado apenas para o script de seed em ambiente local)

- **Ambiente de desenvolvimento**
  - Node.js + npm
  - Visual Studio Code
  - Git + GitHub

# 6. Pré-Requisitos

Para executar o projeto em ambiente de desenvolvimento, é necessário:

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada);
- npm (instalado junto com o Node.js) ou yarn;
- Conta no [Firebase](https://firebase.google.com/) com um projeto criado;
- Configuração do Firebase para:
  - **Authentication** (método de login por e-mail/senha);
  - **Cloud Firestore** (banco de dados em modo de produção ou teste, conforme regras definidas).
- Emulador Android ou dispositivo físico com o aplicativo **Expo Go** instalado;
- (Opcional) `expo-cli` instalado globalmente:
  ```bash
  npm install -g expo-cli


# 7. Instalação
Exemplos passo-a-passo que informam o que executar para ter um ambiente de desenvolvimento em execução.

## 7.1 Clonar o repositório
- git clone https://github.com/Kellen-Jhanke/lab-desenvolvimento-software-kellen.git
- cd lab-desenvolvimento-software-kellen/ConcurSim

## 7.2 Instalar dependências
No arquivo config/firebaseConfig.jsx, configurar o objeto firebaseConfig com as credenciais do projeto:

```bash
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};
```


## 7.4 Popular Firestore com matérias e questões

- Criar o arquivo serviceAccountKey.json (chave da service account do Firebase) na mesma pasta do seedFirestore.js.

- Executar o script de seed:
  ```bash
     node seedFirestore.js
  ```
 Isso irá criar/popular as coleções materias e questoes com dados de exemplo para testes.

## 7.5 Executar o aplicativo
 ```bash
    npx expo start
```
- Abrir no emulador Android, ou
- Ler o QR Code com o aplicativo Expo Go em um dispositivo físico.


## 7.6 Funcionalidades e Demonstração da Aplicação
**Funcionalidade 1: Geração e resolução de simulados por matéria**  
- O usuário se autentica (cadastro/login) e acessa a aba **Explorar**.  
- As matérias cadastradas na coleção `materias` são listadas dinamicamente.  
- Ao tocar em uma matéria (por exemplo, *Legislação* ou *Informática*), o app carrega todas as questões daquela matéria a partir da coleção `questoes`.  
- As questões são exibidas uma por vez, permitindo selecionar uma alternativa e navegar entre **Anterior** e **Próxima** até a conclusão do simulado.  
- Ao finalizar, o app calcula acertos e nota (0 a 10) e salva o resultado na coleção `simulados`.

**Funcionalidade 2: Visualização de progresso por matéria e últimos simulados**  
- Na aba **Progresso**, o app consulta a coleção `simulados` filtrando pelo `userId` do usuário logado.  
- Os resultados são agregados por matéria, exibindo:
  - quantidade de simulados realizados por matéria;
  - média de notas;
  - taxa de acertos (%).  
- A tela também apresenta uma lista dos **últimos simulados** realizados (por exemplo, os 5 mais recentes), mostrando:
  - matéria;
  - nota;
  - acertos/total de questões;
  - data e hora de conclusão formatadas.  
- Caso o usuário ainda não tenha simulados concluídos, é exibido o componente de estado vazio (`SemSimulado`) orientando a começar pela aba **Explorar**.


# 8. Acesso ao projeto
Atualmente, o ConcurSim está disponível como aplicação em desenvolvimento, executada localmente via Expo.

Formas de acesso:
 - Desenvolvimento local:
   Após executar npx expo start, o app pode ser aberto:
   - em um emulador Android configurado no computador; ou
   - em um dispositivo Android com o app Expo Go instalado.
 - Código-fonte:
   O código está disponível em:
   https://github.com/Kellen-Jhanke/lab-desenvolvimento-software-kellen
   (pasta /ConcurSim).

No momento, não há publicação do app em loja (Google Play) nem hospedagem de backend própria além do Firebase.


# 9. Licença
Este projeto é utilizado como parte de um Trabalho de Conclusão de Curso (TCC).
A licença de uso e distribuição do código será definida posteriormente.

*A ser incluído posteriormente.*

# 10. Agradecimentos
 - Ao orientador, pelo acompanhamento técnico e metodológico ao longo do                       desenvolvimento do projeto.
 - À comunidade de desenvolvimento em React Native, Expo e Firebase, pelas ferramentas e       documentação que possibilitaram a construção do aplicativo.

