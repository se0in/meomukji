/**
 * author se0in
 * Create Date 2023.12.12.
 * * 메인 페이지 버튼 클릭 시 검색페이지로 이동
 * */
import React, { useEffect } from 'react';
// * data server
import { fetchData } from '../server/server';
import {MainButton} from '../components/Buttons';
import { BorderRadiusBox } from '../styled-components/Styled';
import '../scss/Home.scss'
// import axios from 'axios';

const Home = () => {

  
  // ! 데이터 불러오기
  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const data = await fetchData(); // 서버에서 데이터를 가져옵니다.

        console.log(data);
      } catch (error) {
        console.error('데이터를 불러오는 중에 에러가 발생했습니다. : ', error);
      }
    };

    fetchDataFromServer();
  }, []);




  return (
    <div className='Home'>
      <BorderRadiusBox className='home-box'> 
        <div className="title-text">
          <p className='sub-text-color'>오늘 뭐 먹지?</p>
          <p><span>냉장고 털이</span> 시작해볼까요?</p>
        </div>
        <div className="img-box">
          <img src={process.env.PUBLIC_URL + '/images/refrigerator.svg'} alt="" />
        </div>
        <div className="btn-box">
          <MainButton
          to='/Search'
          text='냉장고 털러가기'
          className='home-btn'
          ></MainButton>
          <p
          className='sub-text-color desc-text'
          >냉장고 속 재료를 검색하고<br />레시피를 추천 받아 보세요!</p>
        </div>
      </BorderRadiusBox>
    </div>
  )
}

export default Home;