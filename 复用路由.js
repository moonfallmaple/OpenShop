import React,{Component} from 'react';
import {connect } from 'react-redux';
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import {getUsers,getQuestions} from '../actions';

//import components
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import QuestionContainer from './QuestionContainer';
import NotFound from "./NotFound";


// Import DATA
import { _getUsers,_getQuestions } from '../utils/_DATA'

import 'antd/dist/antd.css';
import { Layout} from 'antd';
const { Header, Content, Footer} = Layout;



// BrowserRouter 监听url变化
// Route 可以给组件贴上地址
// Link  取代a标签，相当于超链接，点击被 Link 包裹的按钮会转到to=''所对应的url
// Switch 只渲染第一个匹配的子组件

 
class App extends Component{
    state={
   
    }
    componentDidMount = () => {
        this.props.getAllUsers()  
        this.props.getAllQuestions()    
    }

    
    guestRouters=()=>(
      <Switch> 
        <Route exact path='/' component={Login}
          /> 
      </Switch>
    )
    authoredRouters=()=>(    
      <Switch>
          <Route exact path='/' component={Home}
            /> 
          <Route path='/add' component={NewQuestion}
            />
          <Route path='/leaderboard' component={Leaderboard}
            />
          <Route path='/questions/:questionId' component={QuestionContainer}
            />
          <Route component={NotFound} />
      </Switch>
    )


    render(){    
        return( 
          <Layout>
            <Header style={{ background: 'dark', padding: 0 }}>
                <Nav />
            </Header><br/>
            <Content style={{ margin: '10px 16px 16px', minHeight: "100vh" }}>
              { (this.props.authed)?
                this.authoredRouters():
                  <Login/>}       
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                    Created by SunriseJade
            </Footer>
          </Layout>
             
        )
    }
}

App.propTypes = {
  getAllUsers: PropTypes.func.isRequired
    
  }


const mapStateToProps = (state) => {
    return {
      users: state.users,  
      authed:state.authed,
      questions:state.questions
    }
    
  }


const mapDispatchToProps = (dispatch) => {
    return {
    getAllUsers: () => {
      _getUsers().then(users=>dispatch(getUsers(users)))
    },
   getAllQuestions:()=> {
    _getQuestions().then(questions=>dispatch(getQuestions(questions)))
   }}
}



export default App=connect(mapStateToProps,mapDispatchToProps)(App)


