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
import { getMilestone } from './milestones';
import './CountupCard.scss';

function toDate(date: Date | string) {
  return typeof date === 'string' ? parseISO(date) : date;
}

function formatDate(date: Date | string) {
  const parsedDate = toDate(date);
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

  const startDar = toDate(input.startDate);

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

  const milestone = getMilestone(startDar, now);

  const handleRemove = () => {
    input.onRemove(input.countdownId);
  };

  return (
    <article className='card' data-milestone={milestone.id}>
      <div className='card-head'>
        <button
          type='button'
          className='card-remove'
          title={`Remove "${input.title}"`}
          onClick={handleRemove}
        >
          <span aria-hidden='true'>&times;</span>
          <span className='visually-hidden'>Remove {input.title}</span>
        </button>
      </div>

      <div className='card-body'>
        <p className='card-eyebrow'>It has been</p>
        <p className='card-count'>
          {years > 0 && <span className='count-unit'><span className='count-number'>{years}</span> {yearWord}</span>}
          {months > 0 && <span className='count-unit'><span className='count-number'>{months}</span> {monthWord}</span>}
          {days > 0 && <span className='count-unit'><span className='count-number'>{days}</span> {dayWord}</span>}
          {hours > 0 && <span className='count-unit'><span className='count-number'>{hours}</span> {hourWord}</span>}
          {minutes > 0 && <span className='count-unit'><span className='count-number'>{minutes}</span> {minuteWord}</span>}
          {years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0 && <span className='count-unit'><span className='count-number'>less than a minute</span></span>}
        </p>
        <h2 className='card-title'>since you {input.title}</h2>
      </div>

      <p className='card-date'>
        Started <time dateTime={formatDate(input.startDate)}>{formatDate(input.startDate)}</time>
      </p>
    </article>
  );
}

export default CountupCard;
