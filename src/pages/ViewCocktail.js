
import { useLocation, useNavigate } from 'react-router-dom';

const ViewCocktail = (props)=>{
    console.info('ViewCocktail >>>>', props);

    const navigate = useNavigate();
    const handleBack = () => navigate(-1);

    const location = useLocation();
    const {strDrink, strDrinkThumb} = location.state;

    return (
        <section className='view'>
            <figure>
                <figcaption>{strDrink}</figcaption>
                <img src={strDrinkThumb} alt={strDrink} height="600" width="500" />
            </figure>
            <button onClick={handleBack}>Back</button>
        </section>
    )
}

export default ViewCocktail;