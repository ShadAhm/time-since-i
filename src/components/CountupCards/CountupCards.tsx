import React, { useState, useEffect } from 'react';
import CountupCard from '../CountupCard/CountupCard';
import './CountupCards.scss';
import AddNew from '../AddNew/AddNew';

function CountupCards() {
    const [countdowns, setCountdowns] = useState([
        { id: crypto.randomUUID().toString(), title: 'smoked a cigarette', startDate: new Date('2021-12-12') },
        { id: crypto.randomUUID().toString(), title: 'last ate meat', startDate: new Date('2021-10-24') }
    ]);

    function addToCountdowns(title: string, startDate: string) {
        setCountdowns(prevCountdowns => {
            return [
                ...prevCountdowns,
                { id: crypto.randomUUID().toString(), title: title, startDate: new Date(startDate) }
            ]
        })
    }

    function removeFromCountdowns(whichId: string) {
        setCountdowns(prevCountdowns => {
            return prevCountdowns.filter((countdown, key) => countdown.id !== whichId);
        })
    }

    return (
        <>
            <div className="header-form">
                <AddNew callUp={addToCountdowns}></AddNew>
            </div>
            <div className="countup-cards">
                {countdowns.map((countdown, index) => (
                    <CountupCard countdownId={countdown.id} title={countdown.title} startDate={countdown.startDate} onRemove={removeFromCountdowns} />
                ))}
            </div>
        </>
    );
}

export default CountupCards;
