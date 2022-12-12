class CabelCheckTask extends TaskBase {
    cabelThreadTest = OneInManySelectTest.prototype;
    cabelIsolateTest = OneInManySelectTest.prototype;
    cabelCoverTest = OneInManySelectTest.prototype;
    cabelBronTest = OneInManySelectTest.prototype;
    cabelUnderBronTest = null;
    cabelOuterCoverTest = null;
    cabelThreadCheckTest = OneInManySelectTest.prototype;
    cabelIsolateCheckTest = OneInManySelectTest.prototype;
    cabelCoverCheckTest = OneInManySelectTest.prototype;
    marking = "";

    constructor() {
        super();

        //маркировка
        this.cabelThreadTest = new CabelThreadTest();
        const sThread = this.cabelThreadTest.correctOptionObject.marks;
        this.cabelIsolateTest = new CabelIsolateTest();
        const sIsolate = this.cabelIsolateTest.correctOptionObject.marks;
        this.cabelCoverTest = new CabelCoverTest();
        const sCover = this.cabelCoverTest.correctOptionObject.marks;
        this.cabelBronTest = new CabelBronTest();
        const sBron = this.cabelBronTest.correctOptionObject.marks;
        let sUnderBron = "";
        let sOuterCover = "";

        this.tests = [this.cabelThreadTest, this.cabelIsolateTest, this.cabelCoverTest, this.cabelBronTest];

        if (sBron != "") {
            this.cabelUnderBronTest = new CabelUnderBronTest();
            sUnderBron = this.cabelUnderBronTest.correctOptionObject.marks;
            this.tests.push(this.cabelUnderBronTest);

            this.cabelOuterCoverTest = new CabelOuterCoverTest();
            sOuterCover = this.cabelOuterCoverTest.correctOptionObject.marks;
            this.tests.push(this.cabelOuterCoverTest);
        }

        //проверка - для зоны В-Iа
        const isSatisfy = "соответствует";
        const isNotSatisfy = "не соответствует";

        this.cabelThreadCheckTest = new CabelPartCheckTest(this.cabelThreadTest.correctOptionObject == Thread_А ? isNotSatisfy :isSatisfy);
        this.tests.push(this.cabelThreadCheckTest);

        const PE = [Isolate_П, Isolate_Пс, Isolate_Пв, Isolate_Пвс];
        const isolateSatisfy = PE.includes(this.cabelIsolateTest.correctOptionObject) ? isNotSatisfy : isSatisfy;
        this.cabelIsolateCheckTest = new CabelPartCheckTest(isolateSatisfy);
        this.tests.push(this.cabelIsolateCheckTest);

        const coverSatisfy = this.cabelCoverTest.correctOptionObject == Cover_П ? isNotSatisfy : isSatisfy;
        this.cabelCoverCheckTest = new CabelPartCheckTest(coverSatisfy);
        this.tests.push(this.cabelCoverCheckTest);

        this.marking = "";
        if (sIsolate == "Ц") this.marking = sIsolate + sThread + sCover + sBron + sUnderBron + sOuterCover;
        else if (sIsolate == "-В") this.marking = sThread + sCover + sBron + sUnderBron + sOuterCover + sIsolate;
        else if (sIsolate == "Р") this.marking = sThread + sCover + sIsolate + sBron + sUnderBron + sOuterCover;
        else this.marking = sThread + sIsolate + sCover + sBron + sUnderBron + sOuterCover;
    }

    GetHtmlElement() {
        const div = document.createElement("div");

        const caption = document.createElement("h3");
        caption.innerHTML = "Проверка соответствия кабелей силовой сети классу взрывоопасной зоны";
        div.appendChild(caption);

        const pClassZone = document.createElement("p");
        pClassZone.innerHTML = "Класс зоны: В-Iа.";
        div.appendChild(pClassZone);

        const pMarking = document.createElement("p");
        pMarking.innerHTML = `Кабель марки ${this.marking}.`;
        div.appendChild(pMarking);

        const table = document.createElement("table");
        {
            const tbody = document.createElement("tbody");
            {
                let tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Жилы";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelThreadTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelThreadCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Изоляция";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelIsolateTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelIsolateCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Оболочка";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelCoverTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelCoverCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Броня";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelBronTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                if (this.cabelUnderBronTest != null) {
                    tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.innerText = "Подушка под броней";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelUnderBronTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                if (this.cabelOuterCoverTest != null) {
                    tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.innerText = "Наружный покров";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.cabelOuterCoverTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
            }
            table.classList.add("w3-table");
            table.classList.add("w3-bordered");
            table.appendChild(tbody);
        }
        div.appendChild(table);

        return div;
    }

    // GetResult() {
    //     //конструкция - 4 или 6 тестов; проверка соответствия - последние 3
    //     const cabelPartsTests = this.tests.slice(0, -3);
    //     const cabelCheckTests = this.tests.slice(-3);
    //     const cabelPartsScore = cabelPartsTests.reduce((partialSum, a) => partialSum + a.GetResult(), 0);
    //     const cabelCheckScore = cabelCheckTests.reduce((partialSum, a) => partialSum + a.GetResult(), 0);
    //     // result.push(new ResultBlock("Расшифровка маркировки кабеля силовой сети", cabelPartsScore / cabelPartsTests.length));
    //     // result.push(new ResultBlock("Проверка соответствия кабеля силовой сети", cabelCheckScore / cabelCheckTests.length));
    // }
}