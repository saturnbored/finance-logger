import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/Payment.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";

type transaction = {
  type: string;
  toFrom: string;
  details: string;
  amount: number;
};

const form = document.querySelector(".new-item-form") as HTMLFormElement;
console.log(form.children);

const type = document.querySelector("#type") as HTMLInputElement;
const toFrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

const ul = document.querySelector("ul")!;

const list = new ListTemplate(ul);

let storedValues = localStorage.getItem("transactions");
let transactionHistory: transaction[] = [];

// rendering all the previous transactions stored in the local-storage
if (typeof storedValues === "string") {
  transactionHistory = JSON.parse(storedValues);
  transactionHistory.forEach(function (value: transaction) {
    const { type, toFrom, details, amount } = value;
    const allValues: [string, string, number] = [toFrom, details, amount];
    let doc: HasFormatter;
    if (type === "invoice") {
      doc = new Invoice(...allValues);
    } else {
      doc = new Payment(...allValues);
    }
    list.render(doc, type, "end");
  });
}

form.addEventListener("submit", function (e: Event) {
  e.preventDefault();

  const allValues: [string, string, number] = [
    toFrom.value,
    details.value,
    amount.valueAsNumber,
  ];

  let doc: HasFormatter;
  if (type.value === "invoice") {
    doc = new Invoice(...allValues);
  } else {
    doc = new Payment(...allValues);
  }

  list.render(doc, type.value, "start");

  const newTransaction: transaction = {
    type: type.value, 
    toFrom: toFrom.value,
    details: details.value,
    amount: amount.valueAsNumber,
  }

  console.log(transactionHistory);
  transactionHistory.unshift(newTransaction);
  localStorage.setItem('transactions', JSON.stringify(transactionHistory));
});
