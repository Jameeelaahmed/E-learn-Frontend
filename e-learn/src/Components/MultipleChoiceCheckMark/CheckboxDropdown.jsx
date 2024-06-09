import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import classes from './CheckboxDropdown.module.css'; // Ensure you have a CSS file for additional styling if needed

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: 'transparent',
        boxShadow: 'var(--inset-input-shadow)', // Match the box shadow
        borderRadius: '20px',
        padding: '9px 10px',
        width: '100%', // Ensure it takes the full width of the container
        outline: state.isFocused ? 'transparent' : null
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '20px'
    })
};

const CheckboxDropdown = React.forwardRef((props, ref) => {
    const [options, setOptions] = useState([]);

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
        fetchGroups(); // Call fetchGroups when the component mounts
    }, []);

    return (
        <div className={classes.checkboxDropdown}>
            <Select
                ref={ref}
                styles={customStyles}
                options={options}
                isMulti
                placeholder="Select groups"
                classNamePrefix="select"
            />
        </div>
    );
});

export default CheckboxDropdown;
