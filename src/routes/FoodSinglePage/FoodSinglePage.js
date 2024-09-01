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
    // 총 제공량이 끝에 g이 달려있어 제거하고 반올림
    const surving_size = Number((nutrition_info_list.Z10500).replace('g', '')).toFixed(0);

    
    // 설정된 유저 칼로리를 탄단지로 전환
    function base_user_nutrition_info(user_kcal, user_weight, target){
        if(user_kcal != undefined && user_weight != undefined){
            let kcal = user_kcal;
            let weight = user_weight;

            let carb = (kcal * 0.55 / 4).toFixed(0);
            let protein = (weight * 0.8).toFixed(0);
            let fat = (kcal * 0.28 / 9).toFixed(0);
            if(target == 'carb'){
                return Number(carb)
            }
            else if(target == 'protein'){
                return Number(protein)
            }
            else if(target == 'fat'){
                return Number(fat)
            }
        }
    }
    // userPage_nutrition
    const user_kcal = JSON.parse(sessionStorage.getItem('userInfo')).kcal;
    const user_weight = JSON.parse(sessionStorage.getItem('userInfo')).weight;
    const user_carb = base_user_nutrition_info(user_kcal, user_weight, 'carb');
    const user_protein = base_user_nutrition_info(user_kcal, user_weight, 'protein');
    const user_fat = base_user_nutrition_info(user_kcal, user_weight, 'fat');
    // resultPage_nutrition
    const result_kcal = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM1;
    const result_carb = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM2;
    const result_protein = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM3;
    const result_fat = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM4;

    function round_graph_calculation(user_nutrition, now_nutrition){
        let result_percent = (now_nutrition / user_nutrition * 100).toFixed(0);
        return result_percent
    }
    const now_kcal_percent = Number(round_graph_calculation(user_kcal, nutrition_info_list.AMT_NUM1));
    const now_carb_percent = Number(round_graph_calculation(user_carb, nutrition_info_list.AMT_NUM2));
    const now_protein_percent = Number(round_graph_calculation(user_protein, nutrition_info_list.AMT_NUM3));
    const now_fat_percent = Number(round_graph_calculation(user_fat, nutrition_info_list.AMT_NUM4));

    const result_kcal_percent = Number(round_graph_calculation(user_kcal, result_kcal));
    const result_carb_percent = Number(round_graph_calculation(user_carb, result_carb));
    const result_protein_percent = Number(round_graph_calculation(user_protein, result_protein));
    const result_fat_percent = Number(round_graph_calculation(user_fat, result_fat));

    function round_graph_area(result_percent, now_percent){
        return(
            `conic-gradient( 
                red 0% ${result_percent}%,
                #26BDE2 ${result_percent}% ${result_percent + now_percent}%,
                gray ${result_percent + now_percent}% 100%
            )`
        )
    }

    return(
        <div className="wrap">  
            <div id="single">
                <div id="single_info">
                    <div className="single_name_info">
                        <span className="single_maker">{nutrition_info_list.MAKER_NM != null ? nutrition_info_list.MAKER_NM : '상호명 없음'}</span>
                        <span className="single_food">{nutrition_info_list.FOOD_NM_KR}</span>
                    </div>
                    <div className="nutrition_label">
                        <div className="label_top">
                            <span className="label_nutrition_info">영양정보</span>
                            <div id="select_gram">
                                <p className="gram_alert" style={{color : 'red', display : 'none'}}>숫자를 입력해주세요</p>
                                <span className="basic_gram">1회 제공량 {surving_size}g</span>
                                <span>
                                    기준량 <input 
                                    className="gram" 
                                    type="text" 
                                    placeholder="기본 100g" 
                                    style={{width : '58px'}}
                                    onInput={()=>{
                                        nutrition_calculate(base_nutrition_info_list, setNutrition_info_list);
                                    }}
                                    />g
                                </span>
                            </div> 
                        </div>
                        <div className="label_contents">
                            <div className="label_nutrition parent">
                                <span>칼로리</span><span>{nutrition_info_list.AMT_NUM1}<span className="label_unit">kcal</span></span>
                            </div>
                            <div className="label_family">
                                <div className="label_nutrition parent">
                                    <span>탄수화물</span><span>{nutrition_info_list.AMT_NUM2}<span className="label_unit">g</span></span>
                                </div>
                                <div className="label_nutrition child">
                                    <span>당류</span><span>{nutrition_info_list.AMT_NUM5}<span className="label_unit">g</span></span>
                                </div>
                            </div>
                            <div className="label_nutrition parent">
                                <span>단백질</span><span>{nutrition_info_list.AMT_NUM3}<span className="label_unit">g</span></span>
                            </div>
                            <div className="label_family">
                                <div className="label_nutrition parent">
                                    <span>지방</span><span>{nutrition_info_list.AMT_NUM4}<span className="label_unit">g</span></span>
                                </div>
                                <div className="label_nutrition child">
                                    <span>포화지방산</span><span>{nutrition_info_list.AMT_NUM8}<span className="label_unit">g</span></span>
                                </div>
                                <div className="label_nutrition child">
                                    <span>트렌스지방</span><span>{nutrition_info_list.AMT_NUM9}<span className="label_unit">g</span></span>
                                </div>
                            </div>
                            <div className="label_nutrition parent">
                                <span>나트륨</span><span>{nutrition_info_list.AMT_NUM6}<span className="label_unit">g</span></span>
                            </div>
                            <div className="label_nutrition parent">
                                <span>콜레스테롤</span><span>{nutrition_info_list.AMT_NUM7}<span className="label_unit">g</span></span>
                            </div>
                            
                        </div>
                    </div> 
                </div>
                <div id="single_round_graph">
                    <p className="round_graph_title">현재 기준 할당량</p>
                    <div className="round_graphs">
                        <div className="graph_wrap">
                            <div id="kcal_round_graph" className="round_graph" style={{
                                background : round_graph_area(result_kcal_percent, now_kcal_percent)}}><div className="center_circle"></div>
                            </div>
                            칼로리
                        </div>
                        <div className="graph_wrap">
                            <div id="carb_round_graph" className="round_graph"style={{
                                background : round_graph_area(result_carb_percent, now_carb_percent)}}><div className="center_circle"></div>
                            </div>
                            탄수화물
                        </div>
                        <div className="graph_wrap">
                            <div id="protein_round_graph" className="round_graph"style={{
                                background : round_graph_area(result_protein_percent, now_protein_percent)}}><div className="center_circle"></div>
                            </div>
                            단백질
                        </div>
                        <div className="graph_wrap">
                            <div id="fat_round_graph" className="round_graph"style={{
                                background : round_graph_area(result_fat_percent, now_fat_percent)}}><div className="center_circle"></div>
                            </div>
                            지방
                        </div>
                    </div>
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