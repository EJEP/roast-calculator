const timesSubmit = document.querySelector('.timesSubmit');
const inTimeField = document.querySelector('.inTimeField');
const durationField = document.querySelector('.durationField');
const extraNameField = document.querySelector('.extraNameField');
const extraDurationField = document.querySelector('.extraDurationField');
const extraForm = document.querySelector('.extraForm');


const extraSubmit = document.querySelector('.extraSubmit');
const intermediateButton = document.querySelector('.intermediateButton');

extra = [];
steps = [];

function generateTable(times) {
    let tableDiv = document.querySelector('.timesTable');

    // Test for existence of child table.
    let testTimesTable = document.getElementById("timesTableTable");
    // If it exists, delete it or replace it
    if (testTimesTable) {
        testTimesTable.remove();
    }

    let timesTable = document.createElement('table');
    timesTable.id = "timesTableTable";

    let timesTHead = timesTable.createTHead();
    let row = timesTHead.insertRow();

    let th = document.createElement("th");
    let text = document.createTextNode('Task');
    th.appendChild(text);
    row.appendChild(th);

    let th2 = document.createElement("th");
    let text2 = document.createTextNode('Time');
    th2.appendChild(text2);
    row.appendChild(th2);

    let timesTBody = timesTable.createTBody();

    for (var i = 0; i < times.length; i++) {
        let row = timesTBody.insertRow();
        let descriptionCell = row.insertCell();
        descriptionCell.appendChild(document.createTextNode(times[i][0]));
        let timeCell = row.insertCell();
        let timeString = times[i][1].toISOString().slice(11, 16);
        timeCell.appendChild(document.createTextNode(timeString));
    }
    tableDiv.appendChild(timesTable);
}

function roastTimesSort(a, b) {
    if (a[1] < b[1]) {
        return -1;
    }
    if (a[1] > b[1]) {
        return 1;
    }

    return 0;
}

function calculateTimes() {

    if (inTimeField.value == '') {
        alert("Meat in time is required");
        return false;
    }

    if (durationField.value == '' | isNaN(durationField.value)) {
        alert("Meat duration must be a number");
        return false;
    }


    let timeNow = new Date();
    let durationMins = Number(durationField.value);
    console.log(inTimeField.value);
    // This is deeply cursed, it cannot possibly be the best way of doing this!
    let meatInTime = new Date(timeNow.toISOString().split('T')[0] + 'T' + inTimeField.value + ':00.000Z');

    let meatOutTime = new Date(meatInTime.getTime() + durationMins * 60000);

    // Potatoes times
    let potatoesInTime = new Date(meatOutTime.getTime() - (10 * 60000));
    let potatoesOnBoilTime = new Date(meatOutTime.getTime() - (25 * 60000));
    let potatoesOffBoilTime = new Date(meatOutTime.getTime() - (15 * 60000));
    let potatoesTurnTime = new Date(potatoesInTime.getTime() + (25 * 60000));
    let servingTime = new Date(potatoesInTime.getTime() + (50 * 60000));

    // Parsnips times
    let parsnipsOnBoilTime = new Date(servingTime.getTime() - (30 * 60000));
    let parsnipsOffBoilTime = new Date(servingTime.getTime() - (25 * 60000));
    let parsnipsInTime = new Date(servingTime.getTime() - (20 * 60000));
    let parsnipsTurnTime = new Date(servingTime.getTime() - (10 * 60000));

    let eventTimes = [['meat in time', meatInTime],
                      ['meat out time', meatOutTime],
                      ['potatoes in time', potatoesInTime],
                      ['potatoes on boil time', potatoesOnBoilTime],
                      ['potatoes off boil time', potatoesOffBoilTime],
                      ['potatoes turn time', potatoesTurnTime],
                      ['parsnips in time', parsnipsInTime],
                      ['parsnips on boil time', parsnipsOnBoilTime],
                      ['parsnips off boil time', parsnipsOffBoilTime],
                      ['parsnips turn time', parsnipsTurnTime],
                      ['serving time', servingTime]
                     ];

    // extra times
    for (let i = 0; i < extra.length; i++){
        description = extra[i].name + ' on time';
        eventTimes.push([description, new Date(servingTime.getTime() - (extra[i].duration * 60000))]);
    }

    eventTimes.sort(roastTimesSort);
    generateTable(eventTimes);
}

