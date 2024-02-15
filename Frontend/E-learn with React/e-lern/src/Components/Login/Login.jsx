import { useState } from 'react';
import './Login.css'
export default function Login(){
    // ! request canceled
    function handleSubmit(event){
        event.preventDefault();
    }
    // ! request canceled

    const [enteredValue,setEnteredValue]=useState({
        userName:'',
        password:''
    })
    function handleInputChange(indentefier,value){
        setEnteredValue((preValues)=>({
            ...preValues,
            [indentefier]:value
        }))
    }
    return(
        <>
        {/* <!-- <img src="assets/images/undraw_login_re_4vu2.svg" alt=""> --> */}
        <div className="square-one"></div>
        <div className="square-two"></div>
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="user-name">
                    <label htmlFor="">user-name</label>
                    <input 
                    type="number"
                    onChange={(event)=>handleInputChange('userName',event.target.value)}
                    value={enteredValue.userName}></input>
                </div>
                <div className="password">
                    <label htmlFor="">password</label>
                    <input 
                    type="password"
                    onChange={(event)=>handleInputChange('password',event.target.value)}
                    value={enteredValue.email}></input>
                </div>
                <input type="submit" value="Login"></input>
                <div className="forget">
                    <p>forget your Password?</p>
                    <a href="">Reset Password</a>
                </div>
            </form>
        </div>
        </>
    )
}