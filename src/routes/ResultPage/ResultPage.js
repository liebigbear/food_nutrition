function ResultPage(){
    const resultList = JSON.parse(sessionStorage.getItem('resultlist'))
    console.log(resultList)
    return(
        <div className="wrap">
            <div>결과창</div>
            <table>
                <tbody>
                    {
                    resultList.map((o, i)=>{
                        return(
                        <tr key={i}>
                            <td>{o.FOOD_NM_KR}</td>
                            <td>{o.AMT_NUM1}</td>
                            <td>{o.AMT_NUM2}</td>
                            <td>{o.AMT_NUM3}</td>
                            <td>{o.AMT_NUM4}</td>
                            <td>{o.AMT_NUM5}</td>
                            <td>{o.AMT_NUM6}</td>
                            <td>{o.AMT_NUM7}</td>
                            <td>{o.AMT_NUM8}</td>
                            <td>{o.AMT_NUM9}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ResultPage;