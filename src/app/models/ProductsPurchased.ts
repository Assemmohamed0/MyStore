export class ProductsPurchased
{
    description: string;
    id:number;
    name: string;
    price: number;
    url: string;
    amount:number;
    totalPrice:number;
    
    constructor()
    {
        this.description = "",
        this.id = 0,
        this.name = "",
        this.price = 0.0,
        this.url = "",
        this.amount = 1,
        this.totalPrice = 0
        
    }
}