const table = document.getElementById("Table")
const tableHead = document.getElementById("TableHead")
const tableBody = document.getElementById("TableBody")
const addButton = document.getElementById("AddStock")
const addaStock = document.getElementById("AddaStock")
const submitStockbtn  =document.getElementById("submit-btn")
const cancelStockbtn  =document.getElementById("cancel-btn")
const contententire  =document.getElementById("content-stock")



addButton.addEventListener('click',addStockfunc);
cancelStockbtn.addEventListener('click',cancelStockfunc);
submitStockbtn.addEventListener('click',submitStockfunc);
let StockPrice;

function displayTable(){

    table.style.display = ""
    addButton.style.display = ""
    addaStock.style.display = "none"

}

function displayAddStockForm(){

    console.log(table.style.display)
    table.style.display = "none"
    addButton.style.display = "none"
    addaStock.style.display = ""

}


function addStockfunc(){
    displayAddStockForm()

}

function cancelStockfunc(){ 
    displayTable()
}





function submitStockfunc(){
    let stockTicker = document.getElementById('StockTicker').value
    let stockQty = document.getElementById('StockQty').value
    let country = document.getElementById('country').value

    let stockexists = 1;
    let stockstatusmsg = '';


    //fetchstock(stockTicker,Country)
    // let stockPrice = StockPrice
    //     // Add the stock
        fetchstock(stockTicker,country,stockQty)


    console.log(stockstatusmsg)
    displayTable()

}


 let displaymessageG;

 function displaymessage(message,color){

        message = message
        let ele = document.createElement('a')
        ele.append(message)    
        contententire.appendChild(ele)
        displaymessageG = ele
        console.log(ele.style.color = color)
        setTimeout(displaymessageTimeout,3000)
}

 function displaymessageTimeout(){
    displaymessageG.remove()    
 }



 function fetchstock(symbol,country,StockQty){

    // Search for the Stock 
    let url = "https://api.tradingeconomics.com/markets/symbol/"+symbol+":"+country+'?c=guest:guest'
    

    var xhttp = new XMLHttpRequest();
    
    
    let found = false;



    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        const Stock = JSON.parse(xhttp.responseText)[0]

        console.log(Stock)


        if (Stock !== undefined){

            StockPrice = Stock.Last
            symbol = Stock.Name
            console.log(StockPrice);
            DisplayStock(symbol,StockPrice,StockQty)
            stockstatusmsg = "Added the Stock"
            displaymessage(stockstatusmsg,'green')       
        }else{

            stockstatusmsg = "Cannot find the stock"
            displaymessage(stockstatusmsg,'red')        


        }

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();



 }

 function DisplayStock(stockTicker,stockPrice,stockQty){

    let stock = `
    <tr>
    <td>${stockTicker}</td>
    <td>${stockPrice}</td>
    <td>${stockQty}</td>
    <td>${(stockPrice*stockQty).toFixed(2)}</td>
    <td>
        <a href="#">
            <span class="glyphicon glyphicon-trash"></span>
        </a>
        <a href="#">
            <span class="glyphicon glyphicon-edit"></span>
        </a>
    </td>
    </tr>  
    `

    const element = document.createElement('tr')
    element.innerHTML = stock
    tableBody.appendChild(element)
 
}