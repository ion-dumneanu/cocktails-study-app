
import {useEffect, useState} from 'react';

const SearchCocktail = (props)=>{
 
    const {ownCocktails, category, setCategory, handleViewCocktail, handleAddCocktail} = props;

    console.log("init props category ", props.category)


    const [data, setData] = useState([]);
    const[search, setSearch] = useState(null);

    useEffect(() => {
         
        if(search){

            const ownCocktailsFilteredBySearch = ownCocktails.filter(item=>item.strDrink.includes(search));

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(resp => resp.json())
            .then(json => {
                setData(
                    [ ...json['drinks'], ...ownCocktailsFilteredBySearch]
                    );                    
                setCategory(null);    
            });    
            
            return;
        } 

        if(category){

            const ownCocktailsFilteredByCategory = ownCocktails.filter(item=>item.strCategory===category);

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
            .then(resp => resp.json())
            .then(json => {
                setData( 
                    [ ...json['drinks'], ...ownCocktailsFilteredByCategory]
                );
                setSearch(null);
            });    
            
            return;
        }

        setData([]);

    }, [category, search]);    
    
    // useEffect(() => {
    //     console.log("use effect category ", props.category)
        
    //     if(props.category){

    //         const ownCocktailsFilteredByCategory = ownCocktails.filter(item=>item.strCategory===props.category);

    //         fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${props.category.replaceAll(' ', '_')}`)
    //         .then(resp => resp.json())
    //         .then(json => {
    //             setData( 
    //                 [ ...json['drinks'], ...ownCocktailsFilteredByCategory]
    //             );
    //             setSearch(null);
    //         });    
            
    //         return;
    //     }

    // }, [props.category]);    
    
    // useEffect(() => {
         
    //     if(search){

    //         const ownCocktailsFilteredBySearch = ownCocktails.filter(item=>item.strDrink.includes(search));

    //         fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    //         .then(resp => resp.json())
    //         .then(json => {
    //             setData(
    //                 [ ...json['drinks'], ...ownCocktailsFilteredBySearch]
    //                 );                    
    //             setCategory(null);    
    //         });    
            
    //         return;
    //     } 

    //     // if(category){

    //     //     const ownCocktailsFilteredByCategory = ownCocktails.filter(item=>item.strCategory===category);

    //     //     fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
    //     //     .then(resp => resp.json())
    //     //     .then(json => {
    //     //         setData( 
    //     //             [ ...json['drinks'], ...ownCocktailsFilteredByCategory]
    //     //         );
    //     //         setSearch(null);
    //     //     });    
            
    //     //     return;
    //     // }

    //     // console.log("set empty data")   
    //     // setData([]);

    // }, [category, search]);    
    

    
      
    const resultRender = data.map(item =>
        <figure key={item.idDrink} onClick={()=>handleViewCocktail(item)}>
            <img src={item.strDrinkThumb} alt={item.strDrink} height="130" width="130" />
            <figcaption>{item.strDrink}</figcaption>
        </figure>
    );

    return (
        <>
            <section>
            <input value={search || ''} onChange={({target:{value}})=>{setSearch(value);setCategory(null);}}/>
            </section>
            <section>{category || 'No category'}</section>
            <section>
                {resultRender}
            </section>
            <section>
                <input type="button" value="Add Cocktail" onClick={handleAddCocktail}/>
            </section>
        </>
    )
}

export default SearchCocktail;