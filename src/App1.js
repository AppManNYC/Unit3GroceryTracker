import React, { Component } from 'react';
import NutritionInfo from './components/NutritionInfo.js'


class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			// searchURL: baseURL + query + range + fields + authorization
			baseURL: 'https://api.nutritionix.com/v1_1/search/',
			foodName: '',
			query: '?',
			range: 'results=0%3A20&cal_min=0&cal_max=50000&',
			fields: 'fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_ingredient_statement%2Cnf_calories%2Cnf_cholesterol&',
			authorization: 'appId=f95dc4d9&appKey=25ec40f8781dd35636bf9456ff98197b',
			searchURL: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange (event) {
		this.setState({ [event.target.id]: event.target.value })
	}
	handleSubmit (event) {
		event.preventDefault()
		this.setState({
			searchURL: this.state.baseURL + this.state.food + this.state.query + this.state.range + this.state.fields + this.state.authorization
		}, () => {
			fetch(this.state.searchURL)
				.then(response => {
					return response.json()
				}).then(json => this.setState({
					food: json,
					foodName: ''
				}),
				err => console.log(err))
		})
	}
	render () {
		return (
			<React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='foodName'>Food Name</label>
            <input
	            id='foodName'
	            type='text'
	            value={this.state.foodName}
	            onChange={this.handleChange}
            />
            <input
	            type='submit'
	            value='Find Nutrition Info'
            />
          </form>
				{(this.state.food)
					? <NutritionInfo food={this.state.food} />
					: ''
				}
        </React.Fragment>
		)
	}
}

export default App;