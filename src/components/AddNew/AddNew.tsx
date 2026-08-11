import React, { useState } from 'react';
import './AddNew.scss';

/**
 * A `datetime-local` input only accepts `YYYY-MM-DDTHH:mm` in local time — an
 * ISO string with seconds and a `Z` suffix is rejected and the field renders
 * blank, so the seed value has to be formatted explicitly.
 */
function toLocalDateTimeValue(date: Date) {
    const pad = (value: number) => String(value).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
        + `T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function emptyInputValues() {
    return { lastTime: '', lastDate: toLocalDateTimeValue(new Date()) };
}

interface AddNewProps {
    callUp: (title: string, startDate: string) => void;
    onSubmitted?: () => void;
}

function AddNew(props: AddNewProps) {
    const [inputValues, setInputValues] = useState(emptyInputValues);
    const [error, setError] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value });

        if (error) {
            setError('');
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (inputValues.lastTime.trim() === '') {
            setError('The last time you did what?');
            return;
        }

        props.callUp(inputValues.lastTime.trim(), inputValues.lastDate);

        clearInputValues();
        props.onSubmitted?.();
    }

    function clearInputValues() {
        setInputValues(emptyInputValues());
        setError('');
    }

    return (
        <form onSubmit={handleSubmit} id='addNewForm' noValidate>
            <div className='form-field'>
                <label htmlFor='lastTime'>The last time you</label>
                <input
                    type='text'
                    id='lastTime'
                    name='lastTime'
                    placeholder='e.g. smoked a cigarette'
                    value={inputValues.lastTime}
                    onChange={handleChange}
                    aria-invalid={error !== ''}
                    aria-describedby={error ? 'lastTime-error' : undefined}
                    data-autofocus
                />
            </div>
            <div className='form-field'>
                <label htmlFor='lastDate'>was at</label>
                <input
                    type='datetime-local'
                    id='lastDate'
                    name='lastDate'
                    value={inputValues.lastDate}
                    onChange={handleChange}
                />
            </div>
            {error && <p className='form-error' id='lastTime-error' role='alert'>{error}</p>}
            <button type='submit' className='form-submit'>Add countup</button>
        </form>
    );
}

export default AddNew;
