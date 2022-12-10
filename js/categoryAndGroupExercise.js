class CategoryAndGroupExercise extends Exercise {
    constructor(tasksCount) {
        super();

        this.caption = "Определение категории и группы взрывоопасной смеси";

        this.tasks = RandomSelect(CategoryAndGroupTasks, tasksCount);
    }
}
