/**
 * APP.JS
 * AGRUPA TODOS OS ARQUIVOS JS IMPLEMENTADOS NO PROJETO.
 */

var app = (function() {//OBJETO CHAMADA LA NO INDEX

	var api = { //OBJETO RESPONSÁVEL PELA ESTRUTURA DOS MÉTODOS PUBLICOS DA CLASSE
		
		//RECIPIENTES QUE RECEBERAM AS CLASSES IMPLEMENTADAS JS
		views: {},
		models: {},
		collections: {},

		//OBJETOS (INICIALIZAÇÃO DOS OBJETOS)
		content: null,
		router: null,
		todos: null,
		//MÉTODO QUE INICIALIZARÁ A APLICAÇÃO  
		init: function() { 
			this.content = $("#content"); //RECEBE A POSIÇÃO DA ÁRVORE DOM DA TAG QUE CONTEM O ID
			ViewsFactory.menu(); //EVOCANDO MENU PARA RENDERIZAR NO NAVEGADOR
			this.todos = new api.collections.ToDos();
			Backbone.history.start();
			return this;
		},
		//MÉTODO QUE ATUALIZA O RECIPIENTE CONTENT (DIV)	
		changeContent: function(el) {
			this.content.empty().append(el);
			return this;
		},
		//ATUALIZA O TITULO (H1)
		title: function(str) {
			$("h1").text(str);
			return this;
		}
	};


	//OBJETO RESPONSÁVEL PELA VIEW (FÁBRICA DE VISÕES)
	/**
	 * BOA PRÁTICA = INSTANCIAR TODAS AS VIEWS APENAS UMA VEZ ATÉ O TERMINO DA EXECUÇÃO
	 * ONDE SE INVOCA MÉTODOS DAS VIEWS PARA ATUALIZAÇÃO DOS DADOS NAS DIVS
	 * 
	 * O QUE ESTA SENDO FEITO: CLASSE AUXILIAR QUE CRIA UMA INSTÂNCIA DA VIEW E A RETORNA QUANDO NECESSÁRIO
	 */
	var ViewsFactory = {
		menu: function() {
			if(!this.menuView) {//INICIALIZA APENAS UMA UNICA VEZ A INSTANCIA DO OBJETO (COMO O PP SINGLETON)
				this.menuView = new api.views.menu({ 
					el: $("#menu") 
				});
			}
			return this.menuView;
		},
		list: function() {//INICIALIZA A LISTA DE TAREFAS
			if(!this.listView) {
				this.listView = new api.views.list({
					model: api.todos //PASSADO A COLEÇÃO ToDoS
				});
			}	
			return this.listView;
		},
		form: function() {//INICIALIZA OS FORMULÁRIOS
			if(!this.formView) {
				this.formView = new api.views.form({
					model: api.todos//PASSADO A COLEÇÃO ToDoS
				}).on("saved", function() {//EVENTO ON = TRIGGER
					api.router.navigate("", {trigger: true}); //VOLTA PARA A LISTA DE TAREFAS
				});
			}
			return this.formView;
		}
	};


	//OBJETO RESPONSÁVEL PELAS ROTAS NO CÓDIGO

	/**
	 * ELE QUE NORTEARÁ AS ROTAS DA APLICAÇÃO (ATRAVÉS DOS LINKS)
	 * 
	 * push state = navega a partir do histórico do navegador -> tem suporte
	 * 
	 * Usado hashes (#new, por exemplo)
	 * 
	 */
	var Router = Backbone.Router.extend({
		routes: { //ROTAS DE HASHES
			"archive": "archive", //lista de arquivados
			"new": "newToDo", //nova tarefa
			"edit/:index": "editToDo", //:index = utilização de url dinamicas (recebe o index do item da lista) (pois a varias edits e delets na tela, ou seja, cada tarefa)
			"delete/:index": "deleteToDo",
			"": "list" // "" = pagina inicial (LISTA DE TAREFAS)
		},
		list: function(archive) {
			var view = ViewsFactory.list(); //MÉTODO QUE INICIA E MOSTRA AS TAREFAS ATIVAS (NÃO PASSA NENHUM PARAMETRO)
			api
			.title(archive ? "Arquivados:" : "Lista de Tarefas:")//ALTERA OS NOMES DAS LISTA
			.changeContent(view.$el); //ADICIONANDO SCRIPT A DIV
			view.setMode(archive ? "archive" : null).render(); //VERIFICA A LISTA QUE DEVERÁ APARECER NA TELA
		},
		archive: function() {//MUDANDO DE LISTA DE TAREFAS PARA ARQUIVADOS ETC
			this.list(true);//CHAMA O MÉTODO LIST COM PARAMETRO TRUE
		},
		newToDo: function() {//EVENTO PARA CRIAR NOVA TAREFA
			var view = ViewsFactory.form(); //CRIA O OBJETO
			api.title("Criar nova tarefa:").changeContent(view.$el);
			view.render();//NÃO MANDA O INDEX NA RENDERIZAÇÃO
		},
		editToDo: function(index) {//EVENTO PARA EDITAR A TAREFA
			var view = ViewsFactory.form();
			api.title("Editar:").changeContent(view.$el);
			view.render(index);//MANDA O INDEX PARA ALTERAÇÃO
		},
		deleteToDo: function(index) { //MÉTODO PARA EXCLUIR TAREFA
			api.todos.remove(api.todos.at(parseInt(index)));//ACHA NA LISTA O INDEX CORRESPONDENTE E DELETA
			api.router.navigate("", {trigger: true}); //RECARREGA A DIV E VOLTA A LISTA DE TAREFAS
		}
	});
	api.router = new Router(); //INSTANCIA O OBJETO ROUTER

	return api;//RETORNA O OBJETO DE ESTRUTURA

})();