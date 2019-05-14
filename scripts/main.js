
function addDate (object) {
    const horoDate = document.getElementById('date');
    horoDate.innerHTML = object;
}

function addHoroscope(object) {
    const horo = document.getElementById('horoscope');
    horo.innerHTML = object;
}

function addIntensity(object) {
    const intensityNumber = document.getElementById('intensity');
    intensityNumber.innerHTML = object;
}

function addKeywords(object) {
    const horoKeywords = document.getElementById('keywords');
    horoKeywords.innerHTML = `Keywords are: ${object}`;
}

function addMood(object) {
    const horoMood = document.getElementById('mood');
    console.log(`mood: ${object}`)
    horoMood.innerHTML = object;
}

function addSunsign(object) {
    const horoSunsign = document.getElementById('sunsign');
    horoSunsign.innerHTML = object;
}


function whatsYourSign(month, day) {
    if (month === 1) {
        if (day < 20) {
            return "capricorn"}
        else { 
            return "aquarius"}
        }
    else if (month === 2) {
        if (day < 19) {
            return "aquarius"}
        else {
            return "pisces"}
        }
    else if (month === 3) {
        if (day < 21) {
            return "pisces"}
        else {
            return "aries"}
        }
    else if (month === 4) {
        if (day < 20) {
            return "aries"}
        else {
            return "taurus"}
        }
    else if (month === 5) {
        if (day < 21) {
            return "taurus"}
        else {
            return "gemini"}
        }
    else if (month === 6) {
        if (day < 21) {
            return "gemini"}
        else {
            return "cancer"}
        }
    else if (month === 7) {
        if (day < 23) {
            return "cancer"}
        else {
            return "leo"}
        }
    else if (month === 8) {
        if (day < 23) {
            return "leo"}
        else {
            return "virgo"}
        }
    else if (month === 9) {
        if (day < 23) {
            return "virgo"}
        else {
            return "libra"}
        }
    else if (month === 10) {
        if (day < 23) {
            return "libra"}
        else {
            return "scorpio"}
        }
    else if (month === 11) {
        if (day < 22) {
            return "scorpio"}
        else {
            return "sagittarius"}
        }
    else if (month === 12) {
        if (day < 22) {
            return "sagittarius"}
        else {
            return "capricorn"}
        }
console.log(whatsYourSign(1, 1));
}

// let inputSunSign = 'leo'

let inputSunSign = (whatsYourSign(1,1));



// Use the below URL to make a fetch request, 
// and then run the above functions to populate the page
// const apiURL = "https://theastrologer-api.herokuapp.com/api/horoscope/aries/tomorrow";
const apiURL = `https://theastrologer-api.herokuapp.com/api/horoscope/${inputSunSign}/tomorrow`;
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
function get(url) {
    return fetch(proxyUrl + url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        return data;
    })
    .catch(function(error) {
        return error;
    });
}

function loadHoroscope () {
    get(apiURL)
    .then(function(response){
        addDate(response.date);
        addHoroscope(response.horoscope);
        addIntensity(response.meta.intensity);
        addSunsign(response.sunsign);
        addMood(response.meta.mood);
        addKeywords(response.meta.keywords);
    })
}
