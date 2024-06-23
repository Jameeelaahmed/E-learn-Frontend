import { useRef, useImperativeHandle, forwardRef } from 'react';
import classes from './ResponsesModal.module.css';

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

    return (
        <dialog ref={viewResponses} className={classes.modal}>
            <div>
                <ul>
                    {/* MAP OVER QUESTIONS */}
                    <li dir='auto'>
                        <p>title</p>
                        {/* MAP OVER OPTIONS */}
                        <div>
                            <p>option</p>
                            <p>option</p>
                            <p>option</p>
                            <p>option</p>
                        </div>
                    </li>
                </ul>
            </div>
        </dialog>
    );
});

export default ResponsesModal;
