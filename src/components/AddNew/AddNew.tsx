import React, { useState } from 'react';
import './AddNew.scss';

interface AddNewProps {
    callUp: Function;
}

function AddNew(props: AddNewProps) {
    const [inputValues, setInputValues] = useState({ lastTime: '', lastDate: new Date().toISOString() });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(inputValues.lastTime === null || inputValues.lastTime === '') {
            alert('The last time you did what?');
            return;
        }

        props.callUp(inputValues.lastTime, inputValues.lastDate);

        clearInputValues();
    }

    function clearInputValues() {
        setInputValues({ lastTime: '', lastDate: new Date().toISOString() });
    }

    return (
        <form onSubmit={handleSubmit} id='addNewForm'>
            <div className="form-input">
                <label htmlFor="lastTime">The last time you:</label>
                <input type="text" id="lastTime" name="lastTime" value={inputValues.lastTime} onChange={handleChange} />
            </div>
            <div className="form-input">
                <label htmlFor="lastDate">was at:</label>
                <input type="datetime-local" id="lastDate" name="lastDate" value={inputValues.lastDate} onChange={handleChange} />
            </div>
            <input type="submit" value="Add" />
        </form>
    );
}

export default AddNew;
