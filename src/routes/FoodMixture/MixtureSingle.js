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
    const nutrition_name = props.nutrition_name
    console.log(singleNutrition, result_nutrition_list_keys)
    const {
        FoodGraph_Header,
        meal_evaluation
    }=usePublickit();
    return(
        <div>
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
                    ]}>
                </FoodGraph_Header>
                {
                singleMixture.map((o, i)=>{
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
                        <span>{nutrition_name[i]} {singleNutrition[o]}</span>
                        {meal_evaluation(o, singleNutrition[o], true)}
                    </div>
                )
            })
            }
        </div>
        <button onClick={()=>navigate('/FoodMixture/MixtureList')}>돌아가기</button>
        </div>     
    )
}
export default MixtureSingle;