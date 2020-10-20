const timesSubmit = document.querySelector('.timesSubmit');
const inTimeField = document.querySelector('.inTimeField');
const durationField = document.querySelector('.durationField');

function generateTable(times) {
    let tableDiv = document.querySelector('.timesTable');
    let timesTable = document.createElement('table');
    for (var i = 0; i < times.length; i++) {
        let row = timesTable.insertRow();
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
    let timeNow = new Date();
    let durationMins = Number(durationField.value);

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
    let parsnipsInTime = new Date(servingTime.getTime() - (40 * 60000));
    let parsnipsOnBoilTime = new Date(servingTime.getTime() - (35 * 60000));
    let parsnipsOffBoilTime = new Date(servingTime.getTime() - (30 * 60000));
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

    //console.log(eventTimes);
    eventTimes.sort(roastTimesSort);
    generateTable(eventTimes);
}

timesSubmit.addEventListener('click', calculateTimes);
