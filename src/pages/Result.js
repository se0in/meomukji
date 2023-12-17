/**
 * author se0in
 * Create Date 2023.12.13.
 * * 검색 결과
 * * 추후 로그인 시에만 전체 리스트 볼 수 있도록 설계
 * */

import React, { useEffect, useState } from 'react';
import { BorderRadiusBox, PageTitle } from '../styled-components/Styled';
import '../scss/Result.scss';
import { Link, useLocation } from 'react-router-dom';
import { fetchDataBasic } from '../server/server';
import imgDataJson from '../data/data.json'

const Result = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const location = useLocation();
  const matchedItems = location.state.matchedItems; // 이전 페이지(검색)에서 받아온 정보들
  const [imgUrls, setImgUrls] = useState({}); // * json이미지 url

  // * 데이터 받아오기
  useEffect(() => {
    const id = matchedItems.map((item) => item.$recipe_id)

    // console.log('이전 페이지(검색)에서 받아온 정보들: ', matchedItems);
    // console.log('이전 페이지(검색)에서 받아온 정보 개수: ', matchedItems.length);


    // * 기본 정보 데이터
    const fetchRecipeBasicInfo = async () => {
      try {
        const DATA = await fetchDataBasic(id);
        // console.log('DATA: ', DATA);
        // console.log('DATA: ', DATA);

        setRecipeInfo(DATA);
      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      }
    };
    fetchRecipeBasicInfo()
    // console.log("일치하는 데이터 가져오기",recipeInfo);



  }, [matchedItems])
  // console.log("출력될 값", recipeInfo);



  // * $recipe_id와 json recipe_id가 같은 imgUrl 매칭해서 이미지 불러오기
  useEffect(() => {
    const jsonIds = imgDataJson.map((item) => item.recipe_id);
    console.log('jsonIds: ', jsonIds);

    const recipeIds = matchedItems.map(item => item.$recipe_id);
    console.log('recipeIds: ', recipeIds);

    
    // * $recipe_id 숫자로 변환해서 일치시킴 
    const matchingRecipeIds = recipeIds.filter(recipe_id => jsonIds.includes(Number(recipe_id)));

    console.log('matchingRecipeIds: ', matchingRecipeIds);

    const imgUrlObj = {};

    // * json 파일의 recipe_id와 id 일치하는 imgUrl 가져오기
    matchingRecipeIds.forEach(id => {
      const matchedRecipe = imgDataJson.find(recipe => recipe.recipe_id === Number(id));
      if (matchedRecipe) {
        imgUrlObj[id] = matchedRecipe.imgUrl;
      }
    });

    setImgUrls(imgUrlObj)
  }, [matchedItems])


  return (
    <div className='Result'>
      <PageTitle>검색 결과
        <span>{matchedItems.length}개의 레시피가 있습니다.</span>
      </PageTitle>
      <div className='list-box'>

        {/* // * 반복 돌릴 것 : Link */}
        {recipeInfo.map((item) => (
          <Link
            to={`/Detail/${item.$recipe_id}`}
            key={item.$recipe_id}
          >
            <BorderRadiusBox className='list'>
              {/* // * 아이템 타이틀 */}
              <div className="item-title">
                <div className="img-box">
                  <img
                    src={imgUrls[item.$recipe_id]}
                    alt={item.$recipe_name}
                  />
                </div>
                <div className="text-box">
                  <p className='desc'>{item.$desc}</p>
                  <p className='name'>{item.$recipe_name}</p>
                </div>
              </div>

              {/* // * 아이템 설명 */}
              <div className="item-desc">
                <p className='time'>
                  조리 시간
                  <span>{item.$cook_time}</span>
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
        ))}
      </div>
    </div>
  )
}

export default Result;