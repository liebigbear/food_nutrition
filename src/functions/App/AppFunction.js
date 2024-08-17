import { useState } from "react";

function useAppKit(){
    // getData로 변동되는 state
    const [list, setList] = useState([]);
    const [trig, setTrig] = useState(false);
    // 데이터 받아올때 로딩창
    function Loading(){
        return(
        <div style={{
            width : '100%',
            height : '100%',
            display : 'block',
            position : 'absolute',
            top : '0',
            left : '0'
        }}>
            <div style={{
            width : '300px', 
            height : '100px', 
            fontWeight : 'bold', 
            background : 'white',
            border : 'solid 1px #000',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            position : 'fixed', 
            top : '50%',
            left : '50%',
            transform : 'translate(-50%, -50%)'
            }}>로딩중입니다.</div>
        </div>
        )
    }
    // FoodGraph 표 헤더 컴포넌트
    function FoodGraph_Header(){
        return(
            <tr id="graph_line">
                <td></td>
                <td>상호명</td>
                <td>기준(g)</td>
                <td>메뉴명</td>
                <td>열량(kcal)</td>
                <td>탄수화물(g)</td>
                <td>단백질(g)</td>
                <td>지방(g)</td>
                <td>당류(g)</td>
                <td>나트륨(g)</td>
                <td>콜레스테롤(g)</td>
                <td>포화지방산(g)</td>
                <td>트렌스지방(g)</td>
            </tr>
        )
    }

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

    setList(result.body.items)
    }

    return{
        list,
        setList,
        trig,
        setTrig,
        Loading,
        getData,
        FoodGraph_Header
    }
}

export default useAppKit;