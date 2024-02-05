class Timer{
    constructor(timer){
        this.container = null;//container
        this.nums = null;//h4 for display timer
        this.timer = timer;//timer
        this.isRunning = false;//check if runs
        this.start = null;//startTime
        this.elapsed = 0;//elapsed
        this.init();
    }

    init(){
        this.container = document.createElement('section');
        this.nums = document.createElement('h4');
        this.container.classList.add('timer__container');
        this.nums.classList.add('timer__numbers');

        this.container.append(this.nums);
    }

    getHTML(){
        return this.container;
    }

    getTimer(){
        return this.nums;
    }


    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.start = Date.now() - this.elapsed;
            this.updateTime();
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearTimeout(this.timer);
        }
    }

    resetStopwatch() {
        this.stop();
        this.elapsed = 0;
        this.updateHTML();
    }

    updateTime() {
        console.log('time')
        this.elapsed = Date.now() - this.start;
        this.updateHTML();
        this.timer = setTimeout( () => this.updateTime(), 1000);
    }

    // updateTimeout() {
    //     console.log('timeout')
    //     this.updateTime(); //type error is not a function at 2 iteration
    //     this.timer = setTimeout(this.updateTimeout, 1000);
    // }

    updateHTML() {
        const minutes = Math.floor(this.elapsed / 60000);
        const seconds = Math.floor((this.elapsed % 60000) / 1000);

        this.nums.textContent = `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }
}

export default Timer;