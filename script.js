// ===============================
// CLOCK
// ===============================


function updateClock(){

let now=new Date();

document.getElementById("time")
.innerHTML=
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();




// ===============================
// TODO STORAGE
// ===============================


let todos=
JSON.parse(localStorage.getItem("todos"))||[];


function renderTodos(){

let list=document.getElementById("todoList");

list.innerHTML="";


todos.forEach((todo,index)=>{

let li=document.createElement("li");

li.innerHTML=
`
${todo}

<button onclick="removeTodo(${index})">
✓
</button>
`;

list.appendChild(li);


});

}


function addTodo(){

let input=
document.getElementById("todoInput");


if(input.value){

todos.push(input.value);

localStorage.setItem(
"todos",
JSON.stringify(todos)
);


input.value="";

renderTodos();

}

}



function removeTodo(i){

todos.splice(i,1);

localStorage.setItem(
"todos",
JSON.stringify(todos)
);

renderTodos();

}



renderTodos();





// ===============================
// ASSIGNMENTS
// ===============================


let assignments=
JSON.parse(localStorage.getItem("assignments"))||[];


function renderAssignments(){

let list=
document.getElementById("assignmentList");

list.innerHTML="";


assignments.forEach((a,i)=>{

let li=document.createElement("li");

li.innerHTML=
`
${a}

<button onclick="removeAssignment(${i})">
✓
</button>

`;

list.appendChild(li);

});

}



function addAssignment(){

let input=
document.getElementById(
"assignmentInput"
);


if(input.value){

assignments.push(input.value);


localStorage.setItem(
"assignments",
JSON.stringify(assignments)
);


input.value="";

renderAssignments();

}

}



function removeAssignment(i){

assignments.splice(i,1);

localStorage.setItem(
"assignments",
JSON.stringify(assignments)
);


renderAssignments();

}


renderAssignments();






// ===============================
// HOMEWORK
// ===============================


let homework=
localStorage.getItem("homework")||0;


document.getElementById("homework")
.value=homework;


updateHomework();


function updateHomework(){

let value=
document.getElementById("homework").value;


document.getElementById(
"homeworkValue"
).innerHTML=value;


localStorage.setItem(
"homework",
value
);

}







// ===============================
// CALENDAR
// ===============================


function createCalendar(){

let date=new Date();


document.getElementById("calendar")
.innerHTML=

`

<h3>
${date.toLocaleDateString(
undefined,
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
)}
</h3>

`;

}


createCalendar();






// ===============================
// AI STUDY PLANNER
// ===============================


function generatePlan(){

let input=
document.getElementById(
"plannerInput"
).value;


let output=

`
<h3>Your Study Plan</h3>

<p>
1. Break "${input}" into smaller tasks.
</p>

<p>
2. Complete the most urgent deadline first.
</p>

<p>
3. Use 45 minute focus sessions with 10 minute breaks.
</p>

<p>
4. Review completed work before sleeping.
</p>

`;


document.getElementById(
"studyPlan"
).innerHTML=output;

}







// ===============================
// NEXT CLASS PLACEHOLDER
// Replace timetable data here
// ===============================


let classes=[

{
subject:"Maths",
time:"09:00"
},

{
subject:"English",
time:"10:00"
}

];


function nextClass(){

let now=new Date();

let next=classes[0];


document.getElementById(
"nextClass"
).innerHTML=

`
<h3>${next.subject}</h3>
<p>${next.time}</p>
`;

}


nextClass();
