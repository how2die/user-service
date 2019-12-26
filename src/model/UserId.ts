export class UserId {
    
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public value(): string {
        return this.id;
    }
}
