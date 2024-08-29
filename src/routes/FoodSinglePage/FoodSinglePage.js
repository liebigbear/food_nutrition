import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSingleKit from "../../functions/FoodSinglePage/FoodSinglePageFunction";
import usePublickit from "../../functions/public/PublicFunction";

function FoodSinglePage(props){
    // navigate 가져오기
    const navigate = props.navigate;
    // url파라미터
    const param = useParams();
    const idx = Number(param.id);
    // App.js list 가져오기
    const list = props.list;
    const {
        nutrition_calculate,
        sessionStorage_add_resultList,
        localStorage_add_singlePage,
    } = useSingleKit();
    const {
        Alert,
        click_alert
    } = usePublickit();
    
    // url파라미터 해당하는 list항목 localStorage에 저장
    localStorage_add_singlePage(idx, list)
    
    const base_nutrition_info_list = {...JSON.parse(localStorage.getItem('singlepage'))}
    const [nutrition_info_list, setNutrition_info_list] = useState(base_nutrition_info_list);

    return(
        <div className="wrap">  
            <div id="single">
                <div id="single_info">
                    <p>메뉴명 : {nutrition_info_list.FOOD_NM_KR}</p>
                    <p>상호명 : {nutrition_info_list.MAKER_NM}</p>
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
                        <span className="basic_gram" style={{fontSize : '10px', color : 'gray'}}>(1회 제공량 : {nutrition_info_list.Z10500})</span>
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
                    click_alert();
                }}
            >오늘은 너다!</button>
            <button onClick={()=>{navigate('/FoodInfo/Graph');}}>음식정보로 이동</button>
            <button onClick={()=>{navigate('ResultPage');}}>종합창으로 이동</button>
            {<Alert text={'정보가 종합창에 저장되었습니다.'}></Alert>}
        </div>
    )
}



// 성분별로 평가기를 만들어 성분 좋으면 그에 따른 별칭(단백질량 높으면 근육빵빵, 탄수화물 높으면 든든, 지방함량이 높으면 지방이)을 따로 칭호처럼 붙여넣기
// 조합에 추가 누르면 음식 데이터를 따로 array에 담거나 로컬스토리지에 저장하거나 해서 조합정보를 볼 수 있게 하기
// 조합정보창에는 

export default FoodSinglePage;