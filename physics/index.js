let calcType = document.getElementById("type").value;

updateView();
updateAnswer();

document.getElementById("type").addEventListener('change',  function() {
    calcType = this.value;
    updateView();
    addProblemElementListeners();
});

function addProblemElementListeners() {
    for (var i = 0; i < document.getElementsByClassName("problem_element").length; i++) {
        document.getElementsByClassName("problem_element")[i].addEventListener('change',  function() {
            updateAnswer();
        });
    }
}

function updateView() {

    for (var i = 0; i < document.getElementById("problem").children.length; i++) {
        document.getElementById("problem").children[i].remove();
    }
    for (var i = 0; i < document.getElementById("answer").children.length; i++) {
        document.getElementById("answer").children[i].remove();
    }
    for (var i = 0; i < getProblemElements().length; i++) {
        document.getElementById("problem").appendChild(getProblemElements()[i]);
    }
}

function updateAnswer() {
    for (var i = 0; i < document.getElementById("answer").children.length; i++) {
        document.getElementById("answer").children[i].remove();
    }
    if (getAnswerElements() != undefined) {
        for (var i = 0; i < getAnswerElements().length; i++) {
            document.getElementById("answer").appendChild(getAnswerElements()[i]);
        }
    } else {
        var e = document.createElement("p");
        e.textContent = "Cannot be determined.";
        document.getElementById("answer").appendChild(e);
    }
}

function getProblemElements() {
    if (calcType == "velocity") {
        return velocityProblemElements();
    }
    return undefined;
}

function numberInputElement(id, placeholder) {
    var e1 = document.createElement("input");
    e1.id = id;
    e1.placeholder = placeholder;
    e1.className = "problem_element";
    e1.oninput = function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }
    return e1;
}

function velocityProblemElements() {
    var list = [];
    var e1 = numberInputElement("starting_speed", "Starting Speed");
    list.push(e1);
    var e2 = numberInputElement("ending_speed", "Ending Speed");
    list.push(e2);
    return list;
}

function velocityAnswerElements(startingSpeed, endingSpeed) {
    var list = [];
    var averageVelocity = Math.abs((Number(startingSpeed) - Number(endingSpeed)) / 2);
    console.log(startingSpeed, endingSpeed, averageVelocity);
    if (isNaN(averageVelocity) || startingSpeed === "" || endingSpeed === "") {
        throw "NaN";
    }
    var e1 = document.createElement("p");
    e1.textContent = averageVelocity;
    list.push(e1);
    return list;
}

function getAnswerElements() {
    if (calcType == "velocity") {

        try { 
            return velocityAnswerElements(document.getElementById("starting_speed").value, document.getElementById("ending_speed").value);
        } catch (e) {
            return undefined;
        }
    }
    return undefined;
}