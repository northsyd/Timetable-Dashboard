// =====================================
// Study Dashboard
// ICS Calendar Importer
// =====================================


import {

    saveTimetable

} from "./storage.js";







// =====================================
// INITIALISE IMPORTER
// =====================================


export function initICSImporter(){


    const input =
    document.getElementById(
        "icsInput"
    );



    if(!input)
        return;



    input.addEventListener(
        "change",
        handleFile
    );


}









// =====================================
// FILE READER
// =====================================


function handleFile(event){


    const file =
    event.target.files[0];



    if(!file)
        return;



    const reader =
    new FileReader();



    reader.onload = ()=>{


        const timetable =
        parseICS(
            reader.result
        );



        saveTimetable(
            timetable
        );



        document.getElementById(
            "importStatus"
        )
        .innerHTML =

        `✓ Imported ${timetable.length} lessons`;



        // refresh page after import

        setTimeout(
            ()=>{
                location.reload();
            },
            700
        );


    };



    reader.readAsText(file);


}









// =====================================
// ICS PARSER
// =====================================


function parseICS(data){



    const events =
    data.split(
        "BEGIN:VEVENT"
    );



    events.shift();



    let timetable=[];



    events.forEach(event=>{


        const summary =
        getValue(
            event,
            "SUMMARY"
        );



        const location =
        getValue(
            event,
            "LOCATION"
        );



        const start =
        getValue(
            event,
            "DTSTART"
        );



        const end =
        getValue(
            event,
            "DTEND"
        );



        if(!summary || !start)
            return;





        const startDate =
        parseICSDate(
            start
        );



        const endDate =
        parseICSDate(
            end
        );



        timetable.push({


            subject:
            cleanSubject(
                summary
            ),



            teacher:
            extractTeacher(
                summary
            ),



            room:
            extractRoom(
                location
            ),



            day:
            startDate.toLocaleDateString(
                "en-US",
                {
                    weekday:"long"
                }
            ),



            start:
            formatTime(
                startDate
            ),



            end:
            formatTime(
                endDate
            ),



            period:
            ""

        });



    });



    return timetable;


}









// =====================================
// ICS HELPERS
// =====================================


function getValue(
    block,
    key
){


    const regex =
    new RegExp(
        key+
        ".*:(.*)"
    );


    const match =
    block.match(regex);



    return match
    ?
    match[1].trim()
    :
    "";

}








function parseICSDate(value){


    if(!value)
        return new Date();



    /*
    Supports:

    20260807T090000
    20260807T090000Z

    */


    const clean =
    value
    .replace(
        "Z",
        ""
    );



    const year =
    clean.substring(0,4);



    const month =
    clean.substring(4,6)
    -1;



    const day =
    clean.substring(6,8);



    const hour =
    clean.substring(9,11);



    const minute =
    clean.substring(11,13);



    return new Date(

        year,
        month,
        day,
        hour,
        minute

    );


}








function formatTime(date){


    return date
    .toLocaleTimeString(
        [],
        {
            hour:"2-digit",
            minute:"2-digit",
            hour12:false
        }
    );


}









// =====================================
// CLEANING
// =====================================


function cleanSubject(text){


    return text

    .replace(
        /\(.*?\)/g,
        ""
    )

    .replace(
        /\[.*?\]/g,
        ""
    )

    .trim();


}






function extractTeacher(text){


    /*
    Many school systems put:

    Subject - Teacher Name

    */


    if(text.includes("-")){


        return text
        .split("-")
        .slice(1)
        .join("-")
        .trim();


    }


    return "";

}







function extractRoom(location){


    if(!location)
        return "";



    return location
    .replace(
        /Room/i,
        ""
    )
    .trim();


}
