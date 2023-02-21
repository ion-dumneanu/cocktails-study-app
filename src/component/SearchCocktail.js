
import {useEffect, useState} from 'react';

const SearchCocktail = ({ownCocktails, category, setCategory, handleViewCocktail, handleAddCocktail})=>{
 
    const [data, setData] = useState([]);
    const[search, setSearch] = useState(null);

    useEffect(() => {

        if(search){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(resp => resp.json())
            .then(json => {
                setData(
                    [ ...json['drinks'], ...ownCocktails.filter(item=>item.strDrink.includes(search))]
                    );                    
                setCategory(null);    
            });    
        } else {
            setData([]);
        }

    }, [search]);      

    useEffect(() => {

        if(category){

            console.log(ownCocktails)

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
            .then(resp => resp.json())
            .then(json => {
                setData( 
                    [ ...json['drinks'], ...ownCocktails.filter(item=>item.strCategory===category)]
                );
                setSearch(null);
            });    
        }else {
            setData([]);
        }

    }, [category]);
      
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