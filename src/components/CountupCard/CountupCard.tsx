import React, { useState, useEffect } from 'react';
import './CountupCard.scss';

interface CountupCardProps {
  key: number;
  title: string;
  startDate: Date;
}

function CountupCard(input: CountupCardProps) {
  const [countUpDate, setCountUpDate] = useState(input.startDate.getTime());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeElapsed = now - countUpDate;
      setElapsed(timeElapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [countUpDate]);

  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  return (
    <div className='card'>
      <p>It has been</p>
      <div className='countdown-sentence'>
        {days > 0 && <span className='countdown-unit'><span className="number">{days}</span> days </span>}
        {hours > 0 && <span className='countdown-unit'><span className="number">{hours}</span> hours </span>}
        {minutes > 0 && <span className='countdown-unit'><span className="number">{minutes}</span> minutes </span>}
        <span className='countdown-unit'><span className="number">{seconds}</span> seconds </span>
      </div>
      <p>since you {input.title}</p>
    </div>
  );
}

export default CountupCard;
