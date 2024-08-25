import { useNavigate } from "react-router-dom";

function MainPage(){
    const navigate = useNavigate();
    return(
        <div id="main_page" className="wrap">
            <h1 className="main_center_title">당신의 꿀조합을 찾아보세요!</h1>
            <p>권장 영양성분에 맞춘 나만의 꿀조합을 만들어봅시다</p>
            <div>
                <button className="start_btn" onClick={()=> navigate('/UserInfoSet')}>시작하기!</button>
            </div>
        </div>
    )
}
export default MainPage;