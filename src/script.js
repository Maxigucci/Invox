export class InvoiceData {
  constructor(
    invoiceNumber= "1234",
    issueDate= "Date Issued",
    dueDate= "Date Due",
    companyName= "Your Company/Business",
    yourName= "Your Name",
    companyAddress= "Company Address",
    cityStateZIP= "City, State ZIP",
    companyCountry= "",
    clientName= "Your Client's Name",
    clientAddress= "Client's Address",
    clientCityStateZIP= "City, State ZIP",
    clientCountry= "Client's Country",
    items= [{description: "Web copy", qty: 3, rate: 200},],
    accountNumber= 987654321,
    accountName= "Account Name",
    bankName= "bankName",
    taxPercent= 0,
    discountPercent= 0
  ){
    this.invoiceNumber= invoiceNumber,
    this.issueDate= issueDate,
    this.dueDate= dueDate,
    this.companyName= companyName,
    this.yourName= yourName,
    this.companyAddress= companyAddress,
    this.cityStateZIP= cityStateZIP,
    this.companyCountry= companyCountry,
    this.clientName= clientName,
    this.clientAddress= clientAddress,
    this.clientCityStateZIP= clientCityStateZIP,
    this.clientCountry= clientCountry,
    this.items= items,
    this.accountNumber= 987654321,
    this.accountName= accountNumber,
    this.bankName= bankName,
    this.taxPercent= taxPercent,
    this.discountPercent= discountPercent
  }
}

export class InvoiceItemData {
  constructor(description, qty=1, rate="0.00"){
    this.description= description,
    this.qty= qty,
    this.rate= rate
  }
}

let invoiceDataTemplate = new InvoiceData;

let initInvoiceData;
let localStorageInvoiceData = localStorage.getItem("invoiceData");

if(localStorageInvoiceData){
  initInvoiceData = JSON.parse(localStorageInvoiceData);
}else{
  initInvoiceData = invoiceDataTemplate;
  localStorage.setItem("invoiceData", JSON.stringify(initInvoiceData))
}

export {initInvoiceData};