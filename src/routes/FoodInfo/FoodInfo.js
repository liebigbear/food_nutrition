import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useInfoKit from "../../functions/FoodInfo/FoodInfoFunction";
function FoodInfo(){
    // FoodInfoFunction.js에서 전용 함수, 변수 가져오기
    const {
        text_prop, 
        searchType, 
        btnEnter, 
        foodSearch, 
        search_switch
    } = useInfoKit();
    return(
        <div id="FoodSearching" className="wrap">
            <h1>음식 판독기</h1>
            <div id="search_switch">
                <button onClick={(e)=> search_switch(e.target)}>브랜드명으로 검색</button>
            </div>
            <div id="search_form">
                <input 
                id="food_text" 
                type="text" 
                placeholder="검색하고싶은 브랜드명을 입력해주세요"
                onKeyDown={function(e){btnEnter(e)}}
                />
                <button id="search" onClick={()=>foodSearch()}>검색!</button>
            </div>
            <Outlet context={{text_prop, searchType}}></Outlet>
        </div>
    )
}

export default FoodInfo;