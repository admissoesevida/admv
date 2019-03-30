# ADMV
[![Build Status](https://travis-ci.com/admissoesevida/admv.svg?branch=master)](https://travis-ci.com/admissoesevida/admv)
[![codecov](https://codecov.io/gh/admissoesevida/admv/branch/master/graph/badge.svg)](https://codecov.io/gh/admissoesevida/admv)

### Guia de contribuição

1. Faça um fork do repositório para a sua conta

2. Clone o repositório no seu computador

3. Execute o script `run-infra.sh`

```bash
./run-infra.sh
```

4. Execute `npm install` na pasta raiz

5. Depois execute `npm run dev`

6. Pronto o sistema estará rodando. API em `localhost:5000` e APP React em `localhost:3000`

---

### Outros comandos úteis:

- Para limpar o ambiente, execute o comando

```bash
./clean-infra.sh
```
- Para atualizar o dump do database
```bash
./dump-database.sh
```
> Isso irá atualizar o arquivo em /database/dump/admv.sql, depois disso você precisará fazer o commit desse arquivo

- Para ver logs dos containeres (`api` ou `app`)
```bash
./logs.sh api    # mostra logs da api
./logs.sh app    # mostra logs do React
./logs.sh        # padrão API
```
- Para acessar o terminal do container e rodar comandos diretamente nele
```bash
./ssh.sh api     # acessa o container do api
./ssh.sh app     # acessa o container do React
./ssh.sh         # padrão api
```

---
### Para saber as tarefas disponíveis e como escrever os commits

Acesse a [board da organização](https://github.com/orgs/admissoesevida/projects/1) e veja quais tarefas estão disponíveis na coluna _To Do_.

> As tarefas consideradas disponíveis são as que não tiverem nenhum _assignee_, ou seja, não tenha foto de ninguém que já esteja trabalhando nela.

Antes de começar uma tarefa, defina você como responsável daquela tarefa, isso pode ser feito na própria tela da issue, no link _assign myself_.

Procure fazer multiplos commits por tarefa, com uma breve descrição do que foi feito em cada commit.

Também deve-se colocar o id da tarefa no commit, seguido do sinal _hashtag_, por exemplo, o commit que esteja relacionado à tarefa 3:

```
Inclusão de banner para a página principal (#3)
```

> Fazendo isso, o commit vai aparecer na tela da tarefa, assim fica mais fácil de ver o que foi feito nela, pois todos os commits estarão relacionados lá.

---

Após a conclusão do desenvolvimento da tarefa, escreva testes que validem o que foi feito e execute a suíte de testes para verificar se o que já existia continua funcionando normalmente.

```bash
npm run test
```

---

Ao término disso, você pode criar um _Pull Request_ (PR) da sua branch para o repositório admv/master e indique o ID da tarefa na descrição do PR da mesma forma, que ele também será relacionado na tarefa.

Depois é só aguardar, enquanto isso pode verificar outras tarefas que estiverem disponíveis :)
