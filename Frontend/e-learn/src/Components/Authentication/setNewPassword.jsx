import classes from './authentication.module.css';
import FormContainer from './FormContainer';
import { useRef,useState } from 'react';
import { httpRequest } from '../../HTTP';
import { useNavigate } from 'react-router-dom';

import { hasMinLength } from './validation';
export default function SetNewPassword(){

    const pass=useRef();
    const confirmPass=useRef();
    const [isNotMatch,setIsNotMatch]=useState(false);
    const [passIsInvalid,setPassIsInvalid]=useState('');
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        const RequestBody = {
            token: '',//Reset Password Token
            email: 'moh65200152@gmail.com',
            newPassword: pass.current.value,
            confirmPassword: confirmPass.current.value
        }
        handleMatchPassword();
       //if(setIsNotMatch(true)){
            // error message 
        //}
        try{
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Account/Reset-Password', null, null, RequestBody);
            if(response.statusCode === 200){
                console.log(response);
                navigate('/'); //Navigating To Login
            }
            else{
                console.log(response);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    function handlePassValidation(){
        if (pass.current.value.length < 8 || !/\d/.test(pass.current.value)) {
            if (pass.current.value.length < 8) {
                setPassIsInvalid('يجب أن تتألف كلمة السر من 8 أحرف على الأقل');
            } else if (!/\d/.test(pass.current.value)) {
                setPassIsInvalid('يجب أن تحتوي كلمة السر على أرقام');
            } else if (pass.current.value.length < 8 && !/\d/.test(pass.current.value)) {
                setPassIsInvalid('يجب أن تتألف كلمة السر من 8 أحرف على الأقل وتحتوي على أرقام');
            }
        } else {
            setPassIsInvalid('');
        }
    }

    function handleMatchPassword(){
        if(pass.current.value !==confirmPass.current.value){
        setIsNotMatch(true)
        }
    }



    function handleChange(){
        setIsNotMatch(false)
    }

    return(
        <div className={classes.authentication}>
            <FormContainer h1Value="تعيين كلمة مرور جديده">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">كلمة مرور</label>
                        <input 
                        dir='rtl'
                        type="password"
                        ref={pass}
                        onBlur={handlePassValidation}
                        onChange={handleChange}/>
                    {passIsInvalid && <p className={classes.control_error}>{passIsInvalid}</p>} 
                    </div>
                    <div>
                        <label htmlFor="">تأكيد كلمة المرور</label>
                        <input 
                        type="password"
                        ref={confirmPass}
                        onBlur={handleMatchPassword}
                        onChange={handleChange}/>
                        {isNotMatch && <p className={classes.control_error}>كلمات المرور غير متطابقة</p>}
                    </div>
                    <input type="submit" />
                </form>
            </FormContainer>        
        </div>
    )
}