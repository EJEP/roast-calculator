const timesSubmit = document.querySelector('.timesSubmit');
const inTimeField = document.querySelector('.inTimeField');
const durationField = document.querySelector('.durationField');

function calculateTimes() {
    let timeNow = new Date();
    let durationMins = Number(durationField.value);

    console.log(timeNow.toISOString());

    console.log(timeNow.toISOString().split('T')[0] + 'T' + inTimeField.value + ':00.000Z');
    // This is deeply cursed, it cannot possibly be the best way of doing this!
    let inTime = new Date(timeNow.toISOString().split('T')[0] + 'T' + inTimeField.value + ':00.000Z');

    //let inTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate()) + durationField.value;

    console.log(inTime);

    let meatOutTime = new Date(inTime.getTime() + durationMins * 60000);
    console.log(meatOutTime);
}

function timeConvert(mins) {
    var hours = mins/60;
    var roundedHours = Math.floor(hours);
    var minutes = (hours - roundedHours) * 60;
    var roundedMinutes = Math.round(minutes);

    return [roundedHours, roundedMinutes];
}

timesSubmit.addEventListener('click', calculateTimes);
