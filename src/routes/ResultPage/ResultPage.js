import { useEffect, useState } from "react";

function ResultPage(props){
    const resultList = JSON.parse(sessionStorage.getItem('resultlist'))
    const FoodGraph_Header = props.FoodGraph_Header;
    function result(a){
        let result = 0;
        resultList.map((o, i)=>{
            if(o[a] != ''){
                result = result + Number(o[a])
            }
        })
        return result;
    }
    return(
        <div className="wrap">
            <div>결과창</div>
            <table id="food_graph">
                <tbody>
                    <FoodGraph_Header></FoodGraph_Header>
                    {
                    resultList.map((o, i)=>{
                        return(
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{o.MAKER_NM}</td>
                            <td>{o.gram}</td>
                            <td>{o.FOOD_NM_KR}</td>
                            <td className="aa1">{o.AMT_NUM1}</td>
                            <td className="aa2">{o.AMT_NUM2}</td>
                            <td className="aa3">{o.AMT_NUM3}</td>
                            <td className="aa4">{o.AMT_NUM4}</td>
                            <td className="aa5">{o.AMT_NUM5}</td>
                            <td className="aa6">{o.AMT_NUM6}</td>
                            <td className="aa7">{o.AMT_NUM7}</td>
                            <td className="aa8">{o.AMT_NUM8}</td>
                            <td className="aa9">{o.AMT_NUM9}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <div>
                <p>칼로리는? {result("AMT_NUM1")}</p>
                <p>탄수화물은? {result("AMT_NUM2")}</p>
                <p>단백질은? {result("AMT_NUM3")}</p>
                <p>지방은? {result("AMT_NUM4")}</p>
                <p>당류는? {result("AMT_NUM5")}</p>
                <p>나트륨은? {result("AMT_NUM6")}</p>
                <p>콜레스테롤은? {result("AMT_NUM7")}</p>
                <p>포화지방은? {result("AMT_NUM8")}</p>
                <p>트렌스지방은? {result("AMT_NUM9")}</p>
            </div>
            <button>결정!</button>
        </div>
    )
}

export default ResultPage;