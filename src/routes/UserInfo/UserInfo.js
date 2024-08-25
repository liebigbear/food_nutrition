import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import useUserKit from "../../functions/UserInfoSet/UserInfoSetFunction";
import { useEffect } from "react";

function UserInfo(props){
    const navigate = useNavigate();
    const info = JSON.parse(sessionStorage.getItem('userInfo'));
    
    return(
        <div className="wrap">
            <h1>내 정보</h1>
            <div className="now_info">
                <p>현재 정보</p>
                <span>성별 : {info.sex}</span>
                <span>연령대 : {info.age}</span>
                <span>키 : {info.stature}cm</span>
                <span>몸무게 : {info.weight}kg</span>
                <span>끼니 수 : {info.meal}끼</span>
                <span>하루 섭취 칼로리 : {info.kcal}kcal</span>
            </div>
            <button onClick={()=>{navigate('/UserInfoSet')}}>내 정보 설정</button>
        </div>
    )
}


export default UserInfo;