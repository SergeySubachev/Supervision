class CabelPart {
    marks = "";
    description = "";
    constructor(marks, description) {
        this.marks = marks;
        this.description = description;
    }
}

const Thread_М = new CabelPart("", "медные");
const Thread_А = new CabelPart("А", "алюминиевые");

const Isolate_Б = new CabelPart("", "бумажная");
const Isolate_Ц = new CabelPart("Ц", "бумажная, пропитанная нестекающим составом");
const Isolate__В = new CabelPart("-В", "бумажная с обедненной пропиткой");
const Isolate_В = new CabelPart("В", "поливинилхлоридная");
const Isolate_П = new CabelPart("П", "полиэтиленовая");
const Isolate_Пс = new CabelPart("Пс", "из самозатухающего полиэтилена");
const Isolate_Пв = new CabelPart("Пв", "из вулканизированного полиэтилена");
const Isolate_Пвс = new CabelPart("Пвс", "из вулканизированного самозатухающего полиэтилена");
const Isolate_Р = new CabelPart("Р", "резиновая");

const Cover_А = new CabelPart("А", "алюминиевая");
const Cover_СТ = new CabelPart("СТ", "стальная гофрированная");
const Cover_В = new CabelPart("В", "поливинилхлоридная");
const Cover_С = new CabelPart("С", "свинцовая");
const Cover_П = new CabelPart("П", "полиэтиленовая");
const Cover_Н = new CabelPart("Н", "найритовая");

const Bron_н = new CabelPart("", "небронированный");
const Bron_Б = new CabelPart("Б", "2 стальные оцинкованные ленты");
const Bron_П = new CabelPart("П", "плоские стальные оцинкованные проволоки");
const Bron_К = new CabelPart("К", "круглые стальные оцинкованные проволоки");

const UnderBron_н = new CabelPart("", "нормальная (битум, кабельная бумага, кабельная пряжа)");
const UnderBron_л = new CabelPart("л", "усиленная (битум, кабельная бумага, кабельная пряжа, один слой пластмассовой ленты)");
const UnderBron_2л = new CabelPart("2л", "особо усиленная (битум, кабельная бумага, кабельная пряжа, два слоя пластмассовой ленты)");
const UnderBron_п = new CabelPart("п", "с полиэтиленовым шлангом (битум, пластмассовая лента, ПЭ шланг, кабельная бумага)");
const UnderBron_в = new CabelPart("в", "с поливинилхлоридным шлангом (битум, пластмассовая лента, ПВХ шланг, кабельная бумага)");
const UnderBron_б = new CabelPart("б", "без подушки под броней");

const OuterCover_норм = new CabelPart("", "нормальный (битум, кабельная пряжа)");
const OuterCover_Шп = new CabelPart("Шп", "полиэтиленовый шланг");
const OuterCover_Шв = new CabelPart("Шв", "поливинилхлоридный шланг");
const OuterCover_н = new CabelPart("н", "негорючий (негорючий состав, пряжа из штапельрованного стекловолокна)");
const OuterCover_Г = new CabelPart("Г", "без наружного покрова");

class CabelThreadTest extends OneInManySelectTest {
    correctOptionObject;

    constructor() {
        let optionsObjects = [Thread_М, Thread_А];
        let options = optionsObjects.map(function(item) {
            return item.description;
        })
        super("", options, null, "???");
        this.correctOptionObject = RandomSelectOne(optionsObjects);
        this.correctOption = this.correctOptionObject.description;
    }
}

class CabelIsolateTest extends OneInManySelectTest {
    correctOptionObject;

    constructor() {
        let optionsObjects = [
            Isolate_Б,
            Isolate_Ц,
            Isolate__В,
            Isolate_В,
            Isolate_П,
            Isolate_Пс,
            Isolate_Пв,
            Isolate_Пвс,
            Isolate_Р 
        ];
        let options = optionsObjects.map(function(item) {
            return item.description;
        })
        super("", options, null, "???");
        this.correctOptionObject = RandomSelectOne(optionsObjects);
        this.correctOption = this.correctOptionObject.description;
    }
}

class CabelCoverTest extends OneInManySelectTest {
    correctOptionObject;

    constructor() {
        let optionsObjects = [
            Cover_А,
            Cover_СТ,
            Cover_В,
            Cover_С,
            Cover_П,
            Cover_Н
        ];
        let options = optionsObjects.map(function(item) {
            return item.description;
        })
        super("", options, null, "???");
        this.correctOptionObject = RandomSelectOne(optionsObjects);
        this.correctOption = this.correctOptionObject.description;
    }
}

class CabelBronTest extends OneInManySelectTest {
    correctOptionObject;

    constructor() {
        let optionsObjects = [
            Bron_н,
            Bron_Б,
            Bron_П,
            Bron_К
        ];
        let options = optionsObjects.map(function(item) {
            return item.description;
        })
        super("", options, null, "???");
        this.correctOptionObject = RandomSelectOne(optionsObjects);
        this.correctOption = this.correctOptionObject.description;
    }
}

class CabelUnderBronTest extends OneInManySelectTest {
    correctOptionObject;

    constructor() {
        let optionsObjects = [
            UnderBron_н,
            UnderBron_л,
            UnderBron_2л,
            UnderBron_п,
            UnderBron_в,
            UnderBron_б
        ];
        let options = optionsObjects.map(function(item) {
            return item.description;
        })
        super("", options, null, "???");
        this.correctOptionObject = RandomSelectOne(optionsObjects);
        this.correctOption = this.correctOptionObject.description;
    }
}

class CabelOuterCoverTest extends OneInManySelectTest {
    correctOptionObject;

    constructor() {
        let optionsObjects = [
            OuterCover_норм,
            OuterCover_Шп,
            OuterCover_Шв,
            OuterCover_н,
            OuterCover_Г 
        ];
        let options = optionsObjects.map(function(item) {
            return item.description;
        })
        super("", options, null, "???");
        this.correctOptionObject = RandomSelectOne(optionsObjects);
        this.correctOption = this.correctOptionObject.description;
    }
}

class CabelPartCheckTest extends OneInManySelectTest {
    constructor(correctOption) {
        super("", ["соответствует", "не соответствует"], correctOption, "???");
    }
}