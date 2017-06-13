
class Room {
    description : string;
    id : number;

    isLocked : boolean;    
    inventory : Array<Item> = [];
    northExit : Room;
    southExit : Room;
    eastExit : Room;
    westExit : Room;
    ladderExit : Room;

    /**
     * Create a room described "description". Initially, it has
     * no exits. "description" is something like "a kitchen" or
     * "an open court yard".
     * @param description The room's description.
     */
    constructor(id: number, description : string) {
        this.description = description;
        this.id = id;
        this.isLocked = false;
    }

    /**
     * Define the exits of this room.  Every direction either leads
     * to another room or is null (no exit there).
     * @param north The north exit.
     * @param east The east east.
     * @param south The south exit.
     * @param west The west exit.
     */
    setExits(north : Room, east : Room, south : Room, west : Room, ladder : Room) : void {
        if(north != null) {
            this.northExit = north;
        }
        if(east != null) {
            this.eastExit = east;
        }
        if(south != null) {
            this.southExit = south;
        }
        if(west != null) {
            this.westExit = west;
        }
        if(ladder != null){
            this.ladderExit = ladder;
        }
    }
    
    setInventory(item:Item): void {
        this.inventory.push(item);
    }

    getId(): string
    {
        return String(this.id);
    }

    setDescripion(description: string){
        this.description = description;
    }
    
    setLock(lock: boolean){
        this.isLocked = lock;
    }

  

    

}

