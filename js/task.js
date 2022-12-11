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
        for (const test of this.tests) {
            result += test.GetResult();
        }
        result /= this.tests.length;
        return result;
    }
}