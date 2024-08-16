import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

function FoodSinglePage(props){
    const navigate = props.navigate;
    // url파라미터
    const param = useParams();
    const idx = Number(param.id);
    // App.js list 가져오기
    const list = props.list;
    // url파라미터 해당하는 list항목 localStorage에 저장
    localStorage_add_singlePage(idx, list)
    
    const localList = JSON.parse(localStorage.getItem('singlepage'))
    const base_nutrition_info_list = {...localList}
    const [nutrition_info_list, setNutrition_info_list] = useState(base_nutrition_info_list);
    useEffect(()=>{
        if(sessionStorage.getItem('resultlist') == null){
            sessionStorage.setItem('resultlist', '[]')
        }
    },[])
    return(
        <div className="wrap">  
            <div id="single">
                <div id="single_info">
                    <p>메뉴명 : {nutrition_info_list.FOOD_NM_KR}</p>
                    <div id="select_gram">
                        <p className="gram_alert" style={{color : 'red', display : 'none'}}>숫자를 입력해주세요</p>
                        <span>
                            양 : <input 
                            className="gram" 
                            type="text" 
                            placeholder="기본 100g" 
                            style={{width : '80px'}}
                            onInput={()=>{
                                nutrition_calculate(base_nutrition_info_list, setNutrition_info_list);
                            }}
                            />g
                        </span>
                    </div>
                    <p>열량 : {nutrition_info_list.AMT_NUM1}kcal</p>
                    <p>탄수화물 : {nutrition_info_list.AMT_NUM2}g</p>
                    <p>단백질 : {nutrition_info_list.AMT_NUM3}g</p>
                    <p>지방 : {nutrition_info_list.AMT_NUM4}g</p>
                    <p>당류 : {nutrition_info_list.AMT_NUM5}g</p>
                    <p>나트륨 : {nutrition_info_list.AMT_NUM6}g</p>
                    <p>콜레스테롤 : {nutrition_info_list.AMT_NUM7}g</p>
                    <p>포화지방산 : {nutrition_info_list.AMT_NUM8}g</p>
                    <p>트렌스지방 : {nutrition_info_list.AMT_NUM9}g</p>    
                </div>
            </div>
            <button 
                style={{
                    margin : '20px auto 0',
                    display : 'block',
                    width : '150px',
                    height : '50px',
                    fontSize : '18px',
                    background : 'blue',
                    border : 'solid 1px #000',
                    borderRadius : '30px',
                    cursor : 'pointer'
                }}
                onClick={()=>{
                    sessionStorage_add_resultList(nutrition_info_list);
                }}
            >오늘은 너다!</button>
            <button
                onClick={()=>{
                    navigate('ResultPage');
                }}
            >종합창으로 이동</button>
        </div>
    )
}

function nutrition_calculate(base_nutrition_info_list, setNutrition_info_list){
    let gram = Number(document.querySelector('.gram').value);
    let copy_base_nutrition_info_list = [...base_nutrition_info_list];
    for(let i = 1; i < copy_base_nutrition_info_list.length; i++){
        if(copy_base_nutrition_info_list[i] != undefined){
            copy_base_nutrition_info_list[i] = (copy_base_nutrition_info_list[i] * (gram * 0.01)).toFixed(0);
        }
    }
    setNutrition_info_list(copy_base_nutrition_info_list);
}
function sessionStorage_add_resultList(nutrition_info_list){
    let gramNum = Number(document.querySelector('.gram').value);
    if(gramNum == 0){
        gramNum = 100;
    }
    let getResult = JSON.parse(sessionStorage.getItem('resultlist'))
    let addResult = {...nutrition_info_list, gram : gramNum};
    let result = '';
    if(getResult == []){
        result = [addResult]
    } else {
        result = [addResult, ...getResult]
    }
    let resultList = JSON.stringify(result)
    sessionStorage.setItem('resultlist', resultList)
}
function localStorage_add_singlePage(idx, list){
    if(list[0] != undefined){
        const menuArr = {
            FOOD_NM_KR : list[idx].FOOD_NM_KR,
            AMT_NUM1 : list[idx].AMT_NUM1,
            AMT_NUM2 : list[idx].AMT_NUM2,
            AMT_NUM3 : list[idx].AMT_NUM3,
            AMT_NUM4 : list[idx].AMT_NUM4,
            AMT_NUM5 : list[idx].AMT_NUM5,
            AMT_NUM6 : list[idx].AMT_NUM6,
            AMT_NUM7 : list[idx].AMT_NUM7,
            AMT_NUM8 : list[idx].AMT_NUM8,
            AMT_NUM9 : list[idx].AMT_NUM9
        }
        const jsonMenuArr = JSON.stringify(menuArr);
        localStorage.setItem('singlepage', jsonMenuArr);
    }
}

// 성분별로 평가기를 만들어 성분 좋으면 그에 따른 별칭(단백질량 높으면 근육빵빵, 탄수화물 높으면 든든, 지방함량이 높으면 지방이)을 따로 칭호처럼 붙여넣기
// 조합에 추가 누르면 음식 데이터를 따로 array에 담거나 로컬스토리지에 저장하거나 해서 조합정보를 볼 수 있게 하기
// 조합정보창에는 

export default FoodSinglePage;