function setExtraTableHead() {
    let extraTable = document.querySelector('.extraTable');
    let extraTHead = extraTable.createTHead();
    let row = extraTHead.insertRow();

    let th = document.createElement("th");
    let text = document.createTextNode('Extra');
    th.appendChild(text);
    row.appendChild(th);

    let th2 = document.createElement("th");
    let text2 = document.createTextNode('Duration');
    th2.appendChild(text2);
    row.appendChild(th2);
}

function displayExtra() {
    if (extra.length === 1) {
        setExtraTableHead();
    }
    let tableDiv = document.querySelector('.extraInfo');
    let extraTable = document.querySelector('.extraTable');

    let extraTBody = extraTable.createTBody();
    let row = extraTBody.insertRow();
    let nameCell = row.insertCell();
    nameCell.appendChild(document.createTextNode(extra[extra.length - 1].name));
    //nameCell.appendChild(document.createTextNode('hello'));
    let durationCell = row.insertCell();
    durationCell.appendChild(document.createTextNode(extra[extra.length - 1].duration));
}

function addExtra() {
    let extraName = extraNameField.value;
    let extraDuration = Number(extraDurationField.value);
    let intermediateStepsDiv = document.querySelector('.intermediateSteps');
    let intermediateStepsDivNames = intermediateStepsDiv.getElementsByClassName('stepName');
    for (i = 0; i < intermediateStepsDivNames.length; i++ ) {
        console.log(i);
        console.log(intermediateStepsDivNames[i]);
    }

    // validate
    if (extraName === "") {
        alert("Name must be filled out");
        return false;
    }

    if (extraDurationField.value === '' | isNaN(extraDurationField.value)) {
        alert("Extra duration must be a number");
        return false;
    }

    // Need to check
    // If stepName is specified but not stepDuration
    // If stepName is not specified but stepDuration is
    // If stepDuration is specified but not a number
    // First check if step duration is a number
    /*
    if (isNaN(stepDurationField.value)){
        alert("Step duration must be a number");
        return false;
    }

    // then if both are specified
    if ((stepName !== '' & stepDuration === 0) | (stepName === '' & stepDuration !== 0)){
        alert("Both the step name and step duration must be specified");
        return false;
    }

    if (stepName !== '') {
        step = {name: stepName, duration: stepDuration};
        extraDetails = {name: extraName, duration: extraDuration, steps: step};
    }
    else {*/
    extraDetails = {name: extraName, duration: extraDuration};
    //}
    extra.push(extraDetails);
    displayExtra();
    // clear the form
    extraNameField.value='';
    extraDurationField.value='';
    // delete the steps
    extraForm.insertBefore(intermediateButton, intermediateStepsDiv);
    while(intermediateStepsDiv.firstChild){
        intermediateStepsDiv.removeChild(intermediateStepsDiv.lastChild);
    }
}

function addStep(){
    // Add two fields to the intermediate steps div
    let stepsDiv = document.querySelector('.intermediateSteps');
    let nChildren = stepsDiv.childElementCount;

    let stepNameInput = document.createElement('input');
    stepNameInput.type='text';
    stepNameInput.id='stepName' + (nChildren/2);
    stepNameInput.required=true;
    stepNameInput.name='stepName';
    stepNameInput.className='stepName';

    let stepNameLabel = document.createElement('label');
    stepNameLabel.for = stepNameInput.id;
    stepNameLabel.innerHTML = 'Step description: ';

    let stepDurationInput = document.createElement('input');
    stepDurationInput.type='number';
    stepDurationInput.id='stepDuration' + (nChildren/2);
    stepDurationInput.required=true;
    stepDurationInput.name='stepDuration';
    stepDurationInput.className='stepDuration';

    let stepDurationLabel = document.createElement('label');
    stepDurationLabel.for = stepNameInput.id;
    stepDurationLabel.innerHTML = 'Step duration: ';

    stepsDiv.appendChild(stepNameLabel);
    stepsDiv.appendChild(stepNameInput);
    stepsDiv.appendChild(stepDurationLabel);
    stepsDiv.appendChild(stepDurationInput);

    stepsDiv.appendChild(intermediateButton);
    stepsDiv.appendChild(document.createElement('br'));

}


extraSubmit.addEventListener('click', addExtra);
intermediateButton.addEventListener('click', addStep);
timesSubmit.addEventListener('click', calculateTimes);
