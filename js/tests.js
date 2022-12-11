﻿class TestBase {
    text = "";
    options = [];

    constructor(text, options) {
        this.text = text;
        this.options = options;
    }

    IsComplete() {
        return true;
    }

    GetResult() {
        return 1;
    }
}

class OneInManySelectTest extends TestBase {
    selectElement = HTMLElement.prototype;
    defaultValue = "";
    correctOption = "";
    answeredOption = "";

    constructor(text, options, correctOption, defaultValue = "Выберите ответ...") {
        super(text, options);
        this.defaultValue = defaultValue;
        this.correctOption = correctOption;
    }

    GetHtmlElement() {
        const div = document.createElement("div");
        
        if (this.text != "") {
            const pText = document.createElement("p");
            div.append(pText);
            pText.innerHTML = this.text;
        }

        this.selectElement = document.createElement("select");
        div.append(this.selectElement);

        var option = document.createElement("option");
        this.selectElement.appendChild(option);
        option.innerText = this.defaultValue;
        option.value = "none";
        option.disabled = true;
        option.selected = true;

        for (const it of this.options) {
            option = document.createElement("option");
            option.innerText = it;
            this.selectElement.appendChild(option);
        }

        return div;
    }

    IsComplete() {
        const val = this.selectElement.value;
        if (val != "none") {
            this.answeredOption = val;
            return true;
        }
        return false;
    }

    GetResult() {
        if (this.answeredOption == this.correctOption)
            return 1;
        else
            return 0;
    }
}

class OneInManyRadioTest extends TestBase {
    TestText = "";
    SelectID = "OneInManyTest";
    Options = [];
    CorrectOption = "";
    AnsweredOption;

    constructor(selectId) {
        super();
        this.SelectID = selectId;
    }

    IsComplete() {
        // //если внутри select перечислены option (т.е. combobox)
        // let options = $(`#${this.SelectID} option`);
        // if (options.length > 0) {
        //     for (var i = 0; i < options.length; i++) {
        //         let opt = options[i];
        //         if (opt.selected) {
        //             if (!opt.disabled) {
        //                 this.AnsweredOption = opt.value;
        //                 this.answered = true;
        //             }
        //             return;
        //         }
        //     }
        //     return;
        // }

        // //если radio
        // options = $(`#${this.SelectID} input`);
        // if (options.length > 0) {
        //     for (var i = 0; i < options.length; i++) {
        //         let opt = options[i];
        //         if (opt.checked) {
        //             this.AnsweredOption = opt.value;
        //             this.answered = true;
        //             return;
        //         }
        //     }   
        // }        
    }

    GetResult() {
        if (this.AnsweredOption == this.CorrectOption)
            return 1;
        else
            return 0;
    }
}

class ManyInManyTest extends TestBase {
    TestText = "";
    SelectID = "ManyInManyTest";
    Options = [];
    CorrectOptions = [];
    AnsweredOptions = [];

    constructor(selectId) {
        super();
        this.SelectID = selectId;
    }

    IsComplete() {
        // this.AnsweredOptions = [];
        // let options = $(`#${this.SelectID} input`); //checkboxes
        // for (var i = 0; i < options.length; i++) {
        //     let opt = options[i];
        //     if (opt.checked) {
        //         this.AnsweredOptions.push(opt.value);
        //     }
        // }
        // this.answered = true;
    }

    GetResult() {
        //если что-то не отметили - 0
        for (var i = 0; i < this.CorrectOptions.length; i++) {
            if (this.AnsweredOptions.indexOf(this.CorrectOptions[i]) < 0)
                return 0;
        }

        //если отметили что-то лишнее - 0
        for (var i = 0; i < this.AnsweredOptions.length; i++) {
            if (this.CorrectOptions.indexOf(this.AnsweredOptions[i]) < 0)
                return 0;
        }

        //только если полное совпадение отмеченных и неотмеченных
        return 1;
    }
}
