import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import {addQuestion,addUserQuestion,removeQuestion,removeUserQuestion} from '../actions';
import { _saveQuestion } from '../utils/_DATA';

// Import UI
import 'antd/dist/antd.css';
import { Form,Button,Card,Input } from 'antd';

// 表单由 Input 和 Button组成
// 表单是有状态组件：hangleChange 负责在 view 层更新用户输入的内容, handelSubmit 将用户的输入内容传递到 store 更新 store 里的状态

class NewQuestion extends Component {
    state = {
      option1:'',     
      option2:'',
      disabled: true,
      }
    handelSubmit=(e)=>{
      e.preventDefault();

      this.props.handelAddQuestion({
        author: this.props.authed,
        optionOneText: this.state.option1,
        optionTwoText: this.state.option2
      })
      this.setState({
        option1:'',     
        option2:''
      })
      this.props.history.push("/")
    }
      
    hangleChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      },
      () => {
        this.state.option1 && this.state.option2
          ? this.setState({ disabled: false })
          : this.setState({ disabled: true })
      })
   
    }


  render() {
      
      return (
                    <Card title="Create New Questions" bordered={false} style={{ width: "500px", margin:'auto' }}>
                      <div style={{display: 'flex', justifyContent: 'center' }}>
                        <Form style={{ padding: 10, background: '#fff', width:'400px'} } onSubmit={this.handelSubmit} >
                            <Form.Item  >
                              <Input type="text" name='option1' placeholder="Enter First Option" value={this.state.option1} onChange={this.hangleChange} />
                            </Form.Item>
                            <span>OR</span><br/>
                            <Form.Item>
                              <Input type="text" name='option2'placeholder="Enter Second Option" value={this.state.option2} onChange={this.hangleChange}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }} style={{display: 'flex', justifyContent: 'center' }}>
                              <Button disabled={this.state.disabled} type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>      
                      </div>             
                  </Card>
      
      );
  }
}

const mapStateToProps = (state) => {
  return {
    authed:state.authed,
    users:state.users,
    questions:state.questions

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      handelAddQuestion: (question) => {
        _saveQuestion(question).then(
          (question)=>{ 
          dispatch(addQuestion(question))
          dispatch(addUserQuestion(question))
          console.log(question.id,question)
        }).catch(() => {
          dispatch(removeQuestion(question))
          dispatch(removeUserQuestion(question))
          alert('Oops! There was an error saving your question. Please try again.')
        })
      }
    }
  }


export default NewQuestion=connect(mapStateToProps,mapDispatchToProps)(NewQuestion)
