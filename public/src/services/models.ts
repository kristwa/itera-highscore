
    export class HighscoreEntry {
        time: number;
        name: string;
        email: string;       
    }

    export class SocketHighscoreEntry {
        registerUser: string;
    }

    export class StandardCommand {
        command: string;
        constructor(command: string) {
            this.command = command;
        }

    }
