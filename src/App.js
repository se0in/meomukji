/**
 * author : se0in
 * Create Date : 23.12.11.
 * * 사이트 소개 : 저녁 뭐 먹지? 냉장고 속 재료로 요리하기
*/
import { Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home';
import Suggestion from './pages/Suggestion';

import './scss/common.scss';
import Navigation from './pages/Navigation ';
import Heart from './pages/Heart';
import Header from './components/Header';
import Search from './pages/Search';
import Result from './pages/Result';
import Detail from './pages/Detail';

function App() {
  const location = useLocation();

  // * nav 놓을 곳
  const navBottomShowPath = ['/', '/Suggestion', '/Heart'];

  return (
    <div className="App">
      <Header />
      <div className='content-margin-top inner'>
        <Routes>
          <Route path='/Suggestion' element={<Suggestion />} />
          <Route index element={<Home />} />
          <Route path='/Heart' element={<Heart />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Result' element={<Result />} />
          <Route path='/Detail' element={<Detail />} />
        </Routes>
      </div>
      {
        navBottomShowPath.includes(location.pathname) && <Navigation />
      }
    </div>
  );
}

export default App;
