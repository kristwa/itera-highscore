import { HighscoreEntry } from './models';


    export interface IHighscoreService {
        highscores: Array<HighscoreEntry>;
        storeHighscoreEntry(entry: HighscoreEntry): void;
        resyncLocalHighscore(entries: Array<HighscoreEntry>): void;
    }

    export class HighscoreService implements IHighscoreService  {
        getExcited: string = "false";
        highscores: Array<HighscoreEntry>;

        constructor(private localStorageService: angular.local.storage.ILocalStorageService){
            this.fetchHighscores();
        }

        resyncLocalHighscore(entries: Array<HighscoreEntry>): void {
            this.highscores = this.sortEntries(entries);
            this.setHighscores();
        }

        storeHighscoreEntry(entry: HighscoreEntry): void {
            this.highscores.push(entry);
            this.highscores = this.sortEntries(this.highscores);
            this.setHighscores();

        }

        private fetchHighscores() {
            var storageHighscores = this.localStorageService.get<Array<HighscoreEntry>>("highscores");
            if (storageHighscores) {
                this.highscores = storageHighscores;
            } else {
                console.log('nothing in storage:' + storageHighscores);
                this.highscores = [];
            }
        }


        private setHighscores() {
            this.localStorageService.set<Array<HighscoreEntry>>("highscores", this.highscores);
        }

        private sortEntries(entries: Array<HighscoreEntry>) {
            return _.sortBy(this.highscores, ['time']);
        }
        
    }
