class QaModule {
    constructor(data, state) {
        this.data = data;
        this.state = state;
        this.quest = null;
        this.answ = null

        this.init()
    }

    init(){
        this.quest = document.createElement('h2');
        this.quest.classList.add('qa__quest');

        this.answ = document.createElement('div');
        this.answ.classList.add('qa__answ');

        this.newGame()

    }

    newGame(){
        const newQuestIndex = this.getRandom(this.data.length)
        if (newQuestIndex !== this.state.lastQuestIndex){
            this.state.lastQuestIndex = newQuestIndex
            const newQuest = this.data[newQuestIndex]
            this.state.answer = newQuest.answer

            this.quest.innerHTML = newQuest.quest
            newQuest.answer.split('').forEach(el => {
                const letter = document.createElement('h3')
                letter.classList.add('qa__letter')

                this.answ.append(letter)
            })
        }else{
            this.newGame()
        }
    }

    getRandom(length){
        return Math.floor(Math.random() * length)
    }

    getHTML(){
        const container = document.createElement('section');
        container.classList.add('qa__container')
        container.append(this.quest, this.answ)
        return container
    }
}

export default QaModule