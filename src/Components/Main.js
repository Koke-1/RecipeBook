import React,{useEffect,useState} from 'react'
import IntroBottom from './IntroBottom';
import IntroTop from './IntroTop';
import Recipe from './Recipe'

function Main() {
    const [ingredient, setingredient] = useState("");
    const [recipes, setrecipes] = useState([]);
    const [recipe, setrecipe] = useState({
        food:[],
        instructions:[],
    })

    const search = async(e) =>{
      e.preventDefault()
      setrecipes([])
      await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=da3aadf284ce4f4a8e38a59131107bf4`,{
        method:"GET"
     })
     .then(data => data.json())
     .then(data => setrecipes(data) )
     .catch(error =>console.log(error)) 
    }

    const craving = async(id,food) =>{
      await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=da3aadf284ce4f4a8e38a59131107bf4`,{
        method:"GET"
     })
     .then(data => data.json())
     .then(data => setrecipe({
      recipe: {
        food:food,
        instructions: data
      }
     }))
    } 
  return (
    
    <>
    {!recipe.food ?

    <Recipe how={{recipe,setrecipe}} />
    : 
    <>
    <IntroTop/>
    <div className='Intro' >
      <div className='Quote'>
       <h1>What Are You Feeling?</h1> 
      </div>
     <form onSubmit={(e)=>search(e)} >
        <input placeholder='Add , between multiple ingredients. ' type="text" onChange={(e)=>{setingredient(e.currentTarget.value)}}  />
    </form>
    {
      recipes.length > 0 && 
      <div className='Recipes' >
        {
          recipes.map((data,index,array)=>{
            return(
            <div key={data.id} onClick={()=>craving(data.id,data)} >
              <h2>{data.title}</h2>
              <img src={data.image} alt="" />
            </div>
            )
            
          })
        }
      </div> 
    }
    </div>
    <IntroBottom/>
    </>
    }
    
    </>
  )
}

export default Main