declare const window: any;

import "./style.css";
import { CommonEN } from "./lib/common-en";
import { logger } from "./lib/logger";
import { EnForm } from "./lib/en-form";
import { VGS } from "./lib/vgs";

const monthlyRadio = document.querySelector(
  "input[type='radio'][value='monthly']"
) as HTMLInputElement;

const isMonthly = () => {
  return monthlyRadio && monthlyRadio.checked;
};

const frequencyRadioName = monthlyRadio?.name || "transaction.recurrfreq";

function run() {
  const enForm = EnForm.getInstance();
  const successLog = (message: string) => {
    logger(message, "#fff", "#0F0");
  };
  const errorLog = (message: string) => {
    logger(message, "#fff", "#F00");
  };
  const infoLog = (message: string) => {
    logger(message, "#fff", "#00F");
  };

  CommonEN.log("4Site Init", "#000", "#FF0");

  // Only work on Donation Pages
  if (CommonEN.getPageType() === "DONATION") {
    // If there's no transaction.recurrpay field, create it
    if (!document.querySelector("input[name='transaction.recurrpay']")) {
      infoLog("Creating transaction.recurrpay");
      CommonEN.createHiddenInput(
        "transaction.recurrpay",
        isMonthly() ? "Y" : ""
      );
    }
    // If there's no transaction.recurrfreq field, create it
    if (!document.querySelector("input[name='transaction.recurrfreq']")) {
      infoLog("Creating transaction.recurrfreq");
      CommonEN.createHiddenInput(
        "transaction.recurrfreq",
        isMonthly() ? "MONTHLY" : ""
      );
    }
    CommonEN.setBodyData(
      "donation-frequency",
      isMonthly() ? "MONTHLY" : "ONETIME"
    );
    // When the donation frequency changes, update the hidden fields
    const gift_frequencies = document.querySelectorAll(
      `input[type='radio'][name='${frequencyRadioName}']`
    ) as NodeListOf<HTMLInputElement>;
    gift_frequencies.forEach((frequency) => {
      frequency.addEventListener("change", () => {
        const freq =
          frequency.value.toUpperCase() === "MONTHLY" ? "MONTHLY" : "ONETIME";
        CommonEN.setBodyData("donation-frequency", freq);
        infoLog(`Donation Frequency: ${freq}`);
        CommonEN.setFieldValue(
          "transaction.recurrpay",
          freq === "MONTHLY" ? "Y" : ""
        );
        CommonEN.setFieldValue(
          "transaction.recurrfreq",
          freq === "MONTHLY" ? "MONTHLY" : ""
        );
      });
    });
    // Update the hidden fields when the page loads
    CommonEN.setFieldValue("transaction.recurrpay", isMonthly() ? "Y" : "");
    CommonEN.setFieldValue(
      "transaction.recurrfreq",
      isMonthly() ? "MONTHLY" : ""
    );
  } else {
    errorLog("Not a Donation Page");
  }

  // EN Form Events
  enForm.onSubmit.subscribe(() => {
    infoLog("onSubmit");
  });
  enForm.onValidate.subscribe(() => {
    infoLog("onValidate");
  });
  enForm.onError.subscribe(() => {
    infoLog("onError");
  });
  window.enOnSubmit = () => {
    enForm.submit = true;
    enForm.submitPromise = false;
    enForm.dispatchSubmit();
    CommonEN.watchForError(CommonEN.enableSubmit);
    if (!enForm.submit) return false;
    if (enForm.submitPromise) return enForm.submitPromise;
    successLog("enOnSubmit Success");
    // If all validation passes, we'll watch for Digital Wallets Errors, which
    // will not reload the page (thanks EN), so we will enable the submit button if
    // an error is programmatically thrown by the Digital Wallets
    return true;
  };
  window.enOnError = () => {
    enForm.dispatchError();
  };
  window.enOnValidate = () => {
    enForm.validate = true;
    enForm.validatePromise = false;
    enForm.dispatchValidate();
    if (!enForm.validate) return false;
    if (enForm.validatePromise) return enForm.validatePromise;
    successLog("Validation Passed");
    return true;
  };
  // Very Good Security
  new VGS();
}
// Make sure we only run after the page load, checking if the page is fully loaded
if (document.readyState === "complete") {
  run();
} else {
  window.addEventListener("load", run);
}
