import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import useUserKit from "../../functions/UserInfo/UserInfoFunction";
import { useEffect } from "react";

function UserInfo(props){
    const navigate = useNavigate();
    const info = JSON.parse(sessionStorage.getItem('userInfo'));
    const {
        infoList,
        hide_kcalInput,
        setDone,
        done,
        kcal_calculator
    } = useUserKit();

    useEffect(()=>{
        if(info != ''){
            document.querySelector('.sex').value = info.sex;
            document.querySelector('.age').value = info.age;
            document.querySelector('.stature').value = info.stature;
            document.querySelector('.meal').value = info.meal;
            document.querySelector('.kcal').value = info.kcal;
            document.querySelector('.standard').checked = info.standard;
        };
        hide_kcalInput();
    }, [])

    useEffect(()=>{
        if(done){
            alert('정보가 저장되었습니다.'); 
            navigate('/');
            setDone(false)
        }
    }, [done])
    
    return(
        <div className="wrap">
            {
                info != ''
                ?
                <div className="now_info">
                    <p>현재 정보</p>
                    <span>성별 : {info.sex}</span>
                    <span>연령대 : {info.age}</span>
                    <span>키 : {info.stature}cm</span>
                    <span>끼니 수 : {info.meal}</span>
                    <span>하루 섭취 칼로리 : {info.standard ? kcal_calculator(info.sex, info.stature) : info.kcal}kcal</span>
                </div>
                :
                null
            }

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
                <p>하루에 드시는 끼니 수를 입력해주세요.</p>
                <select className="meal">
                    <option style={{display : 'none'}}></option>
                    <option>1끼</option>
                    <option>2끼</option>
                    <option>3끼</option>
                    <option>4끼</option>
                    <option>5끼</option>
                    <option>6끼</option>
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
                infoList('sex', 'age', 'stature', 'meal', 'kcal', 'standard');
            }}>가보자구</button>
        </div>
    )
}


export default UserInfo;