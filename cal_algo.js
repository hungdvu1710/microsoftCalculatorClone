let firstHalf = null;
let operator = null;
let secondHalf = null;
let operationSoFar = null;
let switcher = false; //boolean value to alert num to start getting new value instead of appending to old ones
function disableButtons(but){
    const button = document.getElementsByClassName(but);
    for(let i =0; i<button.length;i++){
        button[i].setAttribute("disabled",true);
    }
    console.log("button disabled");
}
function enableButtons(but){
    const button = document.getElementsByClassName(but);
    for(let i =0; i<button.length;i++){
        button[i].disabled = false;
    }
    console.log("button enabled");
}
function percent(){
    //TODO: implement percent
}

function updateOperationSoFar(){
    operationSoFar = "Current Operations: " + firstHalf + " " + operator + " " + secondHalf;
}
function num(input){
    //always enable buttons when typing in new numbers
    const x = document.getElementById("result").innerText;
    enableButtons("operations");
    enableButtons("sign");
    enableButtons("decPoints");
    if(switcher){
        document.getElementById("result").innerText = input;
        switcher = false;
        return;
    }
    if(x.length == 1 && x == 0){
        document.getElementById("result").innerText = input;
    }
    else
        document.getElementById("result").innerText += input;
}
function oneOverX(){
    document.getElementById("result").innerText = 1/document.getElementById("result").innerText;
    switcher = true;
}
function Delete(){
    const x = document.getElementById("result").innerText;
    if(switcher){
        return;
    }
    if(isNaN(x) || x == Infinity){
        C();
        return;
    }
    if(x==0 && x.length == 1){
        return;
    }
    if(x.length == 1){
        document.getElementById("result").innerText = 0;
    }
    else{
        document.getElementById("result").innerText = x.slice(0,x.length-1);
    }
}
function xSquare(){
    const x = document.getElementById("result").innerText;
    document.getElementById("result").innerText = x**2;
    switcher = true;
}
function sqrtX(){
    const x = Number(document.getElementById("result").innerText);
    if(x<0){
        document.getElementById("result").innerText = "Invalid Input";
        disableButtons("operations");
        disableButtons("decPoint");
        disableButtons("sign");
        return;
    }
    document.getElementById("result").innerText = Math.sqrt(x);
    switcher = true;
}
function C(){
    //Ultimate delete button
    //Under certain circumstances, other buttons might rely totally on this
    //always enable other buttons when hitting C
    document.getElementById("result").innerText = 0;
    firstHalf = null;
    operator = null;
    secondHalf = null;
    enableButtons("operations");
    enableButtons("sign");
    enableButtons("decPoints");
    switcher = true;
}
function CE(){
    const x = Number(document.getElementById("result").innerText);
    if(isNaN(x) || x == Infinity){
        C();
        return;
    }
    document.getElementById("result").innerText = 0;
    firstHalf = null;
}
function decimalPoint(){
    const x = document.getElementById("result").innerText;
    if(!x.includes('.'))
        document.getElementById("result").innerText += '.';
}
function sign(){
    const x = document.getElementById("result").innerText;
    if(x.length == 1 && x == 0){
        return;
    }
    if(!x.includes('-'))
        document.getElementById("result").innerText = '-' + x;
    else
        document.getElementById("result").innerText = x.slice(1,x.length);
}
function getOperator(opt){
    const x = Number(document.getElementById("result").innerText);
    if(firstHalf && operator && secondHalf){
        const result = calculate(); 
        document.getElementById("result").innerText = result;

        firstHalf = result;
        operator = opt;
        console.log("firstHalf is: " + firstHalf);
        secondHalf = null;
        switcher = true;

        //for tracking purposes
        updateOperationSoFar(); 
        console.log(operationSoFar);
        return;
    }
    if(firstHalf == null){
        firstHalf = parseFloat(x);
        secondHalf = null;
        operator = opt;
        //for tracking purposes
        updateOperationSoFar();
        console.log(operationSoFar);

        console.log("firstHalf is:" + firstHalf);
        switcher = true;
    }
    else{
        secondHalf = parseFloat(x); //get the second half of the function
        const result = calculate(); 
        document.getElementById("result").innerText = result;
        firstHalf = parseFloat(result); //reset first half of the function to the new value
        switcher = true;
        operator = opt;
        
        //for tracking purposes
        updateOperationSoFar();
        console.log(operationSoFar);
    }
}
function calculate(){
    switch(operator){
        case "*":{
            const res = firstHalf * secondHalf;
            return res;
        }
        case "/":{
            const res = firstHalf / secondHalf;
            if(res ===Infinity){
                disableButtons("operations");
                disableButtons("sign");
                disableButtons("decPoints");
            }
            return res;
        }
        case "+":{
            const res = firstHalf + secondHalf;
            return res;
        }
        case "-":{
            const res = firstHalf - secondHalf;
            return res;
        }
        default:{
            console.log("Error while caluculating");
        }
            
    }
}
function getResult(){
    const x = Number(document.getElementById("result").innerText);
    console.log(x);
    if(isNaN(x) || x === Infinity){
        C();
        return;
    }
    if(!(firstHalf || secondHalf || operator)){
        switcher = true;

        //for tracking purposes
        updateOperationSoFar(); 
        console.log(operationSoFar);
        return;
    }
    if(!firstHalf && (secondHalf || operator)){
        firstHalf = x;
        updateOperationSoFar(); 
        const result = calculate();
        document.getElementById("result").innerText = result;

        firstHalf = null;
        switcher = true;

        //for tracking purposes
        
        console.log(operationSoFar);
        return;
    }
    if(firstHalf && operator && !secondHalf){
        secondHalf = x;
        //for tracking purposes
        updateOperationSoFar(); 
        const result = calculate();
        console.log(operationSoFar);


        document.getElementById("result").innerText = result;
        firstHalf = result;
        switcher = true;
        return;
    }
    if(firstHalf && operator && secondHalf){
        //for tracking purposes before updates
        updateOperationSoFar();
        console.log(operationSoFar);

        const result = calculate();
        document.getElementById("result").innerText = result;
        firstHalf = result;
        switcher = true;
        
        //for tracking purposes after updates
        console.log("First Half: " + firstHalf);
        console.log("Second Half: " + secondHalf);
        
        return;
    }
}