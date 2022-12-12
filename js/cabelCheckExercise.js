class CabelCheckExercise extends Exercise {
    constructor(tasksCount) {
        super();

        this.caption = "Проверка соответствия кабелей силовой сети классу взрывоопасной зоны";

        for (let i = 0; i < tasksCount; i++) {
            this.tasks.push(new CabelCheckTask());
        }
    }
}
