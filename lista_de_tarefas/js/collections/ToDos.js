/**
 * TODOS.JS
 * 
 * ONDE SERÃO INSERIDOS OS REGISTROS DAS TAREFAS (COLEÇÃO DE TAREFAS)
 * 
 * OBS.: EM UMA APLICAÇÃO MAIS COMPLETA, É AQUI QUE É FEITO O ACESSO AOS DADOS DE UM DB OU ARQUIVO
 * 
 */

app.collections.ToDos = Backbone.Collection.extend({
	initialize: function(){ //INICIALIZAÇÃO DA COLEÇÃO (ADICIONANDO ALGUNS ITENS)
		this.add({ title: "Pesquisar Itens do Template" });
		this.add({ title: "Montar a apresentação!" });
    	this.add({ title: "Apresentar!" });
	},
	/**
	 * SETAS DE ORGANIZAÇÃO DAS TAREFAS (ORDENAÇÃO)
	 * 
	 * this.models = vetor
	 * index = indice do vetor
	 */
    up: function(index) { //LEVA ITEM ACIMA
    	if(index > 0) {
    		var tmp = this.models[index-1];
    		this.models[index-1] = this.models[index];
    		this.models[index] = tmp;
    		this.trigger("change");
    	}
    },
    down: function(index) {//LEVA ITEM PARA BAIXO
    	if(index < this.models.length-1) {
    		var tmp = this.models[index+1];
    		this.models[index+1] = this.models[index];
    		this.models[index] = tmp;
    		this.trigger("change");
    	}
    },
    archive: function(archived, index) { //CRIA LINK PARA ARQUIVAR OS ITENS (LANÇAR PARA A LISTA DE ARQUIVADOS)
    	this.models[index].set("archived", archived);
    },
    changeStatus: function(done, index) { //CRIA O CHECKBOX NOS ITENS PARA SELECIONAR
        this.models[index].set("done", done);
    },
  	model: app.models.ToDo //TIPOS DE DADOS QUE SERÃO SALVOS (DO TIPO TAREFA (ToDo), NA PASTA MODEL)
});