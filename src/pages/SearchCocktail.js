
import {useEffect, useState} from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';

const SearchCocktail = (props)=>{
    console.info('SearchCocktail >>>>')
    
    const location = useLocation();
    console.log('location:', location);
    console.log('props:', props);


    const {category, ownCocktails=[]}  =  location?.state;        

    // const category  =  location?.state?.category;        
    // const ownCocktails = location?.state?.ownCocktails || [];

    const {unSetCategory, handleViewCocktail, handleAddCocktail} = props;

    const [data, setData] = useState([]);
    const[search, setSearch] = useState(null);

    useEffect(() => {
              
        if(search ){

            const ownCocktailsFilteredBySearch = ownCocktails.filter(item=>item.strDrink.includes(search));

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(resp => resp.json())
            .then(json => {
                setData(
                    [ ...(json.drinks || []) , ...ownCocktailsFilteredBySearch]
                    );                    
            });    
            
            return;
        }

    }, [search]);   
          
    useEffect(() => {

        if(category){
            setSearch(null);

            const ownCocktailsFilteredByCategory = ownCocktails.filter(item=>item.strCategory===category);

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
            .then(resp => resp.json())
            .then(json => {
                setData(
                    [ ...(json.drinks || []), ...ownCocktailsFilteredByCategory]
                );
            });    
            
            return;
        }

    }, [category]);   



    const resultRender = data.map(item =>
        <Link to="/view" state={{...item}} >
            <figure key={item.idDrink} 
            // onClick={()=>handleViewCocktail(item)}
            >
                <img src={item.strDrinkThumb} alt={item.strDrink} height="130" width="130" />
                <figcaption >{item.strDrink}</figcaption>
            </figure>
        </Link>
    );

    return (
        <>
            <section>
                <input value={search || ''} 
                onChange={({target:{value}})=>setSearch(value)}
                className='search-widget' placeholder='Search here' 
                />
            </section>
            <section><h3 className='categorySelectedLabel'>-------------------    {category || 'No category'}    -------------------</h3></section>
            <section>
                <div className='search-result'>
                    {resultRender}
                </div>
            </section>
            <section> 
                <div className='add-cocktail'>
                    <Link to="/add">
                        <button>Add Cocktail</button>    
                    </Link> 
                </div>
            </section>
        </>
    )
}



export default SearchCocktail;
