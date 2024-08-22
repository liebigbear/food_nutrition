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
import MainPage from './routes/MainPage/MainPage';
import MixtureList from './routes/FoodMixture/MixtureList';

function App() {
  // getData로 변동되는 state(전역state)
  const [list, setList] = useState([]);
  const [trig, setTrig] = useState(false);
  const [alertSwitch, setAlertSwitch] = useState(false);

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
    Hamburger_menu,
    hideTrig,
    hamburger_btn_click,
    storage_delete_box
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
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/FoodInfo' element={<FoodInfo></FoodInfo>}>
          <Route path='Graph' element={
            <FoodGraph 
              list={list}
              setList={setList}
              trig={trig}
              setTrig={setTrig}
            ></FoodGraph>
          }></Route>
        </Route>
        <Route path='SinglePage/:id' element={
          <FoodSinglePage 
              list={list} 
              navigate={navigate}
              alertSwitch={alertSwitch} 
              setAlertSwitch={setAlertSwitch}
          ></FoodSinglePage>
        }></Route>
        <Route path='UserInfo' element={<UserInfo></UserInfo>}></Route>
        <Route path='ResultPage' element={
          <ResultPage 
            alertSwitch={alertSwitch} 
            setAlertSwitch={setAlertSwitch}>
          </ResultPage>
        }></Route>
        <Route path='FoodMixture' element={
          <FoodMixture 
            storage_delete_box={storage_delete_box}>
          </FoodMixture>}>
          <Route path='MixtureList' element={<MixtureList></MixtureList>}></Route>
        </Route>
        <Route path='*' element={<div>잘못된 페이지404</div>}></Route>
      </Routes>
    </div>
  );
}


export default App;
