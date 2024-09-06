import { useEffect, useState } from "react";
import useMixtureKit from "../../functions/FoodMixture/FoodMixtureFunction";
import { Outlet } from "react-router-dom";
import usePublickit from "../../functions/public/PublicFunction";

function FoodMixture(props){
    // storage 안의 데이터로 만든 html 항목 삭제 기능 가져오기
    const {
        storage_delete_box
    }=usePublickit();
    const [foodMixture, setFoodMixture] = useState(JSON.parse(localStorage.getItem('foodMixture')));
    const mixtureList = foodMixture.map((o)=>{
        return o.result
    });
    const nutritionList = foodMixture.map((o)=>{
        return o.result_nutrition
    });
    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.wrap').classList.add('on')
        }, 100)
    }, [])

    return(
    <div className="wrap">
        <h1>조합리스트</h1>
        <Outlet context={{
            storage_delete_box,
            foodMixture,
            setFoodMixture,
            mixtureList,
            nutritionList
        }}></Outlet>
    </div>

    )

}
export default FoodMixture;