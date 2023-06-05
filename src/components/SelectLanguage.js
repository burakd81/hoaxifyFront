import React from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';
import {Tr,Us} from "react-flags-select";

const SelectLanguage = (props) => {

    const onChangeLanguage = language =>{
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);

    };
    return (
        <div>
            <Tr width="24px" onClick={()=>onChangeLanguage('tr')} style={{cursor:'pointer'}} />
            <Us width="24px" className="m-3" onClick={()=>onChangeLanguage('en')}  style={{cursor:'pointer'}} />
        </div>
    );
};

export default withTranslation()(SelectLanguage);