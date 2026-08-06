// =====================================
// Study Dashboard
// Subject Colour Manager
// =====================================


import {

    getColours,
    saveColours

} from "./storage.js";





let colours = {};






// =====================================
// COLOUR PALETTE
// =====================================


const palette = [

    "#007aff", // Blue

    "#34c759", // Green

    "#ff9500", // Orange

    "#ff2d55", // Pink

    "#af52de", // Purple

    "#5ac8fa", // Cyan

    "#ffcc00", // Yellow

    "#5856d6", // Indigo

    "#ff3b30"  // Red

];









// =====================================
// INITIALISE
// =====================================


export function initColours(){


    colours =
    getColours();



    renderColourManager();


}









// =====================================
// GET SUBJECT COLOUR
// =====================================


export function getSubjectColour(
    subject
){


    if(
        !colours[subject]
    ){


        colours[subject] =
        generateColour();



        saveColours(
            colours
        );


    }



    return colours[subject];


}









// =====================================
// GENERATE NEW COLOUR
// =====================================


function generateColour(){


    const used =
    Object.values(
        colours
    );



    const available =
    palette.filter(
        colour =>
        !used.includes(colour)
    );



    if(
        available.length
    ){


        return available[0];


    }




    // fallback if many subjects

    return palette[
        Object.keys(colours).length
        %
        palette.length
    ];

}









// =====================================
// SETTINGS DISPLAY
// =====================================


function renderColourManager(){


    const container =
    document.getElementById(
        "subjectColours"
    );



    if(!container)
        return;



    container.innerHTML="";



    Object.entries(
        colours
    )
    .forEach(
        ([subject,colour])=>{


            const item =
            document.createElement(
                "div"
            );



            item.className =
            "lesson";



            item.style.borderColor =
            colour;



            item.innerHTML =

            `

            <div>

            <strong>
            ${subject}
            </strong>


            <p>
            ${colour}
            </p>

            </div>


            <input
            type="color"
            value="${colour}"
            data-subject="${subject}"
            >

            `;



            container.appendChild(
                item
            );


        }

    );




    container
    .querySelectorAll(
        "input[type=color]"
    )
    .forEach(
        input=>{


            input.onchange =
            ()=>{


                colours[
                    input.dataset.subject
                ] =
                input.value;



                saveColours(
                    colours
                );


            };


        }
    );

}









// =====================================
// RESET COLOURS
// =====================================


export function resetColours(){


    colours={};


    saveColours(
        colours
    );


    renderColourManager();


}
