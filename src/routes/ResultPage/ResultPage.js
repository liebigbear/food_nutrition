import { useEffect, useState } from "react";
import useResultkit from "../../functions/ResultPage/ResultPageFunction";
import { useNavigate } from "react-router-dom";
import usePublickit from "../../functions/public/PublicFunction";
import { click } from "@testing-library/user-event/dist/click";

function ResultPage(props){
    const navigate = useNavigate();
    const [resultList, setResultList] = useState(JSON.parse(sessionStorage.getItem('resultlist')));
    const nutrition_name = props.nutrition_name;
    // storage 안의 데이터로 만든 html 항목 삭제 기능 가져오기
    const {
        FoodGraph_Header,
        storage_delete_box,
        Alert,
        click_alert,
        meal_evaluation
    }= usePublickit();
    const {
        result_nutrition,
        localStorage_add_foodMixture,
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
    const result_nutrition_list_keys = Object.keys(result_nutrition_list);

    if(JSON.parse(sessionStorage.getItem('resultlist')).length != 0){
        return(
            <div className="wrap">
                <h1>결과창</h1>
                <table id="food_graph">
                    <tbody>
                        <FoodGraph_Header FoodGraph_Header_contents={
                            [
                                '',
                                '상호명', 
                                '기준(g)', 
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
                                '제거'
                            ]}>
                        </FoodGraph_Header>
                        {
                        resultList.map((o, i)=>{
                            return(
                            <tr key={i}>
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
                                <td className="menu_delete">
                                    <button onClick={()=>storage_delete_box(resultList, setResultList, i, 'resultlist', sessionStorage)}>X</button>
                                </td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <div>
                    <h3>한끼로 어때요?</h3>
                    <p>필수 5대 영양소는 기준 영양소의 20% +-로 기준을 제공해줍니다.</p>
                    {
                    result_nutrition_list_keys.map((o, i)=>{
                        return(
                            <div key={i}>
                                <span>{nutrition_name[i]} {result_nutrition_list[o]}</span>
                                {meal_evaluation(o, result_nutrition_list[o], true)}
                            </div>
                        )
                    })
                    }
                </div>
                <button onClick={()=>{localStorage_add_foodMixture(resultList, result_nutrition_list); click_alert()}}>결정!</button>
                <button onClick={()=>{navigate('/FoodInfo/Graph')}}>더 담으러 가기</button>
                <button onClick={()=>navigate('/FoodMixture/MixtureList')}>내 조합 보기</button>
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