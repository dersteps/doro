class SessionOLD {
    /**
     * 
     * @param {number} worktime The amount of work in a pomodoro in milliseconds
     * @param {number} breaktime 
     * @param {number} workIterations 
     * @param {number} bigbreaktime 
     */
    constructor(worktime, breaktime, workIterations, bigbreaktime) {
        this.worktime = worktime;
        this.breaktime = breaktime;
        this.workIterations = workIterations;
        this.bigbreaktime = bigbreaktime;
        this.currentIndex = 0;
    }



    set updateCallback(callbackFunc) {
        this.updateCallback = callbackFunc;
    }

    init() {
        this.pomodoros = [];
        for(var i=0; i<this.workIterations; i++) {
            this.pomodoros.push(new Pomodoro(this.worktime, "Work #" + (i+1)));
            this.pomodoros.push(new Pomodoro(this.breaktime, "Break #" + (i+1)));
        }

        // Remove last one and add big break instead
        this.pomodoros[this.pomodoros.length - 1] = new Pomodoro(this.bigbreaktime, "Big Break");
    }

    
    start() {
        if(this.pomodoros === undefined) { this.init(); }

        this.pomodoros[this.currentIndex].start((remaining, pomodoro) => {
            if(this.updateCallback !== undefined) {
                this.updateCallback(toHuman(remaining));
            }
        }, (pomodoro) => {
            let notif = new Notification(pomodoro.name + " is done!", { body: "Pomodoro '" + pomodoro.name + "' is done!"});
            notif.onclick = () => { };
            this.currentIndex++;
            if(this.currentIndex >= this.pomodoros.length) { 
                console.log("Session is complete");
                let notif = new Notification("Done", {body: 'Session is complete'});
                notif.onclick = () => { };
                return;
            }
            this.start();
        });
    }


}