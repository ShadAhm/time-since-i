import { CountUp } from "../CountupCards/CountupModel";

export class LocalStorageUpdater {
    private key = 'countups';

    public updateLocalStorage(value: string): void {
        localStorage.setItem(this.key, value);
    }

    public getLocalStorage(): CountUp[] {
        const defaultCountUps: CountUp[] = [
            new CountUp(crypto.randomUUID().toString(), new Date('2021-12-12'), 'smoked a cigarette',),
            new CountUp(crypto.randomUUID().toString(), new Date('2021-10-24'), 'last ate meat')
        ];

        const countUps = JSON.parse(localStorage.getItem(this.key) ?? '[]') as CountUp[];

        if (countUps.length === 0) {
            this.updateLocalStorage(JSON.stringify(defaultCountUps));
            return defaultCountUps;
        }
        else
            return countUps;
    }

    public removeLocalStorage(): void {
        localStorage.removeItem(this.key);
    }
}