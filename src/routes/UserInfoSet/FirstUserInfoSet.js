import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import useUserSetKit from "../../functions/UserInfoSet/UserInfoSetFunction";
import { useEffect } from "react";

function FirstUserInfoSet(props){
    const navigate = useNavigate();
    const info = JSON.parse(sessionStorage.getItem('userInfo'));
    const img_url = props.img_url;
    const [on, setOn] = [props.on, props.setOn];
    const {
        infoList,
        hide_kcalInput,
        getImage
    } = useUserSetKit();

    useEffect(()=>{
        if(info != ''){
            document.querySelector('.sex').value = info.sex;
            document.querySelector('.age').value = info.age;
            document.querySelector('.stature').value = info.stature;
            document.querySelector('.weight').value = info.weight;
            document.querySelector('.meal').value = info.meal;
            document.querySelector('.kcal').value = info.kcal;
            document.querySelector('.standard').checked = info.standard;
        };
        hide_kcalInput();
    }, [])
    
    return(
        <div className="wrap">
            <h1>내 정보 설정</h1>
            <div className="image_box" onClick={()=>document.querySelector('.image_select').click()}>
                    <img className="user_img" src={img_url} alt=""/>
                    <input className="image_select" type="file" accept="image/*" onChange={function(event){
                        getImage(event);
                    }} style={{display : 'none'}}></input>
                </div>
            <div>
                <p>성별을 선택해주세요.</p>
                <select className="sex">
                    <option style={{display : 'none'}}></option>
                    <option>남</option>
                    <option>여</option>
                </select>
            </div>
            <div>
                <p>연령대를 선택해주세요.</p>
                <select className="age">
                    <option style={{display : 'none'}}></option>
                    <option>3 ~ 5세</option>
                    <option>6 ~ 8세</option>
                    <option>9 ~ 11세</option>
                    <option>12 ~ 14세</option>
                    <option>15 ~ 18세</option>
                    <option>19 ~ 29세</option>
                    <option>30 ~ 49세</option>
                    <option>50 ~ 64세</option>
                    <option>65세 이상</option>
                </select>
            </div>
            <div>
                <p>키를 입력해주세요</p>
                <p><input className="stature"/>cm</p>
            </div>
            <div>
                <p>몸무게를 입력해주세요</p>
                <p><input className="weight"/>kg</p>
            </div>
            <div>
                <p>하루에 드시는 끼니 수를 입력해주세요(최대 6끼).</p>
                <select className="meal">
                    <option style={{display : 'none'}}></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <div>
                <p>하루에 드실 칼로리 양을 입력해주세요(기본으로 하고싶으면 기본 선택).</p>
                <div className="kcal_wrap">
                    <input className="kcal"/>
                    <span>kcal</span>
                </div>
                <div>
                    <input type="checkbox" className="standard" onChange={()=>{hide_kcalInput()}}/>
                    <span>기본</span>
                </div>
            </div>
            <button onClick={()=>{
                infoList('sex', 'age', 'stature', 'weight', 'meal', 'kcal', 'standard',on, setOn, true);
            }}>저장!</button>
        </div>
    )
}


export default FirstUserInfoSet;