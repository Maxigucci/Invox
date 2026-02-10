import { useState, useRef, createContext, useContext } from 'react';
import logo from './assets/logo.png';
import Dropdown from  "./components/Dropdown2/dropdown.jsx"

export const contextUpdates = createContext();

export default function App() {
  const dropDownsDroppedStatus = useRef({
    download: false,
    templates: false
  }); 
  function toggleDownloadStatus(){
    dropDownsDroppedStatus.download = !dropDownsDroppedStatus.download;
    console.log(dropDownsDroppedStatus.download);
  }
  function toggleTemplatesStatus(){
    dropDownsDroppedStatus.templates = !dropDownsDroppedStatus.templates;
    console.log(dropDownsDroppedStatus.templates);
  }
  


  return (
    <contextUpdates.Provider value={{toggleDownloadStatus, toggleTemplatesStatus}}>
    <div id="page" >
      <div className="" ><img src={logo} /></div>
      <Main />
      <div className="absolute bottom-0 inset-x-0 px-[1rem]" ><Footer /></div>
    </div>
    </contextUpdates.Provider>
  )
}

function Main() {
  const contextFunctions = useContext(contextUpdates);
  return (
    <div className="w-full font-display flex-1" >
      <div className="overflow-x-scroll" >
        <ul className="flex gap-4 list-none p-0 m-0" >
          <li>New</li>
          <li>Preview</li>
          <li><Dropdown items={["James", "Ebere", "Awa"]} handleBtnClick={contextFunctions.toggleDownloadStatus
          }>Download</Dropdown></li>
          <li><Dropdown items={["tt"]} handleBtnClick={contextFunctions.toggleTemplatesStatus}>Templates</Dropdown></li>
        </ul>
      </div>
      <div className="" ></div>
    </div>
  )
}

function Footer() {
  return (
  <div className="bg-primary-500 w-full">hello</div>
  )
}