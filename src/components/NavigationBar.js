import { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

const NavigationBar = (props)=>{
    const {ownCocktails=[]} = props;
    console.log('NavigationBar: ', props);
    
    const categories  = useRouteLoaderData('root');        
    const [selected, setSelected] = useState(null);   

    const categoriesList = categories.map(item=><li key={item} onClick={()=>setSelected(item)}>
        <Link to="/" state={{category:item, ownCocktails}}>{item}</Link>        
    </li>);

    return (
        <>
            <nav>
                <ul>
                    {categoriesList}
                </ul>
            </nav>     
        </>
    )
};

export default NavigationBar;