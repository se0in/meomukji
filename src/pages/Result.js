/**
 * author se0in
 * Create Date 2023.12.13.
 * * 검색 결과
 * * 추후 로그인 시에만 전체 리스트 볼 수 있도록 설계
 * */

import React from 'react';
import { BorderRadiusBox, PageTitle } from '../styled-components/Styled';
import '../scss/Result.scss';
import { Link, useLocation } from 'react-router-dom';

const Result = () => {
  // * 데이터 받아오기
  const location = useLocation();
  const matchedItems = location.state.matchedItems;
  console.log('matchedItems: ', matchedItems);










  return (
    <div className='Result'>
      <PageTitle>검색 결과 
        <span>{matchedItems.length}개의 레시피가 있습니다.</span>0
      </PageTitle>
      <div className='list-box'>

        {/* // * 반복 돌릴 것 : Link */}
        <Link to='/Detail'>
          <BorderRadiusBox className='list'>
            {/* // * 아이템 타이틀 */}
            <div className="item-title">
              <div className="img-box">
              </div>
              <div className="text-box">
                <p className='desc'>육수로 지은 밥에 야채를 듬뿍 넣은 영양만점 나물비빔밥!</p>
                <p className='name'>나물비빔밥</p>
              </div>
            </div>

            {/* // * 아이템 설명 */}
            <div className="item-desc">
              <p className='time'>
                조리 시간 
                <span>60분</span>
              </p>
              {/* // * 검색 결과 className point-color */}
              <p className='ingredient'>
                재료 
                <span className='point-color'>쌀</span>
                <span>미나리</span>
                <span>안심</span>
                <span>고추장</span>
                <span>국간장</span>
                <span>계란</span>
              </p>
            </div>
          </BorderRadiusBox>
        </Link>
      </div>
    </div>
  )
}

export default Result;