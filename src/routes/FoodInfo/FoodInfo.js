import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useInfoKit from "../../functions/FoodInfo/FoodInfoFunction";
function FoodInfo(){
    // FoodInfoFunction.js에서 전용 함수, 변수 가져오기
    const {
        text_prop, 
        // foodRange 불러올때 코드를 다시 읽으면서 useInfoKit에서 상태값을 session Storage값으로 변경
        foodRange,
        setFoodRange,
        btnEnter, 
        foodSearch, 
        searchSwitch,
        renderSearchSet
    } = useInfoKit();
    const [searchType, setSearchType] = useState('')
    
    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.wrap').classList.add('on')
        }, 100)

        if(sessionStorage.getItem('foodSearchType') == undefined){
            setSearchType('brand')
        } else {
            setSearchType(sessionStorage.getItem('foodSearchType'))
        }
        renderSearchSet()
    }, []);
    return(
        <div id="FoodSearching" className="wrap">
            <h1>음식 판독기</h1>
            <p style={{fontSize : '12px'}}>식약처의 음식영양성분DB를 활용해 영양성분을 보여줍니다.</p>
            <div id="search_switch">
                <button className="switch_btn_brand" onClick={e=> searchSwitch(e, setSearchType)}>브랜드명으로 검색</button>
                <button className="switch_btn_menu" onClick={e=> searchSwitch(e, setSearchType)}>메뉴명으로 검색</button>
            </div>
            <div id="search_form">
                <input 
                id="food_text" 
                type="text" 
                placeholder="검색하고싶은 브랜드명을 입력해주세요"
                onKeyDown={function(e){btnEnter(e)}}
                />
                <button id="search" onClick={()=>foodSearch(searchType)}>검색!</button>
            </div>
            <Outlet context={{text_prop, foodRange, setFoodRange}}></Outlet>
        </div>
    );
};

export default FoodInfo;