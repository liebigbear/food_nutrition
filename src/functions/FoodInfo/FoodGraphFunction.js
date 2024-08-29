import axios from "axios";
function useGraphkit(){
    // 식약처 API 불러오기
    async function getData(searchText, searchType, setTrig, setList, foodRange){
        let url_parameter = ''
        
        if(searchText != ''){
            if(searchType == 'menu'){
                url_parameter = `&FOOD_NM_KR=${searchText}`;
            }
            else if (searchType == 'brand'){
                url_parameter = `&MAKER_NM=${searchText}`;
            }
        }

        let url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${process.env.REACT_APP_NUTRITION_KEY}&pageNo=${foodRange}&numOfRows=100&type=json${url_parameter}`
        console.log(url)
        setTrig(true)
        try {
            let result = await axios(url);

            let make_json = JSON.stringify(result.data.body.items);
            sessionStorage.setItem('nutritionData', make_json);
            let nutritionData = '';
            if(sessionStorage.getItem('nutritionData') != 'undefined'){
                nutritionData = JSON.parse(sessionStorage.getItem('nutritionData'));
            } 

            setList(nutritionData);
        } catch (error) {
            alert('데이터를 불러오는데 실패하였습니다.')
        }
        setTrig(false)
        
    }

    return{
        getData
    }
}
export default useGraphkit;