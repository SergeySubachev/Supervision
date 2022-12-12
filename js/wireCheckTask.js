class WireCheckTask extends TaskBase {
    wireThreadTest = OneInManySelectTest.prototype;
    wireIsolateTest = OneInManySelectTest.prototype;
    wireFeatureTest = OneInManySelectTest.prototype;
    wireLaying = WireLayingStaples;
    marking = "";

    wireThreadCheckTest = OneInManySelectTest.prototype;
    wireIsolateCheckTest = OneInManySelectTest.prototype;
    wireFeatureCheckTest = OneInManySelectTest.prototype;
    wireLayingCheckTest = OneInManySelectTest.prototype;

    constructor() {
        super();

        //провод
        const wire = RandomSelectOne(WIRES);
        this.marking = wire.marks;
        this.wireThreadTest = new WireThreadTest(wire.thread.description);
        this.wireIsolateTest = new WireIsolateTest(wire.isolate.description);
        this.wireFeatureTest = new WireFeatureTest(wire.feature.description);
        this.tests = [this.wireThreadTest, this.wireIsolateTest, this.wireFeatureTest];

        //проверка соответствия
        const isSatisfy = "соответствует";
        const isNotSatisfy = "не соответствует";

        this.wireThreadCheckTest = new WirePartCheckTest(isSatisfy);
        this.tests.push(this.wireThreadCheckTest);

        //7.4.36. В пожароопасных зонах любого класса кабели и провода должны иметь покров и оболочку из материалов, 
        //не распространяющих горение. Применение кабелей с горючей полиэтиленовой изоляцией не допускается.
        const isolateSatisfy = wire.isolate == WireIsolate_П ? isNotSatisfy : isSatisfy;
        this.wireIsolateCheckTest = new WirePartCheckTest(isolateSatisfy);
        this.tests.push(this.wireIsolateCheckTest);

        const featureSatisfy = [WireFeature_ТО, WireFeature_Д, WireFeature_Cover_П].includes(wire.feature) ? isNotSatisfy : isSatisfy;
        this.wireFeatureCheckTest = new WirePartCheckTest(featureSatisfy);
        this.tests.push(this.wireFeatureCheckTest);

        //7.4.38. Прокладка незащищенных изолированных проводов с алюминиевыми жилами в пожароопасных зонах 
        //любого класса должна производиться в трубах и коробах.
        this.wireLaying = RandomSelectOne([WireLayingStaples, WireLayingHawser, WireLayingTube]);
        const isProtected = [WireFeature_Cover_Пров, WireFeature_Cover_РПров, WireFeature_Cover_Ф, WireFeature_Cover_Фл].includes(wire.feature);
        const isAluminum = wire.thread == WireThread_А;
        const layingSatisfy = !isProtected && isAluminum && this.wireLaying != WireLayingTube ? isNotSatisfy : isSatisfy;
        this.wireLayingCheckTest = new WirePartCheckTest(layingSatisfy);
        this.tests.push(this.wireLayingCheckTest);
    }

    GetHtmlElement() {
        const div = document.createElement("div");

        const caption = document.createElement("h3");
        caption.innerHTML = "Проверка соответствия проводов осветительной сети классу пожароопасной зоны";
        div.appendChild(caption);

        const pClassZone = document.createElement("p");
        pClassZone.innerHTML = "Класс зоны: П-IIа.";
        div.appendChild(pClassZone);

        const pMarking = document.createElement("p");
        pMarking.innerHTML = `Провод марки ${this.marking}.`;
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
                    td.appendChild(this.wireThreadTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.wireThreadCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Изоляция";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.wireIsolateTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.wireIsolateCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Особенности";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.wireFeatureTest.GetHtmlElement());
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.wireFeatureCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                {
                    let td = document.createElement("td");
                    td.innerText = "Способ прокладки:";
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.innerText = this.wireLaying;
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(this.wireLayingCheckTest.GetHtmlElement());
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.classList.add("w3-table");
            table.classList.add("w3-bordered");
            table.appendChild(tbody);
        }
        div.appendChild(table);

        return div;
    }
}