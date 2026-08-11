import React, { useState, useEffect } from 'react';
import {
  addDays,
  addHours,
  addMonths,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from 'date-fns';
import './CountupCard.scss';

function formatDate(date: Date | string) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

interface CountupCardProps {
  countdownId: string;
  title: string;
  startDate: Date | string;
  onRemove: (key: string) => void;
}

function CountupCard(input: CountupCardProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const startDar = typeof input.startDate === 'string'
    ? parseISO(input.startDate)
    : input.startDate;

  const years = differenceInYears(now, startDar);
  const afterYears = addYears(startDar, years);
  const yearWord = years === 1 ? 'year' : 'years';

  const months = differenceInMonths(now, afterYears);
  const afterMonths = addMonths(afterYears, months);
  const monthWord = months === 1 ? 'month' : 'months';

  const days = differenceInDays(now, afterMonths);
  const afterDays = addDays(afterMonths, days);
  const dayWord = days === 1 ? 'day' : 'days';

  const hours = differenceInHours(now, afterDays);
  const afterHours = addHours(afterDays, hours);
  const hourWord = hours === 1 ? 'hour' : 'hours';

  const minutes = differenceInMinutes(now, afterHours);
  const minuteWord = minutes === 1 ? 'minute' : 'minutes';

  const handleRemove = () => {
    input.onRemove(input.countdownId);
  };

  return (
    <div className='card'>
      <button type='button' className="cross-button" title='Remove card' onClick={handleRemove}><span aria-hidden="true">×</span></button>
      <div className="card-body">
        <p>It has been</p>
        <div className='countdown-sentence'>
          {years > 0 && <span className='countdown-unit'><span className="number">{years}</span> {yearWord} </span>}
          {months > 0 && <span className='countdown-unit'><span className="number">{months}</span> {monthWord} </span>}
          {days > 0 && <span className='countdown-unit'><span className="number">{days}</span> {dayWord} </span>}
          {hours > 0 && <span className='countdown-unit'><span className="number">{hours}</span> {hourWord} </span>}
          {minutes > 0 && <span className='countdown-unit'><span className="number">{minutes}</span> {minuteWord} </span>}
          {minutes === 0 && <span className='countdown-unit'><span className="number">less than a minute</span></span>}
        </div>
        <p>since you {input.title}</p>
        <p className="card-date">Started on {formatDate(input.startDate)}</p>
      </div>
    </div>
  );
}

export default CountupCard;
