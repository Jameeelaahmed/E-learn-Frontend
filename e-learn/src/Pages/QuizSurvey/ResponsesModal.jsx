import { useRef, useImperativeHandle, forwardRef } from 'react';
import classes from './ResponsesModal.module.css';
import { createPortal } from 'react-dom';
import Button from '../../Components/Button/Button';

const ResponsesModal = forwardRef(function ResponsesModal(_, ref) {
    const viewResponses = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            if (viewResponses.current) {
                viewResponses.current.showModal();
            }
        },
        close: () => {
            if (viewResponses.current) {
                viewResponses.current.close();
            }
        }
    }));

    const handleClose = () => {
        if (viewResponses.current) {
            viewResponses.current.close();
        }
    };


    return createPortal(
        <dialog ref={viewResponses} className={classes.modal}>
            <div dir='auto' className={classes.questions}>
                <p className={classes.name}>name's response</p>
                <ul>
                    {/* MAP OVER QUESTIONS */}
                    <li dir='auto' className={classes.list}>
                        <p className={classes.title}>1) title</p>
                        {/* MAP OVER OPTIONS */}
                        <div>
                            <p className={classes.option}>option</p>
                            <p className={`${classes.option} ${classes.true}`}>option</p>
                            <p className={classes.option}>option</p>
                            <p className={classes.option}>option</p>
                        </div>
                    </li>
                    <li dir='auto' className={classes.list}>
                        <p className={classes.title}>1) title</p>
                        {/* MAP OVER OPTIONS */}
                        <div>
                            <p className={classes.option}>option</p>
                            <p className={`${classes.option} ${classes.true}`}>option</p>
                            <p className={classes.option}>option</p>
                            <p className={classes.option}>option</p>
                        </div>
                    </li>
                    <li dir='auto' className={classes.list}>
                        <p className={classes.title}>1) title</p>
                        {/* MAP OVER OPTIONS */}
                        <div>
                            <p className={classes.option}>option</p>
                            <p className={`${classes.option} ${classes.true}`}>option</p>
                            <p className={classes.option}>option</p>
                            <p className={classes.option}>option</p>
                        </div>
                    </li>
                </ul>
            </div>
            <Button onSelect={handleClose} text="close"></Button>
        </dialog>,
        document.getElementById('responses-Modal')
    );
});

export default ResponsesModal;
