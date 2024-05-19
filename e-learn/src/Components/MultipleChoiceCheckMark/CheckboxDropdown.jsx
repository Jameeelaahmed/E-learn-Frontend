import React, { useState } from 'react';
import Select from 'react-select';
import classes from './CheckboxDropdown.module.css'
import { useRef,forwardRef ,useImperativeHandle} from 'react';
const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
];

const CheckboxDropdown = forwardRef( function CheckboxDropdown({name},ref) {
    const [selectedGroups, setSelectedGroups] = useState([]);

    useImperativeHandle(ref, () => ({
        selectedGroups
    }));
    function handleGroupChange(selectedGroups) {
        setSelectedGroups(selectedGroups);
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: 'transparent', // custom border color
            boxShadow: "5px 5px 10px 0 #161b1d23 inset,-5px -5px 10px 0 #fafbffd1 inset", // custom box shadow
            width:"175px",
            borderRadius:"20px",
            outline:state.isFocused?"transperant":null
        }),
    };

    return (
        <Select
            isMulti
            options={options}
            value={selectedGroups}
            onChange={handleGroupChange}
            closeMenuOnSelect={false}
            name={name}
            components={{
                Option: CustomOption
            }}
            styles={customStyles}
        />
    );
})

export default CheckboxDropdown;

function CustomOption({ children, innerProps }) {
    // Filter out unrecognized props
    const { clearValue, ...restProps } = innerProps;

    return (
        <div {...restProps}>
            <label className={classes.container}>
                <input type="checkbox" {...innerProps}/ >
                <div className={classes.checkmark}></div>
                {children}
            </label>
        </div>
    );
};


