let DeviceTypeEnum = {
    MOTOR: 0,
    APPARATE_FIXED: 1,
    APPARATE_MOBILE: 2,
    LAMP_FIXED: 3,
    LAMP_MOBILE: 4
}

class DeviceCheckTask extends TaskBase {
    classZone = "";
    substanceCategory = "";
    substanceGroup = "";
    deviceName = "";

    constructor(classZone, substanceCategory, substanceGroup, deviceType, deviceName, deviceLevel, deviceGroupArray, deviceTempClassArray) {
        super();

        this.classZone = classZone;
        this.substanceCategory = substanceCategory;
        this.substanceGroup = substanceGroup;
        this.deviceName = deviceName;

        //соответствие уровня
        let levelCorrectOption = "";
        if (deviceLevel == LevelToString(0) || deviceLevel == LevelToString(1))
            levelCorrectOption = "соответствует";
        else {
            switch (deviceType) {
                case DeviceTypeEnum.MOTOR:
                case DeviceTypeEnum.APPARATE_FIXED:
                case DeviceTypeEnum.LAMP_FIXED:
                    if (classZone == "В-I")
                        levelCorrectOption = "не соответствует";
                    else
                        levelCorrectOption = "соответствует";
                    break;
                case DeviceTypeEnum.APPARATE_MOBILE:
                case DeviceTypeEnum.LAMP_MOBILE:
                    if (classZone == "В-I" || classZone == "В-Iа")
                        levelCorrectOption = "не соответствует";
                    else
                        levelCorrectOption = "соответствует";
                    break;
            }
        }
        this.tests.push(new OneInManyRadioTest(
            "Соответствие по уровню взрывозащиты:",
            ["соответствует", "не соответствует"],
            levelCorrectOption
        ))

        //соответствие категории в.о.с.
        this.tests.push(new OneInManyRadioTest(
            "Соответствие по категории взрывоопасной смеси:",
            ["соответствует", "не соответствует"],
            deviceGroupArray.indexOf(substanceCategory) < 0 ? "не соответствует" : "соответствует"
        ))

        //соответствие группе в.о.с.
        this.tests.push(new OneInManyRadioTest(
            "Соответствие по группе взрывоопасной смеси:",
            ["соответствует", "не соответствует"],
            deviceTempClassArray.indexOf(substanceGroup) < 0 ? "не соответствует" : "соответствует"
        ))
    }

    GetHtmlElement() {
        const div = document.createElement("div");

        const caption = document.createElement("h3");
        caption.innerText = "Проверка соответствия электрооборудования классу взрывоопасной зоны";
        div.appendChild(caption);

        const pClassZone = document.createElement("p");
        pClassZone.innerText = `Класс зоны: ${this.classZone}.`;
        div.appendChild(pClassZone);

        const pCatAndGroup = document.createElement("p");
        pCatAndGroup.innerText = `Категория и группа взрывоопасной смеси: ${this.substanceCategory} ${this.substanceGroup}.`;
        div.appendChild(pCatAndGroup);

        const pDeviceName = document.createElement("p");
        pDeviceName.innerText = this.deviceName;
        div.appendChild(pDeviceName);

        for (const test of this.tests) {
            div.appendChild(test.GetHtmlElement());
        }

        return div;
    }
}
