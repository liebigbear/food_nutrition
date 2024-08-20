import { useEffect, useState, useRef } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

function FoodGraph(props){
    // useNavigate 사용
    const navigate = useNavigate();
    // FoodGraph_Header 가져오기
    const FoodGraph_Header = props.FoodGraph_Header;
    // Outlet컴포넌트에 props 가져오기
    const OutletContext = useOutletContext();
    const text_prop = OutletContext.text_prop;
    const searchType = OutletContext.searchType;
    // getData로 변동되는 state(App.js에서 가져옴)
    const [list, setList] = [props.list, props.setList]
    // getData 가져오기(App.js에서 가져옴)
    const getData = props.getData
    // 로딩창 props 해오기 & 로딩창 트리거(App.js에서 가져옴)
    const Loading = props.Loading
    const [trig, setTrig] = [props.trig, props.setTrig]
    // useEffect 첫 재렌더링 막는 트리거(useRef사용) / useRef는 페이지가 재렌더링 되어도 값을 저장 + useRef가 바뀌어도 state처럼 재렌더링이 되지 않는 특성을 지님
    const ref = useRef(true);
    // text_prop(input값)상태변경될 시 getData 작동
    useEffect(()=>{
        if(text_prop != ''){
            if(ref){
                ref.current = false;
                getData(text_prop, searchType, setTrig, setList)
            }
        }
    }, [text_prop])

    return(
        <div>
            {trig == true ? <Loading></Loading> : null}
            <table id="food_graph">
                <tbody>
                    <FoodGraph_Header FoodGraph_Header_contents={
                        [
                            '',
                            '상호명', 
                            '기준(g)', 
                            '메뉴명', 
                            '열량(kcal)', 
                            '탄수화물(g)',
                            '단백질(g)',
                            '지방(g)',
                            '당류(g)',
                            '나트륨(g)' ,
                            '콜레스테롤(g)',
                            '포화지방산(g)',
                            '트렌스지방(g)'
                        ]
                    }></FoodGraph_Header>
                    {list == undefined 
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
        </div>
    )
}


export default FoodGraph;