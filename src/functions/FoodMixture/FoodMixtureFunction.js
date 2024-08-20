function useMixtureKit(){
    function delete_box(foodMixture, setFoodMixture, idx){
        let modify_arr = [...foodMixture];
        modify_arr.splice(idx, 1);
        localStorage.setItem('foodMixture', JSON.stringify(modify_arr));
        setFoodMixture(modify_arr)
    };
    return{
        delete_box,

    }
}
export default useMixtureKit;