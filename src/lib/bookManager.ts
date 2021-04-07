import {Book} from "./book";

class BookManager{
    searchByTitle(res,inpVal,books){
        for(let i of books){
            if(i.name===inpVal){
                res.push(i);
            }
        }
        return res;
    
    }
    searchByAuthor(res,inpVal,books){
        for(let i of books){
            if(i.author===inpVal){
                res.push(i);
            }
        }
        return res;
    
    }
    searchByRating(res,inpVal,books){
        for(let i of books){
            if(i.rating>=parseFloat(inpVal)){
                res.push(i);
            }
        }
        return res;
    
    }
    searchByPrice(res,min,max,books){
        for(let i of books){
            if(i.price>=min && i.price<=max){
                res.push(i);
            }
        }
        return res;
    
    }

    
    
}
const manager=new BookManager();
export{
    BookManager,
}