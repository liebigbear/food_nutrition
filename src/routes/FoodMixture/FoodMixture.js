import { useEffect, useState } from "react";
import useMixtureKit from "../../functions/FoodMixture/FoodMixtureFunction";

function FoodMixture(){
    const {
        delete_box,
    } = useMixtureKit();
    const [foodMixture, setFoodMixture] = useState(JSON.parse(localStorage.getItem('foodMixture')));
    if(JSON.parse(localStorage.getItem('foodMixture')).length != 0){
        return(
            <div className="wrap">
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
                                <button onClick={()=>delete_box(foodMixture, setFoodMixture, i)}>삭제</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    else {
        return(
            <div className="wrap">
                <h1>조합이 없습니다</h1>
                <p>나의 꿀조합을 만들어보세요!</p>
            </div>
        )
    }
}
export default FoodMixture;