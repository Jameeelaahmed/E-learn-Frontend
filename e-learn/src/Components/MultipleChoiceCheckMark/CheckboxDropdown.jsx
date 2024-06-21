import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import Select from 'react-select';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import classes from './CheckboxDropdown.module.css';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: 'transparent',
        boxShadow: 'var(--inset-input-shadow)',
        borderRadius: '20px',
        padding: '9px 10px',
        width: '100%',
        outline: state.isFocused ? 'transparent' : null
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '20px'
    })
};

const CheckboxDropdown = forwardRef((props, ref) => {
    const [options, setOptions] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    // Fetch groups from the API
    async function fetchGroups() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetUserGroups', token);
            if (response.statusCode === 200) {
                const groupOptions = response.data.map(group => ({
                    value: group.id,
                    label: group.name
                }));
                setOptions(groupOptions);
                console.log("Fetched groups: ", groupOptions); // Logging fetched groups
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    useImperativeHandle(ref, () => ({
        getSelectedGroups: () => selectedGroups
    }));

    const handleChange = (selectedOptions) => {
        setSelectedGroups(selectedOptions || []);
    };

    return (
        <div className={classes.checkboxDropdown}>
            <Select
                styles={customStyles}
                options={options}
                isMulti
                placeholder="Select groups"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
});

export default CheckboxDropdown;
