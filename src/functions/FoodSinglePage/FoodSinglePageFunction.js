function useSingleKit(){
    function nutrition_calculate(base_nutrition_info_list, setNutrition_info_list){
        let gram = Number(document.querySelector('.gram').value);
        let copy_base_nutrition_info_list = {...base_nutrition_info_list};
        let objectKey = Object.keys(copy_base_nutrition_info_list);
        let key = '';
        for(let i = 3; i < objectKey.length; i++){
            key = objectKey[i]
            if(copy_base_nutrition_info_list[key] != undefined){
                copy_base_nutrition_info_list[key] = (copy_base_nutrition_info_list[key] * (gram * 0.01)).toFixed(2);
            }
        }
        setNutrition_info_list(copy_base_nutrition_info_list);
    }
    function sessionStorage_add_resultList(nutrition_info_list){
        let gramNum = Number(document.querySelector('.gram').value);
        if(gramNum == 0){
            gramNum = 100;
        }
        let getResult = JSON.parse(sessionStorage.getItem('resultlist'))
        let addResult = {...nutrition_info_list, gram : gramNum};
        let result = '';
        if(getResult == []){
            result = [addResult]
        } else {
            result = [addResult, ...getResult]
        }
        let resultList = JSON.stringify(result)
        sessionStorage.setItem('resultlist', resultList)
    }
    function localStorage_add_singlePage(idx, list){
        if(list[0] != undefined){
            const menuArr = {
                FOOD_NM_KR : list[idx].FOOD_NM_KR,
                MAKER_NM : list[idx].MAKER_NM,
                Z10500 : list[idx].Z10500,
                AMT_NUM1 : list[idx].AMT_NUM1,
                AMT_NUM2 : list[idx].AMT_NUM2,
                AMT_NUM3 : list[idx].AMT_NUM3,
                AMT_NUM4 : list[idx].AMT_NUM4,
                AMT_NUM5 : list[idx].AMT_NUM5,
                AMT_NUM6 : list[idx].AMT_NUM6,
                AMT_NUM7 : list[idx].AMT_NUM7,
                AMT_NUM8 : list[idx].AMT_NUM8,
                AMT_NUM9 : list[idx].AMT_NUM9,
            }
            const jsonMenuArr = JSON.stringify(menuArr);
            localStorage.setItem('singlepage', jsonMenuArr);
        }
    }

    // singlePage용 영양성분별 라운드 그래프 영역표시 css만들기 + 추가로 getNutritionInfo 파라미터에 'user' 또는 'now' 입력 시 user, now 영양소 데이터 출력
    function single_round_graph(target, now_nutrition, getNutritionInfo = ''){
        const user_kcal = JSON.parse(sessionStorage.getItem('userInfo')).kcal;
        const user_weight = JSON.parse(sessionStorage.getItem('userInfo')).weight;
        console.log('user_kcal = ' + user_kcal)
        console.log('user_weight = ' + user_weight)
        console.log('target = ' + target)
        console.log('now_nutrition = ' + now_nutrition)
        let result_nutrition = '';
        if(sessionStorage.getItem('result_nutrition_list') == undefined){
            result_nutrition = 0;
        } else {
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
                console.log(carb, protein, fat, add_target)
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
        console.log('user_nutrition =' + user_nutrition)

        const round_graph_calculation = function(add_user_nutrition, add_now_nutrition){
            let result_percent = (add_now_nutrition / add_user_nutrition * 100).toFixed(0);
            return result_percent
        }
        const now_nutrition_percent = Number(round_graph_calculation(user_nutrition, now_nutrition));
        const result_nutrition_percent = Number(round_graph_calculation(user_nutrition, result_nutrition));

        const round_graph_area = function(result_percent, now_percent){
            return(
                `conic-gradient( 
                    red 0% ${result_percent}%,
                    #26BDE2 ${result_percent}% ${result_percent + now_percent}%,
                    gray ${result_percent + now_percent}% 100%
                )`
            )
        }
        console.log('round_graph_area =' + round_graph_area(result_nutrition_percent, now_nutrition_percent))
        if(getNutritionInfo == 'user'){
            return user_nutrition
        } 
        else if(getNutritionInfo == 'now'){
            return (Number(result_nutrition) + Number(now_nutrition)).toFixed(0)
        }
        else if(getNutritionInfo == ''){
            return round_graph_area(result_nutrition_percent, now_nutrition_percent);  
        }
    }
    return{
        nutrition_calculate,
        sessionStorage_add_resultList,
        localStorage_add_singlePage,
        single_round_graph
    }
}
export default useSingleKit;