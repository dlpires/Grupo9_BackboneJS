/**
 * TODO.JS
 * 
 * PROPREIDADE RESPONSÁVEL PELA DEFINIÇÃO DE MODELO DAS TAREFAS (PADRÃO)
 * ***BACKBONE É UM EMISSOR DE EVENTOS = TUDO QUE É ATRELADO NOS MODELOS PODE SER ALTERADO E MUDADO DURANTE A EXECUÇÃO
 */

app.models.ToDo = Backbone.Model.extend({
    defaults: {
        title: "Lista de Tarefas",
        archived: false,
        done: false
    }
});