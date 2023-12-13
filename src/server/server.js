// /**
//  * author se0in
//  * Create Date 2023.12.13.
//  * * server 관리
//  * * 농림축산식품 공공데이터포털 https://data.mafra.go.kr/main.do
//  * */
// // server.js
// import axios from "axios";


// const API_KEY = process.env.REACT_APP_API_KEY;

// const fetchData = async () => {
//   try {
//     const url = `https://211.237.50.150:7080/openapi/${API_KEY}/xml/Grid_20150827000000000226_1/1/5`;
//     // const url = `/API_KEY=${REACT_APP_API_KEY}&TYPE=json&API_URL=Grid_20150827000000000226_1&START_INDEX=1&END_INDEX5`;
//     // const {data} = await axios.get('/api'+ url)
//     const {data} = await axios(url)
//     console.log('data: ', data);
    
//   } catch (error) {
//     console.error("에러:", error);
//     return null;
//   }
// };

// export { fetchData };
