import { useEffect, useRef, useState} from 'react';
import { createPortal } from "react-dom";

//button: string, items: array
export default function dropDown({items, btnClasses, children}) {
  const [dropped, setDropped] = useState(false);
  const componentRef = useRef();
  const btnRef = useRef();
  const dropDownRef = useRef();
  
  function handlePointerDown(e){
    if(dropDownRef.current && !dropDownRef.current.contains(e.target) && e.target!==btnRef.current){
      dropDownRef.current.style.opacity = "0";
      setDropped(false);
    }
  }
  
  useEffect(()=>{
    document.addEventListener("pointerdown", (e)=>{
      handlePointerDown(e)
    })
    
    if(dropped && dropDownRef.current){
      requestAnimationFrame(() => {
        dropDownRef.current.style.opacity = "1";
      });
    }
    
    return ()=>{
      removeEventListener("pointerdown", (e)=>{handlePointerDown(e)})
    }
    
  }, [dropped]);

  return (
    <div className="relative overflow-visible h-7" ref={componentRef}>
      <button ref={btnRef} className={`${btnClasses}`} onClick={
        ()=>{
          setDropped(!dropped);
        }
      }>{children}</button>
      {dropped && btnRef.current && (
        createPortal(
          <ul className="absolute bg-white text-gray-700 border-amber-200 opacity-0 transition-opacity duration-500 ease-in-out" ref={dropDownRef} style={{
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