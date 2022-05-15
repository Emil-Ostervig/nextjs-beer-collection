import { useState } from "react";
import debounce from "../utils/debounce";
const useIsMobile = (breakpoint: number = 768) => {
  const [getIsMobile, setIsMobile] = useState<boolean>();
  const onWindowResize = () => {
    const isDesktop = window.matchMedia(`min-width: ${breakpoint}`).matches; 
    if(!isDesktop && getIsMobile == false) {
      setIsMobile(true);
    }
    if(isDesktop && getIsMobile == true){
      setIsMobile(false);
    }
  }
  const onWindowResizeDebounced = debounce(onWindowResize, 100);
  window.addEventListener('resize', onWindowResizeDebounced);
  onWindowResize();

  return {
    getIsMobile,
    setIsMobile
  }
}

export default useIsMobile;