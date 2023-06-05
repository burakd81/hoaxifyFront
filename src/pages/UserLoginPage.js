import { Input } from "../components/Input";
import React from "react";
import { withTranslation } from 'react-i18next';
import { login } from "../api/apiCalls";

class UserLoginPage extends React.Component{

    state = {
        username:null,
        password:null,
        pendingApiCall: false,
        errors: {}
    };
    onChange = event =>{
        const {t} = this.props;
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
    };

    onClickLogin = event => {
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {
            username: username,
            password: password
        }
        login(creds)
    }


    render(){
        const {pendingApiCall,errors} = this.state;
        const {username,displayName,password,passwordRepeat} = errors;
        const {t} = this.props;
        return(
            <div className="container">
                <form>
                <h1 className="text-center">{t('Login')}</h1>

                <Input name="username" label={t("Username")} error={username} onChange={this.onChange} />
                <Input name="password" label={t("Password")} error={password} onChange={this.onChange} type="password" />
                
                <div className="text-center mt-3">
                        <button className="btn btn-primary"  
                        disabled={pendingApiCall || passwordRepeat !== undefined}  onClick={this.onClickLogin}>
                            
                            {pendingApiCall &&  <span className="spinner-border spinner-border-sm "></span>}{t('Login')}
                        </button>
                    </div>
                </form>
            </div>

        );
    };
}
const UserLoginPageWithTranslation = withTranslation()(UserLoginPage)

export default UserLoginPageWithTranslation;