import classes from './MainSection.module.css'

export default function MainSection({children}){
    return(
        <div className={classes.main_section}>
            {children}
        </div>
        )
}