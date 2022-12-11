class DeviceCheckExercise extends Exercise {
    constructor(tasksCount) {
        super();

        this.caption = "Проверка соответствия электрооборудования классу взрывоопасной зоны";

        for (let i = 0; i < tasksCount; i++) {
            //класс зоны
            const classZone = RandomSelect(["В-I", "В-Iа", "В-Iг"], 1)[0];

            //категория, группа
            const categoryAndGroupTask = RandomSelect(CategoryAndGroupTasks, 1)[0];

            //маркировка
            const deviceMarkingTask = new DeviceMarkingTask();

            //тип оборудования
            const deviceTypes = [
                {
                    DeviceType: DeviceTypeEnum.MOTOR,
                    DeviceName: "Электродвигатель"
                },
                {
                    DeviceType: DeviceTypeEnum.APPARATE_FIXED,
                    DeviceName: "Магнитный пускатель"
                },
                {
                    DeviceType: DeviceTypeEnum.LAMP_FIXED,
                    DeviceName: "Светильник"
                },
                {
                    DeviceType: DeviceTypeEnum.LAMP_MOBILE,
                    DeviceName: "Переносной светильник"
                }
            ];
            const selectedDeviceType = RandomSelect(deviceTypes, 1)[0];

            //проверка соответствия
            this.tasks.push(new DeviceCheckTask(
                classZone,
                categoryAndGroupTask.tests[0].correctOption,
                categoryAndGroupTask.tests[1].correctOption,
                selectedDeviceType.DeviceType,
                `${selectedDeviceType.DeviceName} ${deviceMarkingTask.marking}`,
                deviceMarkingTask.tests[0].correctOption,
                deviceMarkingTask.tests[2].correctOptions,
                deviceMarkingTask.tests[3].correctOptions
            ));
        }
    }
}
