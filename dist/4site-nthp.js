(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode('.en__field__error{color:red;font-size:12px;font-weight:400;margin-top:5px;display:block!important}.en__errorList{list-style:none;max-width:600px;margin:20px 0!important;padding:0!important;background-color:transparent;border:0}.en__error{position:relative;font-size:16px;color:#c00;padding:12px 20px 12px 50px!important;margin:8px 0!important;background-color:#ffe6e6;border-left:4px solid #cc0000;border-radius:4px;transition:transform .2s ease-in-out,box-shadow .2s ease-in-out}.en__error:before{content:"⚠️";font-size:20px;position:absolute;left:15px;top:50%;transform:translateY(-50%)}.en__errorList li:not(:last-child){border-bottom:1px solid #ffd6d6}.loader-wrapper{display:flex;justify-content:center}.loader{position:relative;width:1.5rem;height:1.5rem;margin-right:.6rem;margin-top:2px;margin-left:-2rem}.loader-quart{border-radius:50%;border:.375rem solid rgba(255,255,255,.4)}.loader-quart:before{content:"";position:absolute;top:-.375rem;right:-.375rem;bottom:-.375rem;left:-.375rem;border-radius:3.125rem;border:.375rem solid transparent;border-top-color:#fff;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')),document.head.appendChild(r)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
var Ee = Object.defineProperty;
var _e = (n, e, t) => e in n ? Ee(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var d = (n, e, t) => _e(n, typeof e != "symbol" ? e + "" : e, t);
const f = (n, e = "#fff", t = "#F00") => {
  const i = `%c${n}`, r = `color: ${e}; background-color: ${t}; padding: 2px 4px; border-radius: 2px;`;
  console.log(i, r);
};
class c {
  constructor() {
    if (!c.enForm)
      throw new Error("Engaging Networks Form Not Found!");
  }
  static get enForm() {
    return document.querySelector("form.en__component");
  }
  static get demo() {
    return this.getUrlParameter("mode") === "DEMO";
  }
  static log(e, t = "#fff", i = "#F00") {
    f(e, t, i);
  }
  // Return any parameter from the URL
  static getUrlParameter(e) {
    const t = new URLSearchParams(window.location.search);
    if (e.endsWith("[]")) {
      let i = [];
      return t.forEach((r, s) => {
        s.startsWith(e.replace("[]", "")) && i.push(new Object({ [s]: r }));
      }), i.length > 0 ? i : null;
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
  static setFieldValue(e, t, i = !0, r = !1) {
    t !== c.getFieldValue(e) && (document.getElementsByName(e).forEach(
      (s) => {
        if ("type" in s) {
          switch (s.type) {
            case "select-one":
            case "select-multiple":
              for (const a of s.options)
                a.value == t && (a.selected = !0, r && s.dispatchEvent(new Event("change", { bubbles: !0 })));
              break;
            case "checkbox":
            case "radio":
              s.value == t && (s.checked = !0, r && s.dispatchEvent(new Event("change", { bubbles: !0 })));
              break;
            case "textarea":
            case "text":
            default:
              s.value = t, r && (s.dispatchEvent(new Event("change", { bubbles: !0 })), s.dispatchEvent(new Event("blur", { bubbles: !0 })));
          }
          s.setAttribute("foursite-value-changed", "");
        }
      }
    ), i && this.enParseDependencies());
  }
  // Create a hidden input field
  static createHiddenInput(e, t = "") {
    var m;
    const i = document.createElement("div");
    i.classList.add(
      "en__component",
      "en__component--formblock",
      "hide"
    );
    const r = document.createElement("div");
    r.classList.add("en__field", "en__field--text");
    const s = document.createElement("div");
    s.classList.add("en__field__element", "en__field__element--text");
    const a = document.createElement("input");
    a.classList.add(
      "en__field__input",
      "en__field__input--text",
      "foursite-added-input"
    ), a.setAttribute("name", e), a.setAttribute("type", "hidden"), a.setAttribute("value", t), s.appendChild(a), r.appendChild(s), i.appendChild(r);
    const o = document.querySelector(
      ".en__submit"
    );
    if (o) {
      const l = o.closest(".en__component");
      l && ((m = l.parentNode) == null || m.insertBefore(
        i,
        l.nextSibling
      ));
    } else
      c.enForm.appendChild(i);
    return a;
  }
  // Trigger EN Dependencies
  static enParseDependencies() {
    var e, t, i, r, s, a;
    if (window.EngagingNetworks && typeof ((s = (r = (i = (t = (e = window.EngagingNetworks) == null ? void 0 : e.require) == null ? void 0 : t._defined) == null ? void 0 : i.enDependencies) == null ? void 0 : r.dependencies) == null ? void 0 : s.parseDependencies) == "function") {
      const o = [];
      if ("dependencies" in window.EngagingNetworks) {
        const m = document.querySelector(
          ".en__field--donationAmt"
        );
        if (m) {
          let l = ((a = [...m.classList.values()].filter(
            (h) => h.startsWith("en__field--") && Number(h.substring(11)) > 0
          ).toString().match(/\d/g)) == null ? void 0 : a.join("")) || "";
          l && (window.EngagingNetworks.dependencies.forEach(
            (h) => {
              if ("actions" in h && h.actions.length > 0) {
                let T = !1;
                h.actions.forEach(($) => {
                  "target" in $ && $.target == l && (T = !0);
                }), T || o.push(h);
              }
            }
          ), o.length > 0 && window.EngagingNetworks.require._defined.enDependencies.dependencies.parseDependencies(
            o
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
    return c.getClientID() >= 1e4 ? "us" : "ca";
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
    const i = document.querySelector("body");
    if (typeof t == "boolean" && t === !1) {
      i.removeAttribute(`data-foursite-${e}`);
      return;
    }
    i.setAttribute(`data-foursite-${e}`, t.toString());
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
  static loadJS(e, t = null, i = !0) {
    const r = document.createElement("script");
    if (r.src = e, r.onload = t, i) {
      document.head.appendChild(r);
      return;
    }
    document.body.appendChild(r);
  }
  // Format a number
  static formatNumber(e, t = 2, i = ".", r = ",") {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    const s = isFinite(+e) ? +e : 0, a = isFinite(+t) ? Math.abs(t) : 0, o = typeof r > "u" ? "," : r, m = typeof i > "u" ? "." : i;
    let l = [];
    return l = (a ? function(T, $) {
      const ee = Math.pow(10, $);
      return "" + Math.round(T * ee) / ee;
    }(s, a) : "" + Math.round(s)).split("."), l[0].length > 3 && (l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)), (l[1] || "").length < a && (l[1] = l[1] || "", l[1] += new Array(a - l[1].length + 1).join("0")), l.join(m);
  }
  // Clean an Amount
  static cleanAmount(e) {
    const t = e.replace(/[^0-9,\.]/g, "").split(/[,.]+/), i = e.replace(/[^.,]/g, "").split("");
    if (t.length === 1)
      return parseInt(t[0]) || 0;
    if (t.map((r, s) => s > 0 && s + 1 !== t.length && r.length !== 3).includes(!0) || i.length > 1 && !i.includes(".") || [...new Set(i.slice(0, -1))].length > 1)
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
    let i = "<span class='loader-wrapper'><span class='loader loader-quart'></span><span class='submit-button-text-wrapper'>" + e + "</span></span>";
    return t.disabled = !0, t.innerHTML = i, !0;
  }
  static enableSubmit() {
    const e = document.querySelector(
      ".en__submit button"
    );
    return e && e.dataset.originalText ? (e.disabled = !1, e.innerHTML = e.dataset.originalText, delete e.dataset.originalText, !0) : !1;
  }
  static formatDate(e, t = "MM/DD/YYYY") {
    const i = e.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).split("/");
    return t.replace(/YYYY/g, i[2]).replace(/MM/g, i[0]).replace(/DD/g, i[1]).replace(/YY/g, i[2].substr(2, 2));
  }
  /**
   * Check if the provided object has ALL the provided properties
   * Example: checkNested(EngagingNetworks, 'require', '_defined', 'enjs', 'checkSubmissionFailed')
   * will return true if EngagingNetworks.require._defined.enjs.checkSubmissionFailed is defined
   */
  static checkNested(e, ...t) {
    for (let i = 0; i < t.length; i++) {
      if (!e || !e.hasOwnProperty(t[i]))
        return !1;
      e = e[t[i]];
    }
    return !0;
  }
  // Deep merge two objects
  static deepMerge(e, t) {
    for (const i in t)
      t[i] instanceof Object && Object.assign(
        t[i],
        c.deepMerge(e[i], t[i])
      );
    return Object.assign(e || {}, t), e;
  }
  static setError(e, t) {
    const i = typeof e == "string" ? document.querySelector(e) : e;
    if (i) {
      i.classList.add("en__field--validationFailed");
      let r = i.querySelector(".en__field__error");
      r ? r.innerHTML = t : (r = document.createElement("div"), r.classList.add("en__field__error"), r.innerHTML = t, i.insertBefore(r, i.firstChild));
    }
  }
  static removeError(e) {
    const t = typeof e == "string" ? document.querySelector(e) : e;
    if (t) {
      t.classList.remove("en__field--validationFailed");
      const i = t.querySelector(".en__field__error");
      i && t.removeChild(i);
    }
  }
  static isVisible(e) {
    return e ? !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) : !1;
  }
  static getCurrencySymbol() {
    const e = c.getField(
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
    const e = c.getField(
      "transaction.paycurrency"
    );
    return e && e.value || "USD";
  }
  static addHtml(e, t = "body", i = "before") {
    var s, a;
    const r = document.querySelector(t);
    if (typeof e == "object" && (e = e.outerHTML), r) {
      const o = document.createRange().createContextualFragment(e);
      i === "before" ? (s = r.parentNode) == null || s.insertBefore(o, r) : (a = r.parentNode) == null || a.insertBefore(
        o,
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
    ), i = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    let r = e.toString();
    r.indexOf("function") === 0 && (r = r.replace("function ", "")), r.indexOf("(") > 0 && (r = r.substring(0, r.indexOf("("))), r = r.replace(/[^a-zA-Z0-9]/g, ""), r = r.substring(0, 20), r = "foursite" + i(r), t && !t.dataset[r] && (t.dataset[r] = "true", new MutationObserver(function(a) {
      a.forEach(function(o) {
        o.type === "childList" && o.addedNodes.length > 0 && e();
      });
    }).observe(t, { childList: !0 }));
  }
  // Get the Payment Type
  static getPaymentType() {
    return c.getFieldValue("transaction.paymenttype");
  }
  // Set the Payment Type
  static setPaymentType(e) {
    const t = c.getField(
      "transaction.paymenttype"
    );
    if (t) {
      const i = Array.from(t.options).find(
        (s) => e.toLowerCase() === "card" ? ["card", "visa", "vi"].includes(s.value.toLowerCase()) : e.toLowerCase() === s.value.toLowerCase()
      );
      i ? (i.selected = !0, t.value = i.value) : t.value = e;
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
var I = {}, u = {}, v = {}, B = {};
Object.defineProperty(B, "__esModule", { value: !0 });
B.DispatcherWrapper = void 0;
class Se {
  /**
   * Creates an instance of DispatcherWrapper.
   * @param {ISubscribable<TEventHandler>} dispatcher
   *
   * @memberOf DispatcherWrapper
   */
  constructor(e) {
    this._subscribe = (t) => e.subscribe(t), this._unsubscribe = (t) => e.unsubscribe(t), this._one = (t) => e.one(t), this._has = (t) => e.has(t), this._clear = () => e.clear(), this._count = () => e.count, this._onSubscriptionChange = () => e.onSubscriptionChange;
  }
  /**
   * Triggered when subscriptions are changed (added or removed).
   *
   * @readonly
   * @type {ISubscribable<SubscriptionChangeEventHandler>}
   * @memberOf DispatcherWrapper
   */
  get onSubscriptionChange() {
    return this._onSubscriptionChange();
  }
  /**
   * Returns the number of subscriptions.
   *
   * @readonly
   * @type {number}
   * @memberOf DispatcherWrapper
   */
  get count() {
    return this._count();
  }
  /**
   * Subscribe to the event dispatcher.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns {() => void} A function that unsubscribes the event handler from the event.
   *
   * @memberOf DispatcherWrapper
   */
  subscribe(e) {
    return this._subscribe(e);
  }
  /**
   * Subscribe to the event dispatcher.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns {() => void} A function that unsubscribes the event handler from the event.
   *
   * @memberOf DispatcherWrapper
   */
  sub(e) {
    return this.subscribe(e);
  }
  /**
   * Unsubscribe from the event dispatcher.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   *
   * @memberOf DispatcherWrapper
   */
  unsubscribe(e) {
    this._unsubscribe(e);
  }
  /**
   * Unsubscribe from the event dispatcher.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   *
   * @memberOf DispatcherWrapper
   */
  unsub(e) {
    this.unsubscribe(e);
  }
  /**
   * Subscribe once to the event with the specified name.
   *
   * @returns {() => void} A function that unsubscribes the event handler from the event.
   *
   * @memberOf DispatcherWrapper
   */
  one(e) {
    return this._one(e);
  }
  /**
   * Checks it the event has a subscription for the specified handler.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   *
   * @memberOf DispatcherWrapper
   */
  has(e) {
    return this._has(e);
  }
  /**
   * Clears all the subscriptions.
   *
   * @memberOf DispatcherWrapper
   */
  clear() {
    this._clear();
  }
}
B.DispatcherWrapper = Se;
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.Subscription = void 0;
class Pe {
  /**
   * Creates an instance of Subscription.
   *
   * @param {TEventHandler} handler The handler for the subscription.
   * @param {boolean} isOnce Indicates if the handler should only be executed once.
   */
  constructor(e, t) {
    this.handler = e, this.isOnce = t, this.isExecuted = !1;
  }
  /**
   * Executes the handler.
   *
   * @param {boolean} executeAsync True if the even should be executed async.
   * @param {*} scope The scope the scope of the event.
   * @param {IArguments} args The arguments for the event.
   */
  execute(e, t, i) {
    if (!this.isOnce || !this.isExecuted) {
      this.isExecuted = !0;
      var r = this.handler;
      e ? setTimeout(() => {
        r.apply(t, i);
      }, 1) : r.apply(t, i);
    }
  }
}
L.Subscription = Pe;
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.EventManagement = void 0;
class ye {
  /**
   * Creates an instance of EventManagement.
   * @param {() => void} unsub An unsubscribe handler.
   *
   * @memberOf EventManagement
   */
  constructor(e) {
    this.unsub = e, this.propagationStopped = !1;
  }
  /**
   * Stops the propagation of the event.
   * Cannot be used when async dispatch is done.
   *
   * @memberOf EventManagement
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
b.EventManagement = ye;
Object.defineProperty(v, "__esModule", { value: !0 });
v.SubscriptionChangeEventDispatcher = v.DispatcherBase = void 0;
const De = B, Be = L, Le = b;
class de {
  constructor() {
    this._subscriptions = new Array();
  }
  /**
   * Returns the number of subscriptions.
   *
   * @readonly
   * @type {number}
   * @memberOf DispatcherBase
   */
  get count() {
    return this._subscriptions.length;
  }
  /**
   * Triggered when subscriptions are changed (added or removed).
   *
   * @readonly
   * @type {ISubscribable<SubscriptionChangeEventHandler>}
   * @memberOf DispatcherBase
   */
  get onSubscriptionChange() {
    return this._onSubscriptionChange == null && (this._onSubscriptionChange = new pe()), this._onSubscriptionChange.asEvent();
  }
  /**
   * Subscribe to the event dispatcher.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   *
   * @memberOf DispatcherBase
   */
  subscribe(e) {
    return e && (this._subscriptions.push(this.createSubscription(e, !1)), this.triggerSubscriptionChange()), () => {
      this.unsubscribe(e);
    };
  }
  /**
   * Subscribe to the event dispatcher.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   *
   * @memberOf DispatcherBase
   */
  sub(e) {
    return this.subscribe(e);
  }
  /**
   * Subscribe once to the event with the specified name.
   *
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   *
   * @memberOf DispatcherBase
   */
  one(e) {
    return e && (this._subscriptions.push(this.createSubscription(e, !0)), this.triggerSubscriptionChange()), () => {
      this.unsubscribe(e);
    };
  }
  /**
   * Checks it the event has a subscription for the specified handler.
   *
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf DispatcherBase
   */
  has(e) {
    return e ? this._subscriptions.some((t) => t.handler == e) : !1;
  }
  /**
   * Unsubscribes the handler from the dispatcher.
   *
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf DispatcherBase
   */
  unsubscribe(e) {
    if (!e)
      return;
    let t = !1;
    for (let i = 0; i < this._subscriptions.length; i++)
      if (this._subscriptions[i].handler == e) {
        this._subscriptions.splice(i, 1), t = !0;
        break;
      }
    t && this.triggerSubscriptionChange();
  }
  /**
   * Unsubscribes the handler from the dispatcher.
   *
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf DispatcherBase
   */
  unsub(e) {
    this.unsubscribe(e);
  }
  /**
   * Generic dispatch will dispatch the handlers with the given arguments.
   *
   * @protected
   * @param {boolean} executeAsync `True` if the even should be executed async.
   * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
   * @param {IArguments} args The arguments for the event.
   * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
   *
   * @memberOf DispatcherBase
   */
  _dispatch(e, t, i) {
    for (let r of [...this._subscriptions]) {
      let s = new Le.EventManagement(() => this.unsub(r.handler)), a = Array.prototype.slice.call(i);
      if (a.push(s), r.execute(e, t, a), this.cleanup(r), !e && s.propagationStopped)
        return { propagationStopped: !0 };
    }
    return e ? null : { propagationStopped: !1 };
  }
  /**
   * Creates a subscription.
   *
   * @protected
   * @param {TEventHandler} handler The handler.
   * @param {boolean} isOnce True if the handler should run only one.
   * @returns {ISubscription<TEventHandler>} The subscription.
   *
   * @memberOf DispatcherBase
   */
  createSubscription(e, t) {
    return new Be.Subscription(e, t);
  }
  /**
   * Cleans up subs that ran and should run only once.
   *
   * @protected
   * @param {ISubscription<TEventHandler>} sub The subscription.
   *
   * @memberOf DispatcherBase
   */
  cleanup(e) {
    let t = !1;
    if (e.isOnce && e.isExecuted) {
      let i = this._subscriptions.indexOf(e);
      i > -1 && (this._subscriptions.splice(i, 1), t = !0);
    }
    t && this.triggerSubscriptionChange();
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   *
   * @returns {ISubscribable<TEventHandler>}
   *
   * @memberOf DispatcherBase
   */
  asEvent() {
    return this._wrap == null && (this._wrap = new De.DispatcherWrapper(this)), this._wrap;
  }
  /**
   * Clears the subscriptions.
   *
   * @memberOf DispatcherBase
   */
  clear() {
    this._subscriptions.length != 0 && (this._subscriptions.splice(0, this._subscriptions.length), this.triggerSubscriptionChange());
  }
  /**
   * Triggers the subscription change event.
   *
   * @private
   *
   * @memberOf DispatcherBase
   */
  triggerSubscriptionChange() {
    this._onSubscriptionChange != null && this._onSubscriptionChange.dispatch(this.count);
  }
}
v.DispatcherBase = de;
class pe extends de {
  /**
   * Dispatches the event.
   *
   * @param {number} count The currrent number of subscriptions.
   *
   * @memberOf SubscriptionChangeEventDispatcher
   */
  dispatch(e) {
    this._dispatch(!1, this, arguments);
  }
}
v.SubscriptionChangeEventDispatcher = pe;
var w = {};
Object.defineProperty(w, "__esModule", { value: !0 });
w.DispatchError = void 0;
class we extends Error {
  /**
   * Creates an instance of DispatchError.
   * @param {string} message The message.
   *
   * @memberOf DispatchError
   */
  constructor(e) {
    super(e);
  }
}
w.DispatchError = we;
var V = {};
Object.defineProperty(V, "__esModule", { value: !0 });
V.EventListBase = void 0;
class Oe {
  constructor() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   *
   * @param {string} name The name of the event.
   * @returns {TEventDispatcher} The disptacher.
   *
   * @memberOf EventListBase
   */
  get(e) {
    let t = this._events[e];
    return t || (t = this.createDispatcher(), this._events[e] = t, t);
  }
  /**
   * Removes the dispatcher associated with the name.
   *
   * @param {string} name
   *
   * @memberOf EventListBase
   */
  remove(e) {
    delete this._events[e];
  }
}
V.EventListBase = Oe;
var k = {};
Object.defineProperty(k, "__esModule", { value: !0 });
k.HandlingBase = void 0;
class Ae {
  /**
   * Creates an instance of HandlingBase.
   * @param {TList} events The event list. Used for event management.
   *
   * @memberOf HandlingBase
   */
  constructor(e) {
    this.events = e;
  }
  /**
   * Subscribes once to the event with the specified name.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf HandlingBase
   */
  one(e, t) {
    this.events.get(e).one(t);
  }
  /**
   * Checks it the event has a subscription for the specified handler.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf HandlingBase
   */
  has(e, t) {
    return this.events.get(e).has(t);
  }
  /**
   * Subscribes to the event with the specified name.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf HandlingBase
   */
  subscribe(e, t) {
    this.events.get(e).subscribe(t);
  }
  /**
   * Subscribes to the event with the specified name.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf HandlingBase
   */
  sub(e, t) {
    this.subscribe(e, t);
  }
  /**
   * Unsubscribes from the event with the specified name.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf HandlingBase
   */
  unsubscribe(e, t) {
    this.events.get(e).unsubscribe(t);
  }
  /**
   * Unsubscribes from the event with the specified name.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler.
   *
   * @memberOf HandlingBase
   */
  unsub(e, t) {
    this.unsubscribe(e, t);
  }
}
k.HandlingBase = Ae;
var Y = {}, O = {};
Object.defineProperty(O, "__esModule", { value: !0 });
O.PromiseSubscription = void 0;
class je {
  /**
   * Creates an instance of PromiseSubscription.
   * @param {TEventHandler} handler The handler for the subscription.
   * @param {boolean} isOnce Indicates if the handler should only be executed once.
   *
   * @memberOf PromiseSubscription
   */
  constructor(e, t) {
    this.handler = e, this.isOnce = t, this.isExecuted = !1;
  }
  /**
   * Executes the handler.
   *
   * @param {boolean} executeAsync True if the even should be executed async.
   * @param {*} scope The scope the scope of the event.
   * @param {IArguments} args The arguments for the event.
   *
   * @memberOf PromiseSubscription
   */
  async execute(e, t, i) {
    if (!this.isOnce || !this.isExecuted) {
      this.isExecuted = !0;
      var r = this.handler;
      if (e) {
        setTimeout(() => {
          r.apply(t, i);
        }, 1);
        return;
      }
      await r.apply(t, i);
    }
  }
}
O.PromiseSubscription = je;
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.PromiseDispatcherBase = void 0;
const Me = O, He = b, Ce = v, Ne = w;
class Ue extends Ce.DispatcherBase {
  /**
   * The normal dispatch cannot be used in this class.
   *
   * @protected
   * @param {boolean} executeAsync `True` if the even should be executed async.
   * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
   * @param {IArguments} args The arguments for the event.
   * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
   *
   * @memberOf DispatcherBase
   */
  _dispatch(e, t, i) {
    throw new Ne.DispatchError("_dispatch not supported. Use _dispatchAsPromise.");
  }
  /**
   * Crates a new subscription.
   *
   * @protected
   * @param {TEventHandler} handler The handler.
   * @param {boolean} isOnce Indicates if the handler should only run once.
   * @returns {ISubscription<TEventHandler>} The subscription.
   *
   * @memberOf PromiseDispatcherBase
   */
  createSubscription(e, t) {
    return new Me.PromiseSubscription(e, t);
  }
  /**
   * Generic dispatch will dispatch the handlers with the given arguments.
   *
   * @protected
   * @param {boolean} executeAsync `True` if the even should be executed async.
   * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
   * @param {IArguments} args The arguments for the event.
   * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
   *
   * @memberOf DispatcherBase
   */
  async _dispatchAsPromise(e, t, i) {
    for (let r of [...this._subscriptions]) {
      let s = new He.EventManagement(() => this.unsub(r.handler)), a = Array.prototype.slice.call(i);
      if (a.push(s), await r.execute(e, t, a), this.cleanup(r), !e && s.propagationStopped)
        return { propagationStopped: !0 };
    }
    return e ? null : { propagationStopped: !1 };
  }
}
Y.PromiseDispatcherBase = Ue;
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript - Core
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.SubscriptionChangeEventDispatcher = n.HandlingBase = n.PromiseDispatcherBase = n.PromiseSubscription = n.DispatchError = n.EventManagement = n.EventListBase = n.DispatcherWrapper = n.DispatcherBase = n.Subscription = void 0;
  const e = v;
  Object.defineProperty(n, "DispatcherBase", { enumerable: !0, get: function() {
    return e.DispatcherBase;
  } }), Object.defineProperty(n, "SubscriptionChangeEventDispatcher", { enumerable: !0, get: function() {
    return e.SubscriptionChangeEventDispatcher;
  } });
  const t = w;
  Object.defineProperty(n, "DispatchError", { enumerable: !0, get: function() {
    return t.DispatchError;
  } });
  const i = B;
  Object.defineProperty(n, "DispatcherWrapper", { enumerable: !0, get: function() {
    return i.DispatcherWrapper;
  } });
  const r = V;
  Object.defineProperty(n, "EventListBase", { enumerable: !0, get: function() {
    return r.EventListBase;
  } });
  const s = b;
  Object.defineProperty(n, "EventManagement", { enumerable: !0, get: function() {
    return s.EventManagement;
  } });
  const a = k;
  Object.defineProperty(n, "HandlingBase", { enumerable: !0, get: function() {
    return a.HandlingBase;
  } });
  const o = Y;
  Object.defineProperty(n, "PromiseDispatcherBase", { enumerable: !0, get: function() {
    return o.PromiseDispatcherBase;
  } });
  const m = O;
  Object.defineProperty(n, "PromiseSubscription", { enumerable: !0, get: function() {
    return m.PromiseSubscription;
  } });
  const l = L;
  Object.defineProperty(n, "Subscription", { enumerable: !0, get: function() {
    return l.Subscription;
  } });
})(u);
var me = {}, E = {};
Object.defineProperty(E, "__esModule", { value: !0 });
E.EventDispatcher = void 0;
const te = u;
class Fe extends te.DispatcherBase {
  /**
   * Creates an instance of EventDispatcher.
   *
   * @memberOf EventDispatcher
   */
  constructor() {
    super();
  }
  /**
   * Dispatches the event.
   *
   * @param {TSender} sender The sender.
   * @param {TArgs} args The arguments.
   * @returns {IPropagationStatus} The propagation status to interact with the event
   *
   * @memberOf EventDispatcher
   */
  dispatch(e, t) {
    const i = this._dispatch(!1, this, arguments);
    if (i == null)
      throw new te.DispatchError("Got `null` back from dispatch.");
    return i;
  }
  /**
   * Dispatches the event in an async way. Does not support event interaction.
   *
   * @param {TSender} sender The sender.
   * @param {TArgs} args The arguments.
   *
   * @memberOf EventDispatcher
   */
  dispatchAsync(e, t) {
    this._dispatch(!0, this, arguments);
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   *
   * @returns {IEvent<TSender, TArgs>} The event.
   *
   * @memberOf EventDispatcher
   */
  asEvent() {
    return super.asEvent();
  }
}
E.EventDispatcher = Fe;
var J = {}, A = {};
Object.defineProperty(A, "__esModule", { value: !0 });
A.EventList = void 0;
const Te = u, $e = E;
class Ie extends Te.EventListBase {
  /**
   * Creates a new EventList instance.
   */
  constructor() {
    super();
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new $e.EventDispatcher();
  }
}
A.EventList = Ie;
Object.defineProperty(J, "__esModule", { value: !0 });
J.EventHandlingBase = void 0;
const qe = u, Ve = A;
class ke extends qe.HandlingBase {
  constructor() {
    super(new Ve.EventList());
  }
}
J.EventHandlingBase = ke;
var R = {};
Object.defineProperty(R, "__esModule", { value: !0 });
R.NonUniformEventList = void 0;
const Ye = E;
class Je {
  constructor() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */
  get(e) {
    if (this._events[e])
      return this._events[e];
    const t = this.createDispatcher();
    return this._events[e] = t, t;
  }
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */
  remove(e) {
    delete this._events[e];
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new Ye.EventDispatcher();
  }
}
R.NonUniformEventList = Je;
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript - Core
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.NonUniformEventList = n.EventList = n.EventHandlingBase = n.EventDispatcher = void 0;
  const e = E;
  Object.defineProperty(n, "EventDispatcher", { enumerable: !0, get: function() {
    return e.EventDispatcher;
  } });
  const t = J;
  Object.defineProperty(n, "EventHandlingBase", { enumerable: !0, get: function() {
    return t.EventHandlingBase;
  } });
  const i = A;
  Object.defineProperty(n, "EventList", { enumerable: !0, get: function() {
    return i.EventList;
  } });
  const r = R;
  Object.defineProperty(n, "NonUniformEventList", { enumerable: !0, get: function() {
    return r.NonUniformEventList;
  } });
})(me);
var he = {}, _ = {};
Object.defineProperty(_, "__esModule", { value: !0 });
_.SimpleEventDispatcher = void 0;
const ne = u;
class Re extends ne.DispatcherBase {
  /**
   * Creates an instance of SimpleEventDispatcher.
   *
   * @memberOf SimpleEventDispatcher
   */
  constructor() {
    super();
  }
  /**
   * Dispatches the event.
   *
   * @param {TArgs} args The arguments object.
   * @returns {IPropagationStatus} The status of the event.
   *
   * @memberOf SimpleEventDispatcher
   */
  dispatch(e) {
    const t = this._dispatch(!1, this, arguments);
    if (t == null)
      throw new ne.DispatchError("Got `null` back from dispatch.");
    return t;
  }
  /**
   * Dispatches the event without waiting for the result.
   *
   * @param {TArgs} args The arguments object.
   *
   * @memberOf SimpleEventDispatcher
   */
  dispatchAsync(e) {
    this._dispatch(!0, this, arguments);
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   *
   * @returns {ISimpleEvent<TArgs>} The event.
   *
   * @memberOf SimpleEventDispatcher
   */
  asEvent() {
    return super.asEvent();
  }
}
_.SimpleEventDispatcher = Re;
var W = {}, j = {};
Object.defineProperty(j, "__esModule", { value: !0 });
j.SimpleEventList = void 0;
const We = u, Ge = _;
class Ze extends We.EventListBase {
  /**
   * Creates a new SimpleEventList instance.
   */
  constructor() {
    super();
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new Ge.SimpleEventDispatcher();
  }
}
j.SimpleEventList = Ze;
Object.defineProperty(W, "__esModule", { value: !0 });
W.SimpleEventHandlingBase = void 0;
const ze = u, Qe = j;
class Xe extends ze.HandlingBase {
  constructor() {
    super(new Qe.SimpleEventList());
  }
}
W.SimpleEventHandlingBase = Xe;
var G = {};
Object.defineProperty(G, "__esModule", { value: !0 });
G.NonUniformSimpleEventList = void 0;
const Ke = _;
class xe {
  constructor() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */
  get(e) {
    if (this._events[e])
      return this._events[e];
    const t = this.createDispatcher();
    return this._events[e] = t, t;
  }
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */
  remove(e) {
    delete this._events[e];
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new Ke.SimpleEventDispatcher();
  }
}
G.NonUniformSimpleEventList = xe;
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.NonUniformSimpleEventList = n.SimpleEventList = n.SimpleEventHandlingBase = n.SimpleEventDispatcher = void 0;
  const e = _;
  Object.defineProperty(n, "SimpleEventDispatcher", { enumerable: !0, get: function() {
    return e.SimpleEventDispatcher;
  } });
  const t = W;
  Object.defineProperty(n, "SimpleEventHandlingBase", { enumerable: !0, get: function() {
    return t.SimpleEventHandlingBase;
  } });
  const i = G;
  Object.defineProperty(n, "NonUniformSimpleEventList", { enumerable: !0, get: function() {
    return i.NonUniformSimpleEventList;
  } });
  const r = j;
  Object.defineProperty(n, "SimpleEventList", { enumerable: !0, get: function() {
    return r.SimpleEventList;
  } });
})(he);
var ge = {}, M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.SignalDispatcher = void 0;
const ie = u;
class et extends ie.DispatcherBase {
  /**
   * Dispatches the signal.
   *
   * @returns {IPropagationStatus} The status of the signal.
   *
   * @memberOf SignalDispatcher
   */
  dispatch() {
    const e = this._dispatch(!1, this, arguments);
    if (e == null)
      throw new ie.DispatchError("Got `null` back from dispatch.");
    return e;
  }
  /**
   * Dispatches the signal without waiting for the result.
   *
   * @memberOf SignalDispatcher
   */
  dispatchAsync() {
    this._dispatch(!0, this, arguments);
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   *
   * @returns {ISignal} The signal.
   *
   * @memberOf SignalDispatcher
   */
  asEvent() {
    return super.asEvent();
  }
}
M.SignalDispatcher = et;
var Z = {}, H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.SignalList = void 0;
const tt = u, nt = M;
class it extends tt.EventListBase {
  /**
   * Creates an instance of SignalList.
   *
   * @memberOf SignalList
   */
  constructor() {
    super();
  }
  /**
   * Creates a new dispatcher instance.
   *
   * @protected
   * @returns {SignalDispatcher}
   *
   * @memberOf SignalList
   */
  createDispatcher() {
    return new nt.SignalDispatcher();
  }
}
H.SignalList = it;
Object.defineProperty(Z, "__esModule", { value: !0 });
Z.SignalHandlingBase = void 0;
const rt = u, st = H;
class at extends rt.HandlingBase {
  /**
   * Creates an instance of SignalHandlingBase.
   *
   * @memberOf SignalHandlingBase
   */
  constructor() {
    super(new st.SignalList());
  }
}
Z.SignalHandlingBase = at;
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript - Promise Signals
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.SignalList = n.SignalHandlingBase = n.SignalDispatcher = void 0;
  const e = M;
  Object.defineProperty(n, "SignalDispatcher", { enumerable: !0, get: function() {
    return e.SignalDispatcher;
  } });
  const t = Z;
  Object.defineProperty(n, "SignalHandlingBase", { enumerable: !0, get: function() {
    return t.SignalHandlingBase;
  } });
  const i = H;
  Object.defineProperty(n, "SignalList", { enumerable: !0, get: function() {
    return i.SignalList;
  } });
})(ge);
var fe = {}, S = {};
Object.defineProperty(S, "__esModule", { value: !0 });
S.PromiseEventDispatcher = void 0;
const re = u;
class ot extends re.PromiseDispatcherBase {
  /**
   * Creates a new EventDispatcher instance.
   */
  constructor() {
    super();
  }
  /**
   * Dispatches the event.
   *
   * @param {TSender} sender The sender object.
   * @param {TArgs} args The argument object.
   * @returns {Promise<IPropagationStatus>} The status.
   *
   * @memberOf PromiseEventDispatcher
   */
  async dispatch(e, t) {
    const i = await this._dispatchAsPromise(!1, this, arguments);
    if (i == null)
      throw new re.DispatchError("Got `null` back from dispatch.");
    return i;
  }
  /**
   * Dispatches the event without waiting for the result.
   *
   * @param {TSender} sender The sender object.
   * @param {TArgs} args The argument object.
   *
   * @memberOf PromiseEventDispatcher
   */
  dispatchAsync(e, t) {
    this._dispatchAsPromise(!0, this, arguments);
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */
  asEvent() {
    return super.asEvent();
  }
}
S.PromiseEventDispatcher = ot;
var z = {}, C = {};
Object.defineProperty(C, "__esModule", { value: !0 });
C.PromiseEventList = void 0;
const ct = u, ut = S;
class lt extends ct.EventListBase {
  /**
   * Creates a new EventList instance.
   */
  constructor() {
    super();
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new ut.PromiseEventDispatcher();
  }
}
C.PromiseEventList = lt;
Object.defineProperty(z, "__esModule", { value: !0 });
z.PromiseEventHandlingBase = void 0;
const dt = u, pt = C;
class mt extends dt.HandlingBase {
  constructor() {
    super(new pt.PromiseEventList());
  }
}
z.PromiseEventHandlingBase = mt;
var Q = {};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.NonUniformPromiseEventList = void 0;
const ht = S;
class gt {
  constructor() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */
  get(e) {
    if (this._events[e])
      return this._events[e];
    const t = this.createDispatcher();
    return this._events[e] = t, t;
  }
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */
  remove(e) {
    delete this._events[e];
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new ht.PromiseEventDispatcher();
  }
}
Q.NonUniformPromiseEventList = gt;
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript - Core
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.NonUniformPromiseEventList = n.PromiseEventList = n.PromiseEventHandlingBase = n.PromiseEventDispatcher = void 0;
  const e = S;
  Object.defineProperty(n, "PromiseEventDispatcher", { enumerable: !0, get: function() {
    return e.PromiseEventDispatcher;
  } });
  const t = z;
  Object.defineProperty(n, "PromiseEventHandlingBase", { enumerable: !0, get: function() {
    return t.PromiseEventHandlingBase;
  } });
  const i = C;
  Object.defineProperty(n, "PromiseEventList", { enumerable: !0, get: function() {
    return i.PromiseEventList;
  } });
  const r = Q;
  Object.defineProperty(n, "NonUniformPromiseEventList", { enumerable: !0, get: function() {
    return r.NonUniformPromiseEventList;
  } });
})(fe);
var ve = {}, N = {};
Object.defineProperty(N, "__esModule", { value: !0 });
N.PromiseSignalDispatcher = void 0;
const se = u;
class ft extends se.PromiseDispatcherBase {
  /**
   * Creates a new SignalDispatcher instance.
   */
  constructor() {
    super();
  }
  /**
   * Dispatches the signal.
   *
   * @returns {IPropagationStatus} The status of the dispatch.
   *
   * @memberOf SignalDispatcher
   */
  async dispatch() {
    const e = await this._dispatchAsPromise(!1, this, arguments);
    if (e == null)
      throw new se.DispatchError("Got `null` back from dispatch.");
    return e;
  }
  /**
   * Dispatches the signal threaded.
   */
  dispatchAsync() {
    this._dispatchAsPromise(!0, this, arguments);
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */
  asEvent() {
    return super.asEvent();
  }
}
N.PromiseSignalDispatcher = ft;
var X = {}, U = {};
Object.defineProperty(U, "__esModule", { value: !0 });
U.PromiseSignalList = void 0;
const vt = u, bt = N;
class Et extends vt.EventListBase {
  /**
   * Creates a new SignalList instance.
   */
  constructor() {
    super();
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new bt.PromiseSignalDispatcher();
  }
}
U.PromiseSignalList = Et;
Object.defineProperty(X, "__esModule", { value: !0 });
X.PromiseSignalHandlingBase = void 0;
const _t = u, St = U;
class Pt extends _t.HandlingBase {
  constructor() {
    super(new St.PromiseSignalList());
  }
}
X.PromiseSignalHandlingBase = Pt;
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript - Promise Signals
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.PromiseSignalList = n.PromiseSignalHandlingBase = n.PromiseSignalDispatcher = void 0;
  const e = N;
  Object.defineProperty(n, "PromiseSignalDispatcher", { enumerable: !0, get: function() {
    return e.PromiseSignalDispatcher;
  } });
  const t = X;
  Object.defineProperty(n, "PromiseSignalHandlingBase", { enumerable: !0, get: function() {
    return t.PromiseSignalHandlingBase;
  } });
  const i = U;
  Object.defineProperty(n, "PromiseSignalList", { enumerable: !0, get: function() {
    return i.PromiseSignalList;
  } });
})(ve);
var be = {}, K = {}, P = {};
Object.defineProperty(P, "__esModule", { value: !0 });
P.PromiseSimpleEventDispatcher = void 0;
const ae = u;
class yt extends ae.PromiseDispatcherBase {
  /**
   * Creates a new SimpleEventDispatcher instance.
   */
  constructor() {
    super();
  }
  /**
   * Dispatches the event.
   * @param args The arguments object.
   * @returns {IPropagationStatus} The status of the dispatch.
   * @memberOf PromiseSimpleEventDispatcher
   */
  async dispatch(e) {
    const t = await this._dispatchAsPromise(!1, this, arguments);
    if (t == null)
      throw new ae.DispatchError("Got `null` back from dispatch.");
    return t;
  }
  /**
   * Dispatches the event without waiting for it to complete.
   * @param args The argument object.
   * @memberOf PromiseSimpleEventDispatcher
   */
  dispatchAsync(e) {
    this._dispatchAsPromise(!0, this, arguments);
  }
  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */
  asEvent() {
    return super.asEvent();
  }
}
P.PromiseSimpleEventDispatcher = yt;
Object.defineProperty(K, "__esModule", { value: !0 });
K.NonUniformPromiseSimpleEventList = void 0;
const Dt = P;
class Bt {
  constructor() {
    this._events = {};
  }
  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */
  get(e) {
    if (this._events[e])
      return this._events[e];
    const t = this.createDispatcher();
    return this._events[e] = t, t;
  }
  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */
  remove(e) {
    delete this._events[e];
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new Dt.PromiseSimpleEventDispatcher();
  }
}
K.NonUniformPromiseSimpleEventList = Bt;
var x = {}, F = {};
Object.defineProperty(F, "__esModule", { value: !0 });
F.PromiseSimpleEventList = void 0;
const Lt = u, wt = P;
class Ot extends Lt.EventListBase {
  /**
   * Creates a new SimpleEventList instance.
   */
  constructor() {
    super();
  }
  /**
   * Creates a new dispatcher instance.
   */
  createDispatcher() {
    return new wt.PromiseSimpleEventDispatcher();
  }
}
F.PromiseSimpleEventList = Ot;
Object.defineProperty(x, "__esModule", { value: !0 });
x.PromiseSimpleEventHandlingBase = void 0;
const At = u, jt = F;
class Mt extends At.HandlingBase {
  constructor() {
    super(new jt.PromiseSimpleEventList());
  }
}
x.PromiseSimpleEventHandlingBase = Mt;
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript - Core
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.NonUniformPromiseSimpleEventList = n.PromiseSimpleEventList = n.PromiseSimpleEventHandlingBase = n.PromiseSimpleEventDispatcher = void 0;
  const e = K;
  Object.defineProperty(n, "NonUniformPromiseSimpleEventList", { enumerable: !0, get: function() {
    return e.NonUniformPromiseSimpleEventList;
  } });
  const t = P;
  Object.defineProperty(n, "PromiseSimpleEventDispatcher", { enumerable: !0, get: function() {
    return t.PromiseSimpleEventDispatcher;
  } });
  const i = x;
  Object.defineProperty(n, "PromiseSimpleEventHandlingBase", { enumerable: !0, get: function() {
    return i.PromiseSimpleEventHandlingBase;
  } });
  const r = F;
  Object.defineProperty(n, "PromiseSimpleEventList", { enumerable: !0, get: function() {
    return r.PromiseSimpleEventList;
  } });
})(be);
(function(n) {
  /*!
   * Strongly Typed Events for TypeScript
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.NonUniformPromiseSimpleEventList = n.PromiseSimpleEventList = n.PromiseSimpleEventHandlingBase = n.PromiseSimpleEventDispatcher = n.PromiseSignalList = n.PromiseSignalHandlingBase = n.PromiseSignalDispatcher = n.NonUniformPromiseEventList = n.PromiseEventList = n.PromiseEventHandlingBase = n.PromiseEventDispatcher = n.SignalList = n.SignalHandlingBase = n.SignalDispatcher = n.NonUniformSimpleEventList = n.SimpleEventList = n.SimpleEventHandlingBase = n.SimpleEventDispatcher = n.NonUniformEventList = n.EventList = n.EventHandlingBase = n.EventDispatcher = n.HandlingBase = n.PromiseDispatcherBase = n.PromiseSubscription = n.DispatchError = n.EventManagement = n.EventListBase = n.DispatcherWrapper = n.DispatcherBase = n.Subscription = void 0;
  var e = u;
  Object.defineProperty(n, "Subscription", { enumerable: !0, get: function() {
    return e.Subscription;
  } }), Object.defineProperty(n, "DispatcherBase", { enumerable: !0, get: function() {
    return e.DispatcherBase;
  } }), Object.defineProperty(n, "DispatcherWrapper", { enumerable: !0, get: function() {
    return e.DispatcherWrapper;
  } }), Object.defineProperty(n, "EventListBase", { enumerable: !0, get: function() {
    return e.EventListBase;
  } }), Object.defineProperty(n, "EventManagement", { enumerable: !0, get: function() {
    return e.EventManagement;
  } }), Object.defineProperty(n, "DispatchError", { enumerable: !0, get: function() {
    return e.DispatchError;
  } }), Object.defineProperty(n, "PromiseSubscription", { enumerable: !0, get: function() {
    return e.PromiseSubscription;
  } }), Object.defineProperty(n, "PromiseDispatcherBase", { enumerable: !0, get: function() {
    return e.PromiseDispatcherBase;
  } }), Object.defineProperty(n, "HandlingBase", { enumerable: !0, get: function() {
    return e.HandlingBase;
  } });
  var t = me;
  Object.defineProperty(n, "EventDispatcher", { enumerable: !0, get: function() {
    return t.EventDispatcher;
  } }), Object.defineProperty(n, "EventHandlingBase", { enumerable: !0, get: function() {
    return t.EventHandlingBase;
  } }), Object.defineProperty(n, "EventList", { enumerable: !0, get: function() {
    return t.EventList;
  } }), Object.defineProperty(n, "NonUniformEventList", { enumerable: !0, get: function() {
    return t.NonUniformEventList;
  } });
  var i = he;
  Object.defineProperty(n, "SimpleEventDispatcher", { enumerable: !0, get: function() {
    return i.SimpleEventDispatcher;
  } }), Object.defineProperty(n, "SimpleEventHandlingBase", { enumerable: !0, get: function() {
    return i.SimpleEventHandlingBase;
  } }), Object.defineProperty(n, "SimpleEventList", { enumerable: !0, get: function() {
    return i.SimpleEventList;
  } }), Object.defineProperty(n, "NonUniformSimpleEventList", { enumerable: !0, get: function() {
    return i.NonUniformSimpleEventList;
  } });
  var r = ge;
  Object.defineProperty(n, "SignalDispatcher", { enumerable: !0, get: function() {
    return r.SignalDispatcher;
  } }), Object.defineProperty(n, "SignalHandlingBase", { enumerable: !0, get: function() {
    return r.SignalHandlingBase;
  } }), Object.defineProperty(n, "SignalList", { enumerable: !0, get: function() {
    return r.SignalList;
  } });
  var s = fe;
  Object.defineProperty(n, "PromiseEventDispatcher", { enumerable: !0, get: function() {
    return s.PromiseEventDispatcher;
  } }), Object.defineProperty(n, "PromiseEventHandlingBase", { enumerable: !0, get: function() {
    return s.PromiseEventHandlingBase;
  } }), Object.defineProperty(n, "PromiseEventList", { enumerable: !0, get: function() {
    return s.PromiseEventList;
  } }), Object.defineProperty(n, "NonUniformPromiseEventList", { enumerable: !0, get: function() {
    return s.NonUniformPromiseEventList;
  } });
  var a = ve;
  Object.defineProperty(n, "PromiseSignalDispatcher", { enumerable: !0, get: function() {
    return a.PromiseSignalDispatcher;
  } }), Object.defineProperty(n, "PromiseSignalHandlingBase", { enumerable: !0, get: function() {
    return a.PromiseSignalHandlingBase;
  } }), Object.defineProperty(n, "PromiseSignalList", { enumerable: !0, get: function() {
    return a.PromiseSignalList;
  } });
  var o = be;
  Object.defineProperty(n, "PromiseSimpleEventDispatcher", { enumerable: !0, get: function() {
    return o.PromiseSimpleEventDispatcher;
  } }), Object.defineProperty(n, "PromiseSimpleEventHandlingBase", { enumerable: !0, get: function() {
    return o.PromiseSimpleEventHandlingBase;
  } }), Object.defineProperty(n, "PromiseSimpleEventList", { enumerable: !0, get: function() {
    return o.PromiseSimpleEventList;
  } }), Object.defineProperty(n, "NonUniformPromiseSimpleEventList", { enumerable: !0, get: function() {
    return o.NonUniformPromiseSimpleEventList;
  } });
})(I);
const p = class p {
  constructor() {
    d(this, "_onSubmit", new I.SignalDispatcher());
    d(this, "_onValidate", new I.SignalDispatcher());
    d(this, "_onError", new I.SignalDispatcher());
    d(this, "submit", !0);
    d(this, "submitPromise", !1);
    d(this, "validate", !0);
    d(this, "validatePromise", !1);
  }
  static log(e, t = "#fff", i = "#F00") {
    f(e, t, i);
  }
  static getInstance() {
    return p.instance || (p.instance = new p()), p.instance;
  }
  dispatchSubmit() {
    this._onSubmit.dispatch(), p.log("dispatchSubmit");
  }
  dispatchValidate() {
    this._onValidate.dispatch(), p.log("dispatchValidate");
  }
  dispatchError() {
    this._onError.dispatch(), p.log("dispatchError");
  }
  submitForm() {
    const e = document.querySelector(
      "form .en__submit button"
    );
    if (e) {
      const t = document.getElementById("enModal");
      t && t.classList.add("is-submitting"), e.click(), p.log("submitForm");
    }
  }
  get onSubmit() {
    return this._onSubmit.asEvent();
  }
  get onError() {
    return this._onError.asEvent();
  }
  get onValidate() {
    return this._onValidate.asEvent();
  }
};
d(p, "instance");
let q = p;
class g {
  constructor() {
    d(this, "vgsField", document.querySelector(
      ".en__field--vgs"
    ));
    d(this, "options", {
      "transaction.ccnumber": {
        showCardIcon: !0,
        placeholder: "•••• •••• •••• ••••",
        icons: {
          cardPlaceholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB8ElEQVR4nO2c4W3CMBBGz1H/NyNkAzoCo2SDrkI3YJSOABt0g9IJXBnOqUkMyifUqkrek04RlvMjT2c7sc6EGKPBfBpcaSBMBGEiCBNBmAjCRBAmgjARhIkgTARhIggTQZhK2q0Yh5l1ZrYzs0PqsrI4+LN3VTeThkvntUm6Fbuxn2E/LITQmtm7mW08Sb/MbO9tpxhjui6WEMLWzJKDdO3N7Nmf9ZjaYoyn8y8X1o6GXxLV1lJyDeE+9oWPQ/ZRG4b9WkVVpqe+8LLLo7ErM6t248qllZnWBc+uV5+zumGsQjm3f/ic9tb4JGeeXcga4U723rptilVx0avgg2Q3m/JNn+y6zeAm+GSWUi/c7L5yfB77RJhACOHs6WnuLfmGpTI3YditEEGYCMJEECaCMJHZqySvHRfIMBGEiSBMBGEiCBNBmAjCRBAmgjARhIkgTGT2t+R/59EdYXZcfwmEiSBMBGEiCBNZzCr5VzvCZJjIIMxrPKFC6abMsHbaFcZuGq8StqKwDqZkN8emKBbrvawHCtxJ7y1nVxQF34lxUXBupOy8EtWy88jBhknUDjbkPhyd+Xn2l9lHZ8rgcNZVTA5nTYRFjv/dPf7HvzuJ8C0pgjARhIkgTARhIggTQZgIwkQQJoIwEYSJIEwEYQpm9g2Ro5zhLcuLBwAAAABJRU5ErkJggg=="
        },
        css: "",
        // Autocomplete is not customizable
        autoComplete: "cc-number",
        validations: ["required", "validCardNumber"]
      },
      "transaction.ccvv": {
        showCardIcon: !1,
        placeholder: "CVV",
        hideValue: !1,
        // Autocomplete is not customizable
        autoComplete: "cc-csc",
        validations: ["required", "validCardSecurityCode"],
        css: ""
      },
      "transaction.ccexpire": {
        placeholder: "MM/YY",
        autoComplete: "cc-exp",
        validations: ["required", "validCardExpirationDate"],
        css: "",
        yearLength: 2
      }
    });
    d(this, "paymentTypeField", document.querySelector(
      "#en__field_transaction_paymenttype"
    ));
    d(this, "_form", q.getInstance());
    d(this, "field_expiration_month", null);
    d(this, "field_expiration_year", null);
    d(this, "handleExpUpdate", (e) => {
      if (!this.field_expiration_month || !this.field_expiration_year) return;
      const t = /* @__PURE__ */ new Date(), i = t.getMonth() + 1, r = parseInt(
        this.field_expiration_year[this.field_expiration_year.length - 1].value
      ) > 2e3 ? t.getFullYear() : t.getFullYear() - 2e3;
      if (e == "month") {
        let s = parseInt(this.field_expiration_month.value), a = s < i;
        g.log(`month disable ${a}`), g.log(`selected_month ${s}`);
        for (let o = 0; o < this.field_expiration_year.options.length; o++)
          parseInt(this.field_expiration_year.options[o].value) <= r && (a ? this.field_expiration_year.options[o].setAttribute(
            "disabled",
            "disabled"
          ) : this.field_expiration_year.options[o].disabled = !1);
      } else if (e == "year") {
        let s = parseInt(this.field_expiration_year.value), a = s == r;
        g.log(`year disable ${a}`), g.log(`selected_year ${s}`);
        for (let o = 0; o < this.field_expiration_month.options.length; o++)
          parseInt(this.field_expiration_month.options[o].value) < i && (a ? this.field_expiration_month.options[o].setAttribute(
            "disabled",
            "disabled"
          ) : this.field_expiration_month.options[o].disabled = !1);
      }
    });
    if (!this.shouldRun()) return;
    this.setPaymentType(), this.setDefaults(), this.dumpGlobalVar();
    const e = document.getElementsByName(
      "transaction.ccexpire"
    );
    e && (this.field_expiration_month = e[0], this.field_expiration_year = e[1]), this.field_expiration_month && this.field_expiration_year && ["change"].forEach((t) => {
      var i, r;
      (i = this.field_expiration_month) == null || i.addEventListener(t, () => {
        this.handleExpUpdate("month");
      }), (r = this.field_expiration_year) == null || r.addEventListener(t, () => {
        this.handleExpUpdate("year");
      });
    }), this._form.onValidate.subscribe(() => {
      if (this._form.validate) {
        const t = this.validate();
        g.log(`Form Validation: ${t}`), this._form.validate = t;
      }
    });
  }
  static log(e, t = "#FFF", i = "#000") {
    f(e, t, i);
  }
  shouldRun() {
    return !!this.vgsField;
  }
  setDefaults() {
    const e = getComputedStyle(document.body), t = {
      fontFamily: e.getPropertyValue("--input_font-family") || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
      fontSize: e.getPropertyValue("--input_font-size") || "16px",
      color: e.getPropertyValue("--input_color") || "#000",
      padding: e.getPropertyValue("--input_padding") || "10px",
      "&::placeholder": {
        color: e.getPropertyValue("--input_placeholder-color") || "#a9a9a9",
        opacity: e.getPropertyValue("--input_placeholder-opacity") || "1",
        fontWeight: e.getPropertyValue("--input_placeholder-font-weight") || "normal"
      }
    }, i = this.options, r = {
      "transaction.ccnumber": {
        showCardIcon: !0,
        placeholder: "•••• •••• •••• ••••",
        icons: {
          cardPlaceholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB8ElEQVR4nO2c4W3CMBBGz1H/NyNkAzoCo2SDrkI3YJSOABt0g9IJXBnOqUkMyifUqkrek04RlvMjT2c7sc6EGKPBfBpcaSBMBGEiCBNBmAjCRBAmgjARhIkgTARhIggTQZhK2q0Yh5l1ZrYzs0PqsrI4+LN3VTeThkvntUm6Fbuxn2E/LITQmtm7mW08Sb/MbO9tpxhjui6WEMLWzJKDdO3N7Nmf9ZjaYoyn8y8X1o6GXxLV1lJyDeE+9oWPQ/ZRG4b9WkVVpqe+8LLLo7ErM6t248qllZnWBc+uV5+zumGsQjm3f/ic9tb4JGeeXcga4U723rptilVx0avgg2Q3m/JNn+y6zeAm+GSWUi/c7L5yfB77RJhACOHs6WnuLfmGpTI3YditEEGYCMJEECaCMJHZqySvHRfIMBGEiSBMBGEiCBNBmAjCRBAmgjARhIkgTGT2t+R/59EdYXZcfwmEiSBMBGEiCBNZzCr5VzvCZJjIIMxrPKFC6abMsHbaFcZuGq8StqKwDqZkN8emKBbrvawHCtxJ7y1nVxQF34lxUXBupOy8EtWy88jBhknUDjbkPhyd+Xn2l9lHZ8rgcNZVTA5nTYRFjv/dPf7HvzuJ8C0pgjARhIkgTARhIggTQZgIwkQQJoIwEYSJIEwEYQpm9g2Ro5zhLcuLBwAAAABJRU5ErkJggg=="
        },
        css: t,
        // Autocomplete is not customizable
        autoComplete: "cc-number",
        validations: ["required", "validCardNumber"]
      },
      "transaction.ccvv": {
        showCardIcon: !1,
        placeholder: "CVV",
        hideValue: !1,
        // Autocomplete is not customizable
        autoComplete: "cc-csc",
        validations: ["required", "validCardSecurityCode"],
        css: t
      },
      "transaction.ccexpire": {
        placeholder: "MM/YY",
        autoComplete: "cc-exp",
        validations: ["required", "validCardExpirationDate"],
        css: t,
        yearLength: 2
      }
    };
    this.options = c.deepMerge(r, i);
  }
  setPaymentType() {
    c.getPaymentType() === "" && c.setPaymentType("card");
  }
  dumpGlobalVar() {
    window.enVGSFields = this.options, window.setTimeout(() => {
      const e = document.querySelectorAll(
        ".en__field__input--vgs"
      );
      if (e.length > 0) {
        const t = new MutationObserver((i) => {
          i.forEach((r) => {
            var s;
            if (r.type === "childList" && r.addedNodes.length > 0 && r.addedNodes.forEach((a) => {
              a.nodeName === "IFRAME" && r.previousSibling && r.previousSibling.nodeName === "IFRAME" && r.previousSibling.remove();
            }), r.type === "attributes" && r.attributeName === "class") {
              const a = r.target;
              if (a.classList.contains("vgs-collect-container__valid")) {
                const o = a.closest(".en__field--vgs");
                o == null || o.classList.remove("en__field--validationFailed"), (s = o == null ? void 0 : o.querySelector(".en__field__error")) == null || s.remove();
              }
            }
          });
        });
        e.forEach((i) => {
          t.observe(i, {
            childList: !0,
            attributeFilter: ["class"]
          });
        }), c.checkNested(
          window.EngagingNetworks,
          "require",
          "_defined",
          "enjs",
          "vgs"
        ) ? window.EngagingNetworks.require._defined.enjs.vgs.init() : g.log("VGS is not defined");
      }
    }, 1e3);
  }
  validate() {
    if (this.paymentTypeField.value.toLowerCase() === "card" || this.paymentTypeField.value.toLowerCase() === "visa" || this.paymentTypeField.value.toLowerCase() === "vi") {
      const e = document.querySelector(
        ".en__field--vgs.en__field--ccnumber"
      ), t = e.querySelector(
        ".vgs-collect-container__empty"
      ), i = document.querySelector(
        ".en__field--vgs.en__field--ccvv"
      ), r = i.querySelector(
        ".vgs-collect-container__empty"
      );
      if (e && t)
        return window.setTimeout(() => {
          c.setError(e, "Please enter a valid card number"), e.scrollIntoView({ behavior: "smooth" });
        }, 100), !1;
      if (i && r)
        return window.setTimeout(() => {
          c.setError(i, "Please enter a valid CVV"), i.scrollIntoView({ behavior: "smooth" });
        }, 100), !1;
    }
    return !0;
  }
}
const D = document.querySelector(
  "input[type='radio'][value='monthly']"
), y = () => D && D.checked, Ht = (D == null ? void 0 : D.name) || "transaction.recurrfreq";
function oe() {
  const n = q.getInstance(), e = (r) => {
    f(r, "#fff", "#0F0");
  }, t = (r) => {
    f(r, "#fff", "#F00");
  }, i = (r) => {
    f(r, "#fff", "#00F");
  };
  c.log("4Site Init", "#000", "#FF0"), c.getPageType() === "DONATION" ? (document.querySelector("input[name='transaction.recurrpay']") || (i("Creating transaction.recurrpay"), c.createHiddenInput(
    "transaction.recurrpay",
    y() ? "Y" : ""
  )), document.querySelector("input[name='transaction.recurrfreq']") || (i("Creating transaction.recurrfreq"), c.createHiddenInput(
    "transaction.recurrfreq",
    y() ? "MONTHLY" : ""
  )), c.setBodyData(
    "donation-frequency",
    y() ? "MONTHLY" : "ONETIME"
  ), document.querySelectorAll(
    `input[type='radio'][name='${Ht}']`
  ).forEach((s) => {
    s.addEventListener("change", () => {
      const a = s.value.toUpperCase() === "MONTHLY" ? "MONTHLY" : "ONETIME";
      c.setBodyData("donation-frequency", a), i(`Donation Frequency: ${a}`), c.setFieldValue(
        "transaction.recurrpay",
        a === "MONTHLY" ? "Y" : ""
      ), c.setFieldValue(
        "transaction.recurrfreq",
        a === "MONTHLY" ? "MONTHLY" : ""
      ), ce() || (i("Donation Total is 0 - Set a default amount"), ue()), window.setTimeout(() => {
        le();
      }, 50);
    });
  }), c.setFieldValue("transaction.recurrpay", y() ? "Y" : ""), c.setFieldValue(
    "transaction.recurrfreq",
    y() ? "MONTHLY" : ""
  ), ce() || (i("Donation Total is 0 - Set a default amount"), ue()), le(), n.onValidate.subscribe(() => {
    if (n.validate) {
      const s = document.querySelector(
        ".en__field--ccexpire"
      );
      if (!s)
        return;
      const a = Ct();
      i(`Exp Date Validation: ${a}`), n.validate = a, a ? c.removeError(s) : c.setError(
        s,
        "Please enter a valid expiration date"
      );
    }
  })) : t("Not a Donation Page"), c.watchForError(c.enableSubmit), n.onSubmit.subscribe(() => {
    i("onSubmit");
  }), n.onValidate.subscribe(() => {
    i("onValidate"), c.disableSubmit("Processing...");
  }), n.onError.subscribe(() => {
    i("onError"), c.enableSubmit();
  }), window.enOnSubmit = () => (n.submit = !0, n.submitPromise = !1, n.dispatchSubmit(), n.submit ? n.submitPromise ? n.submitPromise : (e("enOnSubmit Success"), !0) : !1), window.enOnError = () => {
    n.dispatchError();
  }, window.enOnValidate = () => (n.validate = !0, n.validatePromise = !1, n.dispatchValidate(), n.validate ? n.validatePromise ? n.validatePromise : (e("Validation Passed"), !0) : !1), new g();
}
function ce() {
  return !!(c.checkNested(
    window,
    "EngagingNetworks",
    "require",
    "_defined",
    "enjs",
    "getDonationTotal"
  ) && window.EngagingNetworks.require._defined.enjs.getDonationTotal() > 0);
}
function ue() {
  const n = document.querySelector(
    ".en__field--donationAmt .en__field__item:first-child input"
  );
  if (n) {
    n.checked = !0;
    const e = new Event("change", {
      bubbles: !0,
      cancelable: !0
    });
    n.dispatchEvent(e);
  }
}
function le() {
  document.querySelectorAll(
    ".en__field--donationAmt .en__field__item input"
  ).forEach((e) => {
    e.value !== "" && e.value.toLowerCase() !== "other" && isNaN(parseInt(e.value)) && (f(`Clearing Amount: ${e.value}`, "#fff", "#00F"), e.value = c.cleanAmount(e.value).toString());
  });
}
function Ct() {
  if (!Nt())
    return !0;
  const n = document.querySelectorAll(
    ".en__field--ccexpire select.en__field__input"
  );
  if (n.length !== 2)
    return !0;
  const e = n[0].value, t = n[1].value;
  if (e === "" || t === "")
    return !1;
  const i = /* @__PURE__ */ new Date(), r = i.getFullYear(), s = i.getMonth() + 1, a = parseInt(t), o = parseInt(e);
  return !(a < r || a === r && o < s);
}
function Nt() {
  const n = c.getPaymentType();
  return [
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
    "jc"
  ].includes(n.toLowerCase());
}
document.readyState === "complete" ? oe() : window.addEventListener("load", oe);
