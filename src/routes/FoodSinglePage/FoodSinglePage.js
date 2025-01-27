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
        single_round_graph
    } = useSingleKit();
    const {
        Alert,
        click_alert,
    } = usePublickit();
    
    // url파라미터 해당하는 list항목 localStorage에 저장
    localStorage_add_singlePage(idx, list);
    
    const base_nutrition_info_list = {...JSON.parse(localStorage.getItem('singlepage'))};
    const [nutrition_info_list, setNutrition_info_list] = useState(base_nutrition_info_list);
    // 총 제공량이 끝에 g이 달려있어 제거하고 반올림
    const surving_size = Number((nutrition_info_list.Z10500).replace(/g|,|mL/g, '')).toFixed(0);

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.wrap').classList.add('on')
        }, 100)
    }, [])

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
                            <div id="kcal_round_graph" className="round_graph" style={{background : single_round_graph('kcal', nutrition_info_list.AMT_NUM1)}}>
                                <div className="center_circle">
                                    <span>{single_round_graph('kcal', nutrition_info_list.AMT_NUM1, 'user')}kcal</span>
                                    <span>/</span>
                                    <span>{single_round_graph('kcal', nutrition_info_list.AMT_NUM1, 'now')}kcal</span>
                                </div>
                            </div>
                            칼로리
                        </div>
                        <div className="graph_wrap">
                            <div id="carb_round_graph" className="round_graph"style={{background : single_round_graph('carb', nutrition_info_list.AMT_NUM2)}}>
                                <div className="center_circle">
                                    <span>{single_round_graph('carb', nutrition_info_list.AMT_NUM2, 'user')}g</span>
                                    <span>/</span>
                                    <span>{single_round_graph('carb', nutrition_info_list.AMT_NUM2, 'now')}g</span>
                                </div>
                            </div>
                            탄수화물
                        </div>
                        <div className="graph_wrap">
                            <div id="protein_round_graph" className="round_graph"style={{background : single_round_graph('protein', nutrition_info_list.AMT_NUM3)}}>
                                <div className="center_circle">
                                    <span>{single_round_graph('protein', nutrition_info_list.AMT_NUM3, 'user')}g</span>
                                    <span>/</span>
                                    <span>{single_round_graph('protein', nutrition_info_list.AMT_NUM3, 'now')}g</span>
                                </div>
                            </div>
                            단백질
                        </div>
                        <div className="graph_wrap">
                            <div id="fat_round_graph" className="round_graph"style={{background : single_round_graph('fat', nutrition_info_list.AMT_NUM4)}}>
                                <div className="center_circle">
                                    <span>{single_round_graph('fat', nutrition_info_list.AMT_NUM4, 'user')}g</span>
                                    <span>/</span>
                                    <span>{single_round_graph('fat', nutrition_info_list.AMT_NUM4, 'now')}g</span>
                                </div>
                            </div>
                            지방
                        </div>
                    </div>
                </div>
            </div>
            <button 
                className="btn"
                style={{display : 'block', width : '200px', height : '50px', borderRadius : '30px', fontSize : '16px', margin : '40px auto'}}
                onClick={()=>{
                    sessionStorage_add_resultList(nutrition_info_list);
                    click_alert();
                }}
            >오늘은 너다!</button>
            <div style={{marginBottom : '30px', display : 'flex', justifyContent : 'space-between'}}>
                <span style={{cursor : 'pointer'}} onClick={()=>{navigate('/FoodInfo/Graph');}}>{'◀' + ' 음식정보로 이동'}</span>
                <span style={{cursor : 'pointer'}} onClick={()=>{navigate('ResultPage');}}>{'종합창으로 이동 ' + '▶'}</span>
            </div>
            {<Alert text={'정보가 종합창에 저장되었습니다.'}></Alert>}
        </div>
    )
}



// 성분별로 평가기를 만들어 성분 좋으면 그에 따른 별칭(단백질량 높으면 근육빵빵, 탄수화물 높으면 든든, 지방함량이 높으면 지방이)을 따로 칭호처럼 붙여넣기
// 조합에 추가 누르면 음식 데이터를 따로 array에 담거나 로컬스토리지에 저장하거나 해서 조합정보를 볼 수 있게 하기
// 조합정보창에는 

export default FoodSinglePage;