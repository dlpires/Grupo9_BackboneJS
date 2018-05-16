/**
 * MENU.JS
 * 
 * CRIA UMA PROPRIDADE MENU (NAVEGAÇÃO) PARA A CLASSE DE NAVEGAÇÃO
 */

app.views.menu = Backbone.View.extend({
	template: _.template($("#tpl-menu").html()),//PROCURA O TEMPLATE NA ARVORE DOM (UTILIZAÇÃO DO UNDERSCORE.JS - UTILIZANDO O ESQUEMA DE MODELOS QUE ELE CRIA)
    initialize: function() {//INICIALIZA A RENDERIZAÇÃO
        this.render();
    },
    render: function(){ //RENDER = VE AS MUDANÇAS DIRETO NO NAVEGADOR
        this.$el.html(this.template({})); //CARREGA O TEMPLATE DENTRO DE UMA DIV VAZIA (PLOTA NA PÁGINA)
        /**
         * el = <div></div> = é do framework
         * 
         * OBS.: el = JS
         *       $el = JQUERY
         */
    }
});