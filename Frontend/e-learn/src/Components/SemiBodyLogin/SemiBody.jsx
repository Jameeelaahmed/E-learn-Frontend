import classes from './SemiBody.module.css'

export default function SemiBody({children}){
    return(
        <>
        <div className={classes.square_one}></div>
        <div className={classes.square_two}></div>
        <section className={classes.semi_body}>
            {children}
        </section>
        </>
        
    )
}