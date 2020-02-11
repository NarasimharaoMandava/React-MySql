import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      id: '',
      item: "",
      addItemBtnBlur:true
    };
  }

  handleChange = (e) =>{
    this.setState({
      item:e.target.value
    },
      ()=>{
        const blur = (this.state.item.length>0?false:true);
        this.setState({
          addItemBtnBlur:blur
        })
      });
  };

  componentDidMount(){
    // this.viewAll();
  }

  handleSubmit = _ => {
    fetch(`http://localhost:4000/tasks/add?item=${this.state.item}`)
    .then(this.viewAll)
    .catch(err => console.err(err))
  };

  delete = _ => {
    console.log(this.state.item);
    // fetch(`http://localhost:4000/tasks/delete?id=${this.state.id}`)
    // .then(this.viewAll)
    // .catch(err => console.err(err))
  };

  deleteAll = _ => {
    fetch('http://localhost:4000/tasks/deleteAll')
    .then(response => response.json())
    .then(response => this.setState({tasks: response.data}))
    .catch(err => console.error(err))
  };

  viewAll = _ => {
    fetch('http://localhost:4000/tasks')
    .then(response => response.json())
    .then(response => this.setState({tasks: response.data}))
    .catch(err => console.error(err))
  };

  render(){
    const { tasks } = this.state;
    return ( 
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-mid-8 mt-4">
            <h3 className="text-capitalize text-center">todo input</h3>          
          </div>
        </div>
        <TodoInput item={this.state.item} handleChange={this.handleChange} handleSubmit={this.handleSubmit} addItemBtnBlur={this.state.addItemBtnBlur}></TodoInput>
        <button type="submit" className="btn btn-block btn-primary mt-3 text-capitalize" onClick={this.viewAll}>view list</button>
        <div>
          <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Items</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {this.state.tasks.map(renderTask =>
              <tr key={renderTask.taskid}>
                <td>{renderTask.taskdata}</td>
                <td><button>Edit</button></td>
                <td><button onClick={this.delete}>Delete</button></td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        <button type="submit" className="btn btn-block btn-danger mt-3 text-capitalize" onClick={this.deleteAll}>delete all</button>
      </div>
      </div>
    );
  }
}

export default App;
