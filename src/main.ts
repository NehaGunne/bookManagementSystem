import {Book} from "./lib/book";
import {BookManager} from "./lib/bookManager";
let result=[];
let tab=document.getElementById("tbody") as HTMLTableElement;
let table=document.getElementById("table1") as HTMLDivElement;
let home=document.getElementById("homeCont") as HTMLDivElement;
let inp=document.getElementById("searchInput") as HTMLInputElement;
let searchPg=document.getElementById("searchCont") as HTMLDivElement;
let addPg=document.getElementById("addCont") as HTMLDivElement;
let selEl=document.getElementById("select") as HTMLSelectElement;
let selValue="";
let priceCont=document.getElementById("price") as HTMLDivElement;
let othersCont=document.getElementById("otherThanPrice") as HTMLDivElement;
let count=0;
class BookApp{
     addBook(each:Book){
        let {name,author,rating,price,id}=each;
        var row=`<tr id=${id}>
                <td>${name}</td>
                <td>${author}</td>
                <td>${rating}</td>
                <td>${price}</td>
                <td>
                <button class="delete">
                <i class="fas fa-trash-alt"></i>
                </button>
                </td>
            </tr>`;
        tab.innerHTML += row;
    }
     getBooksList(){
        table.classList.remove("d-none");
        if(count==0){
            for(let i of books){
                appObj.addBook(i);
            }
            count++;
        }
        }
     getSearchPage(){
         count=0;
        table.classList.add("d-none");
        home.classList.add("d-none");
        tab.innerHTML="";
        searchPg.classList.remove("d-none");
    
    }
     searchBooks(){
        result=[];
        tab.innerHTML="";
        let inpVal=inp.value;
        if(selValue==="name"){
            result=manager.searchByTitle(result,inpVal,books);
        }
        else if(selValue==="author"){
            result=manager.searchByAuthor(result,inpVal,books);
        }
        else if(selValue==="rating"){
            result=manager.searchByRating(result,inpVal,books);
        }
        else if(selValue==="price"){
            let minPrice=document.getElementById("priceMin") as HTMLInputElement;
            let maxPrice=document.getElementById("priceMax") as HTMLInputElement;
            let min=parseInt(minPrice.value);
            let max=parseInt(maxPrice.value);
            result=manager.searchByPrice(result,min,max,books);

        }
        table.classList.remove("d-none");
        for(let i of result){
           appObj.addBook(i);
    
       } 
    }
     getValue(){
        inp.placeholder="enter "+selEl.value;
        selValue=selEl.value;
        priceCont.classList.add("d-none");
        othersCont.classList.remove("d-none");
        if(selValue==="price"){
            priceCont.classList.remove("d-none");
            othersCont.classList.add("d-none");
        }
    }
     returnHome(){
        searchPg.classList.add("d-none");
        home.classList.remove("d-none");
        table.classList.add("d-none");
        addPg.classList.add("d-none");
    }
    getAddPage(){
        addPg.classList.remove("d-none");
        searchPg.classList.add("d-none");
        home.classList.add("d-none");
        table.classList.add("d-none");
        
    }
    getAddingDetails(){
        let addNameInp=document.getElementById("bookName") as HTMLInputElement;
        let addAuthorInp=document.getElementById("bookAuthor") as HTMLInputElement;
        let addRatingInp=document.getElementById("bookRating") as HTMLInputElement;
        let addPriceInp=document.getElementById("bookPrice") as HTMLInputElement;
        let addIdInp=document.getElementById("bookId") as HTMLInputElement;
        let name=addNameInp.value;
        let author=addAuthorInp.value;
        let rating=parseFloat(addRatingInp.value);
        let price=parseInt(addPriceInp.value);
        let id=parseInt(addIdInp.value);
        let msg=document.getElementById("msg");
        let flag=true;
        for(let i of books){
            flag=true;
            if(i.id===id){
                flag=false;
                alert("id already exists");
                msg.classList.add("d-none");

            }

        }
        if(name==""||author==""||rating==NaN||price==NaN||id==NaN){
            alert("enter all the details");
        }
        else if((!(name==""||author==""||rating==NaN||price==NaN||id==NaN)) && (flag)){
        msg.classList.remove("d-none");
        books.push(new Book(name,author,rating,price,id));
        localStorage.setItem("books",JSON.stringify(books));
    }
        
    }
 getBooksFromLocalStorage() {
  let stringifiedBooks = localStorage.getItem("books");
  let parsedBooks = JSON.parse(stringifiedBooks);
  if (parsedBooks=== null) {
    return [];
  } else {
    return parsedBooks;
  }
}
 onDeleteRow(e){
    if(!e.target.classList.contains("delete")){
        return;
    }
    const btn=e.target;
    btn.closest("tr").remove();
    let delEl=e.target.parentElement.parentElement.id;
    for(let i of books){
        if(i.id==delEl){
            let index=books.indexOf(i);
            books.splice(index,1);
            localStorage.setItem("books",JSON.stringify(books));
        }
    }
}
    

}
const manager=new BookManager;
const appObj=new BookApp();


let books = appObj.getBooksFromLocalStorage();
localStorage.setItem("books",JSON.stringify(books));

let bookList=document.getElementById("bookList");
bookList.addEventListener("click",appObj.getBooksList);

let getSearchPage=document.getElementById("getSearchPage");
getSearchPage.addEventListener("click",appObj.getSearchPage);


let searchEl=document.getElementById("searchBtn") as HTMLButtonElement;
searchEl.addEventListener("click",appObj.searchBooks);

let searchBack=document.getElementById("searchBack") as HTMLButtonElement;
searchBack.addEventListener("click",appObj.returnHome);

selEl.addEventListener("change",appObj.getValue);

let addBook=document.getElementById("addPage") as HTMLAnchorElement;
addBook.addEventListener("click",appObj.getAddPage);

let addBack=document.getElementById("addBack");
addBack.addEventListener("click",appObj.returnHome);

let addBtn=document.getElementById("addBtn") as HTMLButtonElement;
addBtn.addEventListener("click",appObj.getAddingDetails);


tab.addEventListener("click",appObj.onDeleteRow);
