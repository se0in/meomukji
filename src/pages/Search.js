/**
 * author se0in
 * Create Date 2023.12.12.
 * * Home > Search 
 * * 냉장고 재료 검색 페이지
 * */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import {ResetButton } from '../components/Buttons';
import SearchIngredient from '../components/SearchIngredient';
import SearchFilter from '../components/SearchFilter';
import { BorderRadiusBox, MainBtn, PageTitle } from '../styled-components/Styled';
import '../scss/Search.scss';
import { IoIosArrowDown } from "react-icons/io";
import { fetchDataIngredient } from '../server/server';

const Search = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  // * 더보기 버튼 클릭 시 more filter 
  const moreShow = () => {
    setIsShowFilter(!isShowFilter);
  }

  
/*   // ! 데이터 불러오기
  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const data = await fetchDataIngredient();

        console.log(data);
      } catch (error) {
        console.error('데이터를 불러오는 중에 에러가 발생했습니다. : ', error);
      }
    };

    fetchDataFromServer();
  }, []); */

  return (
    <div className='Search'>
      <PageTitle>재료 검색</PageTitle>
      <BorderRadiusBox>
        <div className='inner'>
          <div className="img-box">
            <img src={process.env.PUBLIC_URL + '/images/refrigerator.svg'} alt="" />
          </div>
          <div className="text-box">
            <p>냉장고 속 재료를 입력해주시면<br />
              레시피 추천을 해드릴게요!</p>
            <p className='sub-text-color'>최대 3개까지 입력할 수 있어요.</p>
          </div>

          {/* //* 검색어 입력, 등록 */}
          <SearchIngredient />

          {/* // * 더보기 클릭 시 filter */}
          {/* // * more-btn active 시 svg rotate / 취소하기 */}
          <div
          className={`more-btn ${isShowFilter ? 'active' : ""}`}
          onClick={moreShow}>
            <button>{`${!isShowFilter ? '더보기' : "취소"}`}
              <IoIosArrowDown />
            </button>
          </div>

          {/* // * 더보기 content  */}
          {isShowFilter && <SearchFilter />}
        </div>
      </BorderRadiusBox>
      <div className="submit-btn-box">
        <ResetButton>초기화</ResetButton>
        <MainBtn type='submit'><Link to='/Result'>검색결과 보기</Link></MainBtn>
      </div>
    </div>
  )
}

export default Search;