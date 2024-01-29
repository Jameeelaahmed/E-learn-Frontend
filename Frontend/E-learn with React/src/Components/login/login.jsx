import "./login.css"
import img from "../../assets/Reading-book-pana-removebg-preview.png"

export default function Login (props){
    return(
        <div className="page">
            <div class="section">
                <div class="image">
                    <h4>Student Hub</h4>
                    <h1>Welcome Again .</h1>
                    <img src={img} alt=""></img>
                </div>
                <div class="log">
                    <h1>Login</h1>
                    <form action="" >
                        <label for="idNum">ID Number</label>
                        <input id="idNum" type="number" placeholder="Enter Your ID Number"></input>
                        <label for="pass">Password</label>
                        <input id="pass" type="password" placeholder="Enter Your Password"></input>
                        <input type="submit" name="Login"></input>
                        <div class="forget">
                            <span>Forget Your Password?</span>
                            <a href=""> Reset Password</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
}