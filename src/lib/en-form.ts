import { SignalDispatcher } from "strongly-typed-events";
import { logger } from "./logger";

export class EnForm {
  private _onSubmit = new SignalDispatcher();
  private _onValidate = new SignalDispatcher();
  private _onError = new SignalDispatcher();
  public submit: boolean = true;
  public submitPromise: boolean | Promise<any> = false;
  public validate: boolean = true;
  public validatePromise: boolean | Promise<any> = false;

  private static instance: EnForm;

  private constructor() {}

  static log(message: string, color: string = "#fff", bg: string = "#F00") {
    logger(message, color, bg);
  }

  public static getInstance(): EnForm {
    if (!EnForm.instance) {
      EnForm.instance = new EnForm();
    }

    return EnForm.instance;
  }

  public dispatchSubmit() {
    this._onSubmit.dispatch();
    EnForm.log("dispatchSubmit");
  }

  public dispatchValidate() {
    this._onValidate.dispatch();
    EnForm.log("dispatchValidate");
  }

  public dispatchError() {
    this._onError.dispatch();
    EnForm.log("dispatchError");
  }

  public submitForm() {
    const enForm = document.querySelector(
      "form .en__submit button"
    ) as HTMLButtonElement;
    if (enForm) {
      // Add submitting class to modal
      const enModal = document.getElementById("enModal");
      if (enModal) enModal.classList.add("is-submitting");
      enForm.click();
      EnForm.log("submitForm");
    }
  }

  public get onSubmit() {
    return this._onSubmit.asEvent();
  }

  public get onError() {
    return this._onError.asEvent();
  }

  public get onValidate() {
    return this._onValidate.asEvent();
  }
}
