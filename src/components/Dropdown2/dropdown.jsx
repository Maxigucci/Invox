import { Fragment, useEffect, useRef, useState, useContext} from 'react';
import { createPortal } from "react-dom";
import  {contextUpdates} from "../../App.jsx"

//button: string, items: array
export default function dropDown({items, handleBtnClick, children}) {
  const [dropped, setDropped] = useState(false);
  const btnRef = useRef();

  return (
    <div className="relative overflow-visible h-7">
      <button ref={btnRef} className="" onClick={
        ()=>{
          setDropped(!dropped); 
          console.log(btnRef.current)
          handleBtnClick();
          //console.log(useContext(contextUpdates))
        }
          
      }>{children}</button>
      {dropped && btnRef.current && (
        createPortal(
          <ul className="absolute bg-white text-gray-700 border-amber-200" style={{
            top: btnRef.current.getBoundingClientRect().bottom + window.scrollY,
            left: btnRef.current.getBoundingClientRect().left + window.scrollX,
          }}>
            {items.map((item, index)=>(
              <li key={`${item}-${index}` } className="">{item}</li>
            ))}
          </ul>, document.body)
      )}
    </div>
  )
}