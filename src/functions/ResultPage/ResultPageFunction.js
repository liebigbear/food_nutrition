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

    function result_correction(gram, o, resultList, on, setOn){
        if(gram.nodeName == 'SPAN'){
            let gram_value = gram.textContent;
            let gram_input = document.createElement('input')
            gram_input.value = gram_value
            gram_input.classList.add('result_gram')
            // 기준값용 object deepCopy
            let copy_obj = {...o};
            // key값 추출
            let obj_keys = Object.keys(o);
            gram_input.addEventListener('input', function(e){
                let input_value = e.target.value;
                obj_keys.map((key)=>{
                    if(!isNaN(o[key])){
                        o[key] = nutrition_calculate(copy_obj[key], gram_value, input_value);
                    }
                })
                setOn(on => on + 1);
            })

            gram.parentNode.replaceChild(gram_input, gram)
        } else if(gram.nodeName == 'INPUT'){
            let gram_value = gram.value;
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
    
                gram.parentNode.replaceChild(gram_span, gram);
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