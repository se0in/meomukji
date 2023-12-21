/**
 * author se0in
 * Create Date 2023.12.12.
 * * 재사용할 아이템 스타일 / props로 받아올 스타일
 * */

import styled from "styled-components";
import theme from "./theme";

// * 바탕 둥근 흰 박스
export const BorderRadiusBox = styled.div`
  border-radius: 40px;
  background-color: ${theme.borderRadiusBoxBg};
  max-width: 700px;
  margin: 0 auto;
`;

// * 포인트 버튼
export const MainBtn = styled.button`
  border-radius: 15px;
  background: ${theme.pointBtnGradient};
  color: #fff;
  transition: all.3s;
  &:hover {
    box-shadow: ${theme.pointBtnShadow};
  }
  a {
    display: block;
    padding: 15px 30px;
  }
`;

// * 페이지 타이틀
export const PageTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 800;
  span {
      display: block;
      margin-top: 10px;
      color: ${theme.subTextColor};
      font-weight: 400;
      font-size: 16px;
    }
`;

//* input text 스타일
export const InputText = styled.input`
  border-radius: 15px;
  padding: 15px;
  background-color: ${theme.inputBgColor};
  font-family: "Pretendard-Regular", "Noto Sans KR", sans-serif;
  font-size: 16px;
  &::placeholder {
    color: ${theme.inputPlaceholder};
  }
  &:focus {
    outline: 1px solid ${theme.inputPlaceholder};
  }
`;
// * dark 버튼 스타일
export const DarkBtn = styled.button`
  padding: 15px;
  border-radius: 15px;
  background-color: ${theme.darkButtonColor};
  font-size: 16px;
  color: #fff;
  transition: .3s;
  &:hover {
    background-color: ${theme.darkButtonColorHover};
  }
`;

// * 검색 결과 등록 아이템
export const RegistrationItem = styled.button`
  display: inline-block;
  padding: 6px 10px;
  border: 1px solid ${theme.pointColorOrange};
  border-radius: 15px;
  background-color: ${theme.lightOrange};
  color: ${theme.pointColorOrange};
  font-size: 14px;
  svg {
    font-size: 16px;
    vertical-align: -3px;
    margin-left: 5px;
  }
`;

// * 연한 포인트컬러 토글버튼
export const OrangeToggleBtn = styled.button`
  padding: 8px 20px;
  border-radius: 30px;
  border: ${theme.buttonBorder};
  &.active {
    border: 1px solid ${theme.pointColorOrange};
    background-color: ${theme.lightOrange};
    color: ${theme.pointColorOrange};
  }
`;

// * input range 커스텀
export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
  margin: 0 auto;
  `;
export const SliderRail = styled.div`
  position: absolute;
  top: calc(50% - 2px);
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.inputBgColor};
`;

// * 경고 발생 최적화
export const SliderFillTrack = styled.div.attrs(props => ({
  style: {
    width: `${props.fill}%`,
    top: 'calc(50% - 2px)',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: `${theme.pointColorOrange}`,
    position: 'absolute',
  },
}))``;

export const Slider = styled.input`
  position: absolute;
  top: calc(50% - 6px);
  width: 100%;
  height: 12px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  margin: 0;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none; 
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  &:active {
    cursor: grabbing;
  }
  &:focus {
    outline: none;
  }
`;

// * reset Btn
export const ResetBtn = styled.button`
  background-color: ${theme.resetBtnBg};
  padding: 15px 30px;
  color: #959595;
  border-radius: 15px;
  transition: all.3s;
  &:hover {
    background-color: #d2d2d2;
    color: #999;

  }
`