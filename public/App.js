import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/Payment.js";
const form = document.querySelector(".new-item-form");
console.log(form.children);
const type = document.querySelector("#type");
const toFrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
let storedValues = localStorage.getItem("transactions");
let transactionHistory = [];
// rendering all the previous transactions stored in the local-storage
if (typeof storedValues === "string") {
    transactionHistory = JSON.parse(storedValues);
    transactionHistory.forEach(function (value) {
        const { type, toFrom, details, amount } = value;
        const allValues = [toFrom, details, amount];
        let doc;
        if (type === "invoice") {
            doc = new Invoice(...allValues);
        }
        else {
            doc = new Payment(...allValues);
        }
        list.render(doc, type, "end");
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const allValues = [
        toFrom.value,
        details.value,
        amount.valueAsNumber,
    ];
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(...allValues);
    }
    else {
        doc = new Payment(...allValues);
    }
    list.render(doc, type.value, "start");
    const newTransaction = {
        type: type.value,
        toFrom: toFrom.value,
        details: details.value,
        amount: amount.valueAsNumber,
    };
    console.log(transactionHistory);
    transactionHistory.unshift(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactionHistory));
});
