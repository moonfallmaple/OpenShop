import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider ,connect } from 'react-redux';


export class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();

    const input = this.input;
    if (!input.value.trim()) {
      return;
    }

    this.props.onAdd(input.value);
    input.value = '';
  }

  refInput(node) {
    this.input = node;
  }

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" ref={this.refInput} />
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
    state={
      comments:[]
    }

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




