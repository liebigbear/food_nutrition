function useResultkit(){
    function result_nutrition(value, resultList){
        let result = 0;
        resultList.map((o, i)=>{
            if(o[value] != ''){
                result = result + Number(o[value])
            }
        })
        return result.toFixed(0);
    }

    function localStorage_add_foodMixture(resultList){
        let getItem = JSON.parse(localStorage.getItem('foodMixture'));
        getItem.push(resultList);
        localStorage.setItem('foodMixture', JSON.stringify(getItem))
    }

    // 영양성분 평가 프로그램(한끼 == true, 하루 == false)
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
        if(value == "AMT_NUM5"){
            let sugar = userInfo.kcal / meal * 0.1 / 4;
            let plus = calculate(sugar, 'plus');
            let minus = calculate(sugar, 'minus');
            return nutrition_reader(plus, nutrition, minus)
        }
        // 나트륨(2300g이 표준)
        if(value == "AMT_NUM6"){
            let sodium = 2300;
            let plus = calculate(sodium, 'plus');
            let minus = calculate(sodium, 'minus');
            return nutrition_reader(plus, nutrition, minus)
        }

        // 편차 계산기
        function calculate(target, formula){
            let deviation = (target * 0.2)
            if(formula == 'plus'){
                return (target + deviation).toFixed(0)
            }
            if(formula == 'minus'){
                return (target - deviation).toFixed(0)
            }
        }
        // 영양성분 판독기
        function nutrition_reader(plus, nutrition, minus){
            if(minus < nutrition && nutrition < plus){
                return(
                    <div>
                        <span className="nutrition_check good">적절해요!</span>
                        <span className="nutrition_average">기준치 : {minus} ~ {plus}</span>
                    </div>
                )
            } else if(nutrition < minus){
                return(
                    <div>
                        <span className="nutrition_check lack">부족해요..</span>
                        <span className="nutrition_average">기준치 : {minus} ~ {plus}</span>
                    </div>
                )
            } else if(nutrition > plus){
                return(
                    <div>
                        <span className="nutrition_check over">과해요!</span>
                        <span className="nutrition_average">기준치 : {minus} ~ {plus}</span>
                    </div>
                )
            }
        }
    }
    return{
        result_nutrition,
        localStorage_add_foodMixture,
        meal_evaluation
    }
}
export default useResultkit;