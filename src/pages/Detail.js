/**
 * author se0in
 * Create Date 2023.12.13.
 * * 상세 페이지
 * * 검색 리스트 > 상세 이동
 * TODO 추후 제작할 추천 > 상세페이지도 고려할 것
 * */
import React from 'react';
import '../scss/Detail.scss';
import { BorderRadiusBox, PageTitle } from '../styled-components/Styled';
// import { useParams } from 'react-router';

const Detail = () => {
  // const { recipeId } = useParams();

  return (
    <div className='Detail'>
      <PageTitle>나물비빔밥 
        <span>육수로 지은 밥에 야채를 듬뿍 넣은 영양만점 나물비빔밥!</span>
      </PageTitle>
      <BorderRadiusBox className='bubble'>
        <div className="img-box">

        </div>
        <div className="desc">
          {/* // * 재료 */}
          <div className="desc-item ingredient">
            <h3>재료</h3>
            <div className='list'>
              <p>쌀 <span>4컵</span></p>
              <p>안심 <span>200g</span></p>
              <p>국간장 <span>약간</span></p>
            </div>
          </div>

          {/* // * 조리 과정 */}
          <div className="desc-item">
              <h3>조리 과정</h3>
              {/* // *반복될 영역 : list */}
            <div className='list'>
              <div className="img-box">
  
              </div>
              <div className="procedure">
                <span className='number'>1</span>
                <p>양지머리로 육수를 낸 후 식혀 기름을 걷어낸 후, 불린 쌀을 넣어 고슬고슬하게 밥을 짓는다.</p>
              </div>
            </div>
            <div className='list'>
              <div className="img-box">
  
              </div>
              <div className="procedure">
                <span className='number'>1</span>
                <p>양지머리로 육수를 낸 후 식혀 기름을 걷어낸 후, 불린 쌀을 넣어 고슬고슬하게 밥을 짓는다.</p>
              </div>
            </div>
            
          </div>
        </div>
      </BorderRadiusBox>
    </div>
  )
}

export default Detail;