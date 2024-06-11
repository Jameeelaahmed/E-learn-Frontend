import Week from "../Week/Week";
import WeekHead from "../Week/WeekHead";
import classes from "./Weeks.module.css";
import LecSec from "../Week/LecSec";
import * as FaIcons from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { httpRequest } from "../../HTTP";
import { getAuthToken } from "../../Helpers/AuthHelper";

export default function Weeks({ role }) {
    const [weeks, setWeeks] = useState([]);
    const [openWeeks, setOpenWeeks] = useState([]);
    const params = useParams();
    const groupId = params.groupId;

    const isInstructor = role === 'Staff';

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const token = getAuthToken();
                console.log("Fetching materials for group", groupId);
                const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Material/GetAllFromGroup/${groupId}`, token);
                console.log(response);
                if (response.statusCode === 200) {
                    const materialsByWeek = response.data.reduce((acc, material) => {
                        if (!acc[material.week]) {
                            acc[material.week] = [];
                        }
                        acc[material.week].push(material);
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
        setWeeks((prevWeeks) => [...prevWeeks, [prevWeeks.length + 1, []]]);
        setOpenWeeks((prevOpenWeeks) => [...prevOpenWeeks, false]); // Initialize the new week as closed
    }

    function handleDelete(weekIndex, materialId) {
        setWeeks((prevWeeks) => {
            const updatedWeeks = prevWeeks.map(([weekNum, materials], index) => {
                if (index === weekIndex) {
                    const updatedMaterials = materials.filter((material) => material.id !== materialId);
                    if (updatedMaterials.length === 0) {
                        return null; // Mark the week for removal if no materials are left
                    }
                    return [weekNum, updatedMaterials];
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
            const updatedWeeks = [...prevWeeks];
            const weekIndex = updatedWeeks.findIndex(([weekNum]) => weekNum === newMaterial.week);
            if (weekIndex !== -1) {
                updatedWeeks[weekIndex][1].push(newMaterial);
            } else {
                updatedWeeks.push([newMaterial.week, [newMaterial]]);
            }
            return updatedWeeks;
        });
    }

    const { t } = useTranslation();

    return (
        <div className={classes.weeks}>
            {isInstructor &&
                <div className={classes.add_week} onClick={handleAdd}>
                    <FaIcons.FaPlus className={classes.icon} />
                    <p>{t("add-week")}</p>
                </div>
            }

            {weeks.map(([weekNum, materials], weekIndex) => (
                <Week key={weekNum}>
                    <WeekHead
                        onSelect={() => handleOpen(weekIndex)}
                        weekNum={weekNum}
                        active={openWeeks[weekIndex]} // Pass the active state to WeekHead
                    />
                    {openWeeks[weekIndex] && (
                        <div className={classes.week_content}>
                            {materials.map((material) => (
                                <div className={classes.main} key={material.id}>
                                    <LecSec
                                        role={role}
                                        materialType={material.type === 0 ? `${t("Lecture")} ${weekNum}` : `${t("Section")} ${weekNum}`}
                                        onDelete={() => handleDelete(weekIndex, material.id)}
                                        material={material}
                                        weekNum={weekNum}
                                        onAddMaterial={handleAddMaterial} 
                                    />
                                </div>
                            ))}
                            {materials.length === 0 && (
                                <div className={classes.main}>
                                    <LecSec
                                        role={role}
                                        materialType={t("Lecture")}
                                        onDelete={() => handleDelete(weekIndex, null)}
                                        weekNum={weekNum}
                                        onAddMaterial={handleAddMaterial}
                                    />
                                    <LecSec
                                        role={role}
                                        materialType={t("Section")}
                                        onDelete={() => handleDelete(weekIndex, null)}
                                        weekNum={weekNum}
                                        onAddMaterial={handleAddMaterial}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </Week>
            ))}
        </div>
    );
}
