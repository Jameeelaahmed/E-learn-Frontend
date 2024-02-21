import classes from './PageContent.module.css'
export default function PageContent({children}){
    return(
        <div className={classes.page_content}>
            {children}
        </div>
        )
}