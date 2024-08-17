function useSingleKit(){
    function nutrition_calculate(base_nutrition_info_list, setNutrition_info_list){
        let gram = Number(document.querySelector('.gram').value);
        let copy_base_nutrition_info_list = {...base_nutrition_info_list};
        let objectKey = Object.keys(copy_base_nutrition_info_list);
        let key = '';
        for(let i = 2; i < objectKey.length; i++){
            key = objectKey[i]
            if(copy_base_nutrition_info_list[key] != undefined){
                copy_base_nutrition_info_list[key] = (copy_base_nutrition_info_list[key] * (gram * 0.01)).toFixed(0);
            }
        }
        setNutrition_info_list(copy_base_nutrition_info_list);
    }
    function sessionStorage_add_resultList(nutrition_info_list){
        let gramNum = Number(document.querySelector('.gram').value);
        if(gramNum == 0){
            gramNum = 100;
        }
        let getResult = JSON.parse(sessionStorage.getItem('resultlist'))
        let addResult = {...nutrition_info_list, gram : gramNum};
        let result = '';
        if(getResult == []){
            result = [addResult]
        } else {
            result = [addResult, ...getResult]
        }
        let resultList = JSON.stringify(result)
        sessionStorage.setItem('resultlist', resultList)
    }
    function localStorage_add_singlePage(idx, list){
        if(list[0] != undefined){
            const menuArr = {
                FOOD_NM_KR : list[idx].FOOD_NM_KR,
                MAKER_NM : list[idx].MAKER_NM,
                AMT_NUM1 : list[idx].AMT_NUM1,
                AMT_NUM2 : list[idx].AMT_NUM2,
                AMT_NUM3 : list[idx].AMT_NUM3,
                AMT_NUM4 : list[idx].AMT_NUM4,
                AMT_NUM5 : list[idx].AMT_NUM5,
                AMT_NUM6 : list[idx].AMT_NUM6,
                AMT_NUM7 : list[idx].AMT_NUM7,
                AMT_NUM8 : list[idx].AMT_NUM8,
                AMT_NUM9 : list[idx].AMT_NUM9
            }
            const jsonMenuArr = JSON.stringify(menuArr);
            localStorage.setItem('singlepage', jsonMenuArr);
        }
    }
    return{
        nutrition_calculate,
        sessionStorage_add_resultList,
        localStorage_add_singlePage
    }
}
export default useSingleKit;