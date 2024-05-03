import classes from './Add-Assignment.module.css'
import AddAssignmentModal from './AddAssignmentModal';
import { useRef } from 'react'
import { useTranslation } from 'react-i18next';
export default function AddAssignment(){
    const { t } = useTranslation();
    const addAssignmentDialogRef=useRef();
    function handleOpenAddAssignementModal(){
        addAssignmentDialogRef.current.open();
    }
    return(
    <div className={classes.AddAssignment}>
        <p className={classes.create_assignment}>{t("Create Assignment")}</p>
        <AddAssignmentModal ref={addAssignmentDialogRef}/>
        <div className={classes.actions}>
            <button onClick={handleOpenAddAssignementModal}>{t("Create")}</button>
        </div>
    </div>
    )
}