export class Book{
    name:string;
    author:string;
    rating:number;
    price:number;
    id:number;
    constructor(name:string,author:string,rating:number,price:number,id:number){
        this.name=name;
        this.author=author;
        this.rating=rating;
        this.price=price;
        this.id=id;
    }
}