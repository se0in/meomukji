/**
 * author se0in
 * Create Date 2023.12.13.
 * * Search 페이지에서 more 클릭 시 나오는 필터 영역
 * // ! 보류
 * */

import React, { useState } from 'react'
import { OrangeToggleButton } from './Buttons'
import InputRange from './InputRange'

const SearchFilter = () => {
  // * 버튼 토글 관리

  // * 요리 종류
  const [kindCookList, setKindCookList] = useState([
    { text: '한식', isActive: false },
    { text: '양식', isActive: false },
    { text: '중식', isActive: false },
  ]);

  // * 다중 선택
  const toggleKindActive = (index) => {
    const updateList = kindCookList.map((item, i) =>
      i === index ? { ...item, isActive: !item.isActive } : item
    )
    setKindCookList(updateList);
  };

  // * 시간
  const [timeCookList, setTimeCookList] = useState([
    { text: 0, isActive: false },
    { text: 20, isActive: false },
    { text: 40, isActive: false },
    { text: 60, isActive: false },
    { text: '전체', isActive: false },
  ]);
  // * 단일 선택
  const toggleTimeActive = (index) => {
    const updateList = timeCookList.map((item, i) => ({
      ...item,
      isActive: i === index
    }))
    setTimeCookList(updateList)

  };
  return (
    <>
      {/* // * 더보기 클릭 시 보일 부분 */}
      <div className="more">

        <div className="filter-box">
          {/* // * 요리 분류 button 
          // * 활성화 active class */}
          <div className="item">
            <p>분류<span>다중 선택 가능</span></p>
            <div className="item-content kind-list">
              {kindCookList.map((item, index) => (
                <OrangeToggleButton
                  key={index}
                  index={index}
                  text={item.text}
                  isActive={item.isActive}
                  toggleActive={() => toggleKindActive(index)}
                />
              ))}
            </div>
          </div>

          {/* // * 조리 시간 : button 
          // * 활성화 active class */}
          <div className="item">
            <p>조리 시간<span>단일 선택 가능</span></p>
            <div className="item-content time">
              {timeCookList.map((item, index) => (
                <OrangeToggleButton
                  key={index}
                  index={index}
                  text={item.text === '전체' ? item.text : `${item.text}분 이하`}
                  isActive={item.isActive}
                  toggleActive={() => toggleTimeActive(index)}
                />
              ))}
            </div>
          </div>

          {/* // * 칼로리 : input - range */}
          <div className="item">
            <p>칼로리</p>
            <div className="item-content kcal">
              <InputRange />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchFilter