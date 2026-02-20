import { useState, useRef, createContext, useContext, useLayoutEffect } from 'react';
import {useImmer} from "use-immer";
import {nanoid} from "nanoid";
import { XCircleIcon } from '@heroicons/react/24/outline';
import logo from './assets/logo.png';
import Dropdown from  "./components/Dropdown2/dropdown.jsx";
import CountrySelect from "./components/countrySelect/countrySelect.jsx";
import {initInvoiceData, InvoiceItemData} from "./script.js"; // InvoiceData with capital "I" is a class

function updateLocalStorageInvoiceData(data){
  localStorage.setItem("invoiceData", JSON.stringify(data));
}

export const invoiceDataContext = createContext();

export default function App() {
  const [invoiceData, setInvoiceData] = useImmer(initInvoiceData);
  
  return (
    <invoiceDataContext.Provider value={{invoiceData, setInvoiceData}}>
    <div id="page">
      <div className="w-full flex" ><img src={logo} className="bg-gray-600" /></div>
      <Main />
      <div className="w-full" ><Footer /></div>
    </div>
    </invoiceDataContext.Provider>
  )
}


function Main() {
  return (
    <div className="w-full flex-1 flex flex-col bg-blue-500" >
      <div className="overflow-x-scroll" >
        <ul className="flex gap-4 list-none p-0 m-0" >
          <li><button className="focus:text-gray-500" >New</button></li>
          <li className="lg:hidden" ><button className="focus:text-gray-500" >Preview</button></li>
          <li><Dropdown items={["PDF", "Image(JPG)"]} btnClasses={"focus:text-gray-500"}>Download</Dropdown></li>
          <li><Dropdown items={["Template 1", "Template 2", "Template 3"]} btnClasses={"focus:text-gray-500"} >Templates</Dropdown></li>
        </ul>
      </div>
      <div className="w-full flex-1 flex bg-white" >
        <InvoiceForm />
        <InvoicePreview />
      </div>
    </div>
  )
}


