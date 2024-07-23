const h = (m, e = "#fff", t = "#F00") => {
  const n = `%c${m}`, r = `color: ${e}; background-color: ${t}; padding: 2px 4px; border-radius: 2px;`;
  console.log(n, r);
};
class a {
  constructor() {
    if (!a.enForm)
      throw new Error("Engaging Networks Form Not Found!");
  }
  static get enForm() {
    return document.querySelector("form.en__component");
  }
  static get demo() {
    return this.getUrlParameter("mode") === "DEMO";
  }
  static log(e, t = "#fff", n = "#F00") {
    h(e, t, n);
  }
  // Return any parameter from the URL
  static getUrlParameter(e) {
    const t = new URLSearchParams(window.location.search);
    if (e.endsWith("[]")) {
      let n = [];
      return t.forEach((r, i) => {
        i.startsWith(e.replace("[]", "")) && n.push(new Object({ [i]: r }));
      }), n.length > 0 ? n : null;
    }
    return t.has(e) ? t.get(e) || !0 : null;
  }
  static getField(e) {
    return document.querySelector(`[name="${e}"]`);
  }
  // Return the field value from its name. It works on any field type.
  // Multiple values (from checkboxes or multi-select) are returned as single string
  // Separated by ,
  static getFieldValue(e) {
    return new FormData(this.enForm).getAll(e).join(",");
  }
  // Set a value to any field. If it's a dropdown, radio or checkbox, it selects the proper option matching the value
  static setFieldValue(e, t, n = !0, r = !1) {
    t !== a.getFieldValue(e) && (document.getElementsByName(e).forEach(
      (i) => {
        if ("type" in i) {
          switch (i.type) {
            case "select-one":
            case "select-multiple":
              for (const o of i.options)
                o.value == t && (o.selected = !0, r && i.dispatchEvent(new Event("change", { bubbles: !0 })));
              break;
            case "checkbox":
            case "radio":
              i.value == t && (i.checked = !0, r && i.dispatchEvent(new Event("change", { bubbles: !0 })));
              break;
            case "textarea":
            case "text":
            default:
              i.value = t, r && (i.dispatchEvent(new Event("change", { bubbles: !0 })), i.dispatchEvent(new Event("blur", { bubbles: !0 })));
          }
          i.setAttribute("foursite-value-changed", "");
        }
      }
    ), n && this.enParseDependencies());
  }
  // Create a hidden input field
  static createHiddenInput(e, t = "") {
    var l;
    const n = document.createElement("div");
    n.classList.add(
      "en__component",
      "en__component--formblock",
      "hide"
    );
    const r = document.createElement("div");
    r.classList.add("en__field", "en__field--text");
    const i = document.createElement("div");
    i.classList.add("en__field__element", "en__field__element--text");
    const o = document.createElement("input");
    o.classList.add(
      "en__field__input",
      "en__field__input--text",
      "foursite-added-input"
    ), o.setAttribute("name", e), o.setAttribute("type", "hidden"), o.setAttribute("value", t), i.appendChild(o), r.appendChild(i), n.appendChild(r);
    const c = document.querySelector(
      ".en__submit"
    );
    if (c) {
      const s = c.closest(".en__component");
      s && ((l = s.parentNode) == null || l.insertBefore(
        n,
        s.nextSibling
      ));
    } else
      a.enForm.appendChild(n);
    return o;
  }
  // Trigger EN Dependencies
  static enParseDependencies() {
    var e, t, n, r, i, o;
    if (window.EngagingNetworks && typeof ((i = (r = (n = (t = (e = window.EngagingNetworks) == null ? void 0 : e.require) == null ? void 0 : t._defined) == null ? void 0 : n.enDependencies) == null ? void 0 : r.dependencies) == null ? void 0 : i.parseDependencies) == "function") {
      const c = [];
      if ("dependencies" in window.EngagingNetworks) {
        const l = document.querySelector(
          ".en__field--donationAmt"
        );
        if (l) {
          let s = ((o = [...l.classList.values()].filter(
            (u) => u.startsWith("en__field--") && Number(u.substring(11)) > 0
          ).toString().match(/\d/g)) == null ? void 0 : o.join("")) || "";
          s && (window.EngagingNetworks.dependencies.forEach(
            (u) => {
              if ("actions" in u && u.actions.length > 0) {
                let g = !1;
                u.actions.forEach((p) => {
                  "target" in p && p.target == s && (g = !0);
                }), g || c.push(u);
              }
            }
          ), c.length > 0 && window.EngagingNetworks.require._defined.enDependencies.dependencies.parseDependencies(
            c
          ));
        }
      }
    }
  }
  // Return the status of the gift process (true if a donation has been made, otherwise false)
  static getGiftProcess() {
    return "pageJson" in window ? window.pageJson.giftProcess : null;
  }
  // Return the page count
  static getPageCount() {
    return "pageJson" in window ? window.pageJson.pageCount : null;
  }
  // Return the current page number
  static getPageNumber() {
    return "pageJson" in window ? window.pageJson.pageNumber : null;
  }
  // Return the current page ID
  static getPageID() {
    return "pageJson" in window ? window.pageJson.campaignPageId : 0;
  }
  // Return the client ID
  static getClientID() {
    return "pageJson" in window ? window.pageJson.clientId : 0;
  }
  //returns 'us or 'ca' based on the client ID
  static getDataCenter() {
    return a.getClientID() >= 1e4 ? "us" : "ca";
  }
  // Return the current page type
  static getPageType() {
    if ("pageJson" in window && "pageType" in window.pageJson)
      switch (window.pageJson.pageType) {
        case "donation":
        case "premiumgift":
          return "DONATION";
        case "e-card":
          return "ECARD";
        case "otherdatacapture":
        case "survey":
          return "SURVEY";
        case "emailtotarget":
          return "EMAILTOTARGET";
        case "advocacypetition":
          return "ADVOCACY";
        case "emailsubscribeform":
          return "SUBSCRIBEFORM";
        case "supporterhub":
          return "SUPPORTERHUB";
        case "unsubscribe":
          return "UNSUBSCRIBE";
        case "tweetpage":
          return "TWEETPAGE";
        default:
          return "UNKNOWN";
      }
    else
      return "UNKNOWN";
  }
  // Set body data attributes
  static setBodyData(e, t) {
    const n = document.querySelector("body");
    if (typeof t == "boolean" && t === !1) {
      n.removeAttribute(`data-foursite-${e}`);
      return;
    }
    n.setAttribute(`data-foursite-${e}`, t.toString());
  }
  // Get body data attributes
  static getBodyData(e) {
    return document.querySelector("body").getAttribute(`data-foursite-${e}`);
  }
  // Check if body has data attributes
  static hasBodyData(e) {
    return document.querySelector("body").hasAttribute(`data-foursite-${e}`);
  }
  // Load an external script
  static loadJS(e, t = null, n = !0) {
    const r = document.createElement("script");
    if (r.src = e, r.onload = t, n) {
      document.head.appendChild(r);
      return;
    }
    document.body.appendChild(r);
  }
  // Format a number
  static formatNumber(e, t = 2, n = ".", r = ",") {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    const i = isFinite(+e) ? +e : 0, o = isFinite(+t) ? Math.abs(t) : 0, c = typeof r > "u" ? "," : r, l = typeof n > "u" ? "." : n;
    let s = [];
    return s = (o ? function(g, p) {
      const y = Math.pow(10, p);
      return "" + Math.round(g * y) / y;
    }(i, o) : "" + Math.round(i)).split("."), s[0].length > 3 && (s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, c)), (s[1] || "").length < o && (s[1] = s[1] || "", s[1] += new Array(o - s[1].length + 1).join("0")), s.join(l);
  }
  // Clean an Amount
  static cleanAmount(e) {
    const t = e.replace(/[^0-9,\.]/g, "").split(/[,.]+/), n = e.replace(/[^.,]/g, "").split("");
    if (t.length === 1)
      return parseInt(t[0]) || 0;
    if (t.map((r, i) => i > 0 && i + 1 !== t.length && r.length !== 3).includes(!0) || n.length > 1 && !n.includes(".") || [...new Set(n.slice(0, -1))].length > 1)
      return 0;
    if (t[t.length - 1].length <= 2) {
      const r = t.pop() || "00";
      return parseInt(r) > 0 ? parseFloat(
        (+(parseInt(t.join("")) + "." + r)).toFixed(2)
      ) : parseInt(t.join(""));
    }
    return parseInt(t.join(""));
  }
  static disableSubmit(e = "") {
    const t = document.querySelector(
      ".en__submit button"
    );
    if (!t) return !1;
    t.dataset.originalText = t.innerHTML;
    let n = "<span class='loader-wrapper'><span class='loader loader-quart'></span><span class='submit-button-text-wrapper'>" + e + "</span></span>";
    return t.disabled = !0, t.innerHTML = n, !0;
  }
  static enableSubmit() {
    const e = document.querySelector(
      ".en__submit button"
    );
    return e && e.dataset.originalText ? (e.disabled = !1, e.innerHTML = e.dataset.originalText, delete e.dataset.originalText, !0) : !1;
  }
  static formatDate(e, t = "MM/DD/YYYY") {
    const n = e.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).split("/");
    return t.replace(/YYYY/g, n[2]).replace(/MM/g, n[0]).replace(/DD/g, n[1]).replace(/YY/g, n[2].substr(2, 2));
  }
  /**
   * Check if the provided object has ALL the provided properties
   * Example: checkNested(EngagingNetworks, 'require', '_defined', 'enjs', 'checkSubmissionFailed')
   * will return true if EngagingNetworks.require._defined.enjs.checkSubmissionFailed is defined
   */
  static checkNested(e, ...t) {
    for (let n = 0; n < t.length; n++) {
      if (!e || !e.hasOwnProperty(t[n]))
        return !1;
      e = e[t[n]];
    }
    return !0;
  }
  // Deep merge two objects
  static deepMerge(e, t) {
    for (const n in t)
      t[n] instanceof Object && Object.assign(
        t[n],
        a.deepMerge(e[n], t[n])
      );
    return Object.assign(e || {}, t), e;
  }
  static setError(e, t) {
    const n = typeof e == "string" ? document.querySelector(e) : e;
    if (n) {
      n.classList.add("en__field--validationFailed");
      let r = n.querySelector(".en__field__error");
      r ? r.innerHTML = t : (r = document.createElement("div"), r.classList.add("en__field__error"), r.innerHTML = t, n.insertBefore(r, n.firstChild));
    }
  }
  static removeError(e) {
    const t = typeof e == "string" ? document.querySelector(e) : e;
    if (t) {
      t.classList.remove("en__field--validationFailed");
      const n = t.querySelector(".en__field__error");
      n && t.removeChild(n);
    }
  }
  static isVisible(e) {
    return e ? !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) : !1;
  }
  static getCurrencySymbol() {
    const e = a.getField(
      "transaction.paycurrency"
    );
    if (e) {
      const t = e.tagName === "SELECT" ? e.options[e.selectedIndex] : e;
      return t.dataset.currencySymbol ? t.dataset.currencySymbol : {
        USD: "$",
        EUR: "€",
        GBP: "£",
        AUD: "$",
        CAD: "$",
        JPY: "¥"
      }[e.value] || "$";
    }
    return "$";
  }
  static getCurrencyCode() {
    const e = a.getField(
      "transaction.paycurrency"
    );
    return e && e.value || "USD";
  }
  static addHtml(e, t = "body", n = "before") {
    var i, o;
    const r = document.querySelector(t);
    if (typeof e == "object" && (e = e.outerHTML), r) {
      const c = document.createRange().createContextualFragment(e);
      n === "before" ? (i = r.parentNode) == null || i.insertBefore(c, r) : (o = r.parentNode) == null || o.insertBefore(
        c,
        r.nextSibling
      );
    }
  }
  static removeHtml(e) {
    const t = document.querySelector(e);
    t && t.remove();
  }
  static slugify(e) {
    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  }
  // This function is used to run a callback function when an error is displayed on the page
  static watchForError(e) {
    const t = document.querySelector(
      ".en__errorList"
    ), n = (i) => i.charAt(0).toUpperCase() + i.slice(1);
    let r = e.toString();
    r.indexOf("function") === 0 && (r = r.replace("function ", "")), r.indexOf("(") > 0 && (r = r.substring(0, r.indexOf("("))), r = r.replace(/[^a-zA-Z0-9]/g, ""), r = r.substring(0, 20), r = "foursite" + n(r), t && !t.dataset[r] && (t.dataset[r] = "true", new MutationObserver(function(o) {
      o.forEach(function(c) {
        c.type === "childList" && c.addedNodes.length > 0 && e();
      });
    }).observe(t, { childList: !0 }));
  }
  // Get the Payment Type
  static getPaymentType() {
    return a.getFieldValue("transaction.paymenttype");
  }
  // Set the Payment Type
  static setPaymentType(e) {
    const t = a.getField(
      "transaction.paymenttype"
    );
    if (t) {
      const n = Array.from(t.options).find(
        (i) => e.toLowerCase() === "card" ? ["card", "visa", "vi"].includes(i.value.toLowerCase()) : e.toLowerCase() === i.value.toLowerCase()
      );
      n ? (n.selected = !0, t.value = n.value) : t.value = e;
      const r = new Event("change", {
        bubbles: !0,
        cancelable: !0
      });
      t.dispatchEvent(r);
    }
  }
  static isInViewport(e) {
    const t = e.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
}
const f = document.querySelector(
  "input[type='radio'][value='monthly']"
), d = () => f && f.checked, w = f.name || "transaction.recurrfreq";
function b() {
  a.log("4Site Init", "#000", "#FF0"), a.getPageType() === "DONATION" ? (document.querySelector("input[name='transaction.recurrpay']") || (a.log("Creating transaction.recurrpay", "#000", "#FF0"), a.createHiddenInput(
    "transaction.recurrpay",
    d() ? "Y" : ""
  )), document.querySelector("input[name='transaction.recurrfreq']") || (a.log("Creating transaction.recurrfreq", "#000", "#FF0"), a.createHiddenInput(
    "transaction.recurrfreq",
    d() ? "MONTHLY" : ""
  )), a.setBodyData(
    "donation-frequency",
    d() ? "MONTHLY" : "ONETIME"
  ), document.querySelectorAll(
    `input[type='radio'][name='${w}']`
  ).forEach((e) => {
    e.addEventListener("change", () => {
      const t = e.value.toUpperCase() === "MONTHLY" ? "MONTHLY" : "ONETIME";
      a.setBodyData("donation-frequency", t), a.log(`Donation Frequency: ${t}`, "#000", "#FF0"), a.setFieldValue(
        "transaction.recurrpay",
        t === "MONTHLY" ? "Y" : ""
      ), a.setFieldValue(
        "transaction.recurrfreq",
        t === "MONTHLY" ? "MONTHLY" : ""
      );
    });
  }), a.setFieldValue("transaction.recurrpay", d() ? "Y" : ""), a.setFieldValue(
    "transaction.recurrfreq",
    d() ? "MONTHLY" : ""
  )) : a.log("Not a Donation Page", "#000", "#FF0");
}
document.readyState === "complete" ? b() : window.addEventListener("load", b);
