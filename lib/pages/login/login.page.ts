import { type Locator, type Page } from "@playwright/test";

export class LoginPage{

  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly signInLink: Locator;

  constructor(page: Page){ // TS automatically initializes the constructor whenever an object of this class gets created, which initializes the web elements and giving us access to these elements.
    this.page = page;//this is the magic which actually creates a magic allowing the locators to be located
    this.emailInput = page.getByTestId("email"); // we can directly specify the locator here, rather than passing the value
    this.passwordInput = page.getByTestId("password");
    this.loginBtn = page.getByTestId("login-submit");
    this.signInLink = page.getByTestId("nav-sign-in");
  }

  async goto(url:string){ // we are making it async because it will be called inside our test cases which will be an async process and will use 'await'
    await this.page.goto(url);
  }

  async clickSignInLink(){
    await this.signInLink.click();
  }

  async login(email:string, password:string){
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
  

}