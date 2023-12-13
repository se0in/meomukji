/**
 * author se0in
 * Create Date 2023.12.12.
 * * 하단 탭메뉴
 * * 메인, 추천, 찜 페이지만 노출
 * */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { preparing } from '../function/Function';

import '../scss/Navigation.scss';

import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { TiHeart, TiHeartOutline, } from "react-icons/ti";

// * 각 메뉴 active 설정
const NavigationItem = ({ to, isActive, IconActive, IconUnActive, pathText,onClick }) => (
  <li
    className={isActive ? 'tab-active' : ''}
  >
    <Link to={to}
    onClick={onClick}
    >
      {isActive ? <IconActive /> : <IconUnActive />}
      <p>{pathText}</p>
    </Link>
  </li>
);

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <nav className='tab-nav'>
        <ul className='inner'>
          <NavigationItem
            to='Suggestion'
            isActive={location.pathname === '/Suggestion'}
            onClick={preparing}
            IconActive={RiThumbUpFill}
            IconUnActive={RiThumbUpLine}
            pathText="추천"
          />
          <NavigationItem
            to='/'
            isActive={location.pathname === '/'}
            IconActive={LuSearch}
            IconUnActive={LuSearch}
            pathText="검색"
          /> 
          <NavigationItem
            to='/Heart'
            isActive={location.pathname === '/Heart'}
            onClick={preparing}
            IconActive={TiHeart}
            IconUnActive={TiHeartOutline}
            pathText="찜"
          />
        </ul>
      </nav>
      {/* nav fixed로 뜬 부분 채울 영역 */}
      <div className="bottom-nav-area"></div>
    </>
  )
}

export default Navigation;