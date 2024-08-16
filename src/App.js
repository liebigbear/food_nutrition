import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
// routes
import FoodInfo from './routes/FoodInfo/FoodInfo';
import FoodGraph from './routes/FoodInfo/FoodGraph';
import FoodSinglePage from './routes/FoodSinglePage/FoodSinglePage';
import UserInfo from './routes/UserInfo/UserInfo';
import ResultPage from './routes/ResultPage/ResultPage';
import { useState } from 'react';
//
import useAppKit from './functions/App/AppFunction';

function App() {
  const navigate = useNavigate()
  const {
    list,
    setList,
    trig,
    setTrig,
    Loading,
    getData
  } = useAppKit();

  return (
    <div className="App">
      <nav id='top_nav'>
        <span className='logo' 
              style={{cursor : 'pointer'}} 
              onClick={()=>{navigate('/')}}
              >먹어도 돼요?
        </span>
        <div className='hamburger'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<FoodInfo></FoodInfo>}>
          <Route path='Graph' element={
            <FoodGraph 
              navigate={navigate}
              Loading={Loading} 
              getData={getData} 
              list={list}
              setList={setList}
              trig={trig}
              setTrig={setTrig}
            ></FoodGraph>
          }></Route>
        </Route>
        <Route path='SinglePage/:id' element={<FoodSinglePage list={list} navigate={navigate}></FoodSinglePage>}></Route>
        <Route path='UserInfo' element={<UserInfo></UserInfo>}></Route>
        <Route path='ResultPage' element={<ResultPage></ResultPage>}></Route>
        <Route path='*' element={<div>잘못된 페이지404</div>}></Route>
      </Routes>

      <nav id='bottom_nav' style={{display : 'none'}}>
        <div className='food_info'>
          <img></img>
          <span>음식정보</span>
        </div>
        <div className='food_mixture'>
          <img></img>
          <span>음식조합</span>
        </div>
        <div className='food_mixture'>
          <img></img>
          <span>꿀조합 보관함</span>
        </div>
        <div className='my_info'>
          <img></img>
          <span>내 정보</span>
        </div>
      </nav>
    </div>
  );
}


export default App;
