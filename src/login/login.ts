class Login {
  parent: HTMLElement;
  loginContainer: HTMLDivElement | null;
  inputName: HTMLInputElement | null;
  inputSurname: HTMLInputElement | null;
  submitButton!: HTMLButtonElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.loginContainer = null;
    this.inputName = null;
    this.inputSurname = null;

    this.init();
  }

  init() {
    this.loginContainer = document.createElement("div");
    this.loginContainer.classList.add("login-container");
    this.createForm();
  }

  createForm() {
    this.inputName = document.createElement("input");
    this.inputName.type = "text";
    this.inputName.placeholder = "Please enter your first name";
    this.inputName.classList.add("form-input");

    this.inputSurname = document.createElement("input");
    this.inputSurname.type = "text";
    this.inputSurname.placeholder = "Please enter your surname";
    this.inputSurname.classList.add("form-input");

    this.submitButton = document.createElement("button");
    this.submitButton.classList.add("button-submit");
    this.submitButton.type = "submit";
    this.submitButton.textContent = "Login";
    this.submitButton.disabled = true;
    this.submitButton.addEventListener("click", () => this.handleSubmit());

    if (this.loginContainer !== null) {
      this.loginContainer.append(this.submitButton);
      this.parent.append(this.loginContainer);
    }
  }

  handleSubmit() {
    const firstName = (this.inputName as HTMLInputElement).value;
    firstName.trim();
    const surName = (this.inputSurname as HTMLInputElement).value;
    surName.trim();
  }
}

export default Login;
