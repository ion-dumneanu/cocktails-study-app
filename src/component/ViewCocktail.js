
import {useEffect, useState} from 'react';

const ViewCocktail = ({cocktail, handleBack})=>{
      
    return (
        <>
            <figure>
                <figcaption>{cocktail.strDrink}</figcaption>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} height="600" width="500" />
            </figure>
            <input type="button" value="Back" onClick={handleBack}/>
        </>
    )
}

export default ViewCocktail;