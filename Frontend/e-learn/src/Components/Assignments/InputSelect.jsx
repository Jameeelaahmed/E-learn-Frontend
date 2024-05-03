import classes from './InputSelect.module.css'
export default function InputSelect({ wrapper = "select",name}) {
    let Wrapper;
    if(wrapper==='select'){
        Wrapper=(<div className={classes.select_dropdown}>
        <select>
            <option value="Option 1" name={name}>Ungradded</option>
        </select>
    </div>)
    }
    else{
        Wrapper=(<input type="number" dir='auto' name='grade' className={classes.input}/>)
    }
    return (
        Wrapper
    );
}
