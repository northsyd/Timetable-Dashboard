// ================================
// STUDY DASHBOARD APP ENGINE
// ================================


// ----------------
// DEFAULT DATA
// ----------------


let timetable = JSON.parse(
localStorage.getItem("timetable")
) || [

{
subject:"Mathematics",
teacher:"Mr Smith",
room:"B203",
day:"Monday",
start:"09:00",
end:"10:00",
period:1
},

{
subject:"English",
teacher:"Ms Jones",
room:"A104",
day:"Monday",
start:"10:15",
end:"11:15",
period:2
},

{
subject:"Science",
teacher:"Dr Brown",
room:"Lab 2",
day:"Monday",
start:"12:00",
end:"13:00",
period:3
}

];



let subjects =
JSON.parse(
localStorage.getItem("subjects")
) || {};



let todos =
JSON.parse(
localStorage.getItem("todos")
) || [];


let assignments =
JSON.parse(
localStorage.getItem("assignments")
) || [];





// ----------------
// SUBJECT COLOURS
// ----------------


const colourPool = [

"#007aff",
"#34c759",
"#ff9500",
"#ff2d55",
"#af52de",
"#5ac8fa",
"#ffcc00",
"#5856d6"

];



function getSubjectColour(subject){


if(!subjects[subject]){


let used =
Object.values(subjects);


let colour =
colourPool.find(
c=>!used.includes(c)
)
||
colourPool[
Object.keys(subjects).length %
colourPool.length
];


subjects[subject]=colour;


localStorage.setItem(
"subjects",
JSON.stringify(subjects)
);

}


return subjects[subject];

}





// ----------------
// NAVIGATION
// ----------------


document.querySelectorAll(".nav")
.forEach(button=>{


button.onclick=()=>{


document.querySelectorAll(".nav")
.forEach(b=>b.classList.remove("active"));


button.classList.add("active");



document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));



document
.getElementById(button.dataset.page)
.classList.add("active");


};


});






// ----------------
// DATE
// ----------------


function updateDate(){

document.getElementById("date")
.innerHTML =
new Date()
.toLocaleDateString(
undefined,
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
);

}


updateDate();







// ----------------
// TODAY'S CLASSES
// ----------------


function renderToday(){


let today =
new Date()
.toLocaleDateString(
"en-US",
{
weekday:"long"
}
);



let classes =
timetable.filter(
x=>x.day===today
);



let container =
document.getElementById(
"todayClasses"
);


container.innerHTML="";



classes.forEach(c=>{


let div =
document.createElement("div");


div.className="lesson";


div.style.borderColor =
getSubjectColour(c.subject);



div.innerHTML=`

<div class="lesson-time">

${c.start}

</div>


<div class="lesson-info">

<h4>
${c.subject}
</h4>

<p>
${c.teacher}
|
${c.room}
</p>

<p>
Period ${c.period}
</p>

</div>

`;



container.appendChild(div);


});


checkCurrentLesson();


}









// ----------------
// CURRENT LESSON
// ----------------


function minutes(time){

let [h,m]=time.split(":");

return Number(h)*60+
Number(m);

}



function checkCurrentLesson(){


let now=new Date();


let current =
now.getHours()*60+
now.getMinutes();



let active =
timetable.find(c=>{


let start=minutes(c.start);

let end=minutes(c.end);



return (

c.day===
now.toLocaleDateString(
"en-US",
{
weekday:"long"
}
)

&&

current>=start

&&

current<=end

);


});




let box =
document.getElementById(
"currentLesson"
);



if(active){


box.innerHTML=`

<h2>
${active.subject}
</h2>

<p>
${active.teacher}
-
${active.room}
</p>

`;



}else{


box.innerHTML=
"No active lesson";


}


}




// ----------------
// NEXT CLASS COUNTDOWN
// ----------------



function countdown(){


let now=new Date();


let upcoming =
timetable
.filter(c=>{

return minutes(c.start) >
now.getHours()*60+
now.getMinutes();

})
.sort(
(a,b)=>
minutes(a.start)-minutes(b.start)
)[0];



let output =
document.getElementById(
"countdown"
);



if(!upcoming){

output.innerHTML=
"No more classes";

return;

}



let target =
new Date();


let [h,m]=
upcoming.start.split(":");


target.setHours(h);
target.setMinutes(m);
target.setSeconds(0);



let diff =
target-now;



let mins =
Math.floor(
diff/60000
);



output.innerHTML=

`${upcoming.subject}
in ${mins} min`;



}



