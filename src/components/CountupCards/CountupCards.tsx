import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import CountupCard from '../CountupCard/CountupCard';
import './CountupCards.scss';
import AddNew from '../AddNew/AddNew';
import { LocalStorageUpdater } from '../AddNew/LocalStorageUpdater';
import { CountUp } from './CountupModel';

function CountupCards() {

    const [countdowns, setCountdowns] = useState<CountUp[]>(() => {
        const localStorageUpdater = new LocalStorageUpdater();
        return localStorageUpdater.getLocalStorage()
    });

    useEffect(() => {
        const localStorageUpdater = new LocalStorageUpdater();
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

    function removeFromCountdowns(id: string) {
        setCountdowns(prevCountdowns => {
            return prevCountdowns.filter(countdown => countdown.id !== id);
        });
    }

    function formatDate(date: Date | string) {
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    async function copyAllDates() {
        const text = countdowns
            .map((countdown) => `The last time you ${countdown.title} was at ${formatDate(countdown.startDate)}`)
            .join('\n');

        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    
    return (
        <>
            <div className="header-form">
                <AddNew callUp={addToCountdowns}></AddNew>
            </div>
            <div className="countup-cards-actions">
                <button type="button" className="copy-all-button" onClick={() => void copyAllDates()}>Copy All Dates</button>
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
