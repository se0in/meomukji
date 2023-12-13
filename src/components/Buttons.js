/**
 * author se0in
 * Create Date 2023.12.12.
 * * 버튼 모음
 * */

import React from 'react';
import { DarkBtn, MainBtn, OrangeToggleBtn, RegistrationItem, ResetBtn } from '../styled-components/Styled';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

// * 메인 버튼
export const MainButton = ({ text, to }) => {
  return (
    <MainBtn>
      <Link to={to}>
        {text}
      </Link>
    </MainBtn>
  )
};

// * 다크 버튼
export const DarkButton = ({ text, handleRegistration }) => {
  return (
    <DarkBtn onClick={handleRegistration}>
      {text}
    </DarkBtn>
  )
};

// * 검색어 등록, 클릭 시 삭제
export const Registration = ({ text, handleDelete, index }) => {
  return (
    <RegistrationItem onClick={() => handleDelete(index)}>
      {text}
      <IoMdClose/>
    </RegistrationItem>
  )
};

// * 토글 버튼 (검색 필터)
export const OrangeToggleButton = ({isActive, text, toggleActive })  => {
  return (
    <OrangeToggleBtn 
    className={isActive ? 'active' : ''}
    onClick={toggleActive}
    >
      {text}
    </OrangeToggleBtn>
  )
};

// * 초기화 버튼
export const ResetButton = () => {
  return (
    <ResetBtn type='reset'>초기화</ResetBtn>
  )
}