import { useEffect } from "react";

export default function useOutsideAlerter(ref,setLocation1){
    useEffect(() => {
      function handleOutsideClick(event) {
        if (!ref.current.contains(event.target)) {
          setLocation1(false)
        }
      }
      
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    },[ref])
}

export function useOutsideAlerterbox(ref,setLocation2){
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!ref.current.contains(event.target)) {
        setLocation2(false)
      }
    }
    
    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  },[ref])
}