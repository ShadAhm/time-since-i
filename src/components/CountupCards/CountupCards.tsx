import React, { useState, useEffect } from 'react';
import CountupCard from '../CountupCard/CountupCard';
import './CountupCards.scss';
import AddNew from '../AddNew/AddNew';

function CountupCards() {
    const [countdowns, setCountdowns] = useState([{ title: 'smoked a cigarette', startDate: new Date('2021-12-12') }, { title: 'last ate meat', startDate: new Date('2021-10-24') }]);

    function addToCountdowns(title: string, startDate: string) {
        setCountdowns(prevCountdowns => {
            return [
              ...prevCountdowns,
              { title: title, startDate: new Date(startDate) }
            ]
          })
    }

    return (
        <>
            <div className="header-form">
                <AddNew callUp={addToCountdowns}></AddNew>
            </div>
            <div className="countup-cards">
                {countdowns.map((countdown, index) => (
                    <CountupCard key={index} title={countdown.title} startDate={countdown.startDate} />
                ))}
            </div>
        </>
    );
}

export default CountupCards;
