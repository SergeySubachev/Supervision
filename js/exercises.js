class Exercise {
    caption = " ";
    tasks = [];
    currentTaskIndex = -1;

    Begin() {
        this.currentTaskIndex = 0;
    }

    GetCurrentTask() {
        if (this.currentTaskIndex >= 0)
            return this.tasks[this.currentTaskIndex];
        else
            return null;
    }

    Next() {
        this.currentTaskIndex++;
        return this.currentTaskIndex < this.tasks.length;
    }

    GetResult() {
        let sum = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            sum += this.tasks[i].GetResult();
        }
        return sum / this.tasks.length;
    }
}
