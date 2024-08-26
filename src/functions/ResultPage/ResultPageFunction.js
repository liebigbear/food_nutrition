function useResultkit(){
    function result_nutrition(value, resultList){
        let result = 0;
        resultList.map((o, i)=>{
            if(o[value] != ''){
                result = result + Number(o[value])
            }
        })
        return result.toFixed(0);
    }

    function localStorage_add_foodMixture(resultList, result_nutrition_list){
        let make_Mixture_file = {
            result : resultList,
            result_nutrition : result_nutrition_list
        }
        let getItem = JSON.parse(localStorage.getItem('foodMixture'));
        getItem.push(make_Mixture_file);
        localStorage.setItem('foodMixture', JSON.stringify(getItem))
    }

    function nutrition_calculate(base_nutrition_info_list, setNutrition_info_list){
        let gram = Number(document.querySelector('.result_gram').value);
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
    return{
        result_nutrition,
        localStorage_add_foodMixture,
        nutrition_calculate
    }
}
export default useResultkit;