import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider ,connect } from 'react-redux';


export class GoalApp extends Component {
  render() {
    return (
      <div>
        <AddGoal />
        <GoalList />
      </div>
    )}
}

export class AddGoal extends Component {
  state={
    value:''
  }

  onSubmit(ev) {
    ev.preventDefault();//组织submit刷新页面

    const inputValue=this.state.value
    if(!inputValue.trim()){
      return;
    }

    this.props.addGoal(inputValue);

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



export class GoalList  extends Component {
   
    render() {
      const {goals,removeGoal}=this.props
      return (
        <div>
          {goals.map((goal) =>
            <GoalItem
              key={goal.id}
              text={goal.text}
              completed={goal.completed}
              onRemove={() => removeGoal(goal.id)}
             />)
          
        }
        </div>
      )
    }
  }
  export class GoalItem  extends Component {

    render() {
      const {text,onRemove}=this.props
    
    
      return (
        <div>
          <li>           
            <label>{text}</label>    
            <button className="remove" onClick={onRemove}>×</button>
          </li> 
        </div>
      )
    }
  }






//action type
  export const ADD_GOAL = 'ADD_GOAL';
  export const REMOVE_GOAL = 'REMOVE_GOAL';

  let nextGoalId = 0;

//action creator
  export const addGoal=(input)=>({ type: ADD_GOAL, id: nextGoalId ++, text:input});

  export const removeGoal = (id) => ({type: REMOVE_GOAL,id: id});
  
//reducer
function reducer (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([{id: action.id,text:action.text}])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}


//create store
  const store = createStore(reducer)






//react-redux
  const mapStateToProps = (state) => {
    return {
      goals: state
    
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addGoal: (input) =>{
        dispatch(addGoal(input))
      
      },
      removeGoal:(id)=>{
        dispatch(removeGoal(id))
      },
    }
  }
GoalApp=connect(mapStateToProps,mapDispatchToProps)(GoalApp)
AddGoal=connect(mapStateToProps,mapDispatchToProps)(AddGoal)
GoalList=connect(mapStateToProps,mapDispatchToProps)(GoalList)



ReactDOM.render(<Provider store={store}>
  <GoalApp />
</Provider>,document.getElementById('root'));




