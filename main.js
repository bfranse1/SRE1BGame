var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game(output, input) {
        this.items = [];
        this.keys = [];
        this.charInv = [];
        this.rooms = [];
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createItems();
        this.createRooms();
        this.printWelcome();
    }
    Game.prototype.createItems = function () {
        this.items.push(new Item("Portfolio", "The bane of students"));
        this.items.push(new Item("Daan's guitar", "The holy guitar"));
        this.items.push(new Key("Yellow key", "used for a yellow door"));
        this.items.push(new Teleport("Teleporter", "Used to go back to the start!"));
    };
    Game.prototype.createRooms = function () {
        for (var i = 0; i < 30; i++) {
            this.rooms[i] = new Room(i + 1, "enter the next room");
        }
        this.rooms[28].setDescripion("in Daan's office, he is playing some epic tunes himself and sends you off");
        this.startRoom = new Room(0, "in the starters room, you begin your adventure here.");
        this.startRoom.setExits(this.rooms[0], null, null, null, null);
        this.rooms[0].setExits(this.rooms[17], this.rooms[1], this.startRoom, this.rooms[9], null);
        this.rooms[1].setExits(this.rooms[18], null, this.rooms[2], this.rooms[0], null);
        this.rooms[2].setExits(this.rooms[1], this.startRoom, this.rooms[3], null, null);
        this.rooms[3].setExits(this.rooms[2], this.rooms[23], this.rooms[4], null, null);
        this.rooms[4].setExits(this.rooms[3], this.rooms[24], null, this.rooms[5], null);
        this.rooms[5].setExits(this.rooms[6], this.rooms[4], null, this.rooms[14], null);
        this.rooms[6].setExits(this.startRoom, null, this.rooms[5], this.rooms[7], null);
        this.rooms[7].setExits(this.rooms[10], this.rooms[7], null, null, null);
        this.rooms[8].setExits(null, null, this.rooms[7], this.rooms[10], null);
        this.rooms[9].setExits(this.rooms[15], this.rooms[0], this.startRoom, null, null);
        this.rooms[10].setExits(this.startRoom, this.rooms[8], null, this.rooms[26], null);
        this.rooms[11].setExits(null, null, this.rooms[13], this.rooms[12], null);
        this.rooms[12].setExits(this.startRoom, this.rooms[11], this.startRoom, null, null);
        this.rooms[13].setExits(this.rooms[11], this.rooms[14], null, null, null);
        this.rooms[14].setExits(null, this.rooms[5], null, this.rooms[13], null);
        this.rooms[15].setExits(null, this.rooms[17], this.rooms[9], this.rooms[16], null);
        this.rooms[16].setExits(null, this.rooms[15], this.startRoom, this.startRoom, null);
        this.rooms[17].setExits(null, null, this.rooms[0], this.rooms[15], null);
        this.rooms[18].setExits(null, this.rooms[19], this.rooms[1], null, null);
        this.rooms[19].setExits(null, this.startRoom, null, this.rooms[18], null);
        this.rooms[20].setExits(null, null, this.rooms[21], this.rooms[25], null);
        this.rooms[21].setExits(this.rooms[20], null, this.rooms[22], null, null);
        this.rooms[22].setExits(this.rooms[21], null, null, this.rooms[23], null);
        this.rooms[23].setExits(null, this.rooms[22], null, this.rooms[3], null);
        this.rooms[24].setExits(null, this.startRoom, null, this.rooms[4], null);
        this.rooms[25].setExits(null, this.rooms[20], null, null, this.rooms[27]);
        this.rooms[26].setExits(null, this.rooms[10], null, null, null);
        this.rooms[27].setExits(this.rooms[28], null, null, null, this.rooms[25]);
        this.rooms[28].setExits(null, null, this.rooms[27], null, null);
        this.rooms[26].setInventory(this.items[0]);
        this.rooms[19].setInventory(this.items[2]);
        this.rooms[0].setInventory(this.items[3]);
        this.currentRoom = this.startRoom;
    };
    Game.prototype.printWelcome = function () {
        this.out.println("Welcome to the quest of the Holy Guitar");
        this.out.println("You need to steal Daan's guitar so you can play some epic tunes.");
        this.out.println("Type help if you need help");
        this.out.println();
        this.out.println("You " + this.currentRoom.description);
        this.out.print("Exits: ");
        if (this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if (this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if (this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if (this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        if (this.currentRoom.ladderExit != null) {
            this.out.print("ladder ");
        }
        this.out.println();
        this.out.print(">");
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    };
    Game.prototype.useKey = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            console.log('moet true zijn' + this.charInv[i].name !== "Yellow key");
            if (this.charInv[i].name == "Yellow key") {
                this.out.println("UNDER DEVELOPMENT");
                return false;
            }
        }
        this.out.println("You have no key!");
        return false;
    };
    Game.prototype.useTele = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            console.log('moet true zijn' + this.charInv[i].name !== "Teleporter");
            if (this.charInv[i].name == "Teleporter") {
                this.out.println("You teleport back to the start");
                this.currentRoom = this.startRoom;
                return false;
            }
        }
        this.out.println("You need to find the teleporter first!");
        return false;
    };
    Game.prototype.printError = function (params) {
        this.out.println("Please type a correct command for once...");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go, quit, help, look, pickup, use, teleport, key");
        return false;
    };
    Game.prototype.printHelp = function (params) {
        if (params.length > 0) {
            this.out.println("Help what?");
            return false;
        }
        this.out.println("You wander around in the university of applied sciences.");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go, quit, help, look, pickup, use, teleport, key");
        return false;
    };
    Game.prototype.printLook = function (params) {
        this.out.println("You are somewhere looking for Daan's guitar!");
        return false;
    };
    Game.prototype.useItem = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            console.log('moet true zijn' + this.charInv[i].name !== "Portfolio");
            if (this.currentRoom.id == 29 && this.charInv[i].name == "Portfolio") {
                var room30 = new Room(30, "in the mighty guitar room");
                room30.setExits(null, null, null, null, null);
                room30.setInventory(this.items[1]);
                console.log(this.currentRoom.inventory[0]);
                this.out.println("You use item: Portfolio");
                this.out.println("Daan starts reading your portfolio, he seems distracted");
                this.out.println("You see a door in the back of his office and quickly enter");
                this.out.println("You see Daan's guitar in the back of the room");
                this.currentRoom = room30;
            }
        }
        {
            this.out.println("You dont have an item yet, or you're not in the right place to use one.");
            return false;
        }
    };
    Game.prototype.getItem = function (params) {
        var item = this.currentRoom.inventory[0];
        if (item != null) {
            this.charInv.push(item);
            this.out.println("You pick up: " + item.name);
            this.currentRoom.inventory[0] = null;
            if (item.name == "Daan's guitar") {
                this.out.println("You've aquired Daan's guitar! Congratulations!");
                return true;
            }
            else {
                return false;
            }
        }
        else {
            this.out.println("There is no item to pickup!");
        }
        return false;
    };
    Game.prototype.goRoom = function (params) {
        console.log(this.currentRoom.inventory);
        if (params.length == 0) {
            this.out.println("Go where?");
            return false;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.currentRoom.westExit;
                break;
            case "ladder":
                nextRoom = this.currentRoom.ladderExit;
                break;
        }
        if (nextRoom == null || this.checkDoor(nextRoom)) {
            this.out.println("You can't go that way!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println("You " + this.currentRoom.description);
            if (this.currentRoom.inventory[0] != null) {
                this.out.println(String("Item in this room: " + this.currentRoom.inventory[0].name));
            }
            ;
            this.out.print("Exits: ");
            if (this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if (this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if (this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if (this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            if (this.currentRoom.ladderExit != null) {
                this.out.print("ladder ");
            }
            this.out.println();
        }
        return false;
    };
    Game.prototype.checkDoor = function (room) {
        if (room.isLocked) {
            console.log("asdasd");
            this.out.println("Door is locked, use the key to unlock");
            return true;
        }
        else {
            return false;
        }
    };
    Game.prototype.quit = function (params) {
        if (params.length > 0) {
            this.out.println("Quit what?");
            return false;
        }
        else {
            return true;
        }
    };
    return Game;
}());
var Item = (function () {
    function Item(name, description) {
        this.name = name;
        this.description = description;
    }
    return Item;
}());
var Key = (function (_super) {
    __extends(Key, _super);
    function Key(name, description) {
        var _this = _super.call(this, name, description) || this;
        _this.isKey = true;
        return _this;
    }
    return Key;
}(Item));
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.game = game;
        this.input = input;
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.print(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        switch (words[0]) {
            case "":
                break;
            case "help":
                wantToQuit = this.game.printHelp(params);
                break;
            case "go":
                wantToQuit = this.game.goRoom(params);
                break;
            case "quit":
                wantToQuit = this.game.quit(params);
                break;
            case "look":
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
            default:
                wantToQuit = this.game.printError(params);
        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    return Printer;
}());
var Room = (function () {
    function Room(id, description) {
        this.inventory = [];
        this.description = description;
        this.id = id;
        this.isLocked = false;
    }
    Room.prototype.setExits = function (north, east, south, west, ladder) {
        if (north != null) {
            this.northExit = north;
        }
        if (east != null) {
            this.eastExit = east;
        }
        if (south != null) {
            this.southExit = south;
        }
        if (west != null) {
            this.westExit = west;
        }
        if (ladder != null) {
            this.ladderExit = ladder;
        }
    };
    Room.prototype.setInventory = function (item) {
        this.inventory.push(item);
    };
    Room.prototype.getId = function () {
        return String(this.id);
    };
    Room.prototype.setDescripion = function (description) {
        this.description = description;
    };
    Room.prototype.setLock = function (lock) {
        this.isLocked = lock;
    };
    return Room;
}());
var Teleport = (function (_super) {
    __extends(Teleport, _super);
    function Teleport(name, description) {
        return _super.call(this, name, description) || this;
    }
    return Teleport;
}(Item));
