class ClassZoneExercise extends Exercise {
    constructor(tasksCount) {
        super();
        this.caption = "Определение класса зоны по ПУЭ";
        this.tasks = RandomSelect(ClassZoneTasks, tasksCount);
    }
}
