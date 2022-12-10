class TaskBase {
    tests = [];

    IsComplete() {
        for (const test of this.tests) {
            if (!test.IsComplete()) {
                return false;
            }
        }
        return true;
    }

    GetResult() {
        let result = 0;
        for (let i = 0; i < this.tests.length; i++) {
            result += this.tests[i].GetResult();            
        }
        result /= this.tests.length;
        return result;
    }
}