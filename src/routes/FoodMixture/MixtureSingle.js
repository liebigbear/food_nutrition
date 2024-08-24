import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function MixtureSingle(){
    const param = useParams();
    const OutletContext = useOutletContext();
    const navigate = useNavigate();
    const mixtureList = OutletContext.mixtureList;
    const idx = Number(param.id);
    const singleMixture = mixtureList[idx];
    return(
        <div>
        {
        singleMixture.map((o, i)=>{
            return(
                <div key={i}>{o.FOOD_NM_KR}</div>
            )
        })
        }
        <button onClick={()=>navigate('/FoodMixture/MixtureList')}>돌아가기</button>
        </div>     
    )
}
export default MixtureSingle;