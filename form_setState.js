import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider ,connect } from 'react-redux';


export class App extends Component {
  state={
    value:''
  }

  onSubmit(ev) {
    ev.preventDefault();//组织submit刷新页面

    const inputValue=this.state.value
    if(!inputValue.trim()){
      return;
    }

    this.props.onAdd(inputValue);
    this.setState({value:''})
  }

  onInputChange(event) {
    this.setState({
      value:event.target.value
    })
  }

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input className="new-todo" value={this.state.value} onChange={this.onInputChange.bind(this)} />
          <button className="add-btn" type="submit">
            添加
          </button>
        </form>
        <AddTodo  />
      </div>

    )
  }
}

  export class AddTodo  extends Component {
  

    render() {
      const {todos}=this.props
      return (
        <div>
          {todos.map((todo, i) =>
            <TodoList
              todo={todo}
              key={i}
             />)
          
        }
        </div>
      )
    }
  }
  export class TodoList  extends Component {

  
   
    render() {
    
      const {i,todo}=this.props  
      return (
        <div>       
          <li key={i}>{todo.text}</li> 
        </div>
      )
    }


  }




  export const addTodo=(input)=>{return{ type: 'ADD_TODO', input}}
  

  const reducer=(state=[], action)=>{
   
    switch (action.type) {
      case 'ADD_TODO': {
        return [
          {           
            text: action.input,
          },
          ...state
        ]
      }
      default: {
        return state;
      }
  
  }
}


  const store = createStore(reducer)


  const mapStateToProps = (state) => {
    return {
      todos: state
    
    }
  }
  
//   //将重做从门店发至仓库
  const mapDispatchToProps = (dispatch) => {
    return {
      onAdd: (input) =>{
        dispatch(addTodo(input))
        console.log(input)
      }
    }
  }
App=connect(mapStateToProps,mapDispatchToProps)(App)
AddTodo=connect(mapStateToProps,mapDispatchToProps)(AddTodo)
TodoList=connect(mapStateToProps,mapDispatchToProps)(TodoList)



ReactDOM.render(<Provider store={store}>
  <App />
</Provider>,document.getElementById('root'));




