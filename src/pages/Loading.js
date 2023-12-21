import React, { useEffect, useState } from 'react';
import '../scss/Loading.scss';
import { ImgBox } from '../styled-components/Styled';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({state, text}) => {
  const [imgIndex, setImgIndex] = useState(0);

  // * 이미지 변경
  useEffect(() => {
    const imgInterval = setInterval(() => {
      setImgIndex(prevIndex => (prevIndex >= 4 ? 1 : prevIndex + 1))
    }, 600);
    return () => {
      clearInterval(imgInterval)
    }
  }, [])
  return (
    <div className='Loading'>
      <div className="loading-box">
        <p className='state'>{state}</p>
        <p className='now-state'>{text}</p>
        <p className='waiting'>잠시만 기다려주세요 😄</p>
        <ImgBox className='img-box'>
          <div className="img-loading">
            <AiOutlineLoading3Quarters className='loading-img'/>
          </div>
          <img 
          src={process.env.PUBLIC_URL + `/images/loading-${imgIndex}.png`} alt="" />
        </ImgBox>
      </div>
    </div>
  )
}

export default Loading