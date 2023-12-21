/* 
  author @se0in
  Created Date : 2023.12.21.
  * 버튼 클릭 시 scrollTop 0
*/
import React, { useEffect, useState } from 'react';
import { TopBtn } from '../styled-components/Styled';
import { scrollTop } from '../function/Function';
import { IoMdArrowUp } from "react-icons/io";

const ScrollTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(()=> {
    const btnVisibility = () => {
      if(window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', btnVisibility);
    return () => {
      window.removeEventListener('scroll', btnVisibility)
    }
  },[])
  
  return (
    <TopBtn
    onClick={scrollTop}
    className={isVisible ? 'show' : null}
    >
      <IoMdArrowUp />
    </TopBtn> 
  )
}

export default ScrollTopBtn;