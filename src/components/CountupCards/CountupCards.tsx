import React, { useState, useEffect } from 'react';
import CountupCard from '../CountupCard/CountupCard';
import './CountupCards.scss';
import AddNew from '../AddNew/AddNew';
import { LocalStorageUpdater } from '../AddNew/LocalStorageUpdater';
import { CountUp } from './CountupModel';

function CountupCards() {
    const localStorageUpdater = new LocalStorageUpdater();
    const [countdowns, setCountdowns] = useState<CountUp[]>(localStorageUpdater.getLocalStorage());

    useEffect(() => {
        localStorageUpdater.updateLocalStorage(JSON.stringify(countdowns));
    }, [countdowns]);

    function addToCountdowns(title: string, startDate: string) {
        setCountdowns(prevCountdowns => {
            return [
                ...prevCountdowns,
                new CountUp(crypto.randomUUID().toString(), new Date(startDate), title)
            ]
        });
    }

    function removeFromCountdowns(whichId: string) {
        setCountdowns(prevCountdowns => {
            return prevCountdowns.filter((countdown, key) => countdown.id !== whichId);
        });
    }

    return (
        <>
            <div className="header-form">
                <AddNew callUp={addToCountdowns}></AddNew>
            </div>
            <div className="countup-cards">
                {
                    countdowns
                        .filter(cou => cou !== null)
                        .map((countdown, index) => (
                            <CountupCard key={countdown.id} countdownId={countdown.id} title={countdown.title} startDate={countdown.startDate} onRemove={removeFromCountdowns} />
                        ))}
            </div>
        </>
    );
}

export default CountupCards;
