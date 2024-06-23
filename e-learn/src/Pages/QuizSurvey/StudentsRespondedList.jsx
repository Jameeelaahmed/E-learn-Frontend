import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import Button from '../../Components/Button/Button';
import listclasses from './list.module.css';
import ResponsesModal from './ResponsesModal';
export default function StudentsRespondedList() {
    const { t } = useTranslation();
    const { surveyId } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const dialog = useRef();
    function openDialog() {
        if (dialog.current) {
            dialog.current.open();
        }
    }
    return (
        <div className={listclasses.table}>
            <ul>
                {path.includes(`survey/${surveyId}/responses`) &&
                    <div className={listclasses.table_content}>
                        <div className={listclasses.table_head}>
                            <p>Number</p>
                            <p>{t("Student name")}</p>
                            <p>{t("Date")}</p>
                            <p>{t("Time")}</p>
                            <p>{t("View Responses")}</p>
                        </div>

                        <li>
                            <p>num</p>
                            <p>name</p>
                            <p>date</p>
                            <p>time</p>
                            <p>
                                <Button onSelect={openDialog} text={t("view")}></Button>
                                <ResponsesModal ref={dialog} />
                            </p>
                        </li>

                    </div>
                }
            </ul>
        </div>
    )
}