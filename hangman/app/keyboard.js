class Keyboard {
    constructor(state) {
        this.keyboard = null;
        this.state = state;

        this.init();
    }

    init(){
        const keyboardContainer = document.createElement('section');
        keyboardContainer.classList.add('keyboard__container');
        this.keyboard = keyboardContainer;

        this.createKeyboard();

    }

    createKeyboard(){
        for (let i = 97; i < 123; i++){
            const key = document.createElement('button');
            key.classList.add('keyboard__key');
            key.innerHTML = String.fromCharCode(i);
            this.keyboard.append(key);
            key.addEventListener("click", (event) => {this.clickHandler(event)});
        }
    }

    clickHandler(event){
        const target = event.target;

        const remove = new CustomEvent('removeButton', {detail: target.innerHTML});
        document.dispatchEvent(remove);

        if (!this.state.answer.includes(target.innerHTML)){
            const event = new Event('wrong');
            document.dispatchEvent(event);
        }else{
            const event = new CustomEvent('correct', {detail: target.innerHTML});
            document.dispatchEvent(event);
        }
    }

    getHTML(){
        return this.keyboard;
    }
}

export default Keyboard