import Week from "../Week/Week";
import WeekHead from "../Week/WeekHead";
import classes from "./Weeks.module.css";
import LecSec from "../Week/LecSec";
import * as FaIcons from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { httpRequest } from "../../HTTP";
import { getAuthToken, getRole } from "../../Helpers/AuthHelper";

export default function Weeks({ role }) {
    const [weeks, setWeeks] = useState([]);
    const [openWeeks, setOpenWeeks] = useState([]);
    const params = useParams();
    const groupId = params.groupId;

    const isInstructor = getRole() === 'Staff';

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const token = getAuthToken();
                const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Material/GetAllFromGroup/${groupId}`, token);
                if (response.statusCode === 200) {
                    const materialsByWeek = response.data.reduce((acc, material) => {
                        if (!acc[material.week]) {
                            acc[material.week] = { lectures: [], sections: [] };
                        }
                        if (material.type === 0) {
                            acc[material.week].lectures.push(material);
                        } else {
                            acc[material.week].sections.push(material);
                        }
                        return acc;
                    }, {});

                    setWeeks(Object.entries(materialsByWeek));
                    setOpenWeeks(Object.keys(materialsByWeek).map(() => false)); // Initialize all weeks as closed
                } else {
                    console.log(response.message);
                }
            } catch (error) {
                console.error("Error fetching materials:", error);
            }
        }

        fetchMaterials();
    }, [groupId]);

    function handleAdd() {
        setWeeks((prevWeeks) => [...prevWeeks, [`${prevWeeks.length + 1}`, { lectures: [], sections: [] }]]);
        setOpenWeeks((prevOpenWeeks) => [...prevOpenWeeks, false]); // Initialize the new week as closed
    }

    function handleDelete(weekIndex, materialId) {
        setWeeks((prevWeeks) => {
            const updatedWeeks = prevWeeks.map(([weekNum, materials], index) => {
                if (index === weekIndex) {
                    const updatedLectures = materials.lectures.filter((material) => material.id !== materialId);
                    const updatedSections = materials.sections.filter((material) => material.id !== materialId);
                    if (updatedLectures.length === 0 && updatedSections.length === 0) {
                        return null; // Mark the week for removal if no materials are left
                    }
                    return [weekNum, { lectures: updatedLectures, sections: updatedSections }];
                }
                return [weekNum, materials];
            }).filter(week => week !== null); // Remove empty weeks
            return updatedWeeks;
        });
    }

    function handleOpen(weekIndex) {
        setOpenWeeks((prevOpenWeeks) => {
            const updatedOpenWeeks = [...prevOpenWeeks];
            updatedOpenWeeks[weekIndex] = !updatedOpenWeeks[weekIndex]; // Toggle the visibility state of the clicked week
            return updatedOpenWeeks;
        });
    }

    function handleAddMaterial(newMaterial) {
        setWeeks((prevWeeks) => {
            const weekIndex = prevWeeks.findIndex(([weekNum]) => weekNum === newMaterial.week.toString());
            if (weekIndex !== -1) {
                return prevWeeks.map(([weekNum, materials], index) => {
                    if (index === weekIndex) {
                        if (newMaterial.type === 0) {
                            return [weekNum, { ...materials, lectures: [...materials.lectures, newMaterial] }];
                        } else {
                            return [weekNum, { ...materials, sections: [...materials.sections, newMaterial] }];
                        }
                    }
                    return [weekNum, materials];
                });
            } else {
                const newWeek = [newMaterial.week.toString(), newMaterial.type === 0 ? { lectures: [newMaterial], sections: [] } : { lectures: [], sections: [newMaterial] }];
                return [...prevWeeks, newWeek];
            }
        });

        // Ensure the newly added material's week is open
        setOpenWeeks(prevOpenWeeks => {
            const weekIndex = weeks.findIndex(([weekNum]) => weekNum === newMaterial.week.toString());
            if (weekIndex !== -1) {
                const updatedOpenWeeks = [...prevOpenWeeks];
                updatedOpenWeeks[weekIndex] = true; // Open the week where the material is added
                return updatedOpenWeeks;
            } else {
                return [...prevOpenWeeks, true]; // Open the new week
            }
        });
    }

    const { t } = useTranslation();
    console.log(isInstructor);
    return (
        <div className={classes.weeks}>
            {isInstructor &&
                <div className={classes.add_week} onClick={handleAdd}>
                    <FaIcons.FaPlus className={classes.icon} />
                    <p>{t("add-week")}</p>
                </div>
            }

            {weeks.map(([weekNum, materials], weekIndex) => (
                <Week key={`${weekNum}-${weekIndex}`}>
                    <WeekHead
                        onSelect={() => handleOpen(weekIndex)}
                        weekNum={weekNum}
                        active={openWeeks[weekIndex]} // Pass the active state to WeekHead
                    />
                    {openWeeks[weekIndex] && (
                        <div className={classes.week_content}>
                            <div className={classes.main}>
                                <LecSec
                                    role={role}
                                    materialType={t("Lecture")}
                                    materials={materials.lectures}
                                    onDelete={(materialId) => handleDelete(weekIndex, materialId)}
                                    weekNum={weekNum}
                                    onAddMaterial={handleAddMaterial}
                                />
                            </div>
                            <div className={classes.main}>
                                <LecSec
                                    role={role}
                                    materialType={t("Section")}
                                    materials={materials.sections}
                                    onDelete={(materialId) => handleDelete(weekIndex, materialId)}
                                    weekNum={weekNum}
                                    onAddMaterial={handleAddMaterial}
                                />
                            </div>
                        </div>
                    )}
                </Week>
            ))}
        </div>
    );
}
