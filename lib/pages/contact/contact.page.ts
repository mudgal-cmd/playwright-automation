import {Page, Locator, expect} from "@playwright/test";

export class ContactFormPage{

  readonly page:Page;
  readonly message: Locator;
  readonly sendBtn: Locator;
  readonly successMessage:Locator;
  readonly subject: Locator;

  constructor(page:Page){
    this.page = page;
    //notice how we do not use async-await when locating inside a constructor?? but when we specify locators inside a function we use async-await.
    //REASON:- Inside the constructor we are not actually locating the elements, just declared the locator handles. The constructor is not interacting with page,just setting up locator objects. These locators are lazy and would not run anything until we actually perform an action like, fill(), click, etc.
    this.message = page.getByTestId("message");
    this.subject = page.getByTestId("subject");
    this.sendBtn = page.getByTestId("contact-submit");
    this.successMessage = page.locator("//div[contains(@class,'alert')]");
  }

  async goto(){
    await this.page.goto("https://practicesoftwaretesting.com/contact");
  }

  async sendMessage(message:string, subject:string){
    await this.message.fill(message);
    await this.subject.selectOption(subject);
    await this.sendBtn.click();
  }

  async validateMessageSent(){
    await expect(this.successMessage).toBeVisible();
  }

}