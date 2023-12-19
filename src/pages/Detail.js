/**
 * author se0in
 * Create Date 2023.12.13.
 * * 상세 페이지
 * * 검색 리스트 > 상세 이동
 * TODO 추후 제작할 추천 > 상세페이지도 고려할 것
 * */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import imgDataJson from "../data/data.json";
import { BorderRadiusBox, PageTitle } from '../styled-components/Styled';
import '../scss/Detail.scss';
import { ResultIngredient, fetchDataBasic, fetchDataCourse } from '../server/server';
// import { useParams } from 'react-router';

const Detail = () => {
  const { id } = useParams();
  const [recipeBasic, setRecipeBasic] = useState();
  const [recipeDetail, setRecipeDetail] = useState();
  const [recipeIngredient, setRecipeIngredient] = useState();

  const [imgUrls, setImgUrls] = useState({}); // * json이미지 url

  useEffect(() => {
    // * 기본 정보 데이터
    const detailBasic = async () => {
      try {
        const DATA = await fetchDataBasic(id);

        // setRecipeBasic(DATA)
        setRecipeBasic(
          DATA.map((item) => ({
            $recipe_id: item.$recipe_id,
            $recipe_name: item.$recipe_name,
            $desc: item.$desc,
            $cook_time: item.$cook_time,
            $kcal: item.$kcal,
            $qnt: item.$qnt,
            $level: item.$level,
            $kind: item.$kind,
            $price: item.$price,
          }))
        );
        

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
      <PageTitle>{recipeBasic && recipeBasic.$recipe_name}
        <span>육수로 지은 밥에 야채를 듬뿍 넣은 영양만점 나물비빔밥!</span>
      </PageTitle>
      <BorderRadiusBox className='bubble'>
        <div className="img-box">
          <img
            src={process.env.PUBLIC_URL + imgUrls[id]}
            alt={imgUrls.recipe_name}
          />
        </div>
        <div className="desc">
          {/* // * 재료 */}
          <div className="desc-item ingredient">
            <h3>재료</h3>
            <div className='list'>
              {recipeIngredient &&
                recipeIngredient.map((item, idx) => (
                  <p key={idx}>
                    {item.$ingredient_name}
                    <span> {item.$ingredient_Volume}</span>
                  </p>
                ))
              }
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