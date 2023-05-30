import React, { useState, useEffect } from 'react';
import './CountupCard.scss';

interface CountupCardProps {
  countdownId: string;
  title: string;
  startDate: Date;
  onRemove: (key: string) => void;
}

function CountupCard(input: CountupCardProps) {
  const [countUpDate, setCountUpDate] = useState(new Date(input.startDate).getTime());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeElapsed = now - countUpDate;
      setElapsed(timeElapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [countUpDate]);

  const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor((elapsed % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));

  const handleRemove = () => {
    input.onRemove(input.countdownId);
  };

  return (
    <div className='card'>
      <button type='button' className="cross-button" title='Remove card' onClick={handleRemove}><span aria-hidden="true">×</span></button>
      <div className="card-body">
        <p>It has been</p>
        <div className='countdown-sentence'>
          {years > 0 && <span className='countdown-unit'><span className="number">{years}</span> years </span>}
          {days > 0 && <span className='countdown-unit'><span className="number">{days}</span> days </span>}
          {hours > 0 && <span className='countdown-unit'><span className="number">{hours}</span> hours </span>}
          {minutes > 0 && <span className='countdown-unit'><span className="number">{minutes}</span> minutes </span>}
          {minutes === 0 && <span className='countdown-unit'><span className="number">less than a minute</span></span>}
        </div>
        <p>since you {input.title}</p>
      </div>
    </div>
  );
}

export default CountupCard;
