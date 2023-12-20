/**
 * author se0in
 * Create Date 2023.12.13.
 * * 상세 페이지
 * * 검색 리스트 > 상세 이동
 * TODO 추후 제작할 추천 > 상세페이지도 고려할 것
 * */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ResultIngredient, fetchDataBasic, fetchDataCourse } from '../server/server';
import imgDataJson from "../data/data.json";
import { BorderRadiusBox, PageTitle } from '../styled-components/Styled';
import '../scss/Detail.scss';

const Detail = () => {
  const { id } = useParams();
  const [recipeBasic, setRecipeBasic] = useState(); // * 기본
  const [recipeDetail, setRecipeDetail] = useState(); // * 과정
  const [recipeIngredient, setRecipeIngredient] = useState(); // * 재료

  const [imgUrls, setImgUrls] = useState({}); // * json이미지 url

  useEffect(() => {
    // * 기본 정보 데이터
    const detailBasic = async () => {
      try {
        const DATA = await fetchDataBasic(id);
        setRecipeBasic(DATA)
      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      }
    };

    // * 과정 정보 데이터
    const detailCourse = async () => {
      try {
        const DATA = await fetchDataCourse(id);
        setRecipeDetail(DATA)

      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      }
    };

    // * 재료 정보 데이터
    const fetchRecipeBasicInfo = async () => {
      try {
        const DATA = await ResultIngredient(id);
        setRecipeIngredient(DATA)
      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      }
    };

    detailBasic();
    fetchRecipeBasicInfo();
    detailCourse();
  }, [id]);

  // * $recipe_id와 json recipe_id가 같은 imgUrl 매칭해서 이미지 불러오기
  useEffect(() => {
    const jsonIds = imgDataJson.map((item) => item.recipe_id);

    // * $recipe_id 숫자로 변환해서 일치시킴
    const matchingRecipeIds = jsonIds.filter((recipe_id) =>
      jsonIds.includes(Number(recipe_id))
    );

    // * json 파일의 recipe_id와 id 일치하는 imgUrl 가져오기
    const imgUrlObj = {};
    matchingRecipeIds.forEach((id) => {
      const matchedRecipe = imgDataJson.find(
        (recipe) => recipe.recipe_id === Number(id)
      );
      if (matchedRecipe) imgUrlObj[id] = matchedRecipe.imgUrl;
    });

    setImgUrls(imgUrlObj);
  }, [id]);

  return (
    <div className='Detail'>
      {recipeBasic && recipeBasic.map((basic) =>
        <div key={basic.$recipe_id}>
          <PageTitle>
            <span className='kind'>{basic.$kind}</span>
            {basic.$recipe_name}
            <span>{basic.$desc}</span>
          </PageTitle>
          <BorderRadiusBox className='bubble'>
            <div className="img-box">
              <img
                src={process.env.PUBLIC_URL + imgUrls[id]}
                alt={imgUrls.recipe_name}
              />
            </div>
            <div className="desc">
              {/* // * 정보 */}
              <div className="desc-item">
                <h3> 정보</h3>
                <div className='list info'>
                  <p><span>칼로리</span>{basic.$kcal}</p>
                  <p><span>분량</span>{basic.$qnt}</p>
                  <p><span>조리시간</span>{basic.$cook_time}</p>
                  <p><span>난이도</span>{basic.$level}</p>
                </div>
              </div>
              {/* // * 재료 */}
              <div className="desc-item">
                <h3>재료</h3>
                <div className='list ingredient-list'>
                  {recipeIngredient &&
                    recipeIngredient.map((item, idx) => (
                      <p key={idx} className='ingredient'>{item.$ingredient_name} {item.$ingredient_Volume}
                        <span className='rest'>,</span>
                      </p>
                    ))
                  }
                </div>
              </div>

              {/* // * 조리 과정 */}
              <div className="desc-item">
                <h3>조리 과정</h3>
                {/* // *반복될 영역 : list */}
                {recipeDetail &&
                  recipeDetail.map((item, idx) => (
                    <div className='list' key={idx}>
                      <div className="procedure">
                        <span className='number'>{item.$cooking_num}</span>
                        <p>{item.$cooking_desc}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </BorderRadiusBox>
        </div>
      )}
    </div>
  )
}

export default Detail;