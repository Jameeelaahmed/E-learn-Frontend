import classes from './SemiBody.module.css'

export default function SemiBody({children}){
    return(
        <section className={classes.semi_body}>
            {children}
        </section>
    )
}