import { useNavigate } from "react-router-dom";
import useMainKit from "../../functions/MainPage/MainPageFunction";
import { useEffect } from "react";

function MainPage(){
    const navigate = useNavigate();
    const X = -291
    const Y = -191
    const food_div_num = [
        {x : '0', y : `0`},
        {x : `${X}px`, y : `0`},
        {x : '0', y : `${Y}px`},
        {x : `${X}px`, y : `${Y}px`},
        {x : '0', y : `${Y*2}px`},
        {x : `${X}px`, y : `${Y*2}px`},
        {x : '0', y : `${Y*3}px`},
        {x : `${X}px`, y : `${Y*3}px`},
        {x : '0', y : `${Y*4}px`},
        {x : `${X}px`, y : `${Y*4}px`},
        {x : '0', y : `${Y*5}px`},
        {x : `${X}px`, y : `${Y*5}px`},
        {x : '0', y : `${Y*6}px`},
        {x : `${X}px`, y : `${Y*6}px`},
        {x : '0', y : `${Y*7}px`},
        {x : `${X}px`, y : `${Y*7}px`}
    ];

    return(
        <div id="main_page">
            <h1 className="main_center_title">당신의 꿀조합을 찾아보세요!</h1>
            <p className="main_sub_title">권장 영양성분에 맞춘 나만의 꿀조합을 만들어봅시다</p>
            <div>
                <button className="btn start_btn" onClick={()=>{
                    if(sessionStorage.getItem('userInfo') == '[]'){
                        navigate('/FirstUserInfoSet')
                        console.log(sessionStorage.getItem('userInfo'))
                    } else {
                        navigate('/FoodInfo/Graph')
                    }
                }
                }>시작하기!</button>
            </div>
            <div className="food_bg">
                {food_div_num.map((o, i)=>{
                    return <div 
                                key={i} 
                                className={`food_img st ${"no"+i}`}
                                style={{
                                    width : '290px', 
                                    height : '180px', 
                                    backgroundPositionX : o.x,
                                    backgroundPositionY : o.y
                                }}
                            >
                            </div>
                })}
            </div>
        </div>
    )
}
export default MainPage;