
// var apiUrl = `https://theastrologer-api.herokuapp.com/api/horoscope/${playerSign}/tomorrow`;

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

const playerInfoDiv = document.getElementById("player-info")


function whatsYourSign(month, day) {
    //takes month and day and finds player's sun sign
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
    else {
        window.alert("Player not found, please try again");
        throw ''
        }
}

function addDate (object) {
    const horoDate = document.getElementById('date');
    horoDate.innerHTML = `Horoscope Date: ${object}`;
};

function addHoroscope(object) {
    const horo = document.getElementById('horoscope');
    horo.innerHTML = `Horoscope: ${object}`;
};

function addIntensity(object) {
    const intensityNumber = document.getElementById('intensity');
    intensityNumber.innerHTML = `Intensity: ${object}`;
};

function addKeywords(object) {
    const horoKeywords = document.getElementById('keywords');
    horoKeywords.innerHTML = `Keywords: ${object}`;
};

function addMood(object) {
    const horoMood = document.getElementById('mood');
    horoMood.innerHTML = `Mood: ${object}`;
};

function addSunsign(object) {
    const horoSunsign = document.getElementById('sunsign');
    horoSunsign.innerHTML = `Sign: ${object}`;
};

function getPlayerSign(){
    let wikiUrl = takeInput();
    let loader = document.getElementById('loader');
        loader.style.display = 'block';
    getWiki(wikiUrl)
    .then((data) => {
        var birthday = findBirthday(data);
        var playerSign = whatsYourSign(birthday[0], birthday[1]);
        console.log(`player's sign: ${playerSign}`);
        let apiUrl = `https://theastrologer-api.herokuapp.com/api/horoscope/${playerSign}/tomorrow`;
        get(apiUrl)
        .then((response) => {
            addDate(response.date);
            addHoroscope(response.horoscope);
            addIntensity(response.meta.intensity);
            addSunsign(response.sunsign);
            addMood(response.meta.mood);
            addKeywords(response.meta.keywords);
            loader.style.display = 'none';
        })
    })
}
