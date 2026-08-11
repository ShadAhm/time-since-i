import React, { useState, useEffect, useMemo } from 'react';
import { parseISO } from 'date-fns';
import CountupCard from '../CountupCard/CountupCard';
import './CountupCards.scss';
import AddNew from '../AddNew/AddNew';
import Modal from '../Modal/Modal';
import { LocalStorageUpdater } from '../AddNew/LocalStorageUpdater';
import { CountUp } from './CountupModel';

type SortOrder = 'oldest' | 'newest';

const SORT_ORDER_KEY = 'countups-sort-order';

function isSortOrder(value: string | null): value is SortOrder {
    return value === 'oldest' || value === 'newest';
}

function toDate(date: Date | string): Date {
    return typeof date === 'string' ? parseISO(date) : date;
}

function CountupCards() {

    const [countdowns, setCountdowns] = useState<CountUp[]>(() => {
        const localStorageUpdater = new LocalStorageUpdater();
        return localStorageUpdater.getLocalStorage()
    });

    const [isAddOpen, setIsAddOpen] = useState(false);

    // Sticks to whatever the user last picked, so the list doesn't reshuffle
    // to the default order on every visit.
    const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
        const stored = localStorage.getItem(SORT_ORDER_KEY);
        return isSortOrder(stored) ? stored : 'oldest';
    });

    useEffect(() => {
        const localStorageUpdater = new LocalStorageUpdater();
        localStorageUpdater.updateLocalStorage(JSON.stringify(countdowns));
    }, [countdowns]);

    useEffect(() => {
        localStorage.setItem(SORT_ORDER_KEY, sortOrder);
    }, [sortOrder]);

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
        const text = sortedCountdowns
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

    const visibleCountdowns = countdowns.filter(cou => cou !== null);

    const sortedCountdowns = useMemo(() => {
        const direction = sortOrder === 'oldest' ? 1 : -1;
        return [...visibleCountdowns].sort(
            (a, b) => direction * (toDate(a.startDate).getTime() - toDate(b.startDate).getTime())
        );
    }, [visibleCountdowns, sortOrder]);

    return (
        <>
            <div className="toolbar">
                <div className="sort-field">
                    <label htmlFor="sortOrder">Sort</label>
                    <select
                        id="sortOrder"
                        className="sort-select"
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                    >
                        <option value="oldest">Oldest first</option>
                        <option value="newest">Newest first</option>
                    </select>
                </div>
                <div className="toolbar-actions">
                    <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => void copyAllDates()}
                        disabled={visibleCountdowns.length === 0}
                    >
                        Copy all dates
                    </button>
                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setIsAddOpen(true)}
                    >
                        Add countup
                    </button>
                </div>
            </div>

            {sortedCountdowns.length === 0 ? (
                <div className="empty-state">
                    <p>Nothing tracked yet.</p>
                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setIsAddOpen(true)}
                    >
                        Add your first countup
                    </button>
                </div>
            ) : (
                <div className="countup-cards">
                    {sortedCountdowns.map((countdown) => (
                        <CountupCard key={countdown.id} countdownId={countdown.id} title={countdown.title} startDate={countdown.startDate} onRemove={removeFromCountdowns} />
                    ))}
                </div>
            )}

            <Modal
                open={isAddOpen}
                title="Add a countup"
                onClose={() => setIsAddOpen(false)}
            >
                <AddNew callUp={addToCountdowns} onSubmitted={() => setIsAddOpen(false)} />
            </Modal>
        </>
    );
}

export default CountupCards;
