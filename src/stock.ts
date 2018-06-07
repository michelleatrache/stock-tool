export class Stock{
    id: string;
    price: string;
    amountOwned: string;

    constructor(id: string, price: string, amountOwned: string){
        this.id = id;
        this.price = price;
        this.amountOwned = amountOwned;
    }
}

