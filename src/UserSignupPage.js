import React from "react";
import axios from "axios";

class UserSignupPage extends React.Component{

    state = {
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null
    };

    onChange = event =>{
        const {name,value} = event.target;
        //const value = event.target.value;
        //const name = event.target.name;
        this.setState({
            [name]:value
        })
    }

    onClickSignup = event =>{
        event.preventDefault();
        //stateden değerleri al
        const {username,displayName,password} = this.state;
        //değerleri body enjekte et
        const body = {
            username,
            displayName,
            password

        };
        //gönder
        axios.post('http://localhost:8080/api/users/create',body)
    }



    render(){
        return(
            <form>
            <h1>Sign Up</h1>
            <div>
                <label>Username</label>
                <input name="username" onChange={this.onChange} />
            </div>
            <div>
                <label>Display Name</label>
                <input name="displayName" onChange={this.onChange}/>
            </div>
            <div>
                <label>Password</label>
                <input name="password"  type="password" onChange={this.onChange}/>
            </div>
            <div>
                <label>Password Repeat</label>
                <input name="passwordRepeat" type="password" onChange={this.onChange}/>
            </div>
            <button onClick={this.onClickSignup}>Sign Up</button>
            </form>
        );
    }
}

export default UserSignupPage;