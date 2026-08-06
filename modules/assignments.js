// =====================================
// Study Dashboard
// Assignment Tracker Module
// =====================================


import {

    getAssignments,
    saveAssignments

} from "./storage.js";





let assignments = [];








// =====================================
// INITIALISE
// =====================================


export function initAssignments(){


    assignments =
    getAssignments();



    renderAssignments();



    setupAssignmentInput();


}









// =====================================
// RENDER ASSIGNMENTS
// =====================================


function renderAssignments(){


    const container =
    document.getElementById(
        "assignmentList"
    );



    if(!container)
        return;



    container.innerHTML="";



    if(assignments.length===0){


        container.innerHTML=

        `

        <p>
        No assignments yet.
        </p>

        `;


        return;

    }






    assignments.forEach(
        (assignment,index)=>{


            const card =
            document.createElement(
                "div"
            );


            card.className =
            "assignment-card";



            card.innerHTML = `


            <h3>

            ${assignment.name}

            </h3>



            <p>

            Subject:
            ${assignment.subject}

            </p>



            <p>

            Due:
            ${assignment.due || "No date"}

            </p>



            <p>

            Priority:
            ${assignment.priority}

            </p>




            <div class="progress">


                <span
                style="
                width:${assignment.progress}%
                ">

                </span>


            </div>



            <strong>

            ${assignment.progress}%

            </strong>





            <div class="assignment-buttons">


                <button
                onclick="
                window.increaseProgress(${index})
                ">

                +10%

                </button>



                <button
                onclick="
                window.deleteAssignment(${index})
                ">

                Delete

                </button>


            </div>


            `;



            container.appendChild(card);



        }

    );


}









// =====================================
// ADD ASSIGNMENT
// =====================================


function setupAssignmentInput(){


    const button =
    document.getElementById(
        "addAssignment"
    );



    const name =
    document.getElementById(
        "assignmentName"
    );



    const subject =
    document.getElementById(
        "assignmentSubject"
    );



    if(!button)
        return;




    button.onclick=()=>{


        if(
            name.value.trim()===""
        )
        return;



        assignments.push({


            name:
            name.value,



            subject:
            subject.value
            ||
            "General",



            due:
            "",



            priority:
            "Medium",



            progress:
            0


        });



        saveAssignments(
            assignments
        );



        name.value="";

        subject.value="";



        renderAssignments();



    };


}









// =====================================
// UPDATE PROGRESS
// =====================================


window.increaseProgress=function(index){


    assignments[index]
    .progress +=10;



    if(
        assignments[index]
        .progress>100
    ){

        assignments[index]
        .progress=100;

    }



    saveAssignments(
        assignments
    );



    renderAssignments();


};








// =====================================
// DELETE
// =====================================


window.deleteAssignment=function(index){


    assignments.splice(
        index,
        1
    );



    saveAssignments(
        assignments
    );



    renderAssignments();


};









// =====================================
// PUBLIC FUNCTIONS
// =====================================


export function getUpcomingAssignments(){


    return assignments
    .sort(
        (a,b)=>
        new Date(a.due)
        -
        new Date(b.due)
    );


}




export function assignmentCompletion(){


    if(assignments.length===0)
        return 0;



    const total =
    assignments.reduce(
        (sum,a)=>
        sum+a.progress,
        0
    );



    return Math.round(

        total /
        assignments.length

    );


}
