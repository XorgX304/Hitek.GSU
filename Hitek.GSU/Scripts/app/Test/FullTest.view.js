﻿GSU.module("Test.FullTest", function (FullTest, GSU, Backbone, Marionette, $, _) {


    
    FullTest.AnswerView = Backbone.Marionette.ItemView.extend({
        template: "test/answer",
        events: {
            "change input": function (e) {
               
                this.triggerMethod('answer:set', this.model.get("id"), e.target.checked);
            }
        }
       
    });

    FullTest.QuestionView = Backbone.Marionette.CompositeView.extend({
        tagName: "div",
        className: "panel-body",
        template: "test/question",
        childViewContainer: ".test-aswers",
        childView: FullTest.AnswerView,
        events: {
            "click .commit-answer":"onCommitAnswer"
        },
        childEvents: {
            'answer:set': "onChangeAnswer"
        },
        initialize: function () {
            console.log(this.model);
            this.collection = this.model.answers;
        },
        onChangeAnswer: function (childView, answerId, status) {
            var t = this.model.get("tempAnswer");
            if (this.model.get("isSingleAnswer")) {
                if (status)
                    this.model.set("tempAnswer", answerId);
                else
                    this.model.set("tempAnswer", null);
            }
            else {
                throw Error("Не реализовано несколько ответов");
            }
        },
        onCommitAnswer: function () {
            this.triggerMethod('question:commitAnswer', this.model.get("id"),this.model.get("tempAnswer"),this.model.get("nextQuestion"));
        }
        
    });

    FullTest.QuestionPaginationItemView = Backbone.Marionette.ItemView.extend({
        

        template: "test/questionPaginationItem",
        events: {
            "click": "click"
        },
        click: function () {
            this.triggerMethod('show:changeQuestion', this.model.get("questionId"));
        }

    });

    FullTest.QuestionPaginationView = Backbone.Marionette.CompositeView.extend({
        template: "test/questionPagination",
        childViewContainer: ".question-pagination",
        childView: FullTest.QuestionPaginationItemView

    });


    FullTest.view = Backbone.Marionette.LayoutView.extend({

        template: "test/fullTestTemplate",
        "regions": {
            questionPagination: ".test-question-pagination",
            content: ".test-сontent"
        },
        events:{
            "click": "click"
        
        },
        modelEvents: {
            "sync": "onSyncModel",
            "change:currentQuestionId": "onChangeCurrentQuestionId"
        },
        childEvents: {
            'show:changeQuestion': function (childView, id) {
                this.model.answers.get(this.model.get("currentQuestionId")).set("isCurrent", false);
                
                this.model.set("currentQuestionId", id);
            },
            'question:commitAnswer': function (childView, id, answer, nextQuestion) {
                console.log(arguments);
                this.model.answers.get(id).set("answerId", answer);
                this.model.questions.get(id).answers.get(answer).set("isChecked", true)
                if (nextQuestion)
                    this.model.set("currentQuestionId", nextQuestion);
                else
                    this.model.set("currentQuestionId", this.model.questions.at(0).get("id"));
            }
        },
        initialize: function (paramId) {
            this.model = new FullTest.TestModel();
            this.model.fetch({ data: { id: paramId.id } });
        },

        onSyncModel: function () {
            this.render();
            this.model.set("currentQuestionId", this.model.questions.at(0).get("id"));

        },
        onChangeCurrentQuestionId: function (model) {
            var cq = this.model.get("currentQuestionId");
            this.model.answers.get(cq).set("isCurrent", true);
            var v = new FullTest.QuestionView({ model: this.model.questions.get(cq) })
            this.content.show(v);
            this.questionPagination.show(new FullTest.QuestionPaginationView({ collection: this.model.answers }));
        }
    });



});
