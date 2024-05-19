import { useTranslation } from 'react-i18next';
import classes from './VotingModal.module.css';
import * as FaIcons from 'react-icons/fa6';

export default function VotingQuestion({ options, onAddOption, onDeleteOption, onOptionChange }) {
    const { t } = useTranslation();

    return (
        <div className={classes.question}>
            <div className={classes.input_container}>
                <label htmlFor="description">{t("survey-description")}</label>
                <input
                    type="text"
                    name="description"
                    dir='auto'
                    onBlur={(e) => onOptionChange(0, e.target.value)}
                />
            </div>
            {options.map((option, optionIndex) => (
                <div className={classes.option} key={optionIndex}>
                    <div className={classes.input_container}>
                        <label htmlFor={`option-${optionIndex + 1}`}>{t("option")}{optionIndex + 1}</label>
                        <textarea
                            type="text"
                            name={`option-${optionIndex}`}
                            id={`option-${optionIndex}`}
                            dir='auto'
                            value={option}
                            onChange={(e) => onOptionChange(optionIndex, e.target.value)}
                        />
                    </div>
                    {optionIndex > 1 && (
                        <FaIcons.FaCircleXmark className={classes.x_icon} onClick={() => onDeleteOption(optionIndex)} />
                    )}
                </div>
            ))}
            <div className={classes.add_button} onClick={onAddOption}>
                <FaIcons.FaPlus className={classes.icon} />
                <p>{t("Add-Option")}</p>
            </div>
        </div>
    );
}
