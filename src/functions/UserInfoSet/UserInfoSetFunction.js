import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useUserSetKit(){
    const navigate = useNavigate();
    function infoList(sexC, ageC, statureC, weightC, mealC, kcalC, standardC, on, setOn, move = false){
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
            let result = '';
            if(info_list.standard == true){
                result = {
                    sex : info_list.sex,
                    age : info_list.age,
                    stature : info_list.stature,
                    weight : info_list.weight,
                    meal :info_list.meal,
                    kcal : kcal_calculator(info_list.sex, info_list.stature),
                    standard : info_list.standard
                }
            } else {
                result = {
                    sex : info_list.sex,
                    age : info_list.age,
                    stature : info_list.stature,
                    weight : info_list.weight,
                    meal :info_list.meal,
                    kcal : info_list.kcal,
                    standard : info_list.standard
                }
            }
            
            sessionStorage.setItem('userInfo', JSON.stringify(result))
            sessionStorage.setItem('user_img_url', document.querySelector('.user_img').src);
            setOn(on => on + 1)
            alert('정보가 저장되었습니다.') 
            if(move){
                navigate('/FoodInfo/Graph')
            }
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
                sessionStorage.setItem('user_img_url', document.querySelector('.user_img').src);
                setOn(on => on + 1)
                alert('정보가 저장되었습니다.') 
                if(move){
                    navigate('/FoodInfo/Graph')
                }
        } 
        else {
            alert('정보입력을 완성해주세요.');
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

    function getImage(event){
        let preview = new FileReader();
        preview.addEventListener('load', function(e){
            const img = document.querySelectorAll('.user_img');
            img.forEach((o)=>{
                o.src = e.target.result;
            })
        });
        if(event.target.files[0] != undefined){
            preview.readAsDataURL(event.target.files[0]);
        }
    }
  

    return{
        infoList,
        hide_kcalInput,
        getImage
    }
}
export default useUserSetKit;