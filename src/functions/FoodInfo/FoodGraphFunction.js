function useGraphkit(){
    // 식약처 API 불러오기
    async function getData(get, searchType, setTrig, setList){
        let url_parameter = ''

        if(get != ''){
            if(searchType == 'menu'){
                url_parameter = `&FOOD_NM_KR=${get}`;
            }
            else if (searchType == 'brand'){
                url_parameter = `&MAKER_NM=${get}`;
            }
        }

        let url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${process.env.REACT_APP_NUTRITION_KEY}&pageNo=1&numOfRows=100&type=json${url_parameter}`
        setTrig(true)
        let response = await fetch(url);
        let result = await response.json();
        setTrig(false)

        let make_json = JSON.stringify(result.body.items);
        sessionStorage.setItem('nutritionData', make_json);
        let nutritionData = '';
        if(sessionStorage.getItem('nutritionData') != 'undefined'){
            nutritionData = JSON.parse(sessionStorage.getItem('nutritionData'));
        } 

        setList(nutritionData);
    }

    return{
        getData
    }
}
export default useGraphkit;