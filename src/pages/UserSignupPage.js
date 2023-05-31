import React from "react";
import {signUp,changeLanguage} from "../api/apiCalls";
import { Input } from "../components/Input";
import {withTranslation} from 'react-i18next';
import {Tr,Us} from "react-flags-select";

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
        const {t} = this.props;
        const {name,value} = event.target;
        //errors objesinin kopyasını oluşturuyoruz.
        const errors = {... this.state.errors}
        errors[name] = undefined;
        if(name === 'password' || name === 'passwordRepeat'){
            if(name === 'password' && value !== this.state.passwordRepeat){
                errors.passwordRepeat = t('Password mismatch');
            }else if(name ==='passwordRepeat' && value !== this.state.password){
                errors.passwordRepeat = t('Password mismatch');
            }else{
                errors.passwordRepeat = undefined;
            }
        }
        //const value = event.target.value;
        //const name = event.target.name;
        this.setState({
            [name]:value,
            errors
        })
    }

    onChangeLanguage = language =>{
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);

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
        const {username,displayName,password,passwordRepeat} = errors;
        const {t} = this.props;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t("Username")} error={username} onChange={this.onChange} />

                    <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange} />
                    <Input name="password" label={t("Password")} error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.onChange} type="password" />

                    <div className="text-center mt-3">
                        <button className="btn btn-primary"  
                        onClick={this.onClickSignup}
                        disabled={pendingApiCall || passwordRepeat !== undefined}>
                            
                            {pendingApiCall && <span className="spinner-border spinner-border-sm "></span>}Sign Up
                        </button>
                        
                    </div>
                    <div>
                        <Tr width="24px" onClick={()=>this.onChangeLanguage('tr')} style={{cursor:'pointer'}} />
                        <Us width="24px" className="m-3" onClick={()=>this.onChangeLanguage('en')}  style={{cursor:'pointer'}} />
                    </div>

                </form>
            </div>

        );
    }
}

//Higher order component (komponenti başka bir komponentin içine ekleyip özellik kazandırma)
const UserSignupPageWithTranslation = withTranslation()(UserSignupPage)

export default UserSignupPageWithTranslation ;