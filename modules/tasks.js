// =====================================
// Study Dashboard
// Tasks Module
// Todo + Homework Tracker
// =====================================


import {

    getTodos,
    saveTodos,

    getHomework,
    saveHomework

} from "./storage.js";





let todos = [];

let homework = [];








// =====================================
// INITIALISE
// =====================================


export function initTasks(){


    todos =
    getTodos();



    homework =
    getHomework();



    renderTodos();


    renderHomework();


    setupTodoInput();


}









// =====================================
// TODO LIST
// =====================================


function renderTodos(){


    const list =
    document.getElementById(
        "todoList"
    );


    if(!list)
        return;



    list.innerHTML="";



    todos.forEach(
        (task,index)=>{


            const item =
            document.createElement(
                "li"
            );



            item.innerHTML = `


                <span>

                ${
                    task.completed
                    ?
                    "✓ "
                    :
                    ""
                }

                ${task.title}

                </span>



                <div>


                <button
                onclick="
                window.toggleTodo(${index})
                ">

                ✓

                </button>



                <button
                onclick="
                window.deleteTodo(${index})
                ">

                ×

                </button>


                </div>


            `;



            if(task.completed){

                item.style.opacity=".6";

            }



            list.appendChild(item);


        }
    );


}









// =====================================
// TODO ACTIONS
// =====================================


function setupTodoInput(){


    const button =
    document.getElementById(
        "addTodo"
    );


    const input =
    document.getElementById(
        "todoInput"
    );



    if(!button)
        return;



    button.onclick=()=>{


        if(
            input.value.trim()
            ===""
        )
            return;



        todos.push({


            title:
            input.value,


            completed:false


        });



        saveTodos(
            todos
        );



        input.value="";



        renderTodos();


    };


}








window.toggleTodo=function(index){


    todos[index]
    .completed =
    !todos[index]
    .completed;



    saveTodos(
        todos
    );



    renderTodos();


};






window.deleteTodo=function(index){


    todos.splice(
        index,
        1
    );


    saveTodos(
        todos
    );


    renderTodos();


};









// =====================================
// HOMEWORK TRACKER
// =====================================


function renderHomework(){


    const box =
    document.getElementById(
        "homeworkTracker"
    );


    if(!box)
        return;



    box.innerHTML="";



    if(homework.length===0){


        box.innerHTML =

        `

        <p>
        No homework added yet.
        </p>

        `;


        return;

    }






    homework.forEach(
        (work,index)=>{


            const percent =
            work.completed
            ?
            100
            :
            0;



            box.innerHTML += `


            <div class="homework-item">


            <h4>

            ${work.subject}

            </h4>


            <p>

            ${work.title}

            </p>



            <div class="progress">

                <span
                style="
                width:${percent}%
                ">
                </span>

            </div>



            <button
            onclick="
            window.completeHomework(${index})
            ">

            ${
                work.completed
                ?
                "Completed"
                :
                "Mark Done"
            }


            </button>



            </div>


            `;


        }

    );


}









// =====================================
// ADD HOMEWORK API
// =====================================


export function addHomework(
    subject,
    title
){


    homework.push({


        subject,

        title,

        completed:false


    });



    saveHomework(
        homework
    );



    renderHomework();


}







window.completeHomework=function(index){


    homework[index]
    .completed=true;



    saveHomework(
        homework
    );


    renderHomework();


};









// =====================================
// HOMEWORK STATISTICS
// =====================================


export function homeworkProgress(){


    if(homework.length===0)
        return 0;



    const completed =
    homework.filter(
        h=>h.completed
    ).length;



    return Math.round(

        completed /
        homework.length *
        100

    );


}
