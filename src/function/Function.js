/**
 * author se0in
 * Create Date 2023.12.12.
 * * 함수 재사용 모음
 * */

// * 준비 중인 페이지 이동 막기
export const preparing = (e) => {
  alert('준비중 입니다. 😂');
  e.preventDefault();
}

// * 서서히 위로 올라가는 이벤트
export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};