function useResultkit(){
    function result(value, resultList){
        let result = 0;
        resultList.map((o, i)=>{
            if(o[value] != ''){
                result = result + Number(o[value])
            }
        })
        return result.toFixed(0);
    }

    function localStorage_add_foodMixture(resultList){
        let getItem = JSON.parse(localStorage.getItem('foodMixture'));
        getItem.push(resultList);
        localStorage.setItem('foodMixture', JSON.stringify(getItem))
    }

    return{
        result,
        localStorage_add_foodMixture,
    }
}
export default useResultkit;