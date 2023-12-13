/**
 * author se0in
 * Create Date 2023.12.12.
 * * Header 
 * * 메인 페이지 : 로고, 마이페이지(추후 구상)
 * * 그 외 뒤로가기 버튼
 * */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { preparing } from '../function/Function';

import '../scss/Header.scss';
import { BsFillPersonFill } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";

const Header = () => {
  const location = useLocation();
  // * 뒤로가기
  const navigate = useNavigate();
  const backPageHandle = () => {
    navigate(-1);
  }

  return (
    <>
      <header>
        {location.pathname === '/' ?
          (<>
            <h1>
              <Link to='/'>
                <img src={process.env.PUBLIC_URL + 'images/logo.png'} alt="" />
              </Link>
            </h1>
            <nav
            onClick={preparing}
          >
            <button className='header-btn'><BsFillPersonFill /></button>
          </nav>
          </>
          ) : (
            <button 
            className='header-btn back-btn'
            onClick={backPageHandle}
            >
              <IoChevronBack />
            </button>
          )}
        
      </header>

      {/* header fixed로 뜬 부분 채울 영역 */}
      <div className='header-area'></div>
    </>
  )
}

export default Header