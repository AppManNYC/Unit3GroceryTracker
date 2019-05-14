import React from 'react';
import EditItem from './components/EditItem'
import NutritionInfo from './components/NutritionInfo.js'
//import AddFood from './pages/AddFood/AddFood';

// App ID:      f95dc4d9
// App Keys:    25ec40f8781dd35636bf9456ff98197b
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://quiet-garden-36890.herokuapp.com'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: [],
      food_name: '',
      food_qty: 1,
      expiration_date: "2019-05-01",
      storage_area: '',
      editFood_name: '',
      editFood_qty: '',
      editExpiration_date: "2019-05-01",
      editStorage_area: '',
      groceriesDetails: {},
        baseURL: 'https://api.nutritionix.com/v1_1/search/',
        query: '?',
        range: 'results=0%3A20&cal_min=0&cal_max=50000&',
        fields: 'fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_ingredient_statement%2Cnf_calories%2Cnf_cholesterol&',
        authorization: 'appId=f95dc4d9&appKey=25ec40f8781dd35636bf9456ff98197b',
        searchURL: ''
    }
    this.getGroceries = this.getGroceries.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getNutritionInfo = this.getNutritionInfo.bind(this)
    this.handleAddGrocery = this.handleAddGrocery.bind(this)
    this.deleteGrocery = this.deleteGrocery.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.setIndividualItem = this.setIndividualItem.bind(this)
  }
  getGroceries() {
    fetch(baseURL + '/groceries')
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData => this.setState({
        groceries: parsedData
      }),
        err => console.log(err))
  }
  componentDidMount() {
    this.getGroceries()
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(baseURL + '/groceries', {
      method: 'POST',
      body: JSON.stringify({ food_name: this.state.food_name, food_qty: this.state.food_qty, expiration_date: this.state.expiration_date, storage_area: this.state.storage_area }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        this.handleAddGrocery(resJson)
        this.setState({
          food_name: '',
          food_qty: 1,
          expiration_date: "2019-05-01",
          storage_area: ''
        })
      }).catch(error => console.error({ 'Error': error }))
  }
    getNutritionInfo (food_name) {
        this.setState({
            searchURL: this.state.baseURL + food_name + this.state.query + this.state.range + this.state.fields + this.state.authorization
        }, () => {
            fetch(this.state.searchURL)
                .then(response => {
                    return response.json()
                }).then(json => {
                    let whatever = []
                whatever.push(json)
                    console.log(json)
                    this.setState({
                    food: whatever,
                    food_Name: ''
                })},
                err => console.log(err))
        })
    }
  handleAddGrocery(item) {
    const copyGroceries = [...this.state.groceries]
    copyGroceries.unshift(item)
    this.setState({
      groceries: copyGroceries,
      name: ''
    })
  }

  deleteGrocery(id) {
    fetch(baseURL + '/groceries/' + id, {
      method: 'DELETE'
    }).then(response => {
      const findIndex = this.state.groceries.findIndex(grocery => grocery._id === id)
      const copyGroceries = [...this.state.groceries]
      copyGroceries.splice(findIndex, 1)
      this.setState({ groceries: copyGroceries })
    })
  }

setIndividualItem(item) {
  console.log(item)
  const date = new Date(item.expiration_date)

  // let year = date.getFullYear();
  // let month = (1 + date.getMonth()).toString().padStart(2, ‘0’);
  // let day = date.getDate().toString().padStart(2, ‘0’);

  // function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
 
    // return month + "/" + day + "/" + year;
//  }
//  getFormattedDate(dateTest)
  
  this.setState({
    groceriesDetails: item,
    editFood_name: item.food_name,
    editFood_qty: item.food_qty,
    editStorage_area: item.storage_area,
    editExpiration_date: year+'-'+month+'-'+day
  })
}





  handleEdit (id) {
        console.log(id)
        // not reading ID for some reason
        fetch(baseURL + '/groceries/' + id, {
          method: 'PUT',
          body: JSON.stringify({food_name: this.state.editFood_name, food_qty: this.state.editFood_qty, expiration_date: this.state.editExpiration_date, storage_area: this.state.editStorage_area}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then (res => res.json())
          .then (resJson => {
            console.log(baseURL + '/groceries/' + id)
            console.log(resJson)
            console.log(this.state.groceriesDetails.editFood_qty)
            const findIndex = this.state.groceries.findIndex(item => item._id === id)
            const copyGroceries = [...this.state.groceries]
            copyGroceries.splice(findIndex, 1, resJson)

            this.setState({
              groceries: copyGroceries,
              editFood_name: '',
              editFood_qty: 0,
              editExpiration_date: '2019-05-01',
              editStorage_area: ''
            })
        }).catch (error => console.error({'Error': error}))
      }
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
        
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="food_name">Food Name</label>
          <input type='text' id='food_name' value={this.state.food_name} placeholder='New Item' onChange={this.handleChange} />
          <label htmlFor="food_qty">Quantity</label>
          <input type='number' id='food_qty' value={this.state.food_qty} placeholder='1' onChange={this.handleChange} />
          <label htmlFor="expiration_date">Expiration Date</label>
          <input type='date' id='expiration_date' value={this.state.expiration_date} placeholder='' onChange={this.handleChange} />
          <label htmlFor="storage_area">Storage Area</label>
          <input type='text' id='storage_area' value={this.state.storage_area} placeholder='' onChange={this.handleChange} />
          <input type='submit' value='Add Food' />
        </form>

        <table>
          <tbody>
            {this.state.groceries.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item.food_name}</td>
                  <td>{item.food_qty}</td>
                  <td>{item.storage_area}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.expiration_date}</td>
                  <td><button onClick={() => this.deleteGrocery(item._id)}>X</button></td>
                  <td><button onClick={() => this.setIndividualItem(item)}>Edit</button></td>
                    <td><button onClick={() => this.getNutritionInfo(item.food_name)}>Nutrition Info</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
          {(this.state.food)
              ? <NutritionInfo food={this.state.food} />
              : ''
          }

        <EditItem handleEdit={this.handleEdit} editStorage_area = {this.state.editStorage_area} editFood_name = {this.state.editFood_name} editFood_qty={this.state.editFood_qty} editExpiration_date={this.state.editExpiration_date} handleChange = {this.handleChange} groceriesDetails = {this.state.groceriesDetails}/>
      </div>
    );
  }
}
export default App;