setInterval(countdown,1000);









// ----------------
// FULL TIMETABLE
// ----------------


function renderTimetable(data=timetable){


let box=
document.getElementById(
"fullTimetable"
);


box.innerHTML="";



data.forEach(c=>{


let item=
document.createElement("div");


item.className="lesson";


item.style.borderColor =
getSubjectColour(c.subject);



item.innerHTML=`

<div class="lesson-time">

${c.day}<br>
${c.start}

</div>


<div class="lesson-info">

<h4>${c.subject}</h4>

<p>
${c.teacher}
-
${c.room}
</p>

</div>

`;



box.appendChild(item);



});


}




document
.getElementById(
"searchTimetable"
)
.addEventListener(
"input",
e=>{


let term=
e.target.value.toLowerCase();


renderTimetable(
timetable.filter(c=>

c.subject.toLowerCase()
.includes(term)

||

c.teacher.toLowerCase()
.includes(term)

)

);


});








// ----------------
// TODO SYSTEM
// ----------------


function renderTodos(){


let list =
document.getElementById(
"todoList"
);


list.innerHTML="";



todos.forEach((t,i)=>{


let li=
document.createElement("li");


li.innerHTML=
`

${t}

<button onclick="deleteTodo(${i})">
✓
</button>

`;


list.appendChild(li);


});


}



document
.getElementById("addTodo")
.onclick=()=>{


let input =
document.getElementById(
"todoInput"
);


if(input.value){


todos.push(input.value);


localStorage.setItem(
"todos",
JSON.stringify(todos)
);


input.value="";


renderTodos();


}


};



function deleteTodo(i){

todos.splice(i,1);

localStorage.setItem(
"todos",
JSON.stringify(todos)
);


renderTodos();

}









// ----------------
// ASSIGNMENTS
// ----------------


function renderAssignments(){


let box =
document.getElementById(
"assignmentList"
);


box.innerHTML="";



assignments.forEach(a=>{


box.innerHTML+=`

<div class="lesson">

${a}

</div>

`;


});


}









// ----------------
// AI PLANNER
// ----------------


document
.getElementById(
"generatePlan"
)
.onclick=()=>{


let input =
document.getElementById(
"plannerInput"
).value;



document.getElementById(
"studyPlan"
)
.innerHTML=

`

<h3>
Suggested Plan
</h3>

<p>
1. Start with the closest deadline.
</p>

<p>
2. Use 45 minute focus sessions.
</p>

<p>
3. Leave 15 minutes for review.
</p>

<p>
Based on:
${input}
</p>

`;


};









// ----------------
// ICS IMPORT
// ----------------


document
.getElementById(
"icsUpload"
)
.onchange=e=>{


let file=e.target.files[0];


let reader=new FileReader();



reader.onload=()=>{


let text=
reader.result;


parseICS(text);


};



reader.readAsText(file);


};





function parseICS(data){


let events =
data.split("BEGIN:VEVENT");



events.shift();



events.forEach(e=>{


let subject =
/SUMMARY:(.*)/
.exec(e);


if(subject){


timetable.push({

subject:
subject[1],

teacher:"",

room:"",

day:"Imported",

start:"09:00",

end:"10:00",

period:""

});


}


});


localStorage.setItem(
"timetable",
JSON.stringify(timetable)
);



document.getElementById(
"importStatus"
).innerHTML=
"✓ Timetable imported";


renderTimetable();

}








// ----------------
// DARK MODE
// ----------------


document
.getElementById(
"themeToggle"
)
.onclick=()=>{


document.body.classList.toggle(
"dark"
);


localStorage.setItem(
"dark",
document.body.classList.contains("dark")
);


};



if(
localStorage.getItem("dark")
==="true"
){

document.body.classList.add("dark");

}







// INITIAL LOAD

renderToday();

renderTimetable();

renderTodos();

renderAssignments();
