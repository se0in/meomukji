/**
 * author se0in
 * Create Date 2023.12.12.
 * * Home > Search
 * * 냉장고 재료 검색 페이지
 * */
import React, { useState } from "react";
// import { Link } from 'react-router-dom';

import { DarkButton, OrangeToggleButton, Registration, ResetButton } from "../components/Buttons";
// import SearchIngredient from '../components/SearchIngredient';
// import SearchFilter from "../components/SearchFilter";
import {
  BorderRadiusBox,
  InputText,
  MainBtn,
  PageTitle,
} from "../styled-components/Styled";
import "../scss/Search.scss";
import { IoIosArrowDown } from "react-icons/io";
import { fetchDataIngredient } from "../server/server";
import InputRange from '../components/InputRange';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate()
  const [searchResult, setSearchResult] = useState(null);
  const [newItemText, setNewItemText] = useState("");
  const [items, setItems] = useState([]);


  // * input 변하는 값
  const handleInputChange = (e) => {
    setNewItemText(e.target.value);
  };

  // * 아이템 등록 (3개까지만)
  const handleItemRegistration = () => {
    // * 공백 확인, 제거 후 input 빈 창
    if (newItemText.trim() !== "") {
      setNewItemText("");

      // * 3개 제한
      items.length < 3
        ? setItems((prevItems) => {
          const updatedItems = [...prevItems, newItemText.trim()];
          // console.log('등록된 아이템:', updatedItems); // 등록된 아이템 콘솔에 출력
          setItems(updatedItems);
        })
        : alert("재료는 3개까지만 등록할 수 있어요 :( ");
    }
  };

  // * 아이템 삭제
  const handleItemDelete = (indexToDelete) => {
    // * 버튼의 인덱스 Buttons.js에서 받아와서 Registration의 index와 비교 후 삭제
    const updateItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updateItems);
  };


  const [isShowFilter, setIsShowFilter] = useState(false);
  // * 더보기 버튼 클릭 시 more filter
  const moreShow = () => {
    setIsShowFilter(!isShowFilter);
  };


  // * 버튼 토글 관리

  // * 요리 종류
  const [kindCookList, setKindCookList] = useState([
    { text: '한식', isActive: false },
    { text: '양식', isActive: false },
    { text: '중식', isActive: false },
  ]);

  // * 다중 선택
  const toggleKindActive = (index) => {
    const updateList = kindCookList.map((item, i) =>
      i === index ? { ...item, isActive: !item.isActive } : item
    )
    setKindCookList(updateList);
  };

  // * 시간
  const [timeCookList, setTimeCookList] = useState([
    { text: 0, isActive: false },
    { text: 20, isActive: false },
    { text: 40, isActive: false },
    { text: 60, isActive: false },
    { text: '전체', isActive: false },
  ]);
  // * 단일 선택
  const toggleTimeActive = (index) => {
    const updateList = timeCookList.map((item, i) => ({
      ...item,
      isActive: i === index
    }))
    setTimeCookList(updateList)

  };










  const handleSearchResultClick = async () => {
    /**
     * * 버튼 클릭 시 데이터 가져오는 핸들러 
     */
    try {

      if (items.length === 0) {
        // * 미입력 시
        alert("재료를 등록해주세요 :( ")
      } else {

        //  ! 데이터는 [배열{객체},{객체}]로 저장되어 있음
        const data = await fetchDataIngredient(items);
        // console.log('data: ', data);
        // * 등록한 아이템과 같은 이름을 가진 레시피 넘버 가져오기
        const matchedItems = data.filter((item) =>
          items.includes(item.ingredient_name)
        );
        console.log("matchedItems from 검색페이지: ", matchedItems);

        if (matchedItems.length > 0) {
          matchedItems.forEach((item) => {
            console.log("from 검색페이지 : ", item.ingredient_name, item.recipe_id);
          });

          // * setSearchResult에 저장
          setSearchResult(matchedItems);

          // * 검색 결과 페이지로 넘기기
          navigate('/Result', {state : {matchedItems}});
        } else {
          alert("해당 이름을 가진 재료 레시피는 없어요 :( ");
          return null;
        }
      }
    } catch (error) {
      console.error("데이터를 불러오는 중에 에러가 발생했습니다. : ", error);
    }
  };


  // * 초기화 버튼 
  const handleReset = () => {
    setSearchResult(null); // 검색 결과 초기화 > // !이건 나중에 지우기
    setNewItemText(""); // 입력한 텍스트 초기화
    setItems([]); // 아이템 초기화
    setKindCookList([
      { text: '한식', isActive: false },
      { text: '양식', isActive: false },
      { text: '중식', isActive: false },
    ]);
    setTimeCookList([
      { text: 0, isActive: false },
      { text: 20, isActive: false },
      { text: 40, isActive: false },
      { text: 60, isActive: false },
      { text: '전체', isActive: false },
    ]);


  };











  return (
    <div className="Search">
      <PageTitle>재료 검색</PageTitle>
      <BorderRadiusBox>
        <div className="inner">
          <div className="img-box">
            <img
              src={process.env.PUBLIC_URL + "/images/refrigerator.svg"}
              alt=""
            />
          </div>
          <div className="text-box">
            <p>
              냉장고 속 재료를 입력해주시면
              <br />
              레시피 추천을 해드릴게요!
            </p>
            <p className="sub-text-color">최대 3개까지 입력할 수 있어요.</p>
          </div>

          {/* //* 검색어 입력, 등록 */}
          {/* <SearchIngredient /> */}

          {/* // *등록 결과 , 클릭 시 삭제 */}
          <div className="registration-box">
            {items &&
              items.map((item, index) => (
                <Registration
                  key={index}
                  index={index}
                  text={item}
                  handleDelete={handleItemDelete}
                />
              ))}
          </div>

          {/* // * 검색 */}
          <div className="input-box">
            <InputText
              type="text"
              placeholder="입력 후 등록을 눌러주세요."
              value={newItemText}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleItemRegistration();
                }
              }}
            />
            <DarkButton
              type="button"
              text="등록"
              handleRegistration={handleItemRegistration}
            />
          </div>

          {/* // * 더보기 클릭 시 filter */}
          {/* // * more-btn active 시 svg rotate / 취소하기 */}
          <div
            className={`more-btn ${isShowFilter ? "active" : ""}`}
            onClick={moreShow}
          >
            <button>
              {`${!isShowFilter ? "더보기" : "취소"}`}
              <IoIosArrowDown />
            </button>
          </div>

          {/* // * 더보기 content  */}
          {
            isShowFilter &&  /*  <SearchFilter /> */



            <>
              {/* // * 더보기 클릭 시 보일 부분 */}
              <div className="more">

                <div className="filter-box">
                  {/* // * 요리 분류 button 
              // * 활성화 active class */}
                  <div className="item">
                    <p>분류<span>다중 선택 가능</span></p>
                    <div className="item-content kind-list">
                      {kindCookList.map((item, index) => (
                        <OrangeToggleButton
                          key={index}
                          index={index}
                          text={item.text}
                          isActive={item.isActive}
                          toggleActive={() => toggleKindActive(index)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* // * 조리 시간 : button 
              // * 활성화 active class */}
                  <div className="item">
                    <p>조리 시간<span>단일 선택 가능</span></p>
                    <div className="item-content time">
                      {timeCookList.map((item, index) => (
                        <OrangeToggleButton
                          key={index}
                          index={index}
                          text={item.text === '전체' ? item.text : `${item.text}분 이하`}
                          isActive={item.isActive}
                          toggleActive={() => toggleTimeActive(index)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* // * 칼로리 : input - range */}
                  <div className="item">
                    <p>칼로리</p>
                    <div className="item-content kcal">
                      <InputRange />
                    </div>
                  </div>
                </div>
              </div>
            </>

          }


        </div>
      </BorderRadiusBox>
      <div className="submit-btn-box">
        <ResetButton handleReset={handleReset}>초기화</ResetButton>
        <MainBtn
          type="submit"
          onClick={handleSearchResultClick}>

          { searchResult && searchResult.length > 0 ?

            <Link to='/Result'
            >검색결과 보기</Link> : "검색결과 보기"
          }
        </MainBtn>
      </div>
    </div>
  );
};

export default Search;
