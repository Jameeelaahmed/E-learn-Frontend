import classes from './authentication.module.css'
import FormContainer from './FormContainer'
import { useRef,useState } from 'react' 
export default function ForgetPassword(){

    const email=useRef();
    const [isEdit,setIsEdit]=useState(false)

    const emailIsInValid = isEdit && !email.current.value.includes('@');

    function handleSubmit(event){
        event.preventDefault();
        email.current.value;
    }

    function handleEmailBlur(){
        setIsEdit(true)
    }

    function handleChange(){
        setIsEdit(false)
    }
    return(
        <div className={classes.authentication}>
            <FormContainer h1Value="هل تواجه مشكلة في تسجيل الدخول؟">
                <form onSubmit={handleSubmit}>
                    <div className={classes.forget_password}>
                        <label htmlFor="">البريد الاكتروني</label>
                        <input
                            type="email"
                            ref={email}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                        />
                    </div>
                    {emailIsInValid && <p className={classes.control_error}>enter valid email</p>}
                    <input 
                    type="submit"
                    />
                </form>
            </FormContainer>
        </div>
    )
}