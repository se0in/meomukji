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

// * 레시피 기본 정보 26 fetchDataBasic
/* const fetchDataBasic = async () => {
  const url = `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/1/5`;
  const xmlDoc = await fetchData(url);
  const RECIPE_NM_KO = extractData(xmlDoc, 'RECIPE_NM_KO');
  console.log('RECIPE_NM_KO: ', RECIPE_NM_KO);
};



 */


// * 레시피 재료 정보 27 fetchDataIngredient
export const fetchDataIngredient = async () => {
  const url = `openapi/${API_KEY}/xml/Grid_20150827000000000227_1/1/800`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      // console.log('xmlDoc: ', xmlDoc);

      
      const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);

      const ingredient_name = extractData('IRDNT_NM');
      const recipe_id = extractData('RECIPE_ID');
      
      // * 재료명과 레시피 ID를 합치기
      const combinedData = [];
      for (let i = 0; i < Math.min(ingredient_name.length, recipe_id.length); i++) {
        combinedData.push({
          ingredient_name: ingredient_name[i],
          recipe_id: recipe_id[i]
        });
      }
      // console.log('combinedData: ', combinedData);

      /* const filteredData = combinedData.filter(item => ingredientList.includes(item.ingredient_name));
      */
      return combinedData;

    } else {
      console.log('데이터 불러오기 실패:', response.status);
      return null;
    }
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
