class Parser {
    input : HTMLInputElement;
    game : Game;

    /**
     * Creates the parser object.
     * 
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    constructor(game: Game, input : HTMLInputElement) {
        this.game = game;
        this.input = input;
        input.onkeyup = (e) => { // event handler function
            if (e.keyCode == 13 && this.game.isOn) {
                // Invoke parse method wehen user pressed enter
                let command = this.input.value;
                this.game.out.println(command);
                this.parse(command.split(" "));
                this.input.value = ""; // clears the input element 
                this.game.out.print(">");
            } 
        }
    }

    /**
     * Parses the specified words and invokes the corresponding method
     * on the game object.
     * 
     * @param words an array of words to parse
     */
    parse(words : string[]) : void {
        let wantToQuit = false;
        let params = words.slice(1);
        switch (words[0]) {
            case "" :
                // Do nothing when user enters nothing 
                break
            case "help" : 
                wantToQuit = this.game.printHelp(params);
                break;
            case "go" :
                wantToQuit = this.game.goRoom(params);
                break;
            case "quit" : 
                wantToQuit = this.game.quit(params);
                break;
            case "look" : 
                wantToQuit = this.game.printLook(params);
                break;
            case "pickup":
                wantToQuit = this.game.getItem(params);
                break;
            case "use":
                wantToQuit = this.game.useItem(params);
                break;
            case "key":
                wantToQuit = this.game.useKey(params);
                break;
            case "teleport":
                wantToQuit = this.game.useTele(params);
                break;
            default :
                // print an error when command is not known
                wantToQuit = this.game.printError(params);

        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    }

}