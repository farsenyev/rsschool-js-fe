class QaModule {
    constructor(data, state) {
        this.data = data;
        this.state = state;
        this.correctCounter = 0;
        this.quest = null;
        this.answ = null;
        this.acounter = null;

        this.init()
    }

    init(){
        this.quest = document.createElement('h2');
        this.quest.classList.add('qa__quest');

        this.answ = document.createElement('div');
        this.answ.classList.add('qa__answ');

        const avaregeNumber = document.createElement('h3');
        avaregeNumber.classList.add('qa__counter');
        avaregeNumber.innerHTML = `${this.state.incorrectCounter}/6`;
        this.acounter = avaregeNumber

        this.newGame()

        document.addEventListener('wrong', () => {this.wrongHandler()})
        document.addEventListener('correct', (event) => {this.showLetter(event)})

    }

    newGame(){
        this.correctCounter = 0
        this.state.incorrectCounter = 0
        this.acounter.innerHTML = `${this.state.incorrectCounter}/6`
        const newQuestIndex = this.getRandom(this.data.length)
        if (newQuestIndex !== this.state.lastQuestIndex){
            this.state.lastQuestIndex = newQuestIndex
            const newQuest = this.data[newQuestIndex]
            this.state.answer = newQuest.answer

            this.quest.innerHTML = newQuest.quest
            this.answ.innerHTML = ''
            newQuest.answer.split('').forEach(el => {
                const letter = document.createElement('h3')
                letter.classList.add('qa__letter')

                this.answ.append(letter)
            })
        }else{
            this.newGame()
        }
    }

    showLetter(event){
        const letters = document.querySelectorAll('.qa__letter')
        for (let i = 0; i < letters.length; i++){
            if ( this.state.answer[i] === event.detail && letters[i].innerHTML === ''){
                letters[i].innerHTML = event.detail
                this.correctCounter ++
                if (this.correctCounter === this.state.answer.length){
                    this.sleep(500).then(() =>{
                        // alert('You won!')
                        // call function with congratulation and play again
                        const event = new CustomEvent('gameEnd', {detail: 1})
                        document.dispatchEvent(event)
                        // this.newGame()
                    })
                }
            }
        }
    }

    wrongHandler(){
        this.state.incorrectCounter ++
        this.acounter.innerHTML = `${this.state.incorrectCounter}/6`;
        if (this.state.incorrectCounter >= 6){
            this.sleep(500).then(() =>{
                // alert('You lose!')
                // call function with sorry and play again
                const event = new CustomEvent('gameEnd', {detail: 0})
                document.dispatchEvent(event)
            })
        }
    }



    getRandom(length){
        return Math.floor(Math.random() * length)
    }

    getHTML(){
        const container = document.createElement('section');
        container.classList.add('qa__container')
        container.append(this.quest, this.answ, this.acounter)
        return container
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default QaModule