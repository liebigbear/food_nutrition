function usePublickit(){
    // 데이터 받아올때 로딩창
    function Loading(){
        return(
        <div style={{
            width : '100%',
            height : '100%',
            display : 'block',
            position : 'absolute',
            top : '0',
            left : '0'
        }}>
            <div style={{
            width : '300px', 
            height : '100px', 
            fontWeight : 'bold', 
            background : 'white',
            border : 'solid 1px #000',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            position : 'fixed', 
            top : '50%',
            left : '50%',
            transform : 'translate(-50%, -50%)'
            }}>로딩중입니다.</div>
        </div>
        )
    }
    // FoodGraph 표 헤더(spread 연산자로 헤더에 표시할 내용들 추가)
    function foodGraph_Header(...arr){
        return(
            <tr className="graph_line">
                {
                arr.map((o, i)=>{
                    return(
                        <td key={i}>{o}</td>
                    )
                })
                }
            </tr>
        )
    }
    // local, session storage 안에 담긴 데이터로 만든 html표 항목 삭제 기능
    function storage_delete_box(state, setState, idx, storageItem, storage_type){
        let result_gram = document.querySelectorAll('.result_gram');
        let ready = true;
        result_gram.forEach((o)=>{
            if(o.nodeName == 'INPUT'){
                alert('수정을 완료해주세요.')
                ready = false;
            }
        })
        if(ready == true){
            let modify_arr = [...state];
            modify_arr.splice(idx, 1);
            storage_type.setItem(storageItem, JSON.stringify(modify_arr));
            setState(modify_arr)
        }
    };

    // 결정시 저장되었다는 alert 띄우기
    function Alert(props){
        let text = props.text
        return(
            <div className="single_hide_alert hide"><p>{text}</p></div>
        )
    }
    function click_alert(){
        let alert_class = document.querySelector('.single_hide_alert');
        document.querySelector('.single_hide_alert').style.visibility = 'visible';
        alert_class.classList.replace('hide', 'show');
        setTimeout(()=>{
            alert_class.classList.replace('show', 'hide');
        }, 1000);
        setTimeout(()=>{
            document.querySelector('.single_hide_alert').style.visibility = 'hidden';
        }, 1500);
    }

    // 5대 영양성분 평가 프로그램(한끼 == true, 하루 == false)
    function meal_evaluation(value, nutri, meal = false){
        let nutrition = Number(nutri)
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if(meal == true){
            meal = userInfo.meal;
        } else {
            meal = 1;
        }
        Object.keys(userInfo).forEach((i)=>{
            userInfo[i] = Number(userInfo[i])
        })
        // 칼로리
        if(value == "AMT_NUM1"){
            let kcal = userInfo.kcal / meal;
            let plus = calculate(kcal, 'plus');
            let minus = calculate(kcal, 'minus');
            return nutrition_reader(plus, nutrition, minus)
        }
        // 탄수화물(칼로리의 55%, 1g == 4kcal)
        if(value == "AMT_NUM2"){
            let carb = userInfo.kcal / meal * 0.55 / 4;
            let plus = calculate(carb, 'plus');
            let minus = calculate(carb, 'minus');
            return nutrition_reader(plus, nutrition, minus)
        }
        // 단백질(몸무게의 0.8g)
        if(value == "AMT_NUM3"){
            let protein = userInfo.weight / meal * 0.8;
            let plus = calculate(protein, 'plus');
            let minus = calculate(protein, 'minus');
            return nutrition_reader(plus, nutrition, minus)
        }
        // 지방(칼로리의 28%, 1g == 9kcal)
        if(value == "AMT_NUM4"){
            let fat = userInfo.kcal / meal * 0.28 / 9;
            let plus = calculate(fat, 'plus');
            let minus = calculate(fat, 'minus');
            return nutrition_reader(plus, nutrition, minus)
        }
        // 당(칼로리의 10%, 1g == 4kcal)
        // if(value == "AMT_NUM5"){
        //     let sugar = userInfo.kcal / meal * 0.1 / 4;
        //     let plus = calculate(sugar, 'plus');
        //     let minus = calculate(sugar, 'minus');
        //     return nutrition_reader(plus, nutrition, minus)
        // }
        // 나트륨(2300g이 표준)
        // if(value == "AMT_NUM6"){
        //     let sodium = 2300;
        //     let plus = calculate(sodium, 'plus');
        //     let minus = calculate(sodium, 'minus');
        //     return nutrition_reader(plus, nutrition, minus)
        // }

        // 5대 영양성분 평가 프로그램_편차 계산기
        function calculate(target, formula){
            let deviation = (target * 0.2)
            if(formula == 'plus'){
                return (target + deviation).toFixed(0)
            }
            if(formula == 'minus'){
                return (target - deviation).toFixed(0)
            }
        }
        // 5대 영양성분 평가 프로그램_영양성분 판독기
        function nutrition_reader(plus, nutrition, minus){
            if(minus <= nutrition && nutrition <= plus){
                return(
                    <div>
                        <span className="nutrition_check good">적절</span>
                        <span className="nutrition_average">기준치 : {minus} ~ {plus}</span>
                    </div>
                )
            } else if(nutrition < minus){
                return(
                    <div>
                        <span className="nutrition_check lack">부족</span>
                        <span className="nutrition_average">기준치 : {minus} ~ {plus}</span>
                    </div>
                )
            } else if(nutrition > plus){
                return(
                    <div>
                        <span className="nutrition_check over">넉넉</span>
                        <span className="nutrition_average">기준치 : {minus} ~ {plus}</span>
                    </div>
                )
            }
        }
    }
    function round_graph(target, type='storage'){
        const user_kcal = JSON.parse(sessionStorage.getItem('userInfo')).kcal;
        const user_weight = JSON.parse(sessionStorage.getItem('userInfo')).weight;
        let result_nutrition = '';
        console.log(target, type)
        if(type != 'storage'){
            result_nutrition = type;
        } 
        else {
            if(target == 'kcal'){
                result_nutrition = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM1;
            }
            else if(target == 'carb'){
                result_nutrition = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM2;
            }
            else if(target == 'protein'){
                result_nutrition = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM3;
            }
            else if(target == 'fat'){
                result_nutrition = JSON.parse(sessionStorage.getItem('result_nutrition_list')).AMT_NUM4;
            }
        }
       
        const base_user_nutrition_info = function(add_user_kcal, add_user_weight, add_target){
            if(add_user_kcal != undefined && add_user_weight != undefined){
                let kcal = add_user_kcal;
                let weight = add_user_weight;
    
                let carb = (kcal * 0.55 / 4).toFixed(0);
                let protein = (weight * 0.8).toFixed(0);
                let fat = (kcal * 0.28 / 9).toFixed(0);
                if(add_target == 'kcal'){
                    return Number(kcal)
                }
                else if(add_target == 'carb'){
                    return Number(carb)
                }
                else if(add_target == 'protein'){
                    return Number(protein)
                }
                else if(add_target == 'fat'){
                    return Number(fat)
                }
            }
        }
        const user_nutrition = base_user_nutrition_info(user_kcal, user_weight, target);

        const round_graph_calculation = function(add_user_nutrition, add_now_nutrition){
            let result_percent = (add_now_nutrition / add_user_nutrition * 100).toFixed(0);
            return result_percent
        }
        const result_nutrition_percent = Number(round_graph_calculation(user_nutrition, result_nutrition));
        const round_graph_area = function(result_percent){
            return(
                `conic-gradient( 
                    #26BDE2 0% ${result_percent}%,
                    gray ${result_percent}% 100%
                )`
            )
        }
        console.log(round_graph_area(result_nutrition_percent))
        return round_graph_area(result_nutrition_percent);
    }

    return{
        Loading,
        foodGraph_Header,
        storage_delete_box,
        Alert,
        click_alert,
        meal_evaluation,
        round_graph
    }
}
export default usePublickit;