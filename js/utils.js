function RandomSelect(options, count) {
    if (count > options.length)
        count = options.length;

    let result = [];
    let inserted = [];
    let i = 0;
    while (i < count) {
        let ind = Math.round(Math.random() * (options.length - 1));
        if (inserted.indexOf(ind) < 0) {
            result.push(options[ind]);
            inserted.push(ind);
            i++;
        }
    }

    return result;
}

function RandomSelectOne(options) {
    return RandomSelect(options, 1)[0];
}

function LevelToString(level) {
    switch (level) {
        case 0:
            return "особовзрывобезопасное электрооборудование";
        case 1:
            return "взрывобезопасное электрооборудование";
        case 2:
            return "электрооборудование повышенной надежности против взрыва";
        default:
            alert("Ошибка LevelToString");
    }
}

function TypeToString(type) {
    switch (type) {
        case "d":
            return "взрывонепроницаемая оболочка";
        case "ia":
        case "ib":
        case "ic":
            return "искробезопасная электрическая цепь";
        case "e":
            return "повышенная надежность против взрыва";
        case "p":
            return "заполнение или продувка оболочки под избыточным давлением защитным газом";
        case "o":
            return "масляное заполнение оболочки с токоведущими частями";
        case "q":
            return "кварцевое заполнение оболочки с токоведущими частями";
        case "s":
            return "специальный вид взрывозащиты";
        default:
            alert("Ошибка TypeToString");
    }
}
