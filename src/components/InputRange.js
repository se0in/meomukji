/**
 * author se0in
 * Create Date 2023.12.12.
 * * 검색 페이지의 input[type=range] 커스텀 
 * * [변경사항] 12.13. 시간 -> 칼로리로 변경
 * */

import React, { useState } from "react";
import {
  Slider,
  SliderContainer,
  SliderFillTrack,
  SliderRail,
} from "../styled-components/Styled";

const InputRange = () => {
  const kcalValue = [0, 10000];
  const [rangeValue, setRangeValue] = useState(0);
  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setRangeValue(value)
  }
  // * range thumb bar width
  const fillPercentage = (value) => {
    return (value / 10000) * 100;
  }
  return (
    <>
      <div className="kcal-text">
        {kcalValue.map((kcal, index) => (
          <span key={index}>{kcal} Kcal</span>
        ))}
      </div>
      <SliderContainer>
        <SliderRail />
        <SliderFillTrack fill={fillPercentage(rangeValue)} />
        <Slider
          type="range"
          min={0}
          max={10000}
          step={100}
          onChange={handleRangeChange}
        />
        {/* // * 선택 값 글자 따라다니게 */}
        <p style={{ 
          position: 'absolute', 
          width : '40px',
          bottom: '-40px', 
          left: `calc(${fillPercentage(rangeValue)}% - 30px)`,
          fontSize: '14px', 
          whiteSpace: 'nowrap',
          textAlign : 'right',
          color : '#F59407',
        }}>
          {rangeValue}
        </p>
      </SliderContainer>
    </>
  );
};

export default InputRange;
