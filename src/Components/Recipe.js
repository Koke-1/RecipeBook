import React, { useEffect } from 'react'

function Recipe({how}) {

  const {usedIngredients,missedIngredients} = how.recipe.recipe.food
  const {setrecipe} = how
  const back = (e) =>{
    e.preventDefault()
    setrecipe({
        food:[],
        instructions:[],
    })
  }
  
  return (
    <div className='Choosen' >
      <div className='Foods' >
        <div className='Title' >
          <button onClick={(e)=>{back(e)}} >Back</button>
         <h1>{how.recipe.recipe.food.title}</h1> 
        </div>
        
        <div className='Food' >
         <img src={how.recipe.recipe.food.image} alt="" /> 
         <div className='Ingredients' >
          {
            usedIngredients.length < 1  ? 
            <div>{usedIngredients.original}</div>   
            : 
            <>
              {usedIngredients.map((data)=>{
                return (
                  <div>
                  <img className='Original' src={data.image} alt="" />
                  <h4>{data.original}</h4> 
                  </div>
                  
                )
              })}
            </>
          }
          {
            missedIngredients.map((data)=>{
                return (
                  <div>
                   <img className='Original' src={data.image} alt="" />
                   <h4>{data.original}</h4>
                  </div>
                  
                )
              })}
        </div>
        </div>
      </div>
      <div className='Instructions' >
      {
        how.recipe.recipe.instructions[0].steps.map((data)=>{
          return(
            <div className='Instruction' >
            <div className='Step' >
              <h3>{data.number}</h3>
              <p>{data.step}</p>
            </div>
            </div>
          )
        })
      }
      </div>
     
    </div>
  )
}

export default Recipe