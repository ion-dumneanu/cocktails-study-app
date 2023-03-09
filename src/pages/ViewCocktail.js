
import { useLocation, useNavigate } from 'react-router-dom';

const ViewCocktail = (props)=>{
    console.info('ViewCocktails >>>>', props);

    const navigate = useNavigate();
    const handleBack = () => navigate(-1);

    const location = useLocation();
    const {strDrink, strDrinkThumb} = location.state;

    return (
        <>
            <figure>
                <figcaption>{strDrink}</figcaption>
                <img src={strDrinkThumb} alt={strDrink} height="600" width="500" />
            </figure>
            <button onClick={handleBack}>Back</button>
        </>
    )
}

export default ViewCocktail;