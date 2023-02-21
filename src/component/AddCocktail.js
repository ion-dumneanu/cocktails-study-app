
import {useState} from 'react';

const AddCocktail = ({categories, handleBack, handleAdd})=>{
     
    const [newCocktail, setNewCocktail] = useState({});


    const handleChange = event => {
        if(event.target.name === 'strDrinkThumb'){
            setNewCocktail({...newCocktail, [event.target.name]: window.URL.createObjectURL(event.target.files[0]) });  
            return;      
        }

        setNewCocktail({...newCocktail, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault(); 
        handleAdd({...newCocktail, idDrink: [...Object.values(newCocktail), new Date().getTime()].join('')});
    };

    return (
        <>
            <form onSubmit={handleSubmit} method="post" id="addCocktailForm">
                <input type="text" name="strDrink" required value={newCocktail.strDrink} onChange={handleChange} />
                <input type="text" name="strIngredient1" required value={newCocktail.strIngredient1} onChange={handleChange} />
                <input type="text" name="strIngredient2" required value={newCocktail.strIngredient2} onChange={handleChange} />

                <label htmlFor="categories">Choose a category:</label>
                <select name="strCategory" id="categories" form="addCocktailForm" onChange={handleChange}>
                    {
                        categories.map(item=><option key={item} value={newCocktail.strCategory}>{item}</option>)
                    }
                </select>
                <input type="file" name="strDrinkThumb" required onChange={handleChange} />
                {/* <input type="file" name="strDrinkThumb" required value={this.state['strDstrDrinkThumbrink']} onChange={this.handleChange} />         */}


                <input type="button" value="Back" onClick={handleBack}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default AddCocktail;