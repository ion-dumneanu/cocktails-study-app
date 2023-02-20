import {useEffect, useState} from 'react';

// import './App.css';
import SearchComponent from './component/SearchComponent';
import ViewComponent from './component/ViewComponent';

function App() {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const [main, setMain] = useState('search');


  useEffect(()=>{    
    
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then(resp => resp.json())
    .then(json => setCategories(json['drinks'].map(item=>item.strCategory))); 

  });

  const categoriesList = categories.map(item=><li key={item} onClick={()=>setSelectedCategory(item)}>{item}</li>);
  
  const mainComponent = main === 'search' ?
                  <SearchComponent category={selectedCategory} setCategory={setSelectedCategory} handleViewCocktail={(item)=>{setSelectedCocktail(item);setMain('view')}} />
                  :
                  <ViewComponent cocktail={selectedCocktail}/>
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
        <p>Footer</p>
      </footer>
    </>
  );
}

export default App;