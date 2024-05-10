import React, { useState, useRef } from 'react';
import classes from './otp.module.css';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

const Otp = () => {
    const { t } = useTranslation();
    const [finalInput, setFinalInput] = useState('');
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    function handleInputChange(index, e){
        const { value, key } = e.target;
        const sanitizedValue = value.replace(/[^0-9]/g, '');
    
        if (key === 'Backspace') {
            if (value === '') {
                if (index > 0) {
                    inputRefs[index - 1].current.focus();
                }
            } else {
                setFinalInput(prevInput => prevInput.slice(0, -1));
            }
        } else {
            if (sanitizedValue.length === 1) {
                setFinalInput(prevInput => prevInput + sanitizedValue);
                if (index < 5) {
                    inputRefs[index + 1].current.focus();
                }
            } else if (sanitizedValue.length > 1) {
                e.target.value = sanitizedValue[0];
            }
        }
    };
    
    function handlePaste(e){
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
        const formattedData = pastedData.replace(/[^0-9]/g, '').split('').slice(0, 6);

        formattedData.forEach((value, index) => {
            if (inputRefs[index] && inputRefs[index].current) {
                inputRefs[index].current.value = value;
                setFinalInput(prevInput => prevInput + value);
            }
        });
    };

    function handleSubmit(){
        const OtpValue=finalInput;
    };


    return (
        <div className={classes.container}>
            <p className={classes.otp}>{t("OTP")}</p>
            <div className={classes.inputfield} style={{ direction: 'ltr' }}>
                {inputRefs.map((ref, index) => (
                    <input
                        key={index}
                        ref={ref}
                        type="number"
                        maxLength="1"
                        className={classes.input}
                        onChange={(e) => handleInputChange(index, e)}
                        onPaste={handlePaste}
                    />
                ))}
            </div>
            <div className={classes.action}>
                <Button text={t("continue")} id="submit" onSelect={handleSubmit}/>
            </div>
            <p className={classes.not}>{t('didnt-get-the-code')}</p>
        </div>
    );
};

export default Otp;
