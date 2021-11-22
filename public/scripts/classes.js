
if(document.readyState)
{
    printClassList();
}

function classClick(element)
{
    console.log(element.id);
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
        classtable += `<tr><td> <a id="${rows[i].classid}" onclick=${classClick(this)}> ${rows[i].classname} </a></td>`
        classtable += `<td>${rows[i].classlevel}</td></tr>`
    }
    classtable += `
        </tbody>
    </table>`;

    //Appends table
    $(classtable).appendTo('#middleOfPage');
}