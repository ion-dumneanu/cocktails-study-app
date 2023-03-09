import {useEffect, useState} from 'react';


import SearchCocktail from './SearchCocktail';
import ViewCocktail from './ViewCocktail';
import AddCocktail from './AddCocktail';

function Home() {
  
  const [categories, setCategories] = useState([]);
  const [ownCocktails, setOwnCocktails] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const [main, setMain] = useState('search');

  useEffect(()=>{    
    
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(resp => resp.json())
        .then(json => setCategories(json['drinks'].map(item=>item.strCategory))); 
    
  },[]);

  const handleCategoryClick = (selection)=>{

      if(selectedCategory===selection){
        setSelectedCategory(null); 
        return;
      }
      setSelectedCategory(selection);
  }

  // const categoriesList = categories.map(item=><li key={item} onClick={()=>handleCategoryClick(item)}
  //                                               className={item===selectedCategory && 'selected'}      >{item}</li>);
  
  const mainComponent = main === 'search' ?
                              <SearchCocktail ownCocktails={ownCocktails} category={selectedCategory} unSetCategory={()=>setSelectedCategory(null)} 
                                  handleViewCocktail={(item)=>{setSelectedCocktail(item);setMain('view')}} 
                                  handleAddCocktail={(item)=>setMain('add')} />
                              :(main==='add' ? 
                                  <AddCocktail categories={categories} handleBack={()=>setMain('search')} 
                                      handleAdd={(item)=>{setOwnCocktails([...ownCocktails, item]);setMain('search')}}/> 
                                  : <ViewCocktail cocktail={selectedCocktail} handleBack={()=>setMain('search')}/>)
                  ;

  return (
    <>
       {mainComponent}
    </>
  );
}

export default Home;