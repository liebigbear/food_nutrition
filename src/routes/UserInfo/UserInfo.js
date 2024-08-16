import { useNavigate } from "react-router-dom";

function UserInfo(){
    const navigate = useNavigate();
    return(
        <div className="wrap">
            <div>
                <p>성별을 선택해주세요.</p>
                <select>
                    <option style={{display : 'none'}}></option>
                    <option>남</option>
                    <option>여</option>
                </select>
            </div>
            <div>
                <p>연령대를 선택해주세요.</p>
                <select>
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
                <p>하루에 드시는 끼니 수를 입력해주세요.</p>
                <select>
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
                <div>
                    <input/>
                    <span>kcal</span>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span>기본</span>
                </div>
            </div>
            <button onClick={()=>navigate('/')}>가보자구</button>
        </div>
    )
}

export default UserInfo;