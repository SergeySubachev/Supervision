class TestBase {
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
            pText.innerHTML = this.text;
            pText.style.lineHeight = "1.0";
            div.append(pText);
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
    divElement = HTMLElement.prototype;
    correctOption = "";
    answeredOption = "";

    constructor(text, options, correctOption) {
        super(text, options);
        this.correctOption = correctOption;
    }

    GetHtmlElement() {
        this.divElement = document.createElement("div");
        
        if (this.text != "") {
            const pText = document.createElement("p");
            pText.innerHTML = this.text;
            pText.style.lineHeight = "1.0";
            pText.style.marginBottom = "0%";
            this.divElement.append(pText);
        }

        for (const it of this.options) {
            const p = document.createElement("p");
            p.style.lineHeight = "1.0";
            p.style.margin = "0%";
            this.divElement.appendChild(p);
    
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.value = it;
            radio.style.marginRight = "6px";
            p.appendChild(radio);

            const span = document.createElement("span");
            span.innerText = it;
            p.appendChild(span);
        }

        return this.divElement;
    }

    IsComplete() {
        let inputs = this.divElement.getElementsByTagName("input");
        for (const input of inputs) {
            if (input.checked) {
                this.answeredOption = input.value;
                return true;
            }
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

class ManyInManyTest extends TestBase {
    divElement = HTMLElement.prototype;
    correctOptions = [];
    answeredOptions = [];

    constructor(text, options, correctOptions) {
        super(text, options);
        this.correctOptions = correctOptions;
    }

    GetHtmlElement() {
        this.divElement = document.createElement("div");
        
        if (this.text != "") {
            const pText = document.createElement("p");
            pText.innerHTML = this.text;
            pText.style.lineHeight = "1.0";
            pText.style.marginBottom = "0%";
            this.divElement.append(pText);
        }

        for (const it of this.options) {
            const p = document.createElement("p");
            p.style.lineHeight = "1.0";
            p.style.margin = "0%";
            this.divElement.appendChild(p);
    
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = it;
            checkbox.style.marginRight = "6px";
            p.appendChild(checkbox);

            const span = document.createElement("span");
            span.innerText = it;
            p.appendChild(span);
        }

        return this.divElement;
    }

    //если отметили хотя бы один вариант
    IsComplete() {
        this.answeredOptions = [];
        let inputs = this.divElement.getElementsByTagName("input");
        for (const input of inputs) {
            if (input.checked) {
                this.answeredOptions.push(input.value);
            }
        }
        return this.answeredOptions.length > 0;
    }

    GetResult() {
        //если что-то не отметили - 0
        for (const it of this.correctOptions) {
            if (this.answeredOptions.indexOf(it) < 0) {
                return 0;
            }
        }

        //если отметили что-то лишнее - 0
        for (const it of this.answeredOptions) {
            if (this.correctOptions.indexOf(it) < 0) {
                return 0;
            }
        }

        //только если полное совпадение отмеченных и неотмеченных
        return 1;
    }
}
