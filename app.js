// =====================================
// Study Dashboard
// Main Application Controller
// =====================================



import {
    loadTimetable,
    initTimetable
} from "./modules/timetable.js";


import {
    initStorage
} from "./modules/storage.js";


import {
    initTasks
} from "./modules/tasks.js";


import {
    initAssignments
} from "./modules/assignments.js";


import {
    initPlanner
} from "./modules/planner.js";


import {
    initICSImporter
} from "./modules/icsParser.js";


import {
    initColours
} from "./modules/colours.js";





// =====================================
// PAGE NAVIGATION
// =====================================


function setupNavigation(){


    const buttons =
    document.querySelectorAll(".nav-btn");


    const pages =
    document.querySelectorAll(".page");



    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                buttons.forEach(
                    b=>b.classList.remove("active")
                );


                pages.forEach(
                    p=>p.classList.remove("active")
                );



                button.classList.add("active");



                document
                .getElementById(
                    button.dataset.page
                )
                .classList.add("active");


            }
        );


    });


}








// =====================================
// DARK MODE
// =====================================



function setupTheme(){


    const toggle =
    document.getElementById(
        "themeToggle"
    );



    const saved =
    localStorage.getItem(
        "darkMode"
    );



    if(saved==="true"){

        document.body
        .classList.add("dark");

    }





    toggle.onclick=()=>{


        document.body
        .classList.toggle(
            "dark"
        );


        localStorage.setItem(
            "darkMode",
            document.body
            .classList.contains("dark")
        );


    };


}









// =====================================
// DATE DISPLAY
// =====================================


function updateDate(){


    const date =
    document.getElementById(
        "currentDate"
    );



    if(!date)return;



    date.textContent =
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









// =====================================
// GLOBAL CLOCK REFRESH
// =====================================


function startClock(){


    setInterval(()=>{


        const now =
        new Date();


        const element =
        document.getElementById(
            "clock"
        );



        if(element){

            element.textContent =
            now.toLocaleTimeString();

        }



    },1000);



}









// =====================================
// APPLICATION START
// =====================================


async function startApp(){



    console.log(
        "Starting Study Dashboard..."
    );



    initStorage();



    setupNavigation();



    setupTheme();



    updateDate();



    startClock();




    await loadTimetable();



    initColours();



    initTimetable();



    initTasks();



    initAssignments();



    initPlanner();



    initICSImporter();



    console.log(
        "Dashboard ready."
    );

}



startApp();
