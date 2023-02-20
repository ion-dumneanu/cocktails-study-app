
import {useEffect, useState} from 'react';

const SearchComponent = ({category, setCategory, handleViewCocktail})=>{

    const [data, setData] = useState([]);
    const[search, setSearch] = useState(null);

    useEffect(() => {

        if(search){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(resp => resp.json())
            .then(json => {
                setData(json['drinks']);
                setCategory(null);    
            });    
        }

    }, [search]);      

    useEffect(() => {

        if(category){

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
            .then(resp => resp.json())
            .then(json => {
                setData(json['drinks']);
                setSearch(null);
            });    
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
        </>
    )
}

export default SearchComponent;