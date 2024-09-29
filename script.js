let keys=document.querySelector(".keys");
let input=document.querySelector(".input-box");
let display=document.querySelector(".display");
let secondary=document.querySelector(".secondary");

function initialize(){
    //i could've created arrays of 0,1...9 and then used map method to create corresponding nodes but then
    //i wouldn't be able to place them in order of my choice

    //digit buttons
    let btn_0=document.createElement("button");
    btn_0.classList.add("number");
    btn_0.textContent="0";
    btn_0.addEventListener("click",(target)=>handleThis(target));
    
    let btn_1=document.createElement("button");
    btn_1.classList.add("number");
    btn_1.textContent="1";

    let btn_2=document.createElement("button");
    btn_2.classList.add("number");
    btn_2.textContent="2";

    let btn_3=document.createElement("button");
    btn_3.classList.add("number");
    btn_3.textContent="3";

    let btn_4=document.createElement("button");
    btn_4.classList.add("number");
    btn_4.textContent="4";

    let btn_5=document.createElement("button");
    btn_5.classList.add("number");
    btn_5.textContent="5";

    let btn_6=document.createElement("button");
    btn_6.classList.add("number");
    btn_6.textContent="6";

    let btn_7=document.createElement("button");
    btn_7.classList.add("number");
    btn_7.textContent="7";

    let btn_8=document.createElement("button");
    btn_8.classList.add("number");
    btn_8.textContent="8";

    let btn_9=document.createElement("button");
    btn_9.classList.add("number");
    btn_9.textContent="9";


    //control buttons
    btn_ac=document.createElement("button");
    btn_ac.classList.add("control");
    btn_ac.textContent="AC";

    btn_cal=document.createElement("button");
    btn_cal.classList.add("control");
    btn_cal.textContent="=";


    //operator buttons
    btn_rem=document.createElement("button");
    btn_rem.classList.add("operator");
    btn_rem.textContent="%";

    btn_add=document.createElement("button");
    btn_add.classList.add("operator");
    btn_add.textContent="+";

    btn_sub=document.createElement("button");
    btn_sub.classList.add("operator");
    btn_sub.textContent="-";

    btn_mul=document.createElement("button");
    btn_mul.classList.add("operator");
    btn_mul.textContent="*";

    btn_div=document.createElement("button");
    btn_div.classList.add("operator");
    btn_div.textContent="%";


    //miscellaneous
    btn_dec=document.createElement("button");
    btn_dec.classList.add("miscl");
    btn_dec.textContent=".";


    btn_neg=document.createElement("button")
    btn_neg.classList.add("miscl");
    btn_neg.textContent="+/-";



    keys.appendChild(btn_ac);
    keys.appendChild(btn_neg);
    keys.appendChild(btn_rem);
    keys.appendChild(btn_div);
    keys.appendChild(btn_7);
    keys.appendChild(btn_8);
    keys.appendChild(btn_9);
    keys.appendChild(btn_mul);
    keys.appendChild(btn_4);
    keys.appendChild(btn_5);
    keys.appendChild(btn_6);
    keys.appendChild(btn_sub);
    keys.appendChild(btn_1);
    keys.appendChild(btn_2);
    keys.appendChild(btn_3);
    keys.appendChild(btn_add);
    keys.appendChild(btn_0);
    keys.appendChild(btn_dec);
    keys.appendChild(btn_cal);

    let nodeLst=keys.querySelectorAll(".keys button");
    let arr=Array.from(nodeLst);

    //setting the size of all buttons
    let styles=window.getComputedStyle(keys);
    let h=parseInt(styles.height.slice(0,styles.height.length-2));
    let w=parseInt(styles.width.slice(0,styles.height.length-2));

    for(let node of arr){
        node.style.height=h/5+"px";
        node.style.width=w/4+"px";
    }
    btn_0.style.width=w/2+"px";
    //fitting the input-box in display
    let styleDisplay=window.getComputedStyle(display);
    let hgt=parseInt(styleDisplay.height.slice(0,styleDisplay.length-2));
    let wdt=parseInt(styleDisplay.width.slice(0,styleDisplay.length-2));
    input.style.height=(hgt-4)*7/10+"px";
    input.style.width=(wdt-6)+"px";
    secondary.style.height=(hgt-4)*3/10+"px";
    //setting color for digits:
    let nodeDigit=document.querySelectorAll(".number");
    let nodeDigitArr=Array.from(nodeDigit);
    for(let node of nodeDigitArr){
        node.style["background-color"]="gray";
    }
    //setting bg for operators
    let nodeOpr=document.querySelectorAll(".operator");
    let nodeOprArr=Array.from(nodeOpr);
    for(let node of nodeOprArr){
        node.style["background-color"]="orange";
    }
    keys.addEventListener("click",(event)=>{handleInput(event)});
}


let operand1=0;
let operand2=0;
let opr1Found=0;
let opr2Found=0;
let operator="";


function calculate(){
    if(operator==="+"){
        operand1=operand1+operand2;
        operand2=0;
    }
    else if(operator==="-"){
        operand1=operand1-operand2;
        operand2=0;
    }
    else if(operator==="*"){
        operand1=operand1*operand2;
        operand2=0;
    }
    else if(operator==="%"){
        operand1=operand1%operand2;
        operand2=0;
    }
    else if(operator==="/"){
        operand1=operand1/operand2;
        operand2=0;
    }
    //handle the decimal limit upto 2 places
    updateDislplay();
    operator="";
}
function updateDislplay(){
    if(!opr2Found){
        input.value=String(operand1);
    }
    else{
        input.value=String(operand2);
        secondary.textContent=operand1;
    }
    // console.log(input.value);
}
function handleInput(event){
    let target=event.target;
    if(target.classList.contains("number")){

        let digit=parseInt(target.textContent);
        if(!opr2Found){
            operand1=operand1*10+digit;
        }
        else{
            operand2=operand2*10+digit;
        }
    }
    else if(target.classList.contains("operator")){
        if(operator!=""){  //calculate the previous one if two operators are stacked
            calculate();
        }
        operator=target.textContent;
        opr2Found=1;
    }
    else if(target.classList.contains("control")){
        let opr=target.textContent;
        if(opr==="AC"){
            operand1=0;
            operand2=0;
            opr2Found=0;
        }
        else if(opr==="=" && opr2Found){
            calculate();
        }
    }
    updateDislplay();
}

document.addEventListener("DOMContentLoaded",()=>{initialize()});

