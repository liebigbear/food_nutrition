import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UserInfo(props){
    const navigate = useNavigate();
    const info = JSON.parse(sessionStorage.getItem('userInfo'));
    const img_url = props.img_url;
    
    return(
        <div className="wrap">
            <h1>내 정보</h1>
            <div className="now_info">
                <div className="image_box">
                    <img className="user_img" src={img_url} alt=""/>
                </div>
                <p>현재 정보</p>
                <p>성별 : {info.sex}</p>
                <p>연령대 : {info.age}</p>
                <p>키 : {info.stature}cm</p>
                <p>몸무게 : {info.weight}kg</p>
                <p>끼니 수 : {info.meal}끼</p>
                <p>하루 섭취 칼로리 : {info.kcal}kcal</p>
            </div>
            <button onClick={()=>{navigate('/UserInfoSet')}}>내 정보 설정</button>
        </div>
    )
}


export default UserInfo;