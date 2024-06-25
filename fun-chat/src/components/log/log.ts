import './logStyle.css';
import Requests from '../requests/requests';

class Log {
  onValidate: () => void;
  container: HTMLElement | null;
  nameValidated: boolean;
  passValidated: boolean;
  req: Requests | null;
  id: number;

  constructor(callback: () => void) {
    this.container = null;
    this.nameValidated = false;
    this.passValidated = false;
    this.req = null;
    this.id = 0;
    this.onValidate = callback;

    this.init();
  }

  init() {
    this.req = new Requests();
    this.createHtml();
  }

  createHtml() {
    this.container = document.createElement('section');
    this.container.classList.add('log-container');

    const name = document.createElement('input');
    name.id = 'input-name';
    name.addEventListener('input', (event: Event) => {
      const target = event.target;
      if (!this.validateForms(name.value, 2)) {
        (target as HTMLElement).classList.add('wrong-input');
        this.nameValidated = false;
      } else {
        (target as HTMLElement).classList.remove('wrong-input');
        this.nameValidated = true;
      }
    });

    const hintName = document.createElement('h6');
    hintName.innerHTML = 'Name should be not less that 2 letters and contains capital letter';

    const password = document.createElement('input');
    password.id = 'input-password';
    password.addEventListener('input', (event: Event) => {
      const target = event.target;
      if (!this.validateForms(password.value, 8)) {
        (target as HTMLElement).classList.add('wrong-input');
        this.passValidated = false;
      } else {
        (target as HTMLElement).classList.remove('wrong-input');
        this.passValidated = true;
      }
    });
    password.type = 'password';

    const hintPass = document.createElement('h6');
    hintPass.innerHTML = 'Password should be not less that 8 letters and contains capital letters';

    const conf = document.createElement('button');
    conf.addEventListener('click', () => this.validateAllForms());
    conf.innerHTML = 'Confirm';

    this.container.append(name, hintName, password, hintPass, conf);
  }

  validateForms(str: string, length: number) {
    const regex = new RegExp(`^[A-Z][a-zA-Z-]{${length - 1},}$`);
    return regex.test(str);
  }

  validateAllForms() {
    if (this.nameValidated && this.passValidated) {
      const log = document.getElementById('input-name');
      const login = (log as HTMLInputElement).value;
      const pas = document.getElementById('input-password');
      const password = (pas as HTMLInputElement).value;

      this.req?.authenticateUser(login, password);
      this.saveData(login, password);

      this.onValidate();
    }
  }

  saveData(x, y) {
    sessionStorage.setItem('userData', JSON.stringify({ login: x, password: y }));
  }

  getHtml(): Node {
    return this.container as Node;
  }
}

export default Log;
