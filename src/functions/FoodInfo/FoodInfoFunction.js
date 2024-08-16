import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useInfoKit(){
    const navigate = useNavigate();
    const [text_prop, setText_prop] = useState('')
    const [searchType, setSearchType] = useState('brand')

    function btnEnter(e){
        let btn = document.getElementById('search')
        if(e.key == 'Enter'){
            btn.click()
        }
    }
    function foodSearch(){
        let text = document.getElementById('food_text').value;
        setText_prop(text)
        navigate('/Graph')
    }
    function search_switch(e){
        let text = document.getElementById('food_text');
        if(text.placeholder == '검색하고싶은 브랜드명을 입력해주세요'){
            text.placeholder = '검색하고싶은 음식명을 입력해주세요'
            setText_prop('')
            e.innerHTML = '메뉴명으로 검색'
            setSearchType('menu')
        } 
        else if (text.placeholder == '검색하고싶은 음식명을 입력해주세요'){
            text.placeholder = '검색하고싶은 브랜드명을 입력해주세요'
            setText_prop('')
            e.innerHTML = '브랜드명으로 검색'
            setSearchType('brand')
        }
    }
    return{
        text_prop,
        searchType,
        btnEnter,
        foodSearch,
        search_switch
    }
       
}



export default useInfoKit;