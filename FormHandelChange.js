import React,{Component} from 'react';
import ReactDOM from 'react-dom';

//若有多个元素要运用事件处理函数，常规的方法是编写多个onChange事件。
// 这么写的话会导致代码维护比较困难并且也非常冗余。更好的做法是把事件处理函数编写为一个。可以采用bind复用和name复用这两种方法。


class MyForm extends Component{

  render(){
    return(
        <div>
          <MyForm1 />
          <MyForm2 />
        </div>
    )
  }
}

//bind复用
class MyForm1 extends Component{

      state={
        FirstName:'',
        LastName:'',
        gender:'man',
        checked:true
      }

      handleChange=(name,event)=>{
        let newState={};
        newState[name]=name=="checked"?event.target.checked:event.target.value;
        this.setState(newState);
    }

    submitHandler=(e)=>{
      e.preventDefault();
      console.log(this.state);
    }



    render(){
      return(
      
        <form onSubmit={this.submitHandler.bind(this)}>
            <label htmlFor="username">firstname</label>
            <input type="text" name="FirstName" onChange={this.handleChange.bind(this,'FirstName')} value={this.state.FirstName} id="firstname"/><br/>
            <label htmlFor="username">lastname</label>
            <input type="text" name="LastName" onChange={this.handleChange.bind(this,'LastName')} value={this.state.LastName} id="lastname"/>
            <br/>
            <select name="gender" onChange={this.handleChange.bind(this,'gender')} value={this.state.gender}>
                <option value="man">男</option>
                <option value="woman">女</option>
            </select>
            <br/>
            <label htmlFor="checkbox">大大是帅哥吗</label>
            <input type="checkbox" name="checked" value="大大是帅哥" checked={this.state.checked} onChange={this.handleChange.bind(this,'checked')}  id="checkbox"/>
            <button type="submit">提交</button>
        </form>


      )
    }
}

//name复用
class MyForm2 extends Component{

      state={
        FirstName:'',
        LastName:'',
        gender:'man',
        checked:true
      }

      handleChange=(event)=>{
        let newState={};
        newState[event.target.name]=event.target.name=="checked"?event.target.checked:event.target.value;
        this.setState(newState);
      }

      submitHandler=(e)=>{
        e.preventDefault();
        console.log(this.state);
      }



      render(){
        return(
        
          <form onSubmit={this.submitHandler.bind(this)}>
              <label htmlFor="username">firstname</label>
              <input type="text" name="FirstName" onChange={this.handleChange} value={this.state.FirstName} id="firstname"/><br/>
              <label htmlFor="username">lastname</label>
              <input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName} id="lastname"/>
              <br/>
              <select name="gender" onChange={this.handleChange} value={this.state.gender}>
                  <option value="man">男</option>
                  <option value="woman">女</option>
              </select>
              <br/>
              <label htmlFor="checkbox">大大是帅哥吗</label>
              <input type="checkbox" name="checked" value="大大是帅哥" checked={this.state.checked} onChange={this.handleChange}  id="checkbox"/>
              <button type="submit">提交</button>
          </form>


        )
      }
    }


ReactDOM.render(<MyForm />,document.getElementById('root'));






