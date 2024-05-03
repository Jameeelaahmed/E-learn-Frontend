import classes from './authentication.module.css';
import FormContainer from './FormContainer';
import { useRef,useState } from 'react';

export default function Otp(){
    return(
        <div className={classes.authentication}>\
            <FormContainer h1Value="Otp">
                <form action="">
                    
                </form>
            </FormContainer>
        </div>
        )
}