declare const window: any;

import "./style.css";
import { CommonEN } from "./lib/common-en";

const monthlyRadio = document.querySelector(
  "input[type='radio'][value='monthly']"
) as HTMLInputElement;

const isMonthly = () => {
  return monthlyRadio && monthlyRadio.checked;
};

const frequencyRadioName = monthlyRadio.name || "transaction.recurrfreq";

function run() {
  CommonEN.log("4Site Init", "#000", "#FF0");

  // Only work on Donation Pages
  if (CommonEN.getPageType() === "DONATION") {
    // If there's no transaction.recurrpay field, create it
    if (!document.querySelector("input[name='transaction.recurrpay']")) {
      CommonEN.log("Creating transaction.recurrpay", "#000", "#FF0");
      CommonEN.createHiddenInput(
        "transaction.recurrpay",
        isMonthly() ? "Y" : ""
      );
    }
    // If there's no transaction.recurrfreq field, create it
    if (!document.querySelector("input[name='transaction.recurrfreq']")) {
      CommonEN.log("Creating transaction.recurrfreq", "#000", "#FF0");
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
        CommonEN.log(`Donation Frequency: ${freq}`, "#000", "#FF0");
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
    CommonEN.log("Not a Donation Page", "#000", "#FF0");
  }
}
// Make sure we only run after the page load, checking if the page is fully loaded
if (document.readyState === "complete") {
  run();
} else {
  window.addEventListener("load", run);
}
