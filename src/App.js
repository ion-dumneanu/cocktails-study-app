import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';

import './App.css';
import SearchCocktail from './pages/SearchCocktail';
import AddCocktail from './pages/AddCocktail';
import ViewCocktail from './pages/ViewCocktail';

const router = createBrowserRouter(
  [{path: "/",
  element: <Root />,
  id:'root',
  loader: async ({ request, params })=>{
    console.info('request & params');
    console.log(request,'\n', params);
    const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const json = await resp.json();
    return json['drinks'].map(item=>item.strCategory);
  },
  // errorElement: <Error/>,
  children: [
    {path:'/cocktails', element: <SearchCocktail />},
    {path:'/cocktails/add', element: <AddCocktail />},
    {path:'/cocktails/view', element: <ViewCocktail />}
    // {path:'/drink', element: <Drink />},
    // {path:'/drink/:drinkId', element: <DrinkDetails />}
  ]}]
);

function App() {
  return (
    <>
      <header>
        <h1>Cocktails</h1>
      </header>
      <main>
        <RouterProvider router={router}/>
      </main>
      <footer>
        <h4>Footer</h4>
      </footer>

    </>

  );
}

export default App;
