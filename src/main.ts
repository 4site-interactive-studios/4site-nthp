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
        if (!hasDefaultAmount()) {
          infoLog("Donation Total is 0 - Set a default amount");
          setDefaultAmount();
        }
        window.setTimeout(() => {
          clearAmounts();
        }, 50);
      });
    });
    // Update the hidden fields when the page loads
    CommonEN.setFieldValue("transaction.recurrpay", isMonthly() ? "Y" : "");
    CommonEN.setFieldValue(
      "transaction.recurrfreq",
      isMonthly() ? "MONTHLY" : ""
    );
    if (!hasDefaultAmount()) {
      infoLog("Donation Total is 0 - Set a default amount");
      setDefaultAmount();
    }
    // Clear any non-numeric amounts
    clearAmounts();
    // Validate the expiration date
    enForm.onValidate.subscribe(() => {
      if (enForm.validate) {
        const ccExpireContainer = document.querySelector(
          ".en__field--ccexpire"
        ) as HTMLElement;
        if (!ccExpireContainer) {
          return;
        }
        const isValid = validateExpDate();
        infoLog(`Exp Date Validation: ${isValid}`);
        enForm.validate = isValid;
        if (!isValid) {
          CommonEN.setError(
            ccExpireContainer,
            "Please enter a valid expiration date"
          );
        } else {
          CommonEN.removeError(ccExpireContainer);
        }
      }
    });
  } else {
    errorLog("Not a Donation Page");
  }

  CommonEN.watchForError(CommonEN.enableSubmit);

  // EN Form Events
  enForm.onSubmit.subscribe(() => {
    infoLog("onSubmit");
  });
  enForm.onValidate.subscribe(() => {
    infoLog("onValidate");
    CommonEN.disableSubmit("Processing...");
  });
  enForm.onError.subscribe(() => {
    infoLog("onError");
    CommonEN.enableSubmit();
  });
  window.enOnSubmit = () => {
    enForm.submit = true;
    enForm.submitPromise = false;
    enForm.dispatchSubmit();
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
function hasDefaultAmount() {
  if (
    CommonEN.checkNested(
      window,
      "EngagingNetworks",
      "require",
      "_defined",
      "enjs",
      "getDonationTotal"
    )
  ) {
    if (window.EngagingNetworks.require._defined.enjs.getDonationTotal() > 0) {
      return true;
    }
  }
  return false;
}
function setDefaultAmount() {
  const firstDonationAmount = document.querySelector(
    ".en__field--donationAmt .en__field__item:first-child input"
  ) as HTMLInputElement;
  if (firstDonationAmount) {
    firstDonationAmount.checked = true;
    // Trigger the change event
    const event = new Event("change", {
      bubbles: true,
      cancelable: true,
    });
    firstDonationAmount.dispatchEvent(event);
  }
}
function clearAmounts() {
  const donationAmounts = document.querySelectorAll(
    ".en__field--donationAmt .en__field__item input"
  ) as NodeListOf<HTMLInputElement>;
  donationAmounts.forEach((amount) => {
    if (
      amount.value !== "" &&
      amount.value.toLowerCase() !== "other" &&
      isNaN(parseInt(amount.value))
    ) {
      logger(`Clearing Amount: ${amount.value}`, "#fff", "#00F");
      amount.value = CommonEN.cleanAmount(amount.value).toString();
    }
  });
}
function validateExpDate() {
  if (!isPaymentCard()) {
    return true;
  }
  const expFields = document.querySelectorAll(
    ".en__field--ccexpire select.en__field__input"
  ) as NodeListOf<HTMLSelectElement>;
  if (expFields.length !== 2) {
    return true; // If we don't have 2 fields, we can't validate
  }
  const month = expFields[0].value; // 01 - 12
  const year = expFields[1].value; // YYYY
  if (month === "" || year === "") {
    return false;
  }
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  if (expYear < currentYear) {
    return false;
  }
  if (expYear === currentYear && expMonth < currentMonth) {
    return false;
  }
  return true;
}
function isPaymentCard() {
  const paymentType = CommonEN.getPaymentType();
  const isCard = [
    "card",
    "visa",
    "mastercard",
    "amex",
    "discover",
    "diners",
    "jcb",
    "vi",
    "mc",
    "ax",
    "dc",
    "di",
    "jc",
  ].includes(paymentType.toLowerCase());
  return isCard;
}
// Make sure we only run after the page load, checking if the page is fully loaded
if (document.readyState === "complete") {
  run();
} else {
  window.addEventListener("load", run);
}
