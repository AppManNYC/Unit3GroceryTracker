        <table>
          <tbody>
            <tr>
              <td>Food Name</td>
              <td>Food Qty</td>
              <td>Storage Area</td>
              <td>Created Date</td>
              <td>Exp Date</td>
              
            </tr>
            {this.state.groceries.map(item => {
              // below converts expire date to a string - probably should put these into a funciton - seems to be screwed up on the 1st/last day of a month
              let itemDate = new Date(item.expiration_date)
              let itemYear = itemDate.getFullYear();
              let itemMonth = (1 + itemDate.getMonth()).toString().padStart(2, "0");
              let itemDay = (1 + itemDate.getDate()).toString().padStart(2, "0");
              let expDate = itemYear+'-'+ itemMonth+'-'+ itemDay

              // below convertes createdAt to a string
              let createDate = new Date(item.createdAt)
              let createYear = createDate.getFullYear();
              let createMonth = (1 + createDate.getMonth()).toString().padStart(2, "0");
              let createDay = createDate.getDate().toString().padStart(2, "0");
              let createdDate = createYear+'-'+ createMonth+'-'+ createDay


              
              return (
                <React.Fragment>
                  <tr key={item._id}>
                    <td>{item.food_name}</td>
                    <td>{item.food_qty}</td>
                    <td>{item.storage_area}</td>
                    <td>{createdDate}</td>
                    <td>{expDate}</td>
                    <td>
                      <ChartExpiration expireDate={item.expiration_date} createDate={item.createdAt} />
                    </td>
                    <td><button onClick={() => this.deleteGrocery(item._id)}>X</button></td>
                    <td><Link to='/edit'><button onClick={() => this.setIndividualItem(item)}>Edit</button></Link></td>
                    <td><button onClick={() => this.getNutritionInfo(item.food_name)}>Nutrition Info</button></td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>