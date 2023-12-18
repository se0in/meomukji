/**
 * author se0in
 * Create Date 2023.12.13.
 * * server 관리
 * * 농림축산식품 공공데이터포털 https://data.mafra.go.kr/main.do
 * */
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;



// * 데이터 불러오기
// const fetchData = async (url) => {
//   try {
//     const response = await axios.get(url);

//     if (response.status === 200) {
//       const parser = new DOMParser();
//       /**
//        * @xmlDoc : 오류 날 경우 console 찍기
//       */
//       const xmlDoc = parser.parseFromString(response.data, 'text/xml');
//       return xmlDoc;
//     } else {
//       throw new Error(`데이터 불러오기 실패: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('에러:', error);
//     return null;
//   }
// };

/* // * xml parsing
const extractData = (xmlDoc, tagName) => {
  if (!xmlDoc) return null;
  return Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);
}; */

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
console.log('PROXY: ', PROXY);

// * 레시피 기본 정보 26 fetchDataBasic
export const fetchDataBasic = async (id) => {

  const URLS = [
    // ! 주석 잊지말 것 : 재료 정보에는 레시피 이름이 나오지 않음
    `/openapi/${API_KEY}/xml/Grid_20150827000000000226_1/1/1000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/1001/2000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/2001/3000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/3001/4000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/4001/5000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/5001/6000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/6001/6140`
  ]

  try {
    // * 검색 결과 데이터 담을 빈 배열
    let combinedData = [];

    for (const URL of URLS) {
      /* 
      ! 주석 지우지 말 것
      * Promise.all : 한번에 요청 -> 요청 시간 최적화, 서버 부하 가능성 있음
      * for로 순차적 : 차례로 요청
      * const responses = await Promise.all(urls.map(url => axios.get(url))); */

      const response = await axios.get(`${PROXY}${URL}`);
      console.log('response: ', response);

      if (response.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        
        const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);

        const $recipe_id = extractData('RECIPE_ID'); // * 레시피 코드
        const $recipe_name = extractData('RECIPE_NM_KO'); // * 레시피 이름
        const $desc = extractData('SUMRY'); // * 레시피 간략소개
        const $cook_time = extractData('COOKING_TIME'); // * 조리시간
        const $kcal = extractData('CALORIE'); // * 칼로리
        const $qnt = extractData('QNT'); // * 분량
        const $level = extractData('LEVEL_NM'); // * 난이도
        const $kind = extractData('NATION_NM'); // * 음식 분류(ex : 한식)
        const $price = extractData('PN_NM'); // * 가격


        // * 레시피이름과 레시피 ID를 합치기
        for (let i = 0; i < Math.min($recipe_name.length, $recipe_id.length); i++) {
          combinedData.push({
            $recipe_id: $recipe_id[i],
            $recipe_name: $recipe_name[i],
            $desc: $desc[i],
            $cook_time: $cook_time[i],
            $kcal: $kcal[i],
            $qnt: $qnt[i],
            $level: $level[i],
            $kind: $kind[i],
            $price: $price[i],
          });
        }
        
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    }

    const filterData = combinedData.filter(item => id.includes(item.$recipe_id))
    // console.log('일치하는 데이터만 가져오기: ', filterData);
    return filterData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};


// * 레시피 재료 정보 27 fetchDataIngredient
export const fetchDataIngredient = async () => {

  // * 데이터 요청종료위치 지원 최대 1000 -> 모두 불러오기
  /* 
  ! 개수
  * 레시피 537개
  * row : 6140
  * 마지막 레시피 id : 19543
  * 마지막 IRDNT_SN : 195459
  */

  const URLS = [
    // ! 주석 잊지말 것 : 재료 정보에는 레시피 이름이 나오지 않음
    `/openapi/${API_KEY}/xml/Grid_20150827000000000227_1/1/1000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/1001/2000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/2001/3000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/3001/4000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/4001/5000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/5001/6000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/6001/6140`
  ]

  try {
    // * 검색 결과 데이터 담을 빈 배열
    let combinedData = [];
    // 모든 응답에서 레시피 ID를 모을 배열
    let combinedRecipeIds = []; 


    for (const URL of URLS) {
      /* 
      ! 주석 지우지 말 것
      * Promise.all : 한번에 요청 -> 요청 시간 최적화, 서버 부하 가능성 있음
      * for로 순차적 : 차례로 요청
      * const responses = await Promise.all(urls.map(url => axios.get(url))); */

      const response = await axios.get(`${PROXY}${URL}`);
      console.log('response: ', response);

      if (response.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");

        const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);

        const $ingredient_name = extractData('IRDNT_NM');
        const $recipe_id = extractData('RECIPE_ID');


        // * 재료명과 레시피 ID를 합치기
        for (let i = 0; i < Math.min($ingredient_name.length, $recipe_id.length); i++) {
          combinedData.push({
            $ingredient_name: $ingredient_name[i],
            $recipe_id: $recipe_id[i],
          });
        }
        
        // * 레시피 ID 모음
        combinedRecipeIds = combinedRecipeIds.concat($recipe_id);
        
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    }

    // ! 레시피의 총 개수 
    // * 중복을 제거한 총 레시피 수 계산
    // let uniqueRecipeIds = [...new Set(combinedRecipeIds)];
    // let totalRecipeCount = uniqueRecipeIds.length;
    // console.log('총 레시피 개수:', totalRecipeCount);


    return combinedData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};



// * 검색 결과 재료 데이터
export const ResultIngredient = async (id) => {

  // * 데이터 요청종료위치 지원 최대 1000 -> 모두 불러오기
  /* 
  ! 개수
  * 레시피 537개
  * row : 6140
  * 마지막 레시피 id : 19543
  * 마지막 IRDNT_SN : 195459
  */

  const URLS = [
    // ! 주석 잊지말 것 : 재료 정보에는 레시피 이름이 나오지 않음
    `/openapi/${API_KEY}/xml/Grid_20150827000000000227_1/1/1000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/1001/2000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/2001/3000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/3001/4000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/4001/5000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/5001/6000`,
    // `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/6001/6140`
  ]

  try {
    // * 검색 결과 데이터 담을 빈 배열
    let combinedData = [];
    // 모든 응답에서 레시피 ID를 모을 배열
    let combinedRecipeIds = []; 


    for (const URL of URLS) {
      /* 
      ! 주석 지우지 말 것
      * Promise.all : 한번에 요청 -> 요청 시간 최적화, 서버 부하 가능성 있음
      * for로 순차적 : 차례로 요청
      * const responses = await Promise.all(urls.map(url => axios.get(url))); */

      const response = await axios.get(`${PROXY}${URL}`);
      console.log('response: ', response);

      if (response.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");

        const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);

        const $ingredient_name = extractData('IRDNT_NM');
        const $recipe_id = extractData('RECIPE_ID');


        // * 재료명과 레시피 ID를 합치기
        for (let i = 0; i < Math.min($ingredient_name.length, $recipe_id.length); i++) {
          combinedData.push({
            $ingredient_name: $ingredient_name[i],
            $recipe_id: $recipe_id[i],
          });
        }
        
        // * 레시피 ID 모음
        combinedRecipeIds = combinedRecipeIds.concat($recipe_id);
        
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    }

    const filterData = combinedData.filter(item => id.includes(item.$recipe_id))
    return filterData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};








// * 레시피 과정 정보 28 fetchDataCourse
/* const fetchDataCourse = async () => {
  const url = `openapi/${API_KEY}/xml/Grid_20150827000000000228_1/1/5`;
  const xmlDoc = await fetchData(url);
  const RECIPE_NM_KO = extractData(xmlDoc, 'RECIPE_NM_KO');
  console.log('RECIPE_NM_KO: ', RECIPE_NM_KO);
}; */

// export { fetchDataBasic, fetchDataIngredient, fetchDataCourse };

