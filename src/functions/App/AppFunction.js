import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    function FoodGraph_Header(props){
        const FoodGraph_Header_contents = props.FoodGraph_Header_contents;
        return(
            <tr id="graph_line">
                {
                FoodGraph_Header_contents.map((o, i)=>{
                    return(
                        <td key={i}>{o}</td>
                    )
                })
                }
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
    // 햄버거 메뉴 클릭시 링크 컴포넌트
    function Hamburger_menu(){
        let navigate = useNavigate();
        return(
            <div className="hamburger_menu">
                <p onClick={()=>{navigate('/')}}>홈</p>
                <p onClick={()=>{navigate('/UserInfo')}}>내 정보</p>
                <p onClick={()=>{navigate('/ResultPage')}}>결과창</p>
                <p onClick={()=>{navigate('/FoodMixture')}}>조합리스트</p>
            </div>
        )
    }
    // 햄버거메뉴 클릭시 숨은메뉴 나타나기
    const [hideTrig, setHideTrig] = useState(false)
    function hamburger_btn_click(){
        let btn = document.querySelector('.hamburger');
        if(btn.classList.contains('click')){
            btn.classList.remove('click')
            setHideTrig(false)
        } 
        else {
            btn.classList.add('click')
            setHideTrig(true)
        }
    }

    return{
        list,
        setList,
        trig,
        setTrig,
        Loading,
        getData,
        FoodGraph_Header,
        Hamburger_menu,
        hideTrig,
        hamburger_btn_click
    }
}

export default useAppKit;