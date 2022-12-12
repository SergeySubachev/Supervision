class DeviceCheckExercise extends Exercise {
    constructor(tasksCount) {
        super();

        this.caption = "Проверка соответствия электрооборудования классу взрывоопасной зоны";

        for (let i = 0; i < tasksCount; i++) {
            //класс зоны
            const classZone = RandomSelectOne(["В-I", "В-Iа", "В-Iг"]);

            //категория, группа
            const categoryAndGroupTask = RandomSelectOne(CategoryAndGroupTasks);

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
            const selectedDeviceType = RandomSelectOne(deviceTypes);

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
