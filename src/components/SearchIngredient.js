/**
 * author se0in
 * Create Date 2023.12.13.
 * * Search페이지 재료 등록, 삭제
 * */

import React, { useState } from 'react'
import { DarkButton, Registration } from './Buttons'
import { InputText } from '../styled-components/Styled'

const SearchIngredient = () => {
  const [newItemText, setNewItemText] = useState('');
  const [items, setItems] = useState([]);

  // * input 변하는 값
  const handleInputChange = e => {
    setNewItemText(e.target.value)
  }

  // * 아이템 등록 (3개까지만)
  const handleItemRegistration = () => {
    // * 공백 확인, 제거 후 input 빈 창
    if (newItemText.trim() !== '') {
      setNewItemText('');
      
      // * 3개 제한
      items.length < 3 ?
      setItems(prevItems => {
        const updatedItems = [...prevItems, newItemText.trim()];
        console.log('등록된 아이템:', updatedItems); // 등록된 아이템 콘솔에 출력
        setItems(updatedItems);
        // return updatedItems;
      }) :
      alert("재료는 3개까지만 등록할 수 있어요 :( ");
    }
  };

  // * 아이템 삭제
  const handleItemDelete = indexToDelete => {
    // * 버튼의 인덱스 Buttons.js에서 받아와서 Registration의 index와 비교 후 삭제
    const updateItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updateItems);
  }

  return (
    <>
      {/* // *등록 결과 , 클릭 시 삭제 */}
      <div className="registration-box">
        {items && items.map((item, index) => (
          <Registration
            key={index}
            index={index}
            text={item}
            handleDelete={handleItemDelete}
          />
        ))}
      </div>

      {/* // * 검색 */}
      <div className="input-box" >
        <InputText
          type="text"
          placeholder='입력 후 등록을 눌러주세요.'
          value={newItemText}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              handleItemRegistration()
            }
          }}
        />
        <DarkButton
          type="button"
          text='등록'
          handleRegistration={handleItemRegistration}
        />
      </div >
    </>
  )
}

export default SearchIngredient