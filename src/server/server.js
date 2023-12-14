/**
 * author se0in
 * Create Date 2023.12.13.
 * * server 관리
 * * 농림축산식품 공공데이터포털 https://data.mafra.go.kr/main.do
 * */
import axios from "axios";


const API_KEY = process.env.REACT_APP_API_KEY;
const fetchData = async () => {
  const url = `openapi/${API_KEY}/xml/Grid_20150827000000000226_1/1/5`;
  try {
    const response = await axios.get(url);

    if(response.status === 200) {
      // * xml parsing
      const parser = new DOMParser();

      /**
       * @xmlDoc : 오류 날 경우 console 찍기
      */
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      console.log('xmlDoc: ', xmlDoc);

      const extractData = (tagName) => Array.from(xmlDoc.querySelectorAll(tagName)).map((item) => item.textContent);
      const RECIPE_NM_KO = extractData('RECIPE_NM_KO');
      console.log('RECIPE_NM_KO: ', RECIPE_NM_KO);

    } else {
      console.log('데이터 불러오기 실패:', response.status);
      return null;
    }
    
  } catch (error) {
    console.error('에러:', error);
    return null;
  }
};

export { fetchData };


