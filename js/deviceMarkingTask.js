class DeviceMarkingTask extends TaskBase {
    marking = "";

    constructor() {
        super();

        //уровень
        const level = Math.round(Math.random() * 2);
        this.tests.push(new OneInManySelectTest(
            "",
            [0, 1, 2].map(function(v) {
                return LevelToString(v);
            }),
            LevelToString(level),
            "Уровень взрывозащиты..."
        ))

        //вид(ы)
        let allTypes = [];
        switch (level) {
            case 0:
                allTypes = ["d", "ia", "p", "o", "q", "s"]
                break;
            case 1:
                allTypes = ["d", "ib", "p", "o", "q", "s"]
                break;
            case 2:
                allTypes = ["d", "ic", "e", "p", "o", "q", "s"]
                break;
        }
        const n = 1 + Math.round(Math.random()); //1 или 2 вида
        const selectedTypes = RandomSelect(allTypes, n);
        let selectedTypesStrings = [];
        for (let i = 0; i < selectedTypes.length; i++) {
            selectedTypesStrings.push(TypeToString(selectedTypes[i]));
        }
        const allOpts = ["d", "ic", "e", "p", "o", "q", "s"];
        let allOptsStrings = [];
        for (let i = 0; i < allOpts.length; i++) {
            allOptsStrings.push(TypeToString(allOpts[i]));
        }

        this.tests.push(new ManyInManyTest(
            "Вид(ы) взрывозащиты:",
            allOptsStrings,
            selectedTypesStrings
        ));

        //группа/подгруппа
        const allGroups = ["II", "IIA", "IIB", "IIC"];
        const selectedGroup = allGroups[Math.round(Math.random() * (allGroups.length - 1))];
        let correctGroups = [];
        switch (selectedGroup) {
            case "IIA":
                correctGroups = ["IIA"];
                break;
            case "IIB":
                correctGroups = ["IIA", "IIB"];
                break;
            case "II":
            case "IIC":
                correctGroups = ["IIA", "IIB", "IIC"];
                break;
        }
        this.tests.push(new ManyInManyTest(
            "Является взрывозащищенным для взрывоопасных смесей категории(ий):",
            ["I", "IIA", "IIB", "IIC"],
            correctGroups
        ))

        //температурный класс
        const allTemps = ["T1", "T2", "T3", "T4", "T5", "T6"];
        const selectedTemp = allTemps[Math.round(Math.random() * (allTemps.length - 1))];
        let correctTemps = [];
        switch (selectedTemp) {
            case "T1":
                correctTemps = ["T1"]; break;
            case "T2":
                correctTemps = ["T1", "T2"]; break;
            case "T3":
                correctTemps = ["T1", "T2", "T3"]; break;
            case "T4":
                correctTemps = ["T1", "T2", "T3", "T4"]; break;
            case "T5":
                correctTemps = ["T1", "T2", "T3", "T4", "T5"]; break;
            case "T6":
                correctTemps = ["T1", "T2", "T3", "T4", "T5", "T6"]; break;
        }
        this.tests.push(new ManyInManyTest(
            "Является взрывозащищенным для взрывоопасных смесей групп(ы):",
            ["T1", "T2", "T3", "T4", "T5", "T6"],
            correctTemps
        ))

        let typesMarking = "";
        for (var i = 0; i < selectedTypes.length; i++) {
            typesMarking += selectedTypes[i];
        }
        this.marking = `${level}Ex${typesMarking}${selectedGroup}${selectedTemp}`;
    }

    GetHtmlElement() {
        const div = document.createElement("div");

        const caption = document.createElement("h3");
        caption.innerHTML = "Расшифруйте маркировку взрывозащищенного электрооборудования:";
        div.appendChild(caption);

        const pMarking = document.createElement("h2");
        pMarking.innerText = this.marking;
        div.appendChild(pMarking);

        for (const test of this.tests) {
            div.appendChild(test.GetHtmlElement());
        }

        return div;
    }
}
