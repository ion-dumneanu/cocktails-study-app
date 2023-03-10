import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const Root = ()=>{   
    console.info('Root >>>') 
    const location = useLocation();
    console.log(location);    
    const {newCocktail} = location.state || {};

    const [ownCocktails, setOwnCocktails]=useState([]);

    useEffect(() => {
              
        if(newCocktail ){
            setOwnCocktails([...ownCocktails, newCocktail])
            return;
        }

    }, [newCocktail]);  

    return (
        <>
           <NavigationBar ownCocktails={ownCocktails}/>
           <Outlet/> 
        </>
    )
};

export default Root;