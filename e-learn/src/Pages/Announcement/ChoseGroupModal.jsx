import { useRef, useImperativeHandle, forwardRef } from "react";
import CheckboxDropdown from "../../Components/MultipleChoiceCheckMark/CheckboxDropdown";
import classes from "./ChoseGroupModal.module.css";
import Button from "../../Components/Button/Button";
import { useTranslation } from "react-i18next";
const ChoseGroupModal = forwardRef(function ChoseGroupModal({ onChooseGroup }, ref) {
    const ChoseGroupModalRef = useRef();
    const groupRef = useRef();
    const { t } = useTranslation();
    useImperativeHandle(ref, () => ({
        open: () => {
            ChoseGroupModalRef.current.showModal();
        },
        close: () => {
            ChoseGroupModalRef.current.close();
        }
    }));

    const handleChoose = () => {
        const selectedGroup = groupRef.current.value;
        onChooseGroup(selectedGroup);
        ChoseGroupModalRef.current.close();
    };
    const selectedGroups = groupRef.current?.getSelectedGroups().map(group => group.value);
    console.log("Selected group: ", selectedGroups);
    return (
        <dialog ref={ChoseGroupModalRef} className={classes.modal}>
            <h1>Choose Group</h1>
            <CheckboxDropdown ref={groupRef} />
            {/* <select ref={groupRef}>
                <option value="group1">Group 1</option>
                <option value="group2">Group 2</option>
                <option value="group3">Group 3</option>
                <option value="group4">Group 4</option>
                <option value="group5">Group 5</option>
            </select> */}
            <div className={classes.button}>
                <Button text={t("submit")} onClick={handleChoose}>Choose</Button>
            </div>
        </dialog>
    );
});

export default ChoseGroupModal;
