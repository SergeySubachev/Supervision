class DeviceMarkingExercise extends Exercise {
    constructor(tasksCount) {
        super();

        this.caption = "Расшифровка маркировки взрывозащищенного электрооборудования";
        for (var i = 0; i < tasksCount; i++) {
            this.tasks.push(new DeviceMarkingTask());
        }
    }
}
