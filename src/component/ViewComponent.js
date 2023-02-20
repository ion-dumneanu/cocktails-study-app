
import {useEffect, useState} from 'react';

const ViewComponent = ({cocktail})=>{
      
    return (
        <>
            <figure>
                <figcaption>{cocktail.strDrink}</figcaption>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} height="600" width="500" />
            </figure>
            {/* <input type="button" value="Back" onClick={()=>this.props.onBack()}/> */}
        </>
    )
}

export default ViewComponent;