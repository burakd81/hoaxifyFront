import React from "react";
import {signUp} from "../api/apiCalls";
import { Input } from "../components/Input";

class UserSignupPage extends React.Component{


    state = {
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event =>{
        const {name,value} = event.target;
        //errors objesinin kopyasını oluşturuyoruz.
        const errors = {... this.state.errors}
        errors[name] = undefined;
        //const value = event.target.value;
        //const name = event.target.name;
        this.setState({
            [name]:value,
            errors
        })
    }

    onClickSignup = async event =>{
        event.preventDefault();
        //stateden değerleri al
        const {username,displayName,password} = this.state;
        //değerleri body enjekte et
        const body = {
            username,
            displayName,
            password

        };
        this.setState({pendingApiCall: true})
        try{
            const response = await signUp(body);
        }catch(error){
            if (error.response.data.validationErrors) {
                this.setState({errors:error.response.data.validationErrors}); 
            }
            
        }
        //gönder
        this.setState({pendingApiCall: false});
    }



    render(){
        const {pendingApiCall,errors} = this.state;
        const {username,displayName,password} = errors;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange} />

                    <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange} />
                    <Input name="password" label="Password" error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label="Password Repeat" error={password} onChange={this.onChange} type="password" />

                    <div className="text-center mt-3">
                        <button className="btn btn-primary"  
                        onClick={this.onClickSignup}
                        disabled={pendingApiCall}>
                            
                            {pendingApiCall && <span className="spinner-border spinner-border-sm "></span>}Sign Up
                        </button>
                        
                    </div>

                </form>
            </div>

        );
    }
}

export default UserSignupPage;