class TaskBase {
    tests = [];

    IsComplete() {
        return true;
    }

    GetResult() {
        let result = 0;
        for (let i = 0; i < this.tests.length; i++) {
            result += this.tests[i].GetResult();            
        }
        return result;
    }
}