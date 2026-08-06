// =====================================
// Study Dashboard
// Local Storage Manager
// =====================================



const KEYS = {

    timetable: "study_timetable",

    todos: "study_todos",

    homework: "study_homework",

    assignments: "study_assignments",

    colours: "study_subject_colours",

    settings: "study_settings"

};







// =====================================
// INITIALISE STORAGE
// =====================================


export function initStorage(){


    Object.values(KEYS)
    .forEach(key=>{


        if(
            localStorage.getItem(key)
            === null
        ){

            localStorage.setItem(
                key,
                JSON.stringify([])
            );

        }


    });



    console.log(
        "Storage initialised"
    );

}









// =====================================
// GENERIC HELPERS
// =====================================



function save(key,data){


    localStorage.setItem(

        key,

        JSON.stringify(data)

    );


}



function get(key){


    const data =
    localStorage.getItem(key);



    if(!data){

        return [];

    }



    return JSON.parse(data);


}









// =====================================
// TIMETABLE
// =====================================


export function saveTimetable(data){

    save(
        KEYS.timetable,
        data
    );

}



export function getTimetable(){


    return get(
        KEYS.timetable
    );


}









// =====================================
// TODO LIST
// =====================================


export function saveTodos(data){


    save(
        KEYS.todos,
        data
    );


}



export function getTodos(){


    return get(
        KEYS.todos
    );


}









// =====================================
// HOMEWORK
// =====================================


export function saveHomework(data){


    save(
        KEYS.homework,
        data
    );


}



export function getHomework(){


    return get(
        KEYS.homework
    );


}









// =====================================
// ASSIGNMENTS
// =====================================


export function saveAssignments(data){


    save(
        KEYS.assignments,
        data
    );


}



export function getAssignments(){


    return get(
        KEYS.assignments
    );


}









// =====================================
// SUBJECT COLOURS
// =====================================


export function saveColours(data){


    save(
        KEYS.colours,
        data
    );


}



export function getColours(){


    return get(
        KEYS.colours
    );


}









// =====================================
// SETTINGS
// =====================================


export function saveSettings(data){


    save(
        KEYS.settings,
        data
    );


}



export function getSettings(){


    return get(
        KEYS.settings
    );


}









// =====================================
// CLEAR DATABASE
// =====================================


export function clearStorage(){


    Object.values(KEYS)
    .forEach(key=>{

        localStorage.removeItem(key);

    });


    console.log(
        "Storage cleared"
    );


}
