# 🍚 [1차 완료] 머묵지 | 냉장고털이
저녁 뭐먹지? 고민될 때 

✨ 링크 : https://seoin-meomukji.netlify.app/ ✨  
<br>

## 📣 프로젝트 소개
- 개인프로젝트
- 냉장고 속 재료를 검색하면 레시피를 추천해주는 사이트입니다.
- [농림축산식품 공공데이터](https://data.mafra.go.kr/main.do) 이용

### 📅 작업 기간
- 1차 기획 : 2023년 12월 11일 ~ 2024년 1월 3일 개발 완료
    - 카테고리 검색 필터 제외 완료😎

### 💻 사용 툴 및 작업 언어
- Adobe XD (디자인)
- Visual Studio Code
    - React, SCSS

<br>

## 🎮 주요기능
### 재료 검색
  |검색|검색 결과|상세|
  |:---:|:---:|:---:|
  |<img src="./public/images/readme/search.png" height="50%" width="90%" alt="검색"/>|<img src="./public/images/readme/result.png" height="50%" width="90%" alt="readme 임시 등록"/>|<img src="./public/images/readme/detail.png" height="50%" width="90%" alt="readme 임시 등록"/>|
  |재료는 3개까지 등록할 수 있어요😁|겹친 재료가 있는 레시피가 먼저 나와요😆|맛있게 드세요 😋|
  

## 📌 프로젝트 작업하며 얻은 코드

<details>
  <summary>input range 커스텀 하기</summary>
  
  - 각각 따로 만들어서 position으로 합친다고 생각하면 됨
  - track의 컬러가 들어갈 부분은 props로 받아온다.
    `width: ${(props) => props.fill}%;`
  - `&::-webkit-slider-thumb` 으로 기본 스타일 지우는 것 잊지말 것

  ```javascript

    // * input range 커스텀
    export const SliderContainer = styled.div`
      position: relative;
      width: 100%;
      height: 24px;
    `;
    export const SliderRail = styled.div`
      position: absolute;
      top: calc(50% - 2px);
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: ${theme.inputBgColor};
    `;
    export const SliderFillTrack = styled.div`
      position: absolute;
      top: calc(50% - 2px);
      width: ${(props) => props.fill}%;
      height: 4px;
      border-radius: 2px;
      background-color: ${theme.pointColorOrange};
    `;
    export const Slider = styled.input`
      position: absolute;
      top: calc(50% - 6px);
      width: 100%;
      height: 12px;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      margin: 0;
      &::-webkit-slider-thumb {
        -webkit-appearance: none; 
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #FFF;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      &:active {
        cursor: grabbing;
      }
      &:focus {
        outline: none;
      }
    `;

  ```
</details>

<details>
  <summary>CORS 해결</summary>
  
  -  `npm i http-proxy-middleware` 설치
  -  `setupProxy.js` 내용 작성
  ```javascript
  // * setupProxy.js
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
      app.use(
        '/api', //proxy가 필요한 path parameter
        createProxyMiddleware({
          target: 'http://211.237.50.150:7080', //타겟이 되는 api url
          changeOrigin: true,// 서버 구성에 따른 호스트 헤더 변경 여부 설정
        })
      );
    };
    `;
  ```
  - package.json에 코드 추가
  `"proxy" : "http://211.237.50.150:7080"`
</details>

<details>
  <summary>✨2024-01-03 추가✨ 리스트에서 상세 이동 후 뒤로가기 시 리스트 스크롤 위치 복원</summary>
  
  - sessionStorage에 window.scrollY값 저장
  - string Number로 타입 변환 후 대입

  ```javascript
  // Result.js
  // * 상세 이동 후 뒤로가기 시 이전 스크롤 위치 유지
  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (storedScrollPosition && !loading) {
      const scrollY = Number(storedScrollPosition);
      window.scrollTo(0, scrollY);
    }
  },[loading]);

  return (
    <div 
    className="Result"
    onClick={()=> sessionStorage.setItem('scrollPosition', window.scrollY)} // * 클릭 시 스크롤 위치 저장
    >
    // 생략
    </div>
  )

  // App.js
  // * 검색 리스트 스크롤 위치 유지 이벤트 검색 페이지로 가면 리셋
  if (location.pathname === '/Search') sessionStorage.setItem('scrollPosition', '0');
  ```
</details>
