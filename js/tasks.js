class Task {
    caption = "";
    text = "";
    options = [];
    answered = false;

    constructor(caption, text, options) {
        this.caption = caption;
        this.text = text;
        this.options = options;
    }

    OnAnswer() {
        this.answered = true;
    }

    GetResult() {
        if (this.answered)
            return 1;
        else
            return 0;
    }
}

class OneInManySelectTest extends Task {
    selectId = "";
    correctOption = "";
    answeredOption;

    constructor(selectId, caption, text, options, correctOption) {
        super(caption, text, options);
        this.selectId = selectId;
        this.correctOption = correctOption;
    }

    GetHtmlElement() {
        const div = document.createElement("div");
        
        const pCaption = document.createElement("u");
        div.append(pCaption);
        pCaption.innerHTML = this.caption;

        const pText = document.createElement("p");
        div.append(pText);
        pText.innerHTML = this.text;

        const selector = document.createElement("select");
        selector.id = this.selectId;
        div.append(selector);

        var option = document.createElement("option");
        selector.appendChild(option);
        option.innerText = "Выберите ответ...";
        option.value = "none";
        option.disabled = true;
        option.selected = true;

        for (const it of this.options) {
            option = document.createElement("option");
            option.innerText = it;
            selector.appendChild(option);
        }

        return div;
    }

    OnAnswer() {
        const val = document.getElementById(this.selectId).value;
        if (val != "none") {
            this.answered = true;
            this.answeredOption = val;
        }
    }

    GetResult() {
        if (this.answered && (this.answeredOption == this.correctOption))
            return 1;
        else
            return 0;
    }
}

class OneInManyRadioTest extends Task {
    TestText = "";
    SelectID = "OneInManyTest";
    Options = [];
    CorrectOption = "";
    AnsweredOption;

    constructor(selectId) {
        super();
        this.SelectID = selectId;
    }

    OnAnswer() {
        //если внутри select перечислены option (т.е. combobox)
        let options = $(`#${this.SelectID} option`);
        if (options.length > 0) {
            for (var i = 0; i < options.length; i++) {
                let opt = options[i];
                if (opt.selected) {
                    if (!opt.disabled) {
                        this.AnsweredOption = opt.value;
                        this.answered = true;
                    }
                    return;
                }
            }
            return;
        }

        //если radio
        options = $(`#${this.SelectID} input`);
        if (options.length > 0) {
            for (var i = 0; i < options.length; i++) {
                let opt = options[i];
                if (opt.checked) {
                    this.AnsweredOption = opt.value;
                    this.answered = true;
                    return;
                }
            }   
        }        
    }

    GetResult() {
        if (this.answered && (this.AnsweredOption == this.CorrectOption))
            return 1;
        else
            return 0;
    }
}

class ManyInManyTest extends Task {
    TestText = "";
    SelectID = "ManyInManyTest";
    Options = [];
    CorrectOptions = [];
    AnsweredOptions = [];

    constructor(selectId) {
        super();
        this.SelectID = selectId;
    }

    OnAnswer() {
        this.AnsweredOptions = [];
        let options = $(`#${this.SelectID} input`); //checkboxes
        for (var i = 0; i < options.length; i++) {
            let opt = options[i];
            if (opt.checked) {
                this.AnsweredOptions.push(opt.value);
            }
        }
        this.answered = true;
    }

    GetResult() {
        if (!this.answered)
            return 0;

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
