/**
 * author se0in
 * Create Date 2023.12.13.
 * * 검색 결과
 * * 추후 로그인 시에만 전체 리스트 볼 수 있도록 설계
 * */
// TODO 검색 결과 중복되는 것이 상단에 오도록!
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ResultIngredient, fetchDataBasic } from "../server/server";
import imgDataJson from "../data/data.json";
import { BorderRadiusBox, PageTitle } from "../styled-components/Styled";
import "../scss/Result.scss";

const Result = () => {
  
  const location = useLocation();
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [ingredient, setIngredient] = useState([]);

  // * 이전 페이지(검색)에서 받아온 정보들
  const matchedItems = location.state.matchedItems;
  const [imgUrls, setImgUrls] = useState({}); // * json이미지 url

  // * 데이터 받아오기
  useEffect(() => {
    const id = matchedItems.map((item) => item.$recipe_id);
    // * 기본 정보 데이터
    const fetchDataIngredient = async () => {
      try {
        const DATA = await fetchDataBasic(id);
        setRecipeInfo(DATA);
      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      }
    };
    fetchDataIngredient();

    // * 재료 정보 데이터
    const fetchRecipeBasicInfo = async () => {
      try {
        const DATA = await ResultIngredient(id);
        setIngredient(DATA);

      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      }
    };
    fetchRecipeBasicInfo();
  }, [matchedItems]);

  // * $recipe_id와 json recipe_id가 같은 imgUrl 매칭해서 이미지 불러오기
  useEffect(() => {
    const jsonIds = imgDataJson.map((item) => item.recipe_id);
    const recipeIds = matchedItems.map((item) => item.$recipe_id);

    // * $recipe_id 숫자로 변환해서 일치시킴
    const matchingRecipeIds = recipeIds.filter((recipe_id) =>
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
  }, [matchedItems]);

  return (
    <div className="Result">
      <PageTitle>
        검색 결과
        <span>{matchedItems.length}개의 레시피가 있습니다.</span>
      </PageTitle>
      <div className="list-box">
        {/* // * 반복 돌릴 것 : Link */}
        {recipeInfo.map((item) => (
          <Link to={`/Detail/${item.$recipe_id}`} key={item.$recipe_id} recipe_id={item.$recipe_id}>
            <BorderRadiusBox className="list">
              {/* // * 아이템 타이틀 */}
              <div className="item-title">
                <div className="img-box">
                  <img 
                  src={process.env.PUBLIC_URL +  imgUrls[item.$recipe_id]} 
                  alt={item.$recipe_name} />
                </div>
                <div className="text-box">
                  <span className='kind'>{item.$kind}</span>
                  <p className="name">{item.$recipe_name}</p>
                  <p className="desc">{item.$desc}</p>
                </div>
              </div>

              {/* // * 아이템 설명 */}
              <div className="item-desc">
                <p className="time">
                  난이도
                  <span>{item.$level}</span>
                </p>
                <p className="time">
                  조리 시간
                  <span>{item.$cook_time}</span>
                </p>
                {/* // * 검색 결과 className point-color */}
                <p className="ingredient">
                  재료
                  {/* // * 검색어 등록한 재료 먼저 출력 */}
                  {ingredient
                    .filter((i) =>
                      matchedItems.some(
                        (searchItem) =>
                          searchItem.$ingredient_name === i.$ingredient_name
                      ) &&
                      i.$recipe_id === item.$recipe_id
                    )
                    .map((recipeIngredient, index) => (
                      <span
                        key={index}
                        className="point-color"
                      >
                        {recipeIngredient.$ingredient_name}
                      </span>
                    ))}

                  {/* // * 검색어 등록한 재료 먼저 출력 후 그 외 재료 출력 */}
                  {ingredient
                    .filter((i) =>
                      !matchedItems.some(
                        (searchItem) =>
                          searchItem.$ingredient_name === i.$ingredient_name
                      ) &&
                      i.$recipe_id === item.$recipe_id
                    )
                    .map((recipeIngredient, index) => (
                      <span key={index}>
                        {recipeIngredient.$ingredient_name}
                      </span>
                    ))}
                </p>
              </div>
            </BorderRadiusBox>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Result;
