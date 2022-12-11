const StateEnum = {
    USERNAME: 0,
    SELECTEXERCISE: 1,
    EXERCISE: 2,
    RESULT: 3
}

var state = StateEnum.SELECTEXERCISE;
var exerciseIndex = -1;
var exercise = Exercise.prototype;
var divExercise = HTMLElement.prototype;
var divResult = HTMLElement.prototype;
var startTime;

window.onload = () => {
    divExercise = document.getElementById("divExercise");
    divResult = document.getElementById("divResult");
    Clear();
}

function Clear() {
    divResult.innerHTML = "";
    state = StateEnum.SELECTEXERCISE;
}

function OnSelectExerciseChange(option) {
    exerciseIndex = parseInt(option.value);
}

function btnNextClick() {
    switch (state) {
        case StateEnum.SELECTEXERCISE:
            switch (exerciseIndex) {
                case 0:
                    exercise = new ClassZoneExercise(3);
                    break;
                case 1:
                    exercise = new CategoryAndGroupExercise(3);
                    break;
                case 2:
                    exercise = new DeviceMarkingExercise(1);
                    break;
                // case 3:
                //     break;
                // case 4:
                //     break;
                // case 5:
                //     break;
                // case 6:
                //     break;
                // case 7:
                //     break;
                default:
                    return;
            }
            document.getElementById("divSelectExercise").hidden = true;
            exercise.Begin();
            divExercise.innerHTML = "";
            divExercise.appendChild(exercise.GetCurrentTask().GetHtmlElement());
            startTime = new Date().getTime();
            state = StateEnum.EXERCISE;
            break;
        case StateEnum.EXERCISE:
            const task = exercise.GetCurrentTask();
            if (task.IsComplete()) {
                if (exercise.Next()) {
                    divExercise.innerHTML = "";
                    divExercise.appendChild(exercise.GetCurrentTask().GetHtmlElement());
                }
                else {
                    divExercise.innerHTML = "";
                    ShowResult();
                    state = StateEnum.RESULT;
                }
            }
            break;
        case StateEnum.RESULT:
            Clear();
            document.getElementById("divSelectExercise").hidden = false;
            break;
        default:
            break;
    }
}

function ShowResult() {    
    const caption = document.createElement("h3");
    caption.innerText = exercise.caption;
    divResult.appendChild(caption);

    const count = document.createElement("p");
    count.innerText = `Количество вопросов: ${exercise.tasks.length}.`;
    divResult.appendChild(count);
    
    const proc = Math.round(exercise.GetResult() * 100).toString();
    const pProc = document.createElement("p");
    pProc.innerText = `Результат: ${proc}%.`;
    divResult.appendChild(pProc);
    
    const now = new Date().getTime();
    const testTime = new Date(now - startTime + new Date().getTimezoneOffset() * 60 * 1000);
    const pTestTime = document.createElement("p");
    pTestTime.innerText = testTime.toLocaleTimeString();
    divResult.appendChild(pTestTime);
}