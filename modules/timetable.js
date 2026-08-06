// =====================================
// Study Dashboard
// Timetable Engine
// =====================================


import {

    getTimetable

} from "./storage.js";


import {

    getSubjectColour

} from "./colours.js";





let timetable = [];








// =====================================
// LOAD DATA
// =====================================


export async function loadTimetable(){


    timetable =
    getTimetable();



    // If no timetable exists,
    // create example data

    if(timetable.length===0){


        timetable = [

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
            }


        ];


    }


}









// =====================================
// TIME HELPERS
// =====================================



function convertTime(time){


    const parts =
    time.split(":");


    return (

        Number(parts[0]) * 60

        +

        Number(parts[1])

    );


}




function todayName(){


    return new Date()
    .toLocaleDateString(
        "en-US",
        {
            weekday:"long"
        }
    );


}









// =====================================
// TODAY VIEW
// =====================================


function renderToday(){


    const container =
    document.getElementById(
        "todayTimeline"
    );


    if(!container)return;



    container.innerHTML="";



    const today =
    todayName();



    const classes =
    timetable.filter(
        c =>
        c.day === today
    );



    classes.forEach(c=>{


        const card =
        createLessonCard(c);



        container.appendChild(card);


    });



}









// =====================================
// CREATE LESSON CARD
// =====================================


function createLessonCard(c){


    const div =
    document.createElement(
        "div"
    );


    div.className =
    "lesson";



    div.dataset.subject =
    c.subject;



    div.style.borderColor =
    getSubjectColour(
        c.subject
    );



    div.innerHTML = `


        <div class="lesson-time">

            ${c.start}

        </div>



        <div class="lesson-details">


            <h4>
                ${c.subject}
            </h4>


            <p>
                ${c.teacher}
            </p>


            <p>

                Room:
                ${c.room}

                |

                Period:
                ${c.period}

            </p>


        </div>


    `;



    return div;

}









// =====================================
// CURRENT LESSON
// =====================================


function updateCurrentLesson(){


    const box =
    document.getElementById(
        "currentLesson"
    );


    if(!box)return;



    const now =
    new Date();



    const minutes =
    now.getHours()*60
    +
    now.getMinutes();



    const current =
    timetable.find(c=>{


        return (

            c.day===todayName()

            &&

            minutes >=
            convertTime(c.start)

            &&

            minutes <=
            convertTime(c.end)

        );


    });




    if(current){


        box.innerHTML = `


        <h2>
        ${current.subject}
        </h2>


        <p>
        ${current.teacher}
        |
        ${current.room}
        </p>


        <p>
        Period ${current.period}
        </p>


        `;


    }

    else{


        box.innerHTML =
        "No lesson currently running.";

    }


}








// =====================================
// NEXT CLASS COUNTDOWN
// =====================================


function updateCountdown(){


    const title =
    document.getElementById(
        "nextClass"
    );


    const counter =
    document.getElementById(
        "countdown"
    );


    if(!title || !counter)
        return;




    const now =
    new Date();



    const currentMinutes =
    now.getHours()*60
    +
    now.getMinutes();



    const upcoming =
    timetable

    .filter(c=>

        c.day===todayName()

        &&

        convertTime(c.start)
        >
        currentMinutes

    )

    .sort(
        (a,b)=>
        convertTime(a.start)
        -
        convertTime(b.start)

    )[0];





    if(!upcoming){


        title.innerHTML =
        "No more classes";


        counter.innerHTML =
        "";

        return;

    }





    title.innerHTML =
    upcoming.subject;



    const target =
    new Date();



    const [hour,minute] =
    upcoming.start.split(":");



    target.setHours(hour);

    target.setMinutes(minute);

    target.setSeconds(0);




    const difference =
    target-now;



    const mins =
    Math.floor(
        difference / 60000
    );



    counter.innerHTML =

    `Starts in ${mins} minutes`;



}









// =====================================
// WEEKLY / TIMELINE VIEW
// =====================================


function renderWeekly(data=timetable){


    const box =
    document.getElementById(
        "weeklyTimetable"
    );


    if(!box)return;



    box.innerHTML="";



    data.forEach(c=>{


        box.appendChild(
            createLessonCard(c)
        );


    });



}









function renderTimeline(data=timetable){


    const box =
    document.getElementById(
        "timelineTimetable"
    );


    if(!box)return;



    box.innerHTML="";


    data
    .sort(
        (a,b)=>
        convertTime(a.start)
        -
        convertTime(b.start)

    )

    .forEach(c=>{


        box.appendChild(
            createLessonCard(c)
        );


    });


}








// =====================================
// SEARCH
// =====================================


function setupSearch(){


    const input =
    document.getElementById(
        "timetableSearch"
    );


    if(!input)return;



    input.oninput = ()=>{


        const value =
        input.value
        .toLowerCase();



        const filtered =
        timetable.filter(c=>

            c.subject
            .toLowerCase()
            .includes(value)

            ||

            c.teacher
            .toLowerCase()
            .includes(value)

        );



        renderWeekly(filtered);


    };


}








// =====================================
// INITIALISE
// =====================================


export function initTimetable(){


    renderToday();


    renderWeekly();


    renderTimeline();


    setupSearch();



    document
    .getElementById(
        "weeklyViewBtn"
    )
    ?.addEventListener(
        "click",
        ()=>{


            document
            .getElementById(
                "weeklyTimetable"
            )
            .classList
            .remove("hidden");


            document
            .getElementById(
                "timelineTimetable"
            )
            .classList
            .add("hidden");


        }
    );



    document
    .getElementById(
        "timelineViewBtn"
    )
    ?.addEventListener(
        "click",
        ()=>{


            document
            .getElementById(
                "timelineTimetable"
            )
            .classList
            .remove("hidden");


            document
            .getElementById(
                "weeklyTimetable"
            )
            .classList
            .add("hidden");


        }
    );



    updateCurrentLesson();


    updateCountdown();



    setInterval(
        updateCurrentLesson,
        30000
    );


    setInterval(
        updateCountdown,
        1000
    );


}
