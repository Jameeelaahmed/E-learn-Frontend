import './Logo.css'

export default function Logo({opened}){
    let img;
    let opacityNone;
    if(opened){
    img=(<img 
        className="logo" 
        src="./src/assets/Untitled-65.png" 
        alt=""
        ></img>)
    opacityNone=(<img 
        className="logo-responsive" 
        src="./src/assets/Untitled-4.png" 
        alt=""
        style={{opacity:0}}></img>)
    }
    else if(!opened){
        img=(<img className="logo-responsive" src="./src/assets/Untitled-4.png" alt=""></img>)
    }
    return(
        <>
        {img}
        {opacityNone}
        </>
        )
}