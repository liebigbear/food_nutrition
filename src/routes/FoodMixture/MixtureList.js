import { useNavigate, useOutletContext } from "react-router-dom";

function MixtureList(){
    const navigate = useNavigate();
    const OutletContext = useOutletContext();
    const foodMixture = OutletContext.foodMixture;
    const setFoodMixture = OutletContext.setFoodMixture;
    const storage_delete_box = OutletContext.storage_delete_box;
    const mixtureList = OutletContext.mixtureList;
    const nutritionList = OutletContext.nutritionList;
    console.log(nutritionList)
    return(
        <>
        {
            JSON.parse(localStorage.getItem('foodMixture')).length != 0 
            ?
            <>
            {
            mixtureList.map((o, i)=>{
                return(
                    <div key={i} className="foodMixture_box" onClick={()=>{navigate(`/FoodMixture/MixtureSingle/${i}`)}}>
                        <p className="mixtureNumber">{i+1}.</p>
                        {
                        o.length == 1 ?
                        <p className="food_nm">{o[0].FOOD_NM_KR}</p>
                        : o.length == 2 ?
                        <p className="food_nm">{o[0].FOOD_NM_KR}, {o[1].FOOD_NM_KR}</p>
                        : 
                        <p className="food_nm">{o[0].FOOD_NM_KR}, {o[1].FOOD_NM_KR} 외 {o.length - 2}개</p>
                        }
                        <button className="mixture_delete" onClick={function(e){
                            // 클릭이벤트가 부모요소까지 퍼지는걸 제어
                            e.stopPropagation();
                            storage_delete_box(foodMixture, setFoodMixture, i, 'foodMixture', localStorage)}
                        }>X</button>
                    </div>
                )
            })
            }   
            </>
            : 
            <>
                <h2>조합이 없습니다</h2>
                <p>나의 꿀조합을 만들어보세요!</p>
            </>
        }
        </>
    )
}
export default MixtureList;