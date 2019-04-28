import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {setAuthedUser} from '../actions';



// Import UI
import 'antd/dist/antd.css';
import { Form,Select,Button,Card,Avatar } from 'antd';

const Option=Select.Option




class Login extends Component {
  state={
      userToSignIn:null,
  }

  handleChange=(e)=>{
    const selectedUser=this.props.users[e]
    this.setState({
      userToSignIn:selectedUser.id
    })
  }

  handelSubmit=(e)=>{
      e.preventDefault();
      this.props.setAuthoredUser(this.state.userToSignIn)
  }
 

  render() {
      const { users }=this.props
      return (
          <div style={{ padding: '30px'}}>
              <Card title="Sign In" bordered={false} style={{ width: "400px", margin:'auto' }}>
                  <div style={{display: 'flex', justifyContent: 'center' }}>
                    <Form style={{ padding: 10, background: '#fff', margin:'auto'} } onSubmit={this.handelSubmit} >
                        <Form.Item style={{display: 'flex', justifyContent: 'center' }} >
                            <Select defaultValue='' style={{ width: 250 }} onChange={this.handleChange} >
                            {(Object.values(users)).map((user) => (
                                <Option key={user.id} value={user.id}>
                                <Avatar size={20} src={user.avatarURL} icon="user" style={{margin:'6px'}}/>
                                {user.id}
                                </Option>
                            ))}
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }} style={{display: 'flex', justifyContent: 'center' }}>
                          <Button type="primary" htmlType="submit"> Sign In</Button>
                        </Form.Item>
                    </Form>
                    
                  </div>
                  
              </Card>
          </div>

   
      );
  }
}


//pass pass users info to login page
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

//save current user info to reducer
const mapDispatchToProps = (dispatch) => {
    return {
        setAuthoredUser: (id) => {
          dispatch(setAuthedUser(id))
          console.log('id',id)
        }
    }
  }
  


export default Login=connect(mapStateToProps,mapDispatchToProps)(Login)
