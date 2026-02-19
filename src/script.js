export class InvoiceItemData {
  constructor(id, description, qty=1, rate=0){
    this.id= id;
    this.description= description,
    this.qty= qty,
    this.rate= rate
  }
}

let invoiceDataTemplate = {
  invoiceNumber: "1234",
  issueDate: "Date Issued",
  dueDate: "Date Due",
  companyName: "Your Company/Business",
  yourName: "Your Name",
  companyAddress: "Company Address",
  cityState: "City, State ZIP",
  companyCountry: "",
  clientName: "Your Client's Name",
  clientAddress: "Client's Address",
  clientCityState: "City, State ZIP",
  clientCountry: "Client's Country",
  items: [{ id: "example", description: "Web copy", qty: 3, rate: 200},],
  accountNumber: 987654321,
  accountName: "Account Name",
  bankName: "bankName",
  taxPercent: 0,
  discountPercent: 0
};

let initInvoiceData;
let localStorageInvoiceData = localStorage.getItem("invoiceData");

if(localStorageInvoiceData){
  initInvoiceData = JSON.parse(localStorageInvoiceData);
}else{
  initInvoiceData = invoiceDataTemplate;
  localStorage.setItem("invoiceData", JSON.stringify(initInvoiceData))
}

export {initInvoiceData};