function InvoiceForm() {
  const [activeRowId, setActiveRowId] = useState(null);
  const [activeInputId, setActiveInputId] = useState(null);
  
  useLayoutEffect(()=>{
    if(activeInputId){
      const activeInput = document.getElementById(activeInputId);
      //activeInput.focus();
      console.log(activeInputId)
    }
  }, [activeInputId])
  
  
  const invoiceDataState = useContext(invoiceDataContext);
  const invoiceData = invoiceDataState.invoiceData;
  const invoiceDataItems = invoiceData.items;
  
  const today = new Date().toISOString().split("T")[0];
  let subTotal = 0;
  invoiceDataItems.forEach(item =>{
    subTotal += (item.qty * item.rate)
  })
  //console.log(subTotal)
  
  function handleInputChange(e, id){
    invoiceDataState.setInvoiceData(data =>{
      data.id = e.target.value
    })
  }
  
  function handleInputFocus(e){
    setActiveInputId(e.currentTarget.id)
  }
  
  return (
    <div className="w-full flex items-center justify-center min-w-0 lg:flex-[0_1_50%] bg-white">
      <form className="w-full aspect-[210/279]  bg-gray-600" >
      <div className="flex justify-between" >
        <img src="#" className=""/>
        <span className="">INVOICE</span>
      </div>
      <div>
        <input id="companyName" className="block" placeholder="Your Company/Business" onFocus={handleInputFocus} />
        <input id="companyAddress" className="block" placeholder="Company/Business Address" onFocus={handleInputFocus} />
        <input id="cityState" className="block" placeholder="City, State" onFocus={handleInputFocus} />
        <CountrySelect />
      </div>
      <div className="flex justify-between flex-wrap" >
        <div className="flex flex-col">
          <h3>Bill To</h3>
          <input id="clientName" placeholder="Your Client's Name" onFocus={handleInputFocus} />
          <input id="clientAddress" placeholder="Client's Address" onFocus={handleInputFocus} />
          <input id="clientCityState" placeholder="City, State" onFocus={handleInputFocus} />
          <CountrySelect />
        </div>
        <div className="flex flex-col" >
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input id="invoiceNumber" placeholder="INV-098" onFocus={handleInputFocus} />
          <label htmlFor="invoiceDate">Invoice Date</label>
          <input id="invoiceDate" type="date" defaultValue={today} onFocus={handleInputFocus} />
          <label htmlFor="dueDate">Due Date</label>
          <input id="dueDate" type="date" defaultValue={today} onFocus={handleInputFocus} />
        </div>
      </div>
      <div className="w-full overflow-x-auto" >
        <div className="min-w-[360px]" >
          <div className="grid grid-cols-[35%_20%_20%_20%_5%]">
            <span className="" >Item Description</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Rate</span>
            <span className="text-center">Amount</span>
            <span className="deleteItemBtn" ></span>
          </div>
          {invoiceDataState.invoiceData.items.map((item)=>(
              <InvoiceItem id={item.id} key={item.id} description={item.description} qty={item.qty} rate={item.rate} activeRowId={activeRowId} setActiveRowId={setActiveRowId} activeInputId={activeInputId} setActiveInputId={setActiveInputId} handleInputFocus={handleInputFocus} />
            ))}
            
        </div>
        <div className="">
          <button className="bg-gray-600 active:bg-amber-600" onClick={(e)=>{
            e.preventDefault();
            const newInvoiceItemID = nanoid();
            invoiceDataState.setInvoiceData(data =>{
              data.items.push(new InvoiceItemData(newInvoiceItemID));
             updateLocalStorageInvoiceData(data)
            })
          }} >Add Item</button>
          <div className="">
            <div >
            <span className="">Sub Total</span>
            <span id="subTotal">{
              ""
            }</span>
            </div>
            <div >
              <label htmlFor="discountPercent" >Discoint(%)</label>
              <input id="discountPercent" type="num" placeholder="0" onFocus={handleInputFocus}/>
            </div>
            <div >
              <label htmlFor="taxPercent" >Tax(%)</label>
              <input id="taxPercent" type="num" placeholder="0" onFocus={handleInputFocus} />
            </div>
            <div >
              <span >TOTAL</span>
              <span >{
                ""
              }</span>
            </div>
          </div>
        </div>
      </div>
      <div ></div>
      <div>Thank you for your patronage</div>
      <hr />
      <div>Crafted with ease using <img src="#" className=""/></div>
      </form>
    </div>
  )
}


function InvoicePreview() {
  return(
    
    <div className=" flex items-center justify-center lg:flex-[0_1_50%] lg:p-10 bg-gray-500">
      <div className="w-full aspect-[210/279]  bg-red-600" >
      </div>
    </div>
  )
}

function InvoiceItem({id, description, qty, rate, activeRowId, setActiveRowId, activeInputId, setActiveInputId, handleInputFocus}){
  const invoiceDataState = useContext(invoiceDataContext);
  
  function handleClick(e){
    const parentId = e.currentTarget.parentNode.id;
    invoiceDataState.setInvoiceData(data =>{
      e.preventDefault();
      const index = data.items.findIndex(item => item.id === parentId);
      if (index !== -1) data.items.splice(index, 1);
      updateLocalStorageInvoiceData(data);
    })
    
  }

  return(
    <div id={id} className="grid grid-cols-[35%_20%_20%_20%_5%] invoiceItem" onClick={(e)=>{
      setActiveRowId(e.currentTarget.id);
    }}>
      <input id={`${id}-description`} type="text" placeholder="Enter Description" defaultValue={description} onFocus={handleInputFocus}  />
      <input id={`${id}-qty`} type="number" defaultValue={qty} className="text-right" onFocus={handleInputFocus} />
      <input id={`${id}-rate`} type="number" defaultValue={rate} className="text-right" onFocus={handleInputFocus} />
      <span className="text-right" >{(qty*rate).toFixed(2)}</span> 
      
      { id == activeRowId && (
        <button onClick={handleClick} ><XCircleIcon className="h-6 w-6" /></button>
        )
      }
    </div>
  )
}

function Footer() {
  return (
  <div className="bg-primary-500 w-full px-[1rem]">hello</div>
  )
}
