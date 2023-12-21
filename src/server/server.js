/**
 * author se0in
 * Create Date 2023.12.13.
 * * server 관리
 * * 농림축산식품 공공데이터포털 https://data.mafra.go.kr/main.do
 * TODO 클린코드
 * */


/* 
! 주석 지우지 말 것
* Promise.all : 한번에 요청 -> 요청 시간 최적화, 서버 부하 가능성 있음
* for로 순차적 : 차례로 요청
* const responses = await Promise.all(urls.map(url => axios.get(url))); */

// * 데이터 요청종료위치 지원 최대 1000 -> 모두 불러오기
/* 
! 개수
* 레시피 537개
* row : 6140
* 마지막 레시피 id : 19543
* 마지막 IRDNT_SN : 195459
*/
// ! 레시피의 총 개수 
// * 중복을 제거한 총 레시피 수 계산
// let uniqueRecipeIds = [...new Set(combinedRecipeIds)];
// let totalRecipeCount = uniqueRecipeIds.length;
// console.log('총 레시피 개수:', totalRecipeCount);
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';


// * 레시피 기본 정보 26 fetchDataBasic
export const fetchDataBasic = async (id) => {

  const URLS = [
    // ! 주석 잊지말 것 : 재료 정보에는 레시피 이름이 나오지 않음
    `/${API_KEY}/xml/Grid_20150827000000000226_1/1/1000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/1001/2000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/2001/3000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/3001/4000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/4001/5000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/5001/6000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/6001/6140`
  ]

  try {
    const promises = URLS.map(async (URL) => {
      const response = await axios.get(`${PROXY}${URL}`);

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

        const combinedData = [];
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
        return combinedData;
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const combinedData = results.flat(); 
    const filterData = combinedData.filter(item => id.includes(item.$recipe_id));
    return filterData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};





// * 레시피 기본 정보 26 fetchDataBasic
export const fetchDataBasicDetail = async (id) => {

  const URLS = [
    // ! 주석 잊지말 것 : 재료 정보에는 레시피 이름이 나오지 않음
    `/${API_KEY}/xml/Grid_20150827000000000226_1/1/1000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/1001/2000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/2001/3000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/3001/4000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/4001/5000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/5001/6000`,
    `/${API_KEY}/xml/Grid_20150827000000000226_1/6001/6140`
  ]

  try {
    const promises = URLS.map(async (URL) => {
      const response = await axios.get(`${PROXY}${URL}`);

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

        const combinedData = [];
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
        return combinedData;
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const combinedData = results.flat(); 
    const filterData = combinedData.filter(item => id === item.$recipe_id);
    return filterData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};




// * 레시피 재료 정보 27 fetchDataIngredient
export const fetchDataIngredient = async () => {

  const URLS = [
    `/${API_KEY}/xml/Grid_20150827000000000227_1/1/1000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/1001/2000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/2001/3000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/3001/4000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/4001/5000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/5001/6000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/6001/6140`
  ];

  try {
    const promises = URLS.map(async (URL) => {
      const response = await axios.get(`${PROXY}${URL}`);

      if (response.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);
        const $ingredient_name = extractData('IRDNT_NM');
        const $recipe_id = extractData('RECIPE_ID');

        const combinedData = [];
        // * 재료명과 레시피 ID를 합치기
        for (let i = 0; i < Math.min($ingredient_name.length, $recipe_id.length); i++) {
          combinedData.push({
            $ingredient_name: $ingredient_name[i],
            $recipe_id: $recipe_id[i],
          });
        }
        return combinedData;
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const combinedData = results.flat(); // Flatten the array of arrays
    return combinedData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};





// * 검색 결과 재료 데이터
export const ResultIngredient = async (id) => {

  const URLS = [
    `/${API_KEY}/xml/Grid_20150827000000000227_1/1/1000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/1001/2000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/2001/3000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/3001/4000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/4001/5000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/5001/6000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/6001/6140`
  ];

  try {
    const promises = URLS.map(async (URL) => {
      const response = await axios.get(`${PROXY}${URL}`);

      if (response.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);
        const $ingredient_name = extractData('IRDNT_NM');
        const $recipe_id = extractData('RECIPE_ID');
        const $ingredient_Volume = extractData('IRDNT_CPCTY'); // * 재료 양

        const combinedData = [];
        // * 재료명과 레시피 ID를 합치기
        for (let i = 0; i < Math.min($ingredient_name.length, $recipe_id.length); i++) {
          combinedData.push({
            $ingredient_name: $ingredient_name[i],
            $recipe_id: $recipe_id[i],
            $ingredient_Volume: $ingredient_Volume[i],
          });
        }
        return combinedData;
      } else {
        console.log('데이터 불러오기 실패:', response.status);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const combinedData = results.flat(); // Flatten the array of arrays
    const filterData = combinedData.filter(item => id.includes(item.$recipe_id));
    return filterData;

  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};




// * 검색 결과 재료 데이터 상세
export const ResultIngredientDetail = async (id) => {
  const URLS = [
    `/${API_KEY}/xml/Grid_20150827000000000227_1/1/1000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/1001/2000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/2001/3000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/3001/4000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/4001/5000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/5001/6000`,
    `/${API_KEY}/xml/Grid_20150827000000000227_1/6001/6140`
  ];

  try {
    const responses = await Promise.all(
      URLS.map(async (URL) => {
        const response = await axios.get(`${PROXY}${URL}`);
        if (response.status === 200) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "text/xml");
          const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);
          const $ingredient_name = extractData('IRDNT_NM');
          const $recipe_id = extractData('RECIPE_ID');
          const $ingredient_Volume = extractData('IRDNT_CPCTY'); // * 재료 양

          const combinedData = [];
          // * 재료명과 레시피 ID를 합치기
          for (let i = 0; i < Math.min($ingredient_name.length, $recipe_id.length); i++) {
            if (id === $recipe_id[i]) {
              combinedData.push({
                $ingredient_name: $ingredient_name[i],
                $recipe_id: $recipe_id[i],
                $ingredient_Volume: $ingredient_Volume[i],
              });
            }
          }
          return combinedData;
        } else {
          console.log('데이터 불러오기 실패:', response.status);
          return null;
        }
      })
    );

    const combinedData = responses.flat().filter(item => id === item.$recipe_id); 
    return combinedData;
  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};



// * 레시피 과정 정보 28 fetchDataCourse
export const fetchDataCourse = async (id) => {
  const URLS = [
    `/${API_KEY}/xml/Grid_20150827000000000228_1/1/1000`,
    `/${API_KEY}/xml/Grid_20150827000000000228_1/1001/2000`,
    `/${API_KEY}/xml/Grid_20150827000000000228_1/2001/3000`,
    `/${API_KEY}/xml/Grid_20150827000000000228_1/3001/4000`,
    `/${API_KEY}/xml/Grid_20150827000000000228_1/4001/5000`,
    `/${API_KEY}/xml/Grid_20150827000000000228_1/5001/6000`,
    `/${API_KEY}/xml/Grid_20150827000000000228_1/6001/6140`
  ];

  try {
    const responses = await Promise.all(
      URLS.map(async (URL) => {
        const response = await axios.get(`${PROXY}${URL}`);
        if (response.status === 200) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "text/xml");
          const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);
          const $recipe_id = extractData('RECIPE_ID');
          const $cooking_num = extractData('COOKING_NO');
          const $cooking_desc = extractData('COOKING_DC');
          const $step_tip = extractData('STEP_TIP');

          const combinedData = [];
          // * 레시피 ID에 해당하는 정보만 가져오기
          for (let i = 0; i < Math.min($recipe_id.length); i++) {
            if (id === $recipe_id[i]) {
              combinedData.push({
                $recipe_id: $recipe_id[i],
                $cooking_num: $cooking_num[i],
                $cooking_desc: $cooking_desc[i],
                $step_tip: $step_tip[i],
              });
            }
          }
          return combinedData;
        } else {
          console.log('데이터 불러오기 실패:', response.status);
          return [];
        }
      })
    );

    const combinedData = responses.reduce((acc, cur) => acc.concat(cur), []);
    return combinedData;
  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};
