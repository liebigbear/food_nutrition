import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import usePublickit from "../../functions/public/PublicFunction";
import useResultkit from "../../functions/ResultPage/ResultPageFunction";
// 이거 Result페이지랑 똑같아 보이지만 컴포넌트로 만들기 복잡해서 일단 하드코딩으로 새로 만들어놓음
// 나중에 컴포넌트로 변환할 수 있으면 공용 컴포넌트로 만들어보자;
function MixtureSingle(props){
    const param = useParams();
    const OutletContext = useOutletContext();
    const navigate = useNavigate();
    const idx = Number(param.id);
    const singleMixture = OutletContext.mixtureList[idx];

    const singleNutrition = OutletContext.nutritionList[idx];
    const result_nutrition_list_keys = Object.keys(singleNutrition);
    // App.js에서 가져옴
    const nutrition_name = props.nutrition_name
    const {
        foodGraph_Header,
        meal_evaluation,
        round_graph
    }=usePublickit();
    return(
        <div>
            <table className="food_graph">
                <tbody>
                    {foodGraph_Header('',
                            '상호명', 
                            '중량(g)', 
                            '메뉴명', 
                            '열량(kcal)', 
                            '탄수화물(g)',
                            '단백질(g)',
                            '지방(g)',
                            '당류(g)',
                            '나트륨(g)' ,
                            '콜레스테롤(g)',
                            '포화지방산(g)',
                            '트렌스지방(g)',
                    )}

                    {
                    singleMixture.map((o, i)=>{
                        return(
                        <tr key={i} className="table_row">
                            <td>{i + 1}</td>
                            <td>{o.MAKER_NM}</td>
                            <td>{o.gram}</td>
                            <td>{o.FOOD_NM_KR}</td>
                            <td className="aa1">{o.AMT_NUM1}</td>
                            <td className="aa2">{o.AMT_NUM2}</td>
                            <td className="aa3">{o.AMT_NUM3}</td>
                            <td className="aa4">{o.AMT_NUM4}</td>
                            <td className="aa5">{o.AMT_NUM5}</td>
                            <td className="aa6">{o.AMT_NUM6}</td>
                            <td className="aa7">{o.AMT_NUM7}</td>
                            <td className="aa8">{o.AMT_NUM8}</td>
                            <td className="aa9">{o.AMT_NUM9}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <div className="result_content_wrap">
                <div id="result_total">
                    <h3 className="result_total_title">영양성분 총 평가</h3>
                    <p className="result_total_subT">칼로리와 3대 영양소는 사용자 기준 영양소의 20% +-로 기준을 제공해줍니다.</p>
                        
                    {
                    result_nutrition_list_keys.map((o, i)=>{
                        return(
                            <div key={i} className="result_nutrition_evaluation">
                                <span>{nutrition_name[i]} : {singleNutrition[o]}</span>
                                {/* true / false를 파라미터에 넣어 1끼 기준, 전체 기준 정할 수 있음 */}
                                {meal_evaluation(o, singleNutrition[o])}
                            </div>
                        )
                    })
                    }
                </div>
                <div id="result_round_graph">
                    <div className="round_graphs">
                        <div className="graph_wrap">
                            <div id="kcal_round_graph" className="round_graph" style={{background : round_graph('kcal', singleNutrition.AMT_NUM1)}}>
                                <div className="center_circle">
                                    <span>{round_graph('kcal', singleNutrition.AMT_NUM1, 'user')}kcal</span>
                                    <span>/</span>
                                    <span>{round_graph('kcal', singleNutrition.AMT_NUM1, 'now')}kcal</span>
                                </div>
                            </div>
                            칼로리
                        </div>
                        <div className="graph_wrap">
                            <div id="carb_round_graph" className="round_graph"style={{background : round_graph('carb', singleNutrition.AMT_NUM2)}}>
                                <div className="center_circle">
                                    <span>{round_graph('carb', singleNutrition.AMT_NUM2, 'user')}g</span>
                                    <span>/</span>
                                    <span>{round_graph('carb', singleNutrition.AMT_NUM2, 'now')}g</span>
                                </div>
                            </div>
                            탄수화물
                        </div>
                        <div className="graph_wrap">
                            <div id="protein_round_graph" className="round_graph"style={{background : round_graph('protein', singleNutrition.AMT_NUM3)}}>
                                <div className="center_circle">
                                    <span>{round_graph('protein', singleNutrition.AMT_NUM3, 'user')}g</span>
                                    <span>/</span>
                                    <span>{round_graph('protein', singleNutrition.AMT_NUM3, 'now')}g</span>
                                </div>
                            </div>
                            단백질
                        </div>
                        <div className="graph_wrap">
                            <div id="fat_round_graph" className="round_graph"style={{background : round_graph('fat', singleNutrition.AMT_NUM4)}}>
                                <div className="center_circle">
                                    <span>{round_graph('fat', singleNutrition.AMT_NUM4, 'user')}g</span>
                                    <span>/</span>
                                    <span>{round_graph('fat', singleNutrition.AMT_NUM4, 'now')}g</span>
                                </div>
                            </div>
                            지방
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot_navigate_box">
                <span className="foot_navigate" onClick={()=>{navigate('/FoodMixture/MixtureList');}}>{'◀' + ' 돌아가기'}</span>
            </div>
        </div>     
    )
}
export default MixtureSingle;