
import {useState} from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

import './Add.css';

const AddCocktail = (props)=>{
    console.info('AddCocktail>>>>', props);
        
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);

    const categories  = useRouteLoaderData('root');
    const [newCocktail, setNewCocktail] = useState({});

    const handleInputChange = event => {
        if(event.target.name === 'strDrinkThumb'){
            setNewCocktail({...newCocktail, [event.target.name]: window.URL.createObjectURL(event.target.files[0]) });  
            return;      
        }

        setNewCocktail({...newCocktail, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault(); 
        const newCocktailWithId = {...newCocktail, idDrink: [...Object.values(newCocktail), new Date().getTime()].join('')};
        console.log('submit: ', newCocktailWithId);
        navigate("/", {state:{newCocktail:newCocktailWithId}});
    };

    const categoriesOptionsToRender = categories.map(item=><option key={item} value={newCocktail.strCategory}>{item}</option>);

    return (
        <form onSubmit={handleSubmit} method="post" id="addCocktailForm">
            <article className='addcocktail'>
                    <div>
                        <input type="file" name="strDrinkThumb" required onChange={handleInputChange} />
                    </div>
                    <div>
                        <ul>
                            <li>
                                <input type="text" name="strDrink" placeholder='name' required value={newCocktail.strDrink} onChange={handleInputChange} />
                            </li>                            
                            <li>
                                <input type="text" name="strIngredient1" placeholder='1st ingredient' required value={newCocktail.strIngredient1} onChange={handleInputChange} />
                            </li>
                            <li>
                                <input type="text" name="strIngredient2" placeholder='2nd ingredient' required value={newCocktail.strIngredient2} onChange={handleInputChange} />
                            </li>
                            <li>
                                <select name="strCategory" form="addCocktailForm" onChange={handleInputChange}>
                                    <option value="" disabled selected hidden>Select category ...</option>
                                    {categoriesOptionsToRender}
                                </select>
                            </li>

                            <li>
                                <input type="button" value="Back"  onClick={handleBack}/>
                                <input type="submit" value="Submit"/>
                            </li>
                            </ul>
                    </div>
            </article>
        </form>
    )
}

export default AddCocktail;