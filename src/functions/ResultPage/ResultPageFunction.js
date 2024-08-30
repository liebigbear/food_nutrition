import { useState } from "react";

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

    function localStorage_add_foodMixture(resultList, result_nutrition_list){
        let make_Mixture_file = {
            result : resultList,
            result_nutrition : result_nutrition_list
        }
        let getItem = JSON.parse(localStorage.getItem('foodMixture'));
        getItem.push(make_Mixture_file);
        localStorage.setItem('foodMixture', JSON.stringify(getItem))
    }

    function result_correction(gram, idx, o, resultList, on, setOn, event){
        const target_gram = gram[idx];
        let ready = true;
        console.log(gram)
        gram.forEach((o)=>{
            // 1. 먼저 기존 input 값이 있었는지 확인 후 있으면 현재 입력된 값으로 저장하고 span으로 돌리기
            if(o != target_gram && o.nodeName == 'INPUT'){
                if(!isNaN(o.textContent)){
                    let prev_value = o.value;
                    if(prev_value == 0){
                        alert('이전 수정값 설정을 마무리해주세요.\ (값이 1 이상이어야 합니다.)')
                        ready = false;
                    }
                    else if(isNaN(prev_value)){
                        alert('이전 수정값 설정을 마무리해주세요.\ (값에 문자가 없어야 합니다.)')
                        ready = false;
                    }
                    else {
                        let prev_gram_span = document.createElement('span');
                        prev_gram_span.textContent = prev_value;
                        prev_gram_span.classList.add('result_gram');
                        sessionStorage.setItem('resultlist', JSON.stringify(resultList))

                        console.log(o.parentNode)
                        o.parentNode.replaceChild(prev_gram_span, o);
                        // 수정 완료되었으면 main_correction함수 트리거 false로 전환(수정할 이전input가 없는 상황에만 밑에 if문 조건 발동)
                        ready = false;
                        main_correction();
                    }
                }
            }
        })
        if(ready == true){
            main_correction();
        }
        function main_correction(){
            // 메인 correction 이벤트(중복 재사용 함수)
            if(target_gram.nodeName == 'SPAN'){
                let gram_value = target_gram.textContent;
                let gram_input = document.createElement('input');
                gram_input.style.width = '50px';
                gram_input.value = gram_value;
                gram_input.classList.add('result_gram');
                // 기준값용 object deepCopy
                let copy_obj = {...o};
                // key값 추출
                let obj_keys = Object.keys(o);
                gram_input.addEventListener('input', function(e){
                    let input_value = e.target.value;
                    obj_keys.map((key)=>{
                        if(!isNaN(o[key])){
                            if(key != 'MAKER_NM'){
                                o[key] = nutrition_calculate(copy_obj[key], gram_value, input_value);
                            }
                        }
                    })
                    setOn(on => on + 1);
                })
                return target_gram.parentNode.replaceChild(gram_input, target_gram)
            } else if(target_gram.nodeName == 'INPUT'){
                let gram_value = target_gram.value;
                if(gram_value == 0){
                    alert('값이 1 이상이어야 합니다.')
                }
                else if(isNaN(gram_value)){
                    alert('값에 문자가 없어야 합니다.')
                }
                else {
                    let gram_span = document.createElement('span');
                    gram_span.textContent = gram_value;
                    gram_span.classList.add('result_gram');
                    sessionStorage.setItem('resultlist', JSON.stringify(resultList))
        
                    return target_gram.parentNode.replaceChild(gram_span, target_gram);
                }
            }
        }
        

        function nutrition_calculate(target, standard_value, input_value){
            if(!isNaN(Number(input_value))){
                //변경값
                target = Number(target)
                //기준gram
                standard_value = Number(standard_value);
                //변경gram
                input_value = Number(input_value);

                let result = (target * (input_value / standard_value)).toFixed(2)
                return result
            } else {
                return target
            }
        }
    }
    return{
        result_nutrition,
        localStorage_add_foodMixture,
        result_correction
    }
}
export default useResultkit;