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
import MixtureSingle from './routes/FoodMixture/MixtureSingle';
import UserInfoSet from './routes/UserInfoSet/UserInfoSet';
import FirstUserInfoSet from './routes/UserInfoSet/FirstUserInfoSet';

function App() {
  // getData로 변동되는 state(전역state)
  const [list, setList] = useState([]);
  const [trig, setTrig] = useState(false);
  // 유저 이미지
  const img_url = sessionStorage.getItem('user_img_url');
  // 재렌더링용 숫자 state(input 이벤트 발생마자 +1 기능)
  let [on, setOn] = useState(0);
  // 영양성분 9가지
  const nutrition_name = [
    '칼로리',
    '탄수화물',
    '단백질',
    '지방',
    '당류',
    '나트륨',
    '콜레스테롤',
    '포화지방',
    '트렌스지방',
  ]


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
    if(sessionStorage.getItem('nutritionData') == undefined){
      sessionStorage.setItem('nutritionData', '[]');
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
              >꿀조합
        </span>
        <div className='nav_click_menu'>
          <div className='nav_user_info'>
            <img className='nav_user_img' src={img_url} style={{background : '#fff'}}></img>
          </div>
          <div>
            <div className='hamburger' onClick={()=>{hamburger_btn_click()}}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {hideTrig ? <Hamburger_menu></Hamburger_menu> : null}
          </div>
        </div>
      </nav>
      <div>
        
      </div>

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
          ></FoodSinglePage>
        }></Route>
        <Route path='UserInfo' element={<UserInfo img_url={img_url}></UserInfo>}></Route>
        <Route path='UserInfoSet' element={
          <UserInfoSet 
          img_url={img_url}
          on={on}
          setOn={setOn}
          ></UserInfoSet>}></Route>
        <Route path='FirstUserInfoSet' element={
          <FirstUserInfoSet 
            img_url={img_url}
            on={on}
            setOn={setOn}
          ></FirstUserInfoSet>}>
        </Route>
        <Route path='ResultPage' element={
          <ResultPage 
            nutrition_name={nutrition_name}
            on={on}
            setOn={setOn}
          >
          </ResultPage>
        }></Route>
        <Route path='FoodMixture' element={
          <FoodMixture 
            storage_delete_box={storage_delete_box}>
          </FoodMixture>}>
          <Route path='MixtureList' element={<MixtureList></MixtureList>}></Route>
          <Route path='MixtureSingle/:id' element={
            <MixtureSingle nutrition_name={nutrition_name}></MixtureSingle>
          }></Route>
        </Route>
        <Route path='/*' element={<div className='wrap'>잘못된 페이지404</div>}></Route>
      </Routes>
    </div>
  );
}


export default App;
