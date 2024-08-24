import { useState } from "react";

function useUserKit(){
    const [done, setDone] = useState(false)
    function infoList(sexC, ageC, statureC, weightC, mealC, kcalC, standardC){
        const info_list = {
            sex : document.querySelector('.' + sexC).value,
            age : document.querySelector('.' + ageC).value,
            stature : document.querySelector('.' + statureC).value,
            weight : document.querySelector('.' + weightC).value,
            meal : document.querySelector('.' + mealC).value,
            kcal : document.querySelector('.' + kcalC).value,
            standard : document.querySelector('.' + standardC).checked
        }
    
        if(info_list.sex != '' && info_list.age != '' && info_list.stature != '' && info_list.weight != '' && info_list.meal != '' && info_list.kcal != ''){
            let result = {
                sex : info_list.sex,
                age : info_list.age,
                stature : info_list.stature,
                weight : info_list.weight,
                meal :info_list.meal,
                kcal : info_list.kcal,
                standard : info_list.standard
            }
            sessionStorage.setItem('userInfo', JSON.stringify(result))
            setDone(true);
        }
        else if(info_list.sex != '' && info_list.age != '' && info_list.stature != '' && info_list.weight != '' && info_list.meal != '' && info_list.kcal == '' && info_list.standard == true){
                let result = {
                    sex : info_list.sex,
                    age : info_list.age,
                    stature : info_list.stature,
                    weight : info_list.weight,
                    meal :info_list.meal,
                    kcal : kcal_calculator(info_list.sex, info_list.stature),
                    standard : info_list.standard
                }
                sessionStorage.setItem('userInfo', JSON.stringify(result))
                setDone(true);   
        } else {
            alert('정보입력을 완성해주세요.');
            setDone(false);
        }

        function kcal_calculator(sex, stature){
            let kg = 0;
            let kcal_average = 0;
            let stature_base = (stature * 0.01) ** 2;
            if(sex == '남'){
                kg = (stature_base * 22).toFixed(0);
                kcal_average = kg * 30;
            } 
            else if(sex == '여'){
                kg = (stature_base * 21).toFixed(0);
                kcal_average = kg * 30;
            }
            return kcal_average
        }
    }

    function hide_kcalInput(){
        let standard = document.querySelector('.standard').checked;
        let kcal_wrap = document.querySelector('.kcal_wrap');
        if(standard){
            kcal_wrap.style.display = 'none';
        } else {
            kcal_wrap.style.display = 'inline-block';
        }
    }

    return{
        infoList,
        hide_kcalInput,
        done,
        setDone
    }
}
export default useUserKit;