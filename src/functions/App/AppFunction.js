import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useAppKit(){
    // 햄버거 메뉴 클릭시 링크 컴포넌트
    function Hamburger_menu(){
        let navigate = useNavigate();
        return(
            <div className="hamburger_menu">
                <p onClick={()=>{
                    if(sessionStorage.getItem('nutritionData') != undefined){
                        navigate('/FoodInfo/Graph')
                    }
                    else{
                        navigate('/FoodInfo')
                    }
                }}>음식 정보</p>
                <p onClick={()=>{navigate('/UserInfo')}}>내 정보</p>
                <p onClick={()=>{navigate('/ResultPage')}}>결과창</p>
                <p onClick={()=>{navigate('/FoodMixture/MixtureList')}}>조합리스트</p>
            </div>
        )
    }
    // 햄버거메뉴 클릭시 숨은메뉴 나타나기
    const [hideTrig, setHideTrig] = useState(false)
    function hamburger_btn_click(){
        let btn = document.querySelector('.hamburger');
        if(btn.classList.contains('click')){
            btn.classList.remove('click')
            setHideTrig(false)
        } 
        else {
            btn.classList.add('click')
            setHideTrig(true)
        }
    }

    return{
        Hamburger_menu,
        hideTrig,
        hamburger_btn_click
    }
}

export default useAppKit;