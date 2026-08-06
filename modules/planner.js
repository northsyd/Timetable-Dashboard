// =====================================
// Study Dashboard
// AI Study Planner Module
// =====================================


import {

    getAssignments,
    getHomework

} from "./storage.js";






// =====================================
// INITIALISE
// =====================================


export function initPlanner(){


    const button =
    document.getElementById(
        "generatePlan"
    );



    if(!button)
        return;




    button.onclick =
    generatePlan;


}









// =====================================
// GENERATE PLAN
// =====================================


function generatePlan(){



    const userInput =
    document.getElementById(
        "plannerInput"
    )
    .value;



    const assignments =
    getAssignments();



    const homework =
    getHomework();





    const tasks =
    buildTaskList(
        assignments,
        homework,
        userInput
    );





    const plan =
    createSchedule(
        tasks
    );





    displayPlan(
        plan
    );


}









// =====================================
// BUILD TASK LIST
// =====================================


function buildTaskList(
    assignments,
    homework,
    extra
){


    let tasks=[];



    assignments
    .forEach(a=>{


        if(a.progress < 100){


            tasks.push({

                name:
                a.name,


                subject:
                a.subject,


                priority:
                calculatePriority(a)


            });


        }


    });





    homework
    .forEach(h=>{


        if(!h.completed){


            tasks.push({

                name:
                h.title,


                subject:
                h.subject,


                priority:
                2


            });


        }


    });





    if(extra.trim()){


        tasks.push({

            name:
            extra,


            subject:
            "General",


            priority:
            3


        });


    }




    return tasks
    .sort(
        (a,b)=>
        b.priority-a.priority
    );


}









// =====================================
// PRIORITY CALCULATOR
// =====================================


function calculatePriority(
    assignment
){


    let score=1;



    if(
        assignment.priority
        ===
        "High"
    ){

        score+=3;

    }



    if(
        assignment.progress
        <50
    ){

        score+=2;

    }




    if(
        assignment.due
    ){


        const days =

        (
            new Date(
                assignment.due
            )
            -
            new Date()

        )
        /
        86400000;



        if(days < 3){

            score+=4;

        }

    }



    return score;


}









// =====================================
// CREATE STUDY SCHEDULE
// =====================================


function createSchedule(
    tasks
){


    const sessions=[];



    let hour=16;



    tasks.forEach(
        task=>{


            sessions.push({

                time:
                `${hour}:00 - ${hour}:45`,


                task:
                task.name,


                subject:
                task.subject


            });



            hour++;

            if(hour===18)
                hour=19;


        }

    );



    return sessions;


}









// =====================================
// DISPLAY RESULT
// =====================================


function displayPlan(
    plan
){


    const output =
    document.getElementById(
        "studyPlan"
    );



    if(plan.length===0){


        output.innerHTML=

        `

        <p>
        No tasks found.
        Add homework or assignments first.
        </p>

        `;


        return;

    }





    output.innerHTML=

    `

    <h3>
    Today's Study Plan
    </h3>

    `;



    plan.forEach(
        item=>{


            output.innerHTML +=


            `

            <div class="lesson">


                <div class="lesson-time">

                    ${item.time}

                </div>


                <div class="lesson-details">


                    <h4>

                    ${item.task}

                    </h4>


                    <p>

                    ${item.subject}

                    </p>


                </div>


            </div>


            `;


        }

    );


}
