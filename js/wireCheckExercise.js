class WireCheckExercise extends Exercise {
    constructor(tasksCount) {
        super();

        this.caption = "Проверка соответствия проводов осветительной сети классу пожароопасной зоны";

        for (let i = 0; i < tasksCount; i++) {
            this.tasks.push(new WireCheckTask());
        }
    }
}
