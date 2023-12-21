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
import Loading from './Loading';

const Result = () => {
  const [loading, setLoading] = useState(false);
  const [ingredientLoading, setIngredientLoading] = useState(false);
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
      setLoading(true)
      try {
        const DATA = await fetchDataBasic(id);
        setRecipeInfo(DATA);
      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchDataIngredient();

    // * 재료 정보 데이터
    const fetchRecipeBasicInfo = async () => {
      setIngredientLoading(true)
      try {
        const DATA = await ResultIngredient(id);
        setIngredient(DATA);

      } catch (error) {
        console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
      } finally {
        setIngredientLoading(false)
      }
    };
    fetchRecipeBasicInfo();
  }, [matchedItems]);


  // * 중복된 재료 많은 순 나열
  const hasDuplicateIngredients = (recipeId) => {
    const matchedIngredients = ingredient.filter((i) =>
      matchedItems.some(
        (searchItem) =>
          searchItem.$ingredient_name === i.$ingredient_name
      ) && i.$recipe_id === recipeId
    );

    return matchedIngredients.length > 1;
  };

  const sortedRecipes = recipeInfo.slice().sort((a, b) => {
    const hasDuplicatesA = hasDuplicateIngredients(a.$recipe_id);
    const hasDuplicatesB = hasDuplicateIngredients(b.$recipe_id);

    if (hasDuplicatesA && hasDuplicatesB) {
      return 0;
    } else if (hasDuplicatesA) {
      return -1;
    } else if (hasDuplicatesB) {
      return 1;
    } else {
      return 0;
    }
  });

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
      {loading ?
        <Loading text="레시피를 찾고 있어요!" state="재료 찾기 완료" /> :
        <div className="list-box">
          {/* // * 반복 돌릴 것 : Link */}
          {sortedRecipes.map((item) => (
            <Link to={`/Detail/${item.$recipe_id}`} key={item.$recipe_id} recipe_id={item.$recipe_id}>
              <BorderRadiusBox className="list">
                {/* // * 아이템 타이틀 */}
                <div className="item-title">
                  <div className="img-box">
                    <img
                      src={process.env.PUBLIC_URL + imgUrls[item.$recipe_id]}
                      alt={item.$recipe_name}
                      loading="lazy"
                    />
                  </div>
                  <div className="text-box">
                    <span className='kind'>{item.$kind}</span>{/* 분류 */}
                    <p className="name">{item.$recipe_name}</p>{/* 이름 */}
                    <p className="desc">{item.$desc}</p>{/* 설명 */}
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
                    {ingredientLoading ? <span style={{ color: '#999' }}>재료를 불러오고 있어요 😅</span> :
                      ingredient
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
                        ))
                    }

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
      }
    </div>
  );
};

export default Result;
