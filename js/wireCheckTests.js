class WirePart {
    description = "";
    constructor(description) {
        this.description = description;
    }
}

const WireThread_М = new WirePart("медные");
const WireThread_А = new WirePart("алюминиевые");

const WireIsolate_В = new WirePart("поливинилхлоридная");
const WireIsolate_П = new WirePart("полиэтиленовая");
const WireIsolate_Р = new WirePart("резиновая");

const WireFeature_н = new WirePart("нет");
const WireFeature_2 = new WirePart("гибкий");
const WireFeature_3 = new WirePart("повышенной гибкости");
const WireFeature_4 = new WirePart("особо гибкий");
const WireFeature_ТО = new WirePart("в оплётке из х/б пряжи, пропитанной противогнилостным составом");
const WireFeature_П = new WirePart("плоский, с разделительным основанием");
const WireFeature_ВД = new WirePart("гибкий, в ПВХ оболочке, двухжильный");
const WireFeature_Д = new WirePart("в оплётке из х/б пряжи, двухжильный");
const WireFeature_С = new WirePart("плоский, без разделительного основания");
const WireFeature_Cover_П = new WirePart("в полиэтиленовой оболочке");
const WireFeature_Cover_В = new WirePart("в поливинилхлоридной оболочке");
const WireFeature_Cover_ВЗ = new WirePart("в поливинилхлоридной оболочке с круглым защитным проводом");
const WireFeature_Cover_ГН = new WirePart("с гибкой жилой, в резиновой (найритовой) негорючей оболочке");
const WireFeature_Cover_Н = new WirePart("в резиновой (найритовой) негорючей оболочке");
const WireFeature_Cover_Пров = new WirePart("в оплётке из стальных оцинкованных проволок");
const WireFeature_Cover_РПров = new WirePart("в резиновой оболочке, в оплётке из стальных оцинкованных проволок");
const WireFeature_Cover_Ф = new WirePart("в металлической фальцованной защитной оболочке из сплава АМЦ");
const WireFeature_Cover_Фл = new WirePart("в металлической фальцованной защитной оболочке из латуни");

class Wire {
    marks = "";
    thread = WireThread_М;
    isolate = WireIsolate_В;
    feature = WireFeature_н;
    constructor(marks, thread, isolate, feature) {
        this.marks = marks;
        this.thread = thread;
        this.isolate = isolate;
        this.feature = feature;
    }
}

const WIRES = [
    new Wire("ПВ", WireThread_М, WireIsolate_В, WireFeature_н),
    new Wire("ПВ-1", WireThread_М, WireIsolate_В, WireFeature_н),
    new Wire("ПВ-2", WireThread_М, WireIsolate_В, WireFeature_2),
    new Wire("ПВ-3", WireThread_М, WireIsolate_В, WireFeature_3),
    new Wire("ПВ-4", WireThread_М, WireIsolate_В, WireFeature_4),
    new Wire("АПВ", WireThread_А, WireIsolate_В, WireFeature_н),
    new Wire("ПП", WireThread_М, WireIsolate_П, WireFeature_н),
    new Wire("АПП", WireThread_А, WireIsolate_П, WireFeature_н),
    new Wire("ПР", WireThread_М, WireIsolate_Р, WireFeature_н),
    new Wire("АПР", WireThread_А, WireIsolate_Р, WireFeature_н),
    new Wire("ПРТО", WireThread_М, WireIsolate_Р, WireFeature_ТО),
    new Wire("АПРТО", WireThread_А, WireIsolate_Р, WireFeature_ТО),
    new Wire("ППР", WireThread_М, WireIsolate_Р, WireFeature_П),
    new Wire("АППР", WireThread_А, WireIsolate_Р, WireFeature_П),
    new Wire("ПРВД", WireThread_М, WireIsolate_Р, WireFeature_ВД),
    new Wire("ПРД", WireThread_М, WireIsolate_Р, WireFeature_Д),
    new Wire("ППВС", WireThread_М, WireIsolate_В, WireFeature_С),
    new Wire("АППВС", WireThread_А, WireIsolate_В, WireFeature_С),
    new Wire("ВПП", WireThread_М, WireIsolate_П, WireFeature_Cover_П),
    new Wire("ВПВ", WireThread_М, WireIsolate_П, WireFeature_Cover_В),
    new Wire("ПВВЗ", WireThread_М, WireIsolate_В, WireFeature_Cover_ВЗ),
    new Wire("ПРГН", WireThread_М, WireIsolate_Р, WireFeature_Cover_ГН),
    new Wire("ПРН", WireThread_М, WireIsolate_Р, WireFeature_Cover_Н),
    new Wire("АПРН", WireThread_А, WireIsolate_Р, WireFeature_Cover_Н),
    new Wire("ПРП", WireThread_М, WireIsolate_Р, WireFeature_Cover_Пров),
    new Wire("ПРРП", WireThread_М, WireIsolate_Р, WireFeature_Cover_РПров),
    new Wire("АПРРП", WireThread_А, WireIsolate_Р, WireFeature_Cover_РПров),
    new Wire("ПРФ", WireThread_М, WireIsolate_Р, WireFeature_Cover_Ф),
    new Wire("АПРФ", WireThread_А, WireIsolate_Р, WireFeature_Cover_Ф),
    new Wire("ПРФл", WireThread_М, WireIsolate_Р, WireFeature_Cover_Фл)
];

class WireThreadTest extends OneInManySelectTest {
    constructor(correctOption) {
        let options = [WireThread_М.description, WireThread_А.description];
        super("", options, correctOption, "???");
    }
}

class WireIsolateTest extends OneInManySelectTest {
    constructor(correctOption) {
        let options = [
            WireIsolate_В.description,
            WireIsolate_П.description,
            WireIsolate_Р.description
        ];
        super("", options, correctOption, "???");
    }
}

class WireFeatureTest extends OneInManySelectTest {
    constructor(correctOption) {
        let options = [
            WireFeature_н.description,
            WireFeature_2.description,
            WireFeature_3.description,
            WireFeature_4.description,
            WireFeature_ТО.description,
            WireFeature_П.description,
            WireFeature_ВД.description,
            WireFeature_Д.description,
            WireFeature_С.description,
            WireFeature_Cover_П.description,
            WireFeature_Cover_В.description,
            WireFeature_Cover_ВЗ.description,
            WireFeature_Cover_ГН.description,
            WireFeature_Cover_Н.description,
            WireFeature_Cover_Пров.description,
            WireFeature_Cover_РПров.description,
            WireFeature_Cover_Ф.description,
            WireFeature_Cover_Фл.description
        ];
        super("", options, correctOption, "???");
    }
}

const WireLayingStaples = "на скобах";
const WireLayingHawser = "на тросах";
const WireLayingTube = "в трубе";

class WirePartCheckTest extends OneInManySelectTest {
    constructor(correctOption) {
        super("", ["соответствует", "не соответствует"], correctOption, "???");
    }
}