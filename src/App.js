import {useEffect, useState} from 'react';

import './App.css';
import SearchCocktail from './component/SearchCocktail';
import ViewCocktail from './component/ViewCocktail';
import AddCocktail from './component/AddCocktail';

function App() {
  
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

  const categoriesList = categories.map(item=><li key={item} onClick={()=>handleCategoryClick(item)}
                                                className={item===selectedCategory && 'selected'}      >{item}</li>);
  
  const mainComponent = main === 'search' ?
                              <SearchCocktail ownCocktails={ownCocktails} category={selectedCategory} setCategory={setSelectedCategory} 
                                  handleViewCocktail={(item)=>{setSelectedCocktail(item);setMain('view')}} 
                                  handleAddCocktail={(item)=>setMain('add')} />
                              :(main==='add' ? 
                                  <AddCocktail categories={categories} handleBack={()=>setMain('search')} 
                                      handleAdd={(item)=>{setOwnCocktails([...ownCocktails, item]);setMain('search')}}/> 
                                  : <ViewCocktail cocktail={selectedCocktail} handleBack={()=>setMain('search')}/>)
                  ;

  return (
    <>
      <header>
        <h1>Cocktails</h1>
      </header>
      <nav>
        <ul className='nav'>
          {categoriesList}
        </ul>
      </nav>
      <main>
        {mainComponent}
      </main>
      <footer>
        <h4>Footer</h4>
      </footer>
    </>
  );
}

export default App;