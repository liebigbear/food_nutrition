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
    // FoodGraph 표 헤더 컴포넌트
    function FoodGraph_Header(props){
        // 컴포넌트 사용시 파라미터 안에 항목들을 array형식으로 받아 반복문으로 td 형성 
        const FoodGraph_Header_contents = props.FoodGraph_Header_contents;
        return(
            <tr id="graph_line">
                {
                FoodGraph_Header_contents.map((o, i)=>{
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
        let modify_arr = [...state];
        modify_arr.splice(idx, 1);
        storage_type.setItem(storageItem, JSON.stringify(modify_arr));
        setState(modify_arr)
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

    return{
        Loading,
        FoodGraph_Header,
        storage_delete_box,
        Alert,
        click_alert
    }
}
export default usePublickit;