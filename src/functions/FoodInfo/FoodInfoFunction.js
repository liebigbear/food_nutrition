import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useInfoKit(){
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState('brand');
    // userInfo에서 text_prop을 수정하고 foodSearch를 작동시키면 FoodGraph로 이동되면서 추가로 useEffect를 활용해 FoodGraph 페이지를 재랜더링 한다.
    // 재랜더링 하면서 text_prop의 값을 sessionStorage에 저장하면서 페이지를 나갔다 새로 들어올때 session Storage에 저장된 값을 불러오게 해 기존 페이지 그대로 유지
    const [text_prop, setText_prop] = useState('');
    // foodRange 기본값을 session Storage에서 불러오는걸로 페이지를 벗어났다 다시 넘어올 시 저장된 순서값부터 시작
    const [foodRange, setFoodRange] = useState(Number(sessionStorage.getItem('foodSearchNumber')));

    function searchSwitch(e){
        let text = document.getElementById('food_text');
        let brand = document.querySelector('.switch_btn_brand');
        let menu = document.querySelector('.switch_btn_menu');
        if(e.target.className == brand.className){
            brand.classList.add('on')
            menu.classList.remove('on')
            text.placeholder = '검색하고싶은 브랜드명을 입력해주세요';
            setText_prop('');
            setSearchType('brand');
        } else if(e.target.className == menu.className){
            brand.classList.remove('on')
            menu.classList.add('on')
            text.placeholder = '검색하고싶은 음식명을 입력해주세요';
            setText_prop('');
            setSearchType('menu');
        }
    }
    function renderSearchSet(){
        let text = document.getElementById('food_text');
        let searchType = sessionStorage.getItem('foodSearchType');
        let searchText = sessionStorage.getItem('foodSearchText');
        let brand = document.querySelector('.switch_btn_brand');
        let menu = document.querySelector('.switch_btn_menu');
        if(searchType != undefined){
            if(searchType == 'brand'){
                brand.classList.add('on')
                menu.classList.remove('on')
                text.placeholder = '검색하고싶은 브랜드명을 입력해주세요';
            }
            else if(searchType == 'menu'){
                brand.classList.remove('on')
                menu.classList.add('on')
                text.placeholder = '검색하고싶은 음식명을 입력해주세요';
            }
        }
        else {
            brand.classList.add('on')
            menu.classList.remove('on')
            text.placeholder = '검색하고싶은 브랜드명을 입력해주세요';
        }
        
        if(searchText != undefined){
            text.value = searchText;
        }
    }
    function btnEnter(e){
        let btn = document.getElementById('search');
        if(e.key == 'Enter'){
            btn.click();
        };
    };
    function foodSearch(){
        let text = document.getElementById('food_text').value;
        sessionStorage.setItem('foodSearchText', text);
        sessionStorage.setItem('foodSearchType', searchType);
        // sessionStorage의 값과 foodRange의 값 둘 다 초기화
        sessionStorage.setItem('foodSearchNumber', '1');
        setFoodRange(1)
        setText_prop(text);
        navigate('/FoodInfo/Graph');
    };
    
    return{
        foodRange,
        text_prop,
        setFoodRange,
        btnEnter,
        foodSearch,
        searchSwitch,
        renderSearchSet
    };
};



export default useInfoKit;