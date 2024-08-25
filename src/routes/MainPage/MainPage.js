import { useNavigate } from "react-router-dom";
import useMainKit from "../../functions/MainPage/MainPageFunction";

function MainPage(){
    const navigate = useNavigate();
    const food_div_num = Array(0, 1, 2, 3, 4, 5);

    console.log(food_div_num)
    return(
        <div id="main_page" className="wrap">
            <h1 className="main_center_title">당신의 꿀조합을 찾아보세요!</h1>
            <p className="main_sub_title">권장 영양성분에 맞춘 나만의 꿀조합을 만들어봅시다</p>
            <div>
                <button className="btn start_btn" onClick={()=> navigate('/UserInfoSet')}>시작하기!</button>
            </div>
            <div className="food_bg">
                {food_div_num.map((o, i)=>{
                    if(i < 2){
                        return <div 
                            key={i} 
                            className={`food_img st ${"no"+i}`}
                            style={{width : '350px', height : '350px', zIndex : '-1'}}></div>
                    } else if (1 < i && i < 4){
                        return <div key={i}
                            className={`food_img nd ${"no"+i}`}
                            style={{width : '250px', height : '250px', zIndex : '-2'}}></div>
                    } else if (3 < i && i < 6){
                        return <div key={i} 
                            className={`food_img rd ${"no"+i}`}
                            style={{width : '200px', height : '200px', zIndex : '0'}}></div>
                    }
                })}
            </div>
        </div>
    )
}
export default MainPage;