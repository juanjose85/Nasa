// src/components/SelectFilter.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectFilter = ({ label, value, print, list, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="simple-date-select-label">{label}</InputLabel>
            <Select
                labelId="simple-date-select-label"
                id="simple-date-select"
                value={value}
                label={label}
                onChange={onChange}
            >
                {list.map((l, n) => (
                    <MenuItem key={l.date} value={l.date} >{l[print]}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectFilter;
