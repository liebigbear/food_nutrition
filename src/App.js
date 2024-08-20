import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
// routes
import FoodInfo from './routes/FoodInfo/FoodInfo';
import FoodGraph from './routes/FoodInfo/FoodGraph';
import FoodSinglePage from './routes/FoodSinglePage/FoodSinglePage';
import UserInfo from './routes/UserInfo/UserInfo';
import ResultPage from './routes/ResultPage/ResultPage';
import { useEffect, useState } from 'react';
//
import useAppKit from './functions/App/AppFunction';
import FoodMixture from './routes/FoodMixture/FoodMixture';

function App() {
  // UserInfo 정보 담을 state
  const [info, setInfo] = useState({
    sex : '',
    age : '',
    stature : '',
    meal : '',
    kcal : '',
    standard : false
  });

  useEffect(()=>{
    if(localStorage.getItem('foodMixture') == undefined){
        localStorage.setItem('foodMixture', '[]');
    }
    if(sessionStorage.getItem('resultlist') == undefined){
      sessionStorage.setItem('resultlist', '[]');
    }
    if(sessionStorage.getItem('userInfo') == undefined){
      sessionStorage.setItem('userInfo', '[]');
    }
  },[])

  const navigate = useNavigate()
  const {
    list,
    setList,
    trig,
    setTrig,
    Loading,
    getData,
    FoodGraph_Header,
    Hamburger_menu,
    hideTrig,
    hamburger_btn_click,
  } = useAppKit();

  return (
    <div className="App">
      <nav id='top_nav'>
        <span className='logo' 
              style={{cursor : 'pointer'}} 
              onClick={()=>{navigate('/')}}
              >먹어도 돼요?
        </span>
        <div className='hamburger' onClick={()=>{hamburger_btn_click()}}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {hideTrig ? <Hamburger_menu></Hamburger_menu> : null}
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
              FoodGraph_Header={FoodGraph_Header}
            ></FoodGraph>
          }></Route>
        </Route>
        <Route path='SinglePage/:id' element={
          <FoodSinglePage 
              list={list} 
              navigate={navigate}
          ></FoodSinglePage>
        }></Route>
        <Route path='UserInfo' element={<UserInfo info={info} setInfo={setInfo}></UserInfo>}></Route>
        <Route path='ResultPage' element={
          <ResultPage 
              FoodGraph_Header={FoodGraph_Header}
          ></ResultPage>
        }></Route>
        <Route path='FoodMixture' element={<FoodMixture></FoodMixture>}></Route>
        <Route path='*' element={<div>잘못된 페이지404</div>}></Route>
      </Routes>
    </div>
  );
}


export default App;
