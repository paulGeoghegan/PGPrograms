
//Variable for class list
var classList = {}

if(document.readyState)
{
    printClassList();
}

//This function will select the class that the user has selected in order to generate a page for it
function classClick(id)
{
    console.log("test", classList[id]);
}

//This function sends the request to get the database rows for the classes page
function printClassList()
{
    const get = $.get('http://localhost:3000/classeslist');
    get.done(processResults);
    get.fail(processErrors);
}

//Logs the errors
function processErrors() {
    console.log('Validation errors');
}

//Prints rows to the page
function processResults(rows, status, xhr) {
    console.log('Data sent to the server');


    //Prints table
    let classtable = `
    <table id="classTable">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Level</th>
        </tr>
    </thead>
    <tbody>`;

    //Loops through rows and prints them
    for (let i = 0; i < rows.length; i++) {
        classtable += `<tr><td> <a id="${rows[i].classid}" > ${rows[i].classname} </a></td>`
        classtable += `<td>${rows[i].classlevel}</td></tr>`

        //Adds info to dict
        classList[rows[i].classid] = [rows[i].classname, rows[i].classlevel, rows[i].classdescription];

    }
    classtable += `
        </tbody>
    </table>`;

    //Appends table
    $(classtable).appendTo('#middleOfPage');

/*
    //Adds onclick
    for(let i = 0;i < rows.length;i++)
        $("#"+rows[i].classid).on("click", classClick(rows[i].classid));
*/
}