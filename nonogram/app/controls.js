class Timer{
    constructor(timer){
        this.container = null;//container
        this.nums = null;//h4 for display timer
        this.timer = timer;//timer
        this.run = false;//check if runs
        this.start = 0;//startTime
        this.countedTime = 0;//elapsed
        this.init()
    }

    init(){
        this.container = document.createElement('section');
        this.nums = document.createElement('h4')

        this.container.append(this.nums)
    }

    startTimer(){
        if (!this.run){
            this.run = true;
            this.start = Date.now() -this.countedTime;
            this.updateTimeOut();
        }
    }

    stop() {
        if (this.run) {
            this.run = false;
            clearTimeout(this.timer);
        }
    }

    resetStopwatch() {
        this.stop();
        this.countedTime = 0;
        this.updateHtml();
    }

    updateTimeOut(){
        this.update();
        this.timer = setTimeout(this.updateTimeOut, 1000)
    }

    update(){
        this.countedTime = Date.now() - this.start
        this.updateHtml()
    }

    updateHtml() {
        const minutes = Math.floor(this.start / 60000);
        const seconds = Math.floor((this.start % 60000) / 1000);

        // document.getElementById('stopwatch')
        this.nums.textContent = `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    stopStopwatch() {
        if (this.run) {
            this.run = false;
            clearTimeout(this.timer);
        }
    }

    getHTML(){
        return this.container
    }
}

export default Timer