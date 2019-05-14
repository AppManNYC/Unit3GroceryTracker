import React, { Component } from 'react'

class RecipeInfo extends Component {
    constructor(props) {
        super(props)
        this.state= {
            searchURL: "https://api.edamam.com/search?q=",
            searchIngredients: "chicken",
            searchOther: "&app_id=9d94e852&app_key=480a66a770af9cbc380a775b8959453c&from=0&to=3",
            searchFullUrl: '',
            recipeResults: [],
            recipesSearched: false
        }
        this.getRecipes = this.getRecipes.bind(this)
        this.hideRecipes = this.hideRecipes.bind(this)
    }
    hideRecipes () {
        this.setState({recipesSearched: false})
    }

    getRecipes() {
  
        // event.preventDefault()
        
    
        this.setState({
          searchFullUrl: this.state.searchURL + this.state.searchIngredients + this.state.searchOther
        }, () => {
          fetch(this.state.searchFullUrl)
          .then(response => {
            return response.json()
          })
            .then((jsondata)=>{
              console.log(jsondata)
              console.log(typeof jsondata)
              let newRecipes = []
              newRecipes.push(jsondata.hits)
              console.log(newRecipes)
              this.setState({
                

                recipeResults: newRecipes,
                recipesSearched: true,
                searchFullUrl: ''
              })
            },(err)=>{
              console.log(err)
            })
            // then takes two call back funcitons one for fulfilled, one for rejected. in english - this is setting the state for searchURL, then fetching the url.  then its returning the response then we are logging the response
        })
    
      }
    render() {
        return(
            <div>
                <button onClick={() => this.getRecipes()}>Show Recipes</button>
                <button onClick={() => this.hideRecipes()}>Hide Recipes</button>
            {/* {this.state.recipesSearched ? <div>{this.state.recipeResults[0].map(item => {
                return (

                )
            })
            </div>
            
            
            
            
            // <h1>{this.state.recipeResults[0][0].recipe.label}</h1>
             : null} */}

             {this.state.recipesSearched ? 
                <div>{this.state.recipeResults[0].map(item => {
                    return (
                        <div key={item.recipe.label}>
                        <h1>{item.recipe.label}</h1>
                        <img src={item.recipe.image} alt={item.recipe.label} />
                        <ul>
                           {item.recipe.ingredients.map(ingredient => {
                               return <li key={ingredient.text + Math.floor(Math.random()*100)}>{ingredient.text}</li>
                           })}
                        </ul>
                        </div>
                    )
                })} </div>
                : null}
            </div>
        )
    }
}




export default RecipeInfo