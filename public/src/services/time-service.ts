
    export interface ITimeService {
        getTimeForMilliseconds(milsec: string): string;
        getMillisecondsFromSeconds(seconds: number): number
    }

    export class TimeService implements ITimeService {
        getTimeForMilliseconds(milsec: string): string {
            var ms = parseInt(milsec);
            var min = (ms/1000/60) << 0;
            var sec = (ms/1000) % 60;
            return min + " minutter, " + parseInt(sec + "") + " sekunder";
        }

        getMillisecondsFromSeconds(seconds: number): number {
            return seconds*1000;
        }
    }
