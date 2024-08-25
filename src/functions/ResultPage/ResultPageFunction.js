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

    
    return{
        result_nutrition,
        localStorage_add_foodMixture,
    }
}
export default useResultkit;