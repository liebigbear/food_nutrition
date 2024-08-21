import { useEffect, useState } from "react";
import useResultkit from "../../functions/ResultPage/ResultPageFunction";
import { useNavigate } from "react-router-dom";

function ResultPage(props){
    const navigate = useNavigate();
    // storage 안의 데이터로 만든 html 항목 삭제 기능 가져오기
    const storage_delete_box = props.storage_delete_box;

    const [resultList, setResultList] = useState(JSON.parse(sessionStorage.getItem('resultlist')));
    const {
        result,
        localStorage_add_foodMixture,
    } = useResultkit();
    const FoodGraph_Header = props.FoodGraph_Header;
    if(JSON.parse(sessionStorage.getItem('resultlist')).length != 0){
        return(
            <div className="wrap">
                <h1>결과창</h1>
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
                                '트렌스지방(g)',
                                '제거'
                            ]}>
                        </FoodGraph_Header>
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
                                <td className="menu_delete">
                                    <button onClick={()=>storage_delete_box(resultList, setResultList, i, 'resultlist', sessionStorage)}>X</button>
                                </td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <div>
                    <p>칼로리는? {result("AMT_NUM1", resultList)}</p>
                    <p>탄수화물은? {result("AMT_NUM2", resultList)}</p>
                    <p>단백질은? {result("AMT_NUM3", resultList)}</p>
                    <p>지방은? {result("AMT_NUM4", resultList)}</p>
                    <p>당류는? {result("AMT_NUM5", resultList)}</p>
                    <p>나트륨은? {result("AMT_NUM6", resultList)}</p>
                    <p>콜레스테롤은? {result("AMT_NUM7", resultList)}</p>
                    <p>포화지방은? {result("AMT_NUM8", resultList)}</p>
                    <p>트렌스지방은? {result("AMT_NUM9", resultList)}</p>
                </div>
                <button onClick={()=>localStorage_add_foodMixture(resultList)}>결정!</button>
                <button onClick={()=>navigate('/FoodMixture/MixtureList')}>내 조합 보기</button>
            </div>
        )
    }
    else {
        return(
            <div className="wrap">
                <h1>담은 메뉴가 없습니다.</h1>
                <p>원하는 메뉴를 담아보세요!</p>
            </div>
        )
    }
    
}
export default ResultPage;