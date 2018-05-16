/**
 * LIST.JS
 * 
 * ONDE SERÁ TRABALHADO A MANIPULAÇÃO DAS LISTAS
 *  
 */

app.views.list = Backbone.View.extend({
	mode: null, //MODO DE EXIBIÇÃO DAS LISTAS (ARQUIVADO OU VAZIO(QUE REPRESENTA A LISTA DE TAREFAS))
	events: { //ONDE É MAPEADO OS EVENTOS DA DOM (ONDE, A PARTIR DOS ATRIBUTOS SETADO NAS TAGS, O EVENTO INICIALIZA UM MÉTODO)
		'click a[data-up]': 'priorityUp', //FORMATO DE INDICAR UM EVENTO EM BACKBONE = evento tag[atributo]
		'click a[data-down]': 'priorityDown',
		'click a[data-archive]': 'archive',
		'click input[data-status]': 'changeStatus'
	},
	initialize: function() {
		var handler = _.bind(this.render, this);//CRIA UM MANIPULADOR COM UM ESCOPO = TRIGGERS (MÉTODO DO UNDERSCORE)
		this.model.bind('change', handler);
		this.model.bind('add', handler);
		this.model.bind('remove', handler);
	},
    render: function() {//REDERIZA A LISTA E TROCA O VALOR DAS EXPRESSÕES UTILIZADAS NO HTML
    	var html = '<ul class="list">', 
    		self = this;
    	this.model.each(function(todo, index) {
    		if(self.mode === "archive" ? todo.get("archived") === true : todo.get("archived") === false) { //IF DENTRO DO IF
    			var template = _.template($("#tpl-list-item").html());//CARREGA O TEMPLATE INDICADO NO HTML
	    		html += template({ //VERIFICA AS EXPRESSÕES E MUDA DE ACORDO FOI VERIFICADO NO IF E INSERE OS ATRIBUTOS E TEXTO
	    			title: todo.get("title"),
	    			index: index,
	    			archiveLink: self.mode === "archive" ? "Desarquivar" : "Arquivar",
	    			done: todo.get("done") ? "yes" : "no",
	    			doneChecked: todo.get("done")  ? 'checked=="checked"' : ""
	    		});
    		}
    	});
    	html += '</ul>'; //FECHA A TAG
    	this.$el.html(html);//INSERE NA DIV CONTENT
    	this.delegateEvents(); //PARA READICIONAR A VISÃO DO DOM (AS EXPRESSÕES E OS EVENTOS)
    	return this;
	},
	
	//RESPOSTAS DOS EVENTOS DA ARVORE DOM

    priorityUp: function(e) {
		var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index")); //PEGA O INDEX DO ITEM
		//e.target = elemento DOM que ativou o evento
    	this.model.up(index);//CHAMA MÉTODO UP DA COLLECTION
    },
    priorityDown: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));//PEGA O INDEX DO ITEM
    	this.model.down(index);//CHAMA MÉTODO DOWN DA COLLECTION
    },
    archive: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));//PEGA O INDEX DO ITEM
    	this.model.archive(this.mode !== "archive", index);	//CHAMA MÉTODO ARCHIVE DA COLLECTION, MOVENDO ITEM PARA A LISTA DE ARQUIVADOS
    },
    changeStatus: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));//PEGA O INDEX DO ITEM
    	this.model.changeStatus(e.target.checked, index); //MUDA STATUS PARA CONCLUIDO
    },
	setMode: function(mode) { //ONDE VAI VERIFICAR AS TAREFAS NORMAIS E AS ARQUIVADAS (MOSTRANDO UMA OU OUTRA)
		this.mode = mode;
		return this;
	}
});