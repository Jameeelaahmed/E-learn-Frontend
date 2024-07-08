import { useRef, useImperativeHandle, forwardRef } from "react";
import classes from './FilterModal.module.css'
const FilterModal = forwardRef(function FilterModal(_, ref) {
    const modalRef = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close();
        }
    }));
    return (
        <dialog ref={modalRef} className={classes.modal}>

        </dialog>
    );
})

export default FilterModal;