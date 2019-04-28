import React, { Component } from 'react'
import { connect } from 'react-redux';
import {saveUserAnswer,saveQuestionsVotes,removeQuestionVote,removeUserAnswer} from '../actions';
import {_saveQuestionAnswer} from '../utils/_DATA';

//import ui
import 'antd/dist/antd.css';
import { Card,Avatar,Form,Radio,Button } from 'antd';
import '../index.css'

const RadioGroup = Radio.Group;



// checked={true} 表示选中，  checked={false} 表示未选中
// checked={this.state.selection==='optionOne'} 会根据this.state.selection==='optionOne' 为 true 或者 false 判断是否选中


/** displaying results */

class SubmitAnswer extends Component{

  state = {
    selection: null,
    disabled: true
  }

  handelChange = (e) => {

    console.log('radio checked', e.target.value);
    this.setState({
      selection: e.target.value,
      disabled: false
    });
  }

  handelSubmit = (e) => {
    e.preventDefault();
    if(this.state.selection){
        this.props.handelSaveVotes({
          authedUser:this.props.authed,
          qid:this.props.qid, 
          answer:this.state.selection
        })
      }
     
    } 

      render(){
        const { question, users, author,qid}=this.props

        const { disabled } = this.state
        return(
                <div>
                  <p> Would You Rather: </p>
                  <Form style={{ padding: 10, background: '#fff', margin:'auto'} } onSubmit={this.handelSubmit.bind(this)} >
                    <RadioGroup onChange={this.handelChange} value={this.state.value}>
                       <Radio  value='optionOne' onChange={this.handelChange.bind(this)} checked={this.state.selection==='optionOne'} >{question.optionOne.text}</Radio><br/>               
                       <Radio  value='optionTwo' onChange={this.handelChange.bind(this)} checked={this.state.selection==='optionTwo'} >{question.optionTwo.text}</Radio>        
                    </RadioGroup>
                    <Button disabled={disabled} type="primary" htmlType="submit" style={{margin:'40px'}}>Submit</Button>
                  </Form>
                </div>
        )
      }
                    
}








const mapDispatchToProps = (dispatch) => {
  return{
      handelSaveVotes:({authedUser, qid, answer})=>{
          dispatch(saveUserAnswer({authedUser, qid, answer} ))
          dispatch(saveQuestionsVotes({authedUser, qid, answer}))
          console.log('ans',{ authedUser, qid, answer })
          return _saveQuestionAnswer({authedUser, qid, answer}).catch(() => {
                  dispatch(removeQuestionVote({authedUser, qid, answer}))
                  dispatch(removeUserAnswer({authedUser, qid, answer}))
                  alert('Oops! There was an error saving your vote. Please try again.')
          })

        }
    
     }
     
}
 
export default SubmitAnswer=connect(null,mapDispatchToProps)(SubmitAnswer)
