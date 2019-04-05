import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider ,connect } from 'react-redux';




//React部分:计算器组建

//新建shop用于展示，所有的原材料和加工都在仓库
export class Counter extends Component {
  render() {
    const {count,increment}=this.props
    return (
      <div className="App">
        <span>{count}</span>
        <button onClick={increment}>+1</button>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  handelIncreaseOn: PropTypes.func.isRequired
}






//Redux部分：仓库

//新建工厂
const reducer=(state, action)=>{
    if (!state) return {
       count:0
    }
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count:state.count + 1 }
      default:
        return state
    }
  }

//建仓  
const store = createStore(reducer)






//React-Redux部分：物流

//将原料从仓库发至门店
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

//将重做从门店发至仓库
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch({type:'INCREMENT'})
    }
  }
}

//创建物流：链接
Counter=connect(mapStateToProps,mapDispatchToProps)(Counter)






//ReactDOM部分

//开店
ReactDOM.render(<Provider store={store}>
                  <Counter />
                </Provider>,document.getElementById('root'));





