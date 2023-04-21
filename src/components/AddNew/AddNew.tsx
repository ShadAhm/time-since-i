import React, { useState, useEffect } from 'react';

interface AddNewProps {
    callUp: Function;
  }

function AddNew(props: AddNewProps) {
    const [inputValues, setInputValues] = useState({ lastTime: '', lastDate: '' });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        props.callUp(inputValues.lastTime, inputValues.lastDate);

        clearInputValues();
    }

    function clearInputValues() {
        setInputValues({ lastTime: '', lastDate: '' });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="lastTime">The last time you:</label>
            <input type="text" id="lastTime" name="lastTime" value={inputValues.lastTime} onChange={handleChange} />
            <label htmlFor="lastDate">was at:</label>
            <input type="date" id="lastDate" name="lastDate" value={inputValues.lastDate} onChange={handleChange} />
            <input type="submit" value="Add" />
        </form>
    );
}

export default AddNew;
