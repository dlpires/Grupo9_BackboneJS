/**
 * FORM.JS
 * 
 * VIEW RESPONSÁVEL PELOS FORMULÁRIOS
 * 
 * 
 */
app.views.form = Backbone.View.extend({
	index: false,
	events: { //EVENTOS
		'click button': 'save' //EVENTO DO CLICK DO BOTÃO CHAMA MÉTODO SAVE
	},
    initialize: function() {//INICIALIZA A RENDERIZAÇÃO DA DIV
        this.render();
    },
    render: function(index) { //RENDER AGIRA DE DIFERENTES FORMAS, CONFORME O PARAMETRO INDEX
        var template, html = $("#tpl-form").html(); //CARREGA TEMPLATE EM DUAS VÁRIAVEIS
        if(typeof index == 'undefined') { //CASO O INDEX ESTIVER INDEFINIDO, ABRIRÁ A TELA DE CRIAR UMA TAREFA
        	this.index = false;
        	template = _.template(html, { title: ""});
        } else { //CASO CONTRÁRIO, TERÁ A TELA DE EDIÇÃO
        	this.index = parseInt(index); //PASSA VALOR DO INDEX PARA A PROPRIEDADE INDEX DO OBJETO
        	this.todoForEditing = this.model.at(this.index); //ADQUIRI O OBJETO INTEIRO
        	template = _.template(html, {//CARREGA O TEMPLATE E JOGA NO PARAMETRO TITLE O TEXTO DA TAREFA
        		title: this.todoForEditing.get("title")
        	});
        }
        this.$el.html(template); //INSERE O TEMPLATE CARREGADO NA DIV VAZIA
        this.$el.find("textarea").focus(); //COLOCA O ATRIBUTO FOCUS NA TEXTAREA
        this.delegateEvents(); //PARA READICIONAR A VISÃO DO DOM (AS EXPRESSÕES E OS EVENTOS)
        return this;
    },
    save: function(e) { //MÉTODO CHAMADO NO EVENTO
    	e.preventDefault(); //TIRA O EVENTO PADRÃO DO BOTÃO (ENVIAR O FORM)
    	var title = this.$el.find("textarea").val(); //PEGA O CONTEUDO DA TEXTAREA
    	if(title == "") { //VERIFICA SE ESTA EM BRANCO
    		alert("Empty textarea!"); return;
    	}
    	if(this.index !== false) {//EM CASO DE EDIÇÃO, SERÁ ALTERADO O TEXTO CONTIDO EM TITLE
    		this.todoForEditing.set("title", title);
    	} else {
    		this.model.add({ title: title });//CASO FOR CRIAR UMA TAREFA, SERA SALVO O TEXTO DIGITADDO E ADICIONARA NA LISTA
    	}   
    	this.trigger("saved");//INICIANDO A TRIGGER PARA RECARREGAR AS INFORMAÇÕES DA DIV    	
    }
});