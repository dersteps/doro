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
        this._paused = true;
        this.remaining = timeInMilliseconds;
    }

    get name() {
        return this.type;
    }

    get paused() {
        return this._paused;
    }

    set paused(val) {
        this._paused = val;
        if(this._paused === false) {
            this.started = Date.now();
        }
    }

    pause() {
        this._paused = true;
    }

    resume() {
        this._paused = false;
        this.started = Date.now();
    }

    start(updateCallback, finishedCallback) {
        console.log("Starting pomodoro '" + this.type + "'");
        this._paused = false;
        this.started = Date.now();
        this.updateCallback = updateCallback;
        this.finishedCallback = finishedCallback;
        this.timer = setInterval(() => {
            if(!this._paused === true) {
                const remaining = this.remaining - (Date.now() - this.started);
                console.log(remaining);
                this.updateCallback(remaining, this);
                if(remaining <= 0) {
                    this.finishedCallback(this);
                    clearInterval(this.timer);
                }
            }
        }, 100);
    }

}