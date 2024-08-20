function useResultkit(){
    const resultList = JSON.parse(sessionStorage.getItem('resultlist'))
    function result(value, resultList){
        let result = 0;
        resultList.map((o, i)=>{
            if(o[value] != ''){
                result = result + Number(o[value])
            }
        })
        return result;
    }

    function localStorage_add_foodMixture(){
        let getItem = JSON.parse(localStorage.getItem('foodMixture'));
        getItem.push(resultList);
        localStorage.setItem('foodMixture', JSON.stringify(getItem))
    }

    return{
        resultList,
        result,
        localStorage_add_foodMixture
    }
}
export default useResultkit;