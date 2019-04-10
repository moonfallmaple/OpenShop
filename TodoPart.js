import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider ,connect } from 'react-redux';


export class TodoApp extends Component {
  render() {
    return (
      <div>
        <AddTodo />
        <TodoList />
      </div>
    )}
}

export class AddTodo extends Component {
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
     
      </div>
    )
  }
}



export class TodoList  extends Component {
   
    render() {
      const {todos,onRemoveTodo,onToggleTodo}=this.props
      return (
        <div>
          {todos.map((todo) =>
            <TodoItem
              key={todo.id}
              text={todo.text}
              completed={todo.completed}
              onRemove={() => onRemoveTodo(todo.id)}
              onToggle={() => onToggleTodo(todo.id)}
             />)
          
        }
        </div>
      )
    }
  }
  export class TodoItem  extends Component {

    render() {
      const {text,completed,onRemove,onToggle}=this.props
      const checkedProp = completed ? {checked: true} : {}; 
    
      return (
        <div>
          <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
            <input className="toggle" type="checkbox" {...checkedProp} readOnly onClick={onToggle} />
            <label>{text}</label>    
            <button className="remove" onClick={onRemove}>×</button>
          </li> 
        </div>
      )
    }


  }






//action type
  export const ADD_TODO = 'TODO/ADD';
  export const TOGGLE_TODO = 'TODO/TOGGLE';
  export const REMOVE_TODO = 'TODO/REMOVE';

  let nextTodoId = 0;

//action creator
  export const addTodo=(input)=>({ type: ADD_TODO,  completed: false, id: nextTodoId ++, text:input});

  export const toggleTodo = (id) => ({type: TOGGLE_TODO, id: id});

  export const removeTodo = (id) => ({type: REMOVE_TODO,id: id});
  
//reducer
  const reducer=(state=[], action)=>{
   
    switch (action.type) {
      case ADD_TODO: {
        return state.concat([
          { 
          id: action.id,
          text: action.text,
          completed: false}
        ])
      }
      case  REMOVE_TODO:
        return state.filter((todo)=> todo.id !==action.id)
      case TOGGLE_TODO :
        return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { completed: !todo.completed }))
      default: {
        return state;
      }
  
  }
}

//create store
  const store = createStore(reducer)






//react-redux
  const mapStateToProps = (state) => {
    return {
      todos: state
    
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onAdd: (input) =>{
        dispatch(addTodo(input))
      
      },
      onRemoveTodo:(id)=>{
        dispatch(removeTodo(id))
      },
      onToggleTodo:(id)=>{
        dispatch(toggleTodo(id))
      }
    }
  }
TodoApp=connect(mapStateToProps,mapDispatchToProps)(TodoApp)
AddTodo=connect(mapStateToProps,mapDispatchToProps)(AddTodo)
TodoList=connect(mapStateToProps,mapDispatchToProps)(TodoList)



ReactDOM.render(<Provider store={store}>
  <TodoApp />
</Provider>,document.getElementById('root'));




