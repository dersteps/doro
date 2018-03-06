class Session {
    /**
     * 
     * @param {number} worktime The amount of work in a pomodoro in milliseconds
     * @param {number} breaktime 
     * @param {number} workIterations 
     * @param {number} bigbreaktime 
     */
    constructor() {
        this.pomodoros = [];
        this.currentIndex = -1;
    }

    /**
     * Adds a new pomodoro to this session.
     * @param {Pomodoro} pomodoro 
     */
    add(pomodoro) {
        console.log("Adding new pomodoro: '" + pomodoro.name + "'");
        this.pomodoros.push(pomodoro);
    }

    next() {
        const nextIndex = this.currentIndex + 1;
        if(nextIndex > this.pomodoros.length - 1) { return null; }
        console.log("Next index: " + nextIndex);
        this.currentIndex = nextIndex;
        return this.pomodoros[nextIndex];
        
    }

    set index(newIndex) {
        this.currentIndex = newIndex;
    }

    get index() {
        return this.currentIndex;
    }
    
    /*init() {
        this.currentIndex = 0;

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
    }*/


}