import { useRef, useState } from 'react';
import classes from './AdminSingleGroup.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import AddModal from './AddModal';
export default function AdminSingleGroup() {
    const { t } = useTranslation();
    const navigate = useNavigate(); // Initialize useHistory hook
    const location = useLocation();
    const path = location.pathname;
    const [activeSection, setActiveSection] = useState('material');
    const [direction, setDirection] = useState('left');
    const sections = ['Material', 'Assignments', 'Quizzes', 'Participants'];
    const { admingroupID } = useParams();
    const [searchTerm, setSearchTerm] = useState('');


    // const filteredResponses = responses.filter(response =>
    //     response.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const AddModalRef = useRef();


    function handleAddModal() {
        AddModalRef.current.open();
    }


    // Define paths for each section with correct interpolation
    const sectionPaths = {
        Material: `/admingroups/${admingroupID}`,
        Assignments: `/admingroups/${admingroupID}/assignments`,
        Quizzes: `/admingroups/${admingroupID}/quiz`,
        Participants: `/admingroups/${admingroupID}/participants`
    };



    const handleClick = (section) => {
        const newSectionIndex = sections.indexOf(section);
        const oldSectionIndex = sections.indexOf(activeSection);

        if (newSectionIndex > oldSectionIndex) {
            setDirection('right');
        } else if (newSectionIndex < oldSectionIndex) {
            setDirection('left');
        }

        setActiveSection(section);

        navigate(sectionPaths[section]);
    };

    return (
        <>
            <div className={classes.add_button}>
                <div className={classes.search}>
                    <input
                        type="text"
                        placeholder={t("search")}
                        value={searchTerm}
                        // onChange={e => setSearchTerm(e.target.value)}
                        className={`${classes.search_input}`}
                    // onFocus={handleSearchActive}
                    />
                </div>
                <div onClick={handleAddModal} className={classes.add}>
                    <FaIcons.FaCirclePlus />
                </div>
                <AddModal ref={AddModalRef}></AddModal>
            </div>
            <div className={classes.head}>
                {sections.map((section) => (
                    <div
                        key={section}
                        className={`${classes.section} ${activeSection === section ? classes.active : ''} ${activeSection === section && direction === 'right' ? classes.activeRight : ''} ${activeSection === section && direction === 'left' ? classes.activeLeft : ''}`}
                        onClick={() => handleClick(section)}
                    >
                        <p>{t(section)}</p>
                    </div>
                ))}
            </div>
            <div className={classes.table}>
                <ul>
                    {path === `/admingroups/${admingroupID}` &&
                        <div className={classes.table_content}>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("Material name")}</p>
                                <p>{t("Instructor Name")}</p>
                                <p>{t("Material Type")}</p>
                                <p>{t("Date")}</p>
                            </div>
                            {/* MAP  */}
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                            <li>
                                <p>num</p>
                                <p>material name</p>
                                <p>ins name</p>
                                <p>material type</p>
                                <p>date</p>
                            </li>
                        </div>
                    }
                    {path === `/admingroups/${admingroupID}/assignments` &&
                        <>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("Assignment Title")}</p>
                                <p>{t("Instructor Name")}</p>
                                <p>{t("Total Marks")}</p>
                                <p>{t("Date")}</p>
                            </div>
                            {/* MAP  */}
                            <li>
                                <p>num</p>
                                <p>name</p>
                                <p>creator</p>
                                <p>mark</p>
                                <p>date</p>
                            </li>
                        </>
                    }
                    {path === `/admingroups/${admingroupID}/quiz` &&
                        <>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("Quiz Title")}</p>
                                <p>{t("Instructor Name")}</p>
                                <p>{t("Total Marks")}</p>
                                <p>{t("Date")}</p>
                            </div>

                            {/* MAP  */}
                            <li>
                                <p>num</p>
                                <p>name</p>
                                <p>creator</p>
                                <p>degree</p>
                                <p>date</p>
                            </li>
                        </>
                    }
                    {path === `/admingroups/${admingroupID}/participants` &&
                        <>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("ID")}</p>
                                <p>{t("Name")}</p>
                                <p>{t("department")}</p>
                                <p>{t("Level")}</p>
                            </div>
                            {/* MAP  */}
                            <li>
                                <p>num</p>
                                <p>id</p>
                                <p>name</p>
                                <p>department</p>
                                <p>level</p>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </>
    );
}
