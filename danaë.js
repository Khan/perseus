#!/usr/bin/env casperjs --web-security=no

/*
To use this script, you'll need to install casperjs. Probably
"brew install casperjs" will do the trick.

Then you can run it thusly:

    ./danaë.js [--problem=PROBLEM] [--seed=SEED] [--pretty] EXERCISE

    Converts a single problem from EXERCISE to a Perseus item. EXERCISE is the
    name of the exercise file without .html. For example, "addition_1".

    OPTIONS
        --problem=PROBLEM
            Convert an item from problem type PROBLEM. Defaults to 0. Valid
            problem types vary depending on the exercise. You can use the number
            or the name of the problem type.

        --seed=SEED
            Convert seed SEED. Defaults to 1. Valid seeds are 1-200

        --pretty
            Formats the JSON output with nice indentation and such.


The output of this script can currently be added to perseus via console. To do
so, assign the output of this script to the variable "item" and run the
following snippet of code:

    $.ajax({
        url: "/api/v1/assessment_items",
        type: "POST",
        data: JSON.stringify({
            item_data: JSON.stringify(item),
            tags: [],
            author_names: ["Ben Eater"]
        }),
        contentType: "application/json",
        complete: function(data, status) {
            console.log(status, data);
        }
    });

I recommend including some tags if you're converting a bunch of items. The tags
field is an array of urlsafe key ids of the tags.

If you want to convert a bunch of items, you can use a simple shell script:

    echo -n "["
    ./danaë.js --seed=1 functions_1
    for i in $(seq 2 30); do
        echo -n ","
        ./danaë.js --seed=$i functions_1
    done
    echo "]"
*/


var casper = require("casper").create({
//    verbose: true,
//    logLevel: "debug"
});

var exerciseName = casper.cli.args[0];
var problemId = casper.cli.options.problem || 0;
var seed = casper.cli.options.seed || 1;
var pretty = casper.cli.has("pretty");

if (exerciseName == null) {
    casper.echo("usage: danaë.js [--seed=SEED] [--problem=PROBLEM_ID] [--pretty] EXERCISE");
    casper.exit();
}

var setup = function(problem, seed) {
    // Remove vars
    $("div#workarea .vars").remove();

    // Take all the hints
    while (!$("input#hint").prop("disabled")) {
        $("input#hint").click();
    }

    // Replace mathjax with $math$
    $("code").each(function() {
        var content = $(this).find("script").text();
        content.replace(/\$/g, "\\$");
        $(this).text("$" + content + "$");
    });

    // Make bold things bold
    $("b").each(function() {
        var content = $(this).html();
        $(this).html("**" + content + "**");
    });
    // p.question should also be bold
    $("div#workarea>div>p.question").each(function() {
        $(this).html("**" + $(this).html() + "**");
    });

    // Helper to sorta turn a div into something markdown-ish (at least line breaks are maybe sorta right?)
    window._extractDiv = function(div) {
        var text = "";
        // replace links with markdown links
        div.find("a").each(function() {
            $(this).text("[" + $(this).text() + "](" +
                $(this).prop("href") + ")");
        });
        div.contents().each(function() {
            text += $(this).text().replace(/[\n ]+/g, " ");
            if (($(this).is("p") || $(this).is("div")) &&
                    $(this).css("float") !== "left") {
                text += "\n\n";
            }
        });
        return $.trim(text);
    };
};


var replaceGraphie = function() {
    $("div.graphie").each(function(i) {
        var $graphie = $(this);
        var code = "";
        var updates = $graphie.data("update");
        if (updates == null) {
            _.each(KhanUtil.tmpl.getVAR("VARS"), function(value, name) {
                code += "var " + name + " = " + JSON.stringify(value) + ";\n";
            });
            code += $graphie.text();
            $graphie.data("code", code);
        } else {
            code += $("#" + updates).data("code");
            code += $graphie.text();
            $("#" + updates).data("code", code);
        }
        data = $.ajax({
            url: "http://graphie-to-png.khanacademy.org/png?url_only=1",
            type: "POST",
            data: "js=" + encodeURIComponent(code),
            async: false,
            success: function(data) {
                $graphie.text("![](" + data + ")");
            }
        });
    });
};


var getProblem = function() {
    var problem = {};

    // Extract solution
    var answerArea = {
        type: "number",
        options: {}
    };
    var solution = $("div#workarea .solution").remove();
    var solutionText = solution.text().trim();
    answerArea.type = solution.data("type");
    if (answerArea.type == null && $("div#workarea .choices").remove().length) {
        answerArea.type = "radio";
        answerArea.options.choices = [];
        answerArea.options.randomize = false;
        var choices = $("div#solutionarea li>label>span.value");
        var noneCorrect = true;
        _.each(choices, function(choice) {
            var choiceText = $(choice).text().trim();
            correct = choiceText === solutionText;
            if (correct) {
                noneCorrect = false;
            }
            if (choiceText === "None of the above." && noneCorrect) {
                correct = true;
            }
            answerArea.options.choices.push({
                content: choiceText,
                correct: correct
            });
        });
    } else if (answerArea.type == null ||
            answerArea.type === "number" ||
            answerArea.type === "rational" ||
            answerArea.type === "mixed") {
        // TODO(eater): deal with data-forms, data-inexact and data-fallback
        // var forms = solution.data("forms");
        // var inexact = solution.data("inexact");
        // var fallback = solution.data("fallback");
        var simplify = solution.data("simplify");
        var value = KhanUtil.tmpl.getVAR(solution.text());
        var width = $("#solutionarea input").width();
        answerArea.type = "input-number";
        answerArea.options = {
            value: value,
            simplify: simplify === "optional" ? "optional" : "required",
            size: width < 60 ? "small" : "normal"
        };
    } else if (answerArea.type === "multiple") {
        // TODO(eater): deal with examples when supported by perseus
        solution.children(".example").remove();
        widgets = {};
        solution.find(".sol").each(function(n) {
            // TODO(eater): deal with data-forms, data-inexact and data-fallback
            // var forms = $(this).data("forms");
            // var inexact = $(this).data("inexact");
            // var fallback = $(this).data("fallback");
            var simplify = $(this).data("simplify");
            var value = KhanUtil.tmpl.getVAR($(this).text());
            var width = $("#solutionarea input").eq(n).width();
            widgets["input-number " + (n + 1)] = {
                    options: {
                        value: value,
                        simplify: "required",
                        size: width < 60 ? "small" : "normal"
                    }
                };
            $(this).text("[[☃ input-number " + (n + 1) + "]]");
        });
        answerArea.options.content = _extractDiv(solution);
        answerArea.options.widgets = widgets;
    }

    // Extract the question
    var question = _extractDiv($("div#workarea>div"));

    var hints = [];
    _.each($("div#hintsarea").children(), function(hintDiv) {
        hints.push({
            content: _extractDiv($(hintDiv))
        });
    });

    return {
        question: {
            content: question
        },
        answerArea: answerArea,
        hints: hints
    };
};


var graphieCode;
var graphUrls = [];

casper.start("http://sandcastle.khanacademy.org/media/castles/Khan:master/exercises/" +
        exerciseName + ".html?problem=" + problemId + "&seed=" + seed + "&nographie");
casper.waitUntilVisible("div#workarea", null, null, 10000);
casper.then(function() {
    this.evaluate(setup);
});
casper.then(function() {
    this.evaluate(replaceGraphie);
});
casper.then(function() {
    problem = this.evaluate(getProblem);
});
casper.run(function() {
    this.echo(JSON.stringify(problem, null, pretty ? 4 : 0));
    this.exit();
});
