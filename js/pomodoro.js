class Pomodoro {
    /**
     * Initializes a new instance of the Pomodoro class.
     * A Pomodoro is a single interval with a name, e.g. "break"/1000*60*5 ms
     * @param {long} timeInMilliseconds 
     * @param {string} type 
     */
    constructor(timeInMilliseconds, type) {
        this.time = timeInMilliseconds;
        this.type = type;
    }

    get name() {
        return this.type;
    }

    start(updateCallback, finishedCallback) {
        console.log("Starting pomodoro '" + this.type + "'");
        this.started = Date.now();
        this.updateCallback = updateCallback;
        this.finishedCallback = finishedCallback;
        this.timer = setInterval(() => {
            const remaining = this.time - (Date.now() - this.started);
            console.log(remaining);
            this.updateCallback(remaining, this);
            if(remaining <= 0) {
                this.finishedCallback(this);
                clearInterval(this.timer);
            }
        }, 100);
    }

}