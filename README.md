# ADMV Front-page

### Guia de contribuição

1. Faça um fork do repositório para a sua conta

2. Clone o repositório no seu computador
```bash
git clone https://github.com/<seu-username>/admv.git
```

3. Instale os pacotes necessários

```bash
npm install -d
```
> O parametro `-d` instala as dependências de desenvolvimento.

4. Execute o projeto em modo de desenvolvimento para que ele fique em watch e fazendo build sempre que você editar o código

```bash
npm run dev
```

------

Acesse a [board da organização](https://github.com/orgs/admissoesevida/projects/1) e veja quais tarefas estão disponíveis na coluna _To Do_.

> As tarefas consideradas disponíveis são as que não tiverem nenhum _assignee_, ou seja, não tenha foto de ninguém que já esteja trabalhando nela.

Antes de começar uma tarefa, defina você como responsável daquela tarefa, isso pode ser feito na própria tela da issue, no link _assign myself_.

Após isso, crie um branch para a tarefa no seu fork do repositório, utilize o padrão de nome **_[repositório]-[id-da-issue]_**, por exemplo, para a issue/tarefa numero 3, crie uma branch com o nome **_admv-3_**.

Procure fazer multiplos commits por tarefa, com uma breve descrição do que foi feito em cada commit. 

Também deve-se colocar o id da tarefa no commit, seguido do sinal _hashtag_, por exemplo:
```
#3 Inclusão de banner para a página principal
```

> Fazendo isso, o commit vai aparecer na tela da tarefa, assim fica mais fácil de ver o que foi feito na tarefa, pois todos os commits estarão relacionados lá.

------

Após a conclusão do desenvolvimento da tarefa, escreva testes que validem o que foi feito e execute a suíte de testes para verificar se o que já existia não foi quebrado.
```bash
npm test
```

------

Ao término disso, submeta um _Pull Request_ (PR) da sua branch para o repositório admv/master e indique o ID da tarefa na descrição do PR da mesma forma, que ele também será relacionado na tarefa.

Depois é só aguardar, enquanto isso pode verificar outras tarefas que estiverem disponíveis :)
