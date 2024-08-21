import { useOutletContext } from "react-router-dom";

function MixtureList(){
    const OutletContext = useOutletContext();
    const foodMixture = OutletContext.foodMixture;
    const storage_delete_box = OutletContext.storage_delete_box;
    const setFoodMixture = OutletContext.setFoodMixture;
    return(
        <>
        {
            JSON.parse(localStorage.getItem('foodMixture')).length != 0 
            ?
            <>
            {
            foodMixture.map((o, i)=>{
                return(
                    <div key={i} className="foodMixture_box">
                        <p className="mixtureNumber">{i+1}</p>
                        {
                        o.length == 1 ?
                        <p className="food_nm">{o[0].FOOD_NM_KR}</p>
                        : o.length == 2 ?
                        <p className="food_nm">{o[0].FOOD_NM_KR}, {o[1].FOOD_NM_KR}</p>
                        : 
                        <p className="food_nm">{o[0].FOOD_NM_KR}, {o[1].FOOD_NM_KR} 외 {o.length - 2}개</p>
                        }
                        <button onClick={()=>storage_delete_box(foodMixture, setFoodMixture, i, 'foodMixture', localStorage)}>삭제</button>
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