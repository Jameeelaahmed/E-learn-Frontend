import { useRef, useImperativeHandle, forwardRef } from "react";
import classes from './DeleteModal.module.css';
import * as FaIcons from 'react-icons/fa6';
import { useTranslation } from "react-i18next";
import DeleteButton from "../Button/DeleteButton";
import { useLocation } from "react-router-dom";
const DeleteModal = forwardRef(function DeleteModal({ onDelete, deletedItem }, ref) {
    const deletemodalref = useRef();
    const { t } = useTranslation();
    const location = useLocation();
    const path = location.pathname;
    useImperativeHandle(ref, () => ({
        open: () => {
            deletemodalref.current.showModal();
        },
        close: () => {
            deletemodalref.current.close();
        }
    }));

    return (
        <dialog ref={deletemodalref} className={classes.modal}>
            <div className={classes.deleteContainer}>
                <div>
                    <p className={classes.exIcon}>
                        <FaIcons.FaExclamation className={classes.icon} />
                    </p>
                </div>
                <p className={classes.sen}>{t("deleteconfirm")} {deletedItem}!</p>
                <div className={classes.buttons}>
                    {path === '/chat' ?
                        <>
                            <button onClick={onDelete} className={classes.delete}>{t("delete for me and ")} user</button>
                            <button onClick={onDelete} className={classes.delete}>{t("delete for me only")}</button>
                        </> : <>
                            <DeleteButton onDelete={onDelete} text="Delete"></DeleteButton>
                            <button onClick={() => deletemodalref.current.close()} className={classes.cancel}>{t("cancel")}</button>
                        </>
                    }
                </div>
            </div>
        </dialog>
    );
});

export default DeleteModal;
