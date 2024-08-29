import { useEffect, useState, useRef } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import useGraphkit from "../../functions/FoodInfo/FoodGraphFunction";
import usePublickit from "../../functions/public/PublicFunction";
import useInfoKit from "../../functions/FoodInfo/FoodInfoFunction";

function FoodGraph(props){
    // useNavigate 사용
    const navigate = useNavigate();
    // Outlet컴포넌트에 props 가져오기
    const OutletContext = useOutletContext();
    const text_prop = OutletContext.text_prop;
    const searchType = OutletContext.searchType;
    const foodRange = OutletContext.foodRange;
    const setFoodRange = OutletContext.setFoodRange;
    const foodSearchText = sessionStorage.getItem('foodSearchText');
    const foodSearchType = sessionStorage.getItem('foodSearchType');
    const foodSearchNumber = Number(sessionStorage.getItem('foodSearchNumber'));
    // 음식 페이지 범위
    // getData로 변동되는 state(App.js에서 가져옴)
    const [list, setList] = [props.list, props.setList]
    // 로딩창 트리거(App.js에서 가져옴)
    const [trig, setTrig] = [props.trig, props.setTrig]
    // useEffect 첫 재렌더링 막는 트리거(useRef사용) / useRef는 페이지가 재렌더링 되어도 값을 저장 + useRef가 바뀌어도 state처럼 재렌더링이 되지 않는 특성을 지님
    const ref = useRef(true);
    // 로딩창, FoodGraph_Header 가져오기(PublicFunction에서 가져옴)
    const {
        Loading,
        foodGraph_Header
    } = usePublickit();
    // getData 가져오기(FoodGraphFunction에서 가져옴)
    const {
        getData
    }=useGraphkit();
    // text_prop(input값)상태변경될 시 getData 작동
    useEffect(()=>{
        if(text_prop != ''){
            if(ref){
                ref.current = false;
                getData(foodSearchText, foodSearchType, setTrig, setList, foodSearchNumber)
            }
        }
    }, [text_prop])
    useEffect(()=>{
        if(sessionStorage.getItem('nutritionData') != 'undefined'){
            let nutritionData = JSON.parse(sessionStorage.getItem('nutritionData'))
            setList(nutritionData)
        }
    },[])
    return(
        <div id="graphOutlet">
            {trig == true ? <Loading></Loading> : null}
            <p>음식명을 클릭하면 상세 페이지로 이동합니다.</p>
            <table id="food_graph">
                <tbody>
                    {foodGraph_Header('',
                            '상호명', 
                            '기준', 
                            '1회 제공량',
                            '메뉴명', 
                            '열량(kcal)', 
                            '탄수화물(g)',
                            '단백질(g)',
                            '지방(g)',
                            '당류(g)',
                            '나트륨(g)' ,
                            '콜레스테롤(g)',
                            '포화지방산(g)',
                            '트렌스지방(g)',
                        )
                    }
                    {list == []
                        ?
                        <tr id="nothing">
                            <td colSpan={document.getElementById('graph_line').childElementCount}>
                                <h1>요청하신 정보가 없습니다.</h1>
                                <p>정보를 주고싶은데 해당 데이터가 업데이트 안됐어요 ㅠㅠ</p>
                            </td>
                        </tr>
                        :
                        list.map((o, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{o.MAKER_NM}</td>
                                    <td>{o.SERVING_SIZE}</td>
                                    <td>{o.Z10500}</td>
                                    <td id="single_link"
                                        onClick={()=>{
                                            navigate(`/SinglePage/${i}`)
                                        }}
                                    >{o.FOOD_NM_KR}</td>
                                    <td>{o.AMT_NUM1}</td>
                                    <td>{o.AMT_NUM2}</td>
                                    <td>{o.AMT_NUM3}</td>
                                    <td>{o.AMT_NUM4}</td>
                                    <td>{o.AMT_NUM5}</td>
                                    <td>{o.AMT_NUM6}</td>
                                    <td>{o.AMT_NUM7}</td>
                                    <td>{o.AMT_NUM8}</td>
                                    <td>{o.AMT_NUM9}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div id="pagenation_box">
                <div className="pagenation">
                    <button onClick={()=>{
                            if(foodRange != 1){
                                const range = foodRange - 1;
                                sessionStorage.setItem('foodSearchNumber', range)
                                getData(foodSearchText, foodSearchType, setTrig, setList, range);
                                setFoodRange(foodRange => foodRange - 1);
                            } else {
                                alert('마지막 페이지 입니다.')
                            }
                        }}>이전</button>
                    <span>{foodRange}페이지</span>
                    <button onClick={function(){
                            if(list.length < 100){
                                alert('마지막 페이지 입니다.');
                            } else {
                                const range = foodRange + 1;
                                sessionStorage.setItem('foodSearchNumber', range)
                                getData(foodSearchText, foodSearchType, setTrig, setList, range);
                                setFoodRange(foodRange => foodRange + 1);
                            }
                        }}>다음</button>
                </div>
            </div>
        </div>
    )
}


export default FoodGraph;