import { useEffect, useState } from "react";
import useResultkit from "../../functions/ResultPage/ResultPageFunction";
import { useNavigate } from "react-router-dom";
import usePublickit from "../../functions/public/PublicFunction";
import useSingleKit from "../../functions/FoodSinglePage/FoodSinglePageFunction";

function ResultPage(props){
    const navigate = useNavigate();
    const [resultList, setResultList] = useState(JSON.parse(sessionStorage.getItem('resultlist')));
    const nutrition_name = props.nutrition_name;
    // storage 안의 데이터로 만든 html 항목 삭제 기능 가져오기
    const [on, setOn] = [props.on, props.setOn];

    const {
        foodGraph_Header,
        storage_delete_box,
        Alert,
        click_alert,
        meal_evaluation,
        round_graph
    }= usePublickit();
    const {
        result_nutrition,
        localStorage_add_foodMixture,
        result_correction
    } = useResultkit();
    const result_nutrition_list = {
        AMT_NUM1 : result_nutrition("AMT_NUM1", resultList),
        AMT_NUM2 : result_nutrition("AMT_NUM2", resultList),
        AMT_NUM3 : result_nutrition("AMT_NUM3", resultList),
        AMT_NUM4 : result_nutrition("AMT_NUM4", resultList),
        AMT_NUM5 : result_nutrition("AMT_NUM5", resultList),
        AMT_NUM6 : result_nutrition("AMT_NUM6", resultList),
        AMT_NUM7 : result_nutrition("AMT_NUM7", resultList),
        AMT_NUM8 : result_nutrition("AMT_NUM8", resultList),
        AMT_NUM9 : result_nutrition("AMT_NUM9", resultList)
    }
    sessionStorage.setItem('result_nutrition_list', JSON.stringify(result_nutrition_list));
    const result_nutrition_list_keys = Object.keys(result_nutrition_list);

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.wrap').classList.add('on')
        }, 100)
    }, [])
    if(JSON.parse(sessionStorage.getItem('resultlist')).length != 0){
        return(
            <div className="wrap">
                <h1>결과창</h1>
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
                                '수정',
                                '제거',
                            )
                        }
                        {
                        resultList.map((o, i)=>{
                            return(
                            <tr key={i} className={`table_row ${i}`}>
                                <td>{i + 1}</td>
                                <td>{o.MAKER_NM}</td>
                                <td><span className="result_gram">{o.gram}</span></td>
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
                                <td className="menu_correction">
                                    <button className="nutrition_correction_btn" onClick={(e)=>{
                                        let gram = document.querySelectorAll('.result_gram')
                                        result_correction(gram, i, o, resultList, on, setOn, e)
                                    }}
                                    >수정</button>
                                </td>
                                <td>
                                    <button className="menu_delete" onClick={()=>storage_delete_box(resultList, setResultList, i, 'resultlist', sessionStorage)}>X</button>
                                </td>
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
                                    <span>{nutrition_name[i]} {result_nutrition_list[o]}</span>
                                    {/* true / false를 파라미터에 넣어 1끼 기준, 전체 기준 정할 수 있음 */}
                                    {meal_evaluation(o, result_nutrition_list[o])}
                                </div>
                            )
                        })
                        }
                    </div>
                    <div id="result_round_graph">
                        <div className="round_graphs">
                            <div className="graph_wrap">
                                <div id="kcal_round_graph" className="round_graph" style={{background : round_graph('kcal')}}>
                                    <div className="center_circle">
                                        <span>{round_graph('kcal', 'storage', 'user')}kcal</span>
                                        <span>/</span>
                                        <span>{round_graph('kcal', 'storage', 'now')}kcal</span>
                                    </div>
                                </div>
                                칼로리
                            </div>
                            <div className="graph_wrap">
                                <div id="carb_round_graph" className="round_graph"style={{background : round_graph('carb')}}>
                                    <div className="center_circle">
                                        <span>{round_graph('carb', 'storage', 'user')}g</span>
                                        <span>/</span>
                                        <span>{round_graph('carb', 'storage', 'now')}g</span>
                                    </div>
                                </div>
                                탄수화물
                            </div>
                            <div className="graph_wrap">
                                <div id="protein_round_graph" className="round_graph"style={{background : round_graph('protein')}}>
                                    <div className="center_circle">
                                        <span>{round_graph('protein', 'storage', 'user')}g</span>
                                        <span>/</span>
                                        <span>{round_graph('protein', 'storage', 'now')}g</span>
                                    </div>
                                </div>
                                단백질
                            </div>
                            <div className="graph_wrap">
                                <div id="fat_round_graph" className="round_graph"style={{background : round_graph('fat')}}>
                                    <div className="center_circle">
                                    <span>{round_graph('fat', 'storage', 'user')}g</span>
                                    <span>/</span>
                                    <span>{round_graph('fat', 'storage', 'now')}g</span>
                                    </div>
                                </div>
                                지방
                            </div>
                        </div>
                    </div>
                </div>
                
                <button 
                    className="btn center_btn"
                    onClick={()=>{localStorage_add_foodMixture(resultList, result_nutrition_list); click_alert()}}
                >결정!</button>
                <div className="foot_navigate_box">
                    <span className="foot_navigate" onClick={()=>{navigate('/FoodInfo/Graph');}}>{'◀' + ' 더 담으러 가기'}</span>
                    <span className="foot_navigate" onClick={()=>{navigate('/FoodMixture/MixtureList');}}>{'내 조합 보기 ' + '▶'}</span>
                </div>
                <Alert text={'정보가 조합리스트에 저장되었습니다.'}></Alert>
            </div>
        )
    }
    else {
        return(
            <div className="wrap">
                <h1>담은 메뉴가 없습니다.</h1>
                <p>원하는 메뉴를 담아보세요!</p>
                <button onClick={()=>navigate('/FoodInfo/Graph')}>담으러 가기!</button>
            </div>
        )
    }
    
}
export default ResultPage;