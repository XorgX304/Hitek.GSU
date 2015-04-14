﻿GSU.module("Test.FullTest", function (FullTest, GSU, Backbone, Marionette, $, _) {



    FullTest.TestModel = Backbone.Model.extend({
        constructor: function () {
            this.questions = new FullTest.QuestionCollection();
            this.answers = new FullTest.AnswerForViewCollection();
            Backbone.Model.apply(this, arguments);
        },
        url: "/Test/",
        defaults: {
            id: 0,
            name: "Заголовок",
            currentQuestionId: 0
            
             
        },
          
        parse: function (raw) {
            raw.name = raw.Name;
            raw.id = raw.Id;
            this.questions.reset(raw.Questions, { parse: true });
            this.addNavigationQuestion();
            var cq = 1
            for(var i = 1; i <= this.questions.length; i++)
            {
                var q = this.questions.at(i-1);
                this.answers.add(
                    {
                        id: q.get("id"),
                        num: i,
                        questionId: q.get("id"),
                        isCurrent: (i == cq)
                    }
                )
            }
            return raw;
        },
        addNavigationQuestion: function () {
            var prev = null,
                c = null;
            for (var i = 0; i < this.questions.length; i++) {
                c = this.questions.at(i);
                if (prev) {
                    prev.set("nextQuestion", c.get("id"));
                    c.set("previosQuestion", prev.get("id"));
                }
                prev = c;
            }
        }
       
    });

    FullTest.QuestionModel = Backbone.Model.extend({
        constructor: function () {
            this.answers = new FullTest.AnswerCollection();
            Backbone.Model.apply(this, arguments);
        },
        defaults: {
            id:0,
            name: "",
            text: "",
            isSingleAnswer: true,
            tempAnswer: null,
            nextQuestion: null,
            previosQuestion:null
        },
        parse: function (raw) {
            this.answers.reset(raw.Answers, {parse:true});
            raw.name = raw.Name;
            raw.id = raw.Id;
            raw.text = raw.Text;
            return raw;
        }
    });
    FullTest.AnswerModel = Backbone.Model.extend({
        defaults: {
            name: "",
            text: "",
            id: null,
            isChecked:false
        },
        parse: function (raw) {
            raw.name = raw.Name;
            raw.text = raw.Text;
            raw.id = raw.Id;
            return raw;
        }
    });

    FullTest.AnswerForSyncModel = Backbone.Model.extend({
        defaults: {
            questionId: 0,
            answerId: 0
        }
    });

    FullTest.AnswerForViewModel = Backbone.Model.extend({
        defaults: {
            id: 0,
            questionId: null,
            answerId: null,
            num: 0,
            isCurrent: false
        }
    });
   


});
