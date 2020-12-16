const timesSubmit = document.querySelector('.timesSubmit');
const inTimeField = document.querySelector('.inTimeField');
const durationField = document.querySelector('.durationField');
const extraNameField = document.querySelector('.extraNameField');
const extraDurationField = document.querySelector('.extraDurationField');
const extraForm = document.querySelector('.extraForm');


const extraSubmit = document.querySelector('.extraSubmit');
const intermediateButton = document.querySelector('.intermediateButton');

extra = [];

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
        description = extra[i].description;
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

function displayExtra(thingsAdded) {
    if (document.querySelector('.extraTable').rows.length === 0) {
        setExtraTableHead();
    }
    let tableDiv = document.querySelector('.extraInfo');
    let extraTable = document.querySelector('.extraTable');

    let extraTBody = extraTable.createTBody();
    let row = extraTBody.insertRow();
    let nameCell = row.insertCell();
    nameCell.appendChild(document.createTextNode(extra[extra.length - thingsAdded].description));
    //nameCell.appendChild(document.createTextNode('hello'));
    let durationCell = row.insertCell();
    durationCell.appendChild(document.createTextNode(extra[extra.length - thingsAdded].duration));
}

function addExtra() {
    let extraName = extraNameField.value;
    let extraDuration = Number(extraDurationField.value);
    let intermediateStepsDiv = document.querySelector('.intermediateSteps');
    let intermediateStepsDivNames = intermediateStepsDiv.getElementsByClassName('stepName');
    let intermediateStepsDivDurations = intermediateStepsDiv.getElementsByClassName('stepDuration');

    let events = [];
    let thingsAdded = 0;

    // validate
    if (!extraNameField.checkValidity() | !extraDurationField.checkValidity()){
        return false;
    }
    description = extraName + ' on time';
    extraDetails = {description: description, duration: extraDuration};

    extra.push(extraDetails);

    thingsAdded += 1;
    let cumulativeDuration = 0;
    let correctedStepDuration = 0;
    for (i = 0; i < intermediateStepsDivNames.length; i++ ) {
        if(!intermediateStepsDivNames[i].checkValidity()){
            return false;
        }
        if(!intermediateStepsDivDurations[i].checkValidity()){
            return false;
        }

        stepDescription = extraName + ' ' + intermediateStepsDivNames[i].value;
        correctedStepDuration = extraDuration - cumulativeDuration - Number(intermediateStepsDivDurations[i].value);

        console.log(stepDescription);
        console.log(cumulativeDuration);
        cumulativeDuration += Number(intermediateStepsDivDurations[i].value);

        extra.push({description: stepDescription, duration: correctedStepDuration});
        thingsAdded += 1;
    }

    displayExtra(thingsAdded);
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
    stepNameInput.required='required';
    stepNameInput.name='stepName';
    stepNameInput.className='stepName';

    let stepNameLabel = document.createElement('label');
    stepNameLabel.for = stepNameInput.id;
    stepNameLabel.innerHTML = 'Step description: ';

    let stepDurationInput = document.createElement('input');
    stepDurationInput.type='number';
    stepDurationInput.id='stepDuration' + (nChildren/2);
    stepDurationInput.required='required';
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
