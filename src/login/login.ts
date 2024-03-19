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
    this.inputName.required = true;

    this.inputSurname = document.createElement("input");
    this.inputSurname.type = "text";
    this.inputSurname.placeholder = "Please enter your surname";
    this.inputSurname.classList.add("form-input");
    this.inputSurname.required = true;

    this.submitButton = document.createElement("button");
    this.submitButton.classList.add("button-submit");
    this.submitButton.type = "submit";
    this.submitButton.textContent = "Login";
    this.submitButton.disabled = true;
    this.submitButton.addEventListener("click", () => this.handleSubmit());

    if (this.loginContainer) {
      this.loginContainer.append(
        this.inputName,
        this.inputSurname,
        this.submitButton,
      );
      this.parent.append(this.loginContainer);
    }

    this.inputName.addEventListener("input", () => this.validateForm());
    this.inputName.addEventListener("blur", () => this.validateForm());
    this.inputSurname.addEventListener("input", () => this.validateForm());
    this.inputSurname.addEventListener("blur", () => this.validateForm());
  }

  validateForm() {
    const name = (this.inputName as HTMLInputElement).value.trim();
    const surname = (this.inputSurname as HTMLInputElement).value.trim();

    this.submitButton.disabled = !(
      name &&
      surname &&
      this.validateName(name) &&
      this.validateSurName(surname)
    );
  }

  handleSubmit() {
    const firstName = (this.inputName as HTMLInputElement).value;
    firstName.trim();
    const surName = (this.inputSurname as HTMLInputElement).value;
    surName.trim();

    this.submitButton.disabled = !(firstName && surName);
  }

  validateName(name: string) {
    return /^[A-Z][a-zA-Z-]{2,}$/.test(name);
  }

  validateSurName(surname: string) {
    return /^[A-Z][a-zA-Z-]{3,}$/.test(surname);
  }
}

export default Login;
