class CabelCheckTask extends TaskBase {
    cabelThreadTest = OneInManySelectTest.prototype;
    cabelIsolateTest = OneInManySelectTest.prototype;
    cabelCoverTest = OneInManySelectTest.prototype;
    cabelBronTest = OneInManySelectTest.prototype;
    cabelUnderBronTest = null;
    cabelOuterCoverTest = null;
    cabelThreadCheckTask = OneInManySelectTest.prototype;
    cabelIsolateCheckTask = OneInManySelectTest.prototype;
    cabelCoverCheckTask = OneInManySelectTest.prototype;

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

        //проверка
        ???
        const isSatisfy = "соответствует";
        const isNotSatisfy = "не соответствует";
        let cabelThreadCheckTask = new CabelPartCheckTest("spanCabelThreadCheckTask", isSatisfy);
        this.Tasks.push(cabelThreadCheckTask);

        let PE = [Isolate_П, Isolate_Пс, Isolate_Пв, Isolate_Пвс];
        let isolateSatisfy = PE.includes(cabelIsolateTest.CorrectOptionObject) ? isNotSatisfy : isSatisfy;
        let cabelIsolateCheckTask = new CabelPartCheckTest("spanCabelIsolateCheckTask", isolateSatisfy);
        this.Tasks.push(cabelIsolateCheckTask);

        let coverSatisfy = cabelCoverTest.CorrectOptionObject == Cover_П ? isNotSatisfy : isSatisfy;
        let cabelCoverCheckTask = new CabelPartCheckTest("spanCabelCoverCheckTask", coverSatisfy);
        this.Tasks.push(cabelCoverCheckTask);

        let marking = "";
        if (sIsolate == "Ц") marking = sIsolate + sThread + sCover + sBron + sUnderBron + sOuterCover;
        else if (sIsolate == "-В") marking = sThread + sCover + sBron + sUnderBron + sOuterCover + sIsolate;
        else if (sIsolate == "Р") marking = sThread + sCover + sIsolate + sBron + sUnderBron + sOuterCover;
        else marking = sThread + sIsolate + sCover + sBron + sUnderBron + sOuterCover;

        document.getElementById("spanCabelMarking").innerText = marking;

        for (const task of this.Tasks) {
            task.Init();
        }





        this.substanceName = substanceName;

        this.tests.push(new OneInManySelectTest(
            "",
            ["IIA", "IIB", "IIC"],
            category,
            "категория..."
        ));

        this.tests.push(new OneInManySelectTest(
            "",
            ["T1", "T2", "T3", "T4", "T5", "T6"],
            group,
            "группа..."
        ));
    }

    GetHtmlElement() {
        const div = document.createElement("div");

        const caption = document.createElement("h3");
        caption.innerHTML = `Определите категорию и группу взрывоопасной смеси:<br/>${this.substanceName}`;
        div.appendChild(caption);

        div.appendChild(this.tests[0].GetHtmlElement());
        div.appendChild(this.tests[1].GetHtmlElement());

        return div;
    }
}