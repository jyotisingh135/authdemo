import React, {Component} from 'react';
import Register from './register';
import Login from './login';
import Home from './home';
import './css/customcss.css';
import './css/bootstrap.css';
import jwt_decode from 'jwt-decode';
import {BreadCrumb} from 'rea';
import {BrowserRouter as Router, Route, NavLink, Redirect, Switch} from 'react-router-dom';
import Page1 from './page1';

class Master extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            access:false
        }
    }
    render() {
        const Private = ({...props}) => {
            let access=false;
            let token = localStorage.getItem('user');
            let decoded;
            try {
                if(token === undefined){
                    access = false;
                }
                else
                {
                    decoded = jwt_decode(token);
                }
            }catch(err){
                console.log(err);
            }
            let currentTime = Math.floor(Date.now()/1000);
            if(decoded === undefined || decoded.exp === undefined){
                localStorage.removeItem('user');
                access = false;
            }
            else
            {
                if (decoded.exp < currentTime) {
                    access = false;
                    localStorage.removeItem('user');
                }
                else {
                    access = true;
                }
            }
            return (access) ?
                <div>
                    <Route {...props}/>
                </div>
                :
                <div>
                    <Redirect to="/login"/>
                </div>
        }
        const Public = ({...props}) => {

            return !localStorage.getItem('user') ?
                <div>
                    <Route {...props}/>
                </div>
                :
                <div>
                    <Redirect to="/home"/>
                </div>
        }

        return (
            <Router>
                <section>
                    <Links/>
                    <div className='bg-primary h-50'>
                    </div>
                    <Switch>
                        <Private exact path='/page1' component={Page1}/>
                        <Public exact path='/login' component={Login}/>
                        <Public exact path='/register' component={Register}/>
                        <Private exact path='/home' component={Home}/>
                    </Switch>

                </section>
            </Router>


        );
    }
}

const Links = () => {
    return (
        <section className='btn-group-lg'>
            <NavLink className='btn btn-primary' exact activeClassName='active' to='/page1'>PAGE</NavLink>
            <NavLink className='btn btn-primary' exact activeClassName='active' to='/home'>Home</NavLink>
            <NavLink className='btn btn-primary' exact activeClassName='active' to='/login'>Login</NavLink>
            <NavLink className='btn btn-primary' exact activeClassName='active' to='/register'>Register</NavLink>


        </section>
    );

}
export default Master;