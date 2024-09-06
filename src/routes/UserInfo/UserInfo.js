import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function UserInfo(props){
    const navigate = useNavigate();
    const info = JSON.parse(sessionStorage.getItem('userInfo'));
    const img_url = props.img_url;
    
    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('.wrap').classList.add('on')
        }, 100)
    }, [])
    return(
        <div className="wrap">
            <h1>내 정보</h1>
            <div className="image_box">
                <img className="user_img" src={img_url} alt=""/>
            </div>
            <p className="now_info">현재 정보</p>
            <div className="now_info_wrap">
                <p>성별 : {info.sex}</p>
                <p>연령대 : {info.age}</p>
                <p>키 : {info.stature}cm</p>
                <p>몸무게 : {info.weight}kg</p>
                <p>끼니 수 : {info.meal}끼</p>
                <p>하루 섭취 칼로리 : {info.kcal}kcal</p>
            </div>
            <button className="btn center_btn" onClick={()=>{navigate('/UserInfoSet')}}>내 정보 설정</button>
            <div className="foot_navigate_box">
                <span className="foot_navigate" onClick={()=>{navigate('/FoodInfo/Graph');}}>{'◀' + ' 음식 정보로 이동'}</span>
            </div>
        </div>
    )
}


export default UserInfo;