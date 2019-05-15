function takeInput(){
    let playerName = prompt("Enter an NBA player's name");
    playerName = playerName.trim();
    playerName = playerName.replace(" ", "_");
    console.log(`player: ${playerName}`);
    return `http://en.wikipedia.org/w/api.php?action=parse&page=${playerName}&format=xml&prop=wikitext`
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function getWiki(url) {
    return fetch(proxyUrl + url)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        return data;
    })
    .catch(function(error) {
        return error;
    });
}

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

function getPlayerData(data) {
    //player name
    let nameInd = data.indexOf("name = ");
    let nameStart = nameInd + 7;
    let nameEnd = data.indexOf("|", nameStart);
    let playerName = data.substring(nameStart, nameEnd);
    //picture url
    let picInd = data.indexOf("image = ");
    let picStart = picInd + 8;
    let picEnd = data.indexOf("|", picStart);
    let picName = data.substring(picStart, picEnd);
    picName = picName.replace(/ /g, "_");
    let picUrl = `https://en.wikipedia.org/wiki/Trae_Young#/media/File:${picName}`
    //player's team
    let teamInd = data.indexOf("team = ");
    let teamStart = teamInd + 7;
    let teamEnd = data.indexOf("|", teamStart);
    let teamName = data.substring(teamStart, teamEnd);
    //position
    let posInd = data.indexOf("position = ");
    let posStart = posInd + 11;
    let posEnd = data.indexOf("|", posStart);
    let posName = data.substring(posStart+2, posEnd-3);
    //birthday
    let bdInd = data.indexOf("born ");
    let bdStart = bdInd + 5;
    let bdEnd = data.indexOf(")", bdStart);
    let bdName = data.substring(bdStart, bdEnd);
    //return an object with all data
    let playerObj = {
        name: playerName,
        picture: picUrl,
        team: teamName,
        position: posName,
        birthday: bdName,
    }
    return playerObj
}

function findBirthday(data) {
    //takes data from wiki api and parses it to find the (unformatted) birthdate
    birthdayInd = data.indexOf("and age|");
    let bdayBegin = birthdayInd+13
    let bdayEnd = birthdayInd+18
    birthday = data.substring(bdayBegin, bdayEnd);
    return birthday
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function getWiki(url) {
    return fetch(proxyUrl + url)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        return data;
    })
    .catch(function(error) {
        return error;
    });
}

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

function findBirthday(data) {
    //takes data from wiki api and parses it to find the (unformatted) birthdate
    birthdayInd = data.indexOf("and age|");
    let bdayBegin = birthdayInd+13
    let bdayEnd = birthdayInd+18
    birthday = data.substring(bdayBegin, bdayEnd);
    return birthday
}

function parseBirthday(birthday){
    //takes unformatted birthday and returns array of [MM,DD]
    let checkStr = "0123456789"
    let pipeInd = birthday.indexOf("|");
    let month = birthday.substring(0,pipeInd); //everything left of the pipe is the month
    if (checkStr.includes(birthday[pipeInd+2]) === false){ //single digit day
        var day = birthday.substring(pipeInd+1, pipeInd+2);
    }
    else if (checkStr.includes(birthday[pipeInd+2]) === true){ //double digit day
        var day = birthday.substring(pipeInd+1, pipeInd+3);
    }

    console.log(`month: ${month} day: ${day}`);
    return [parseInt(month), parseInt(day)];
}

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
}

// console.log("input sun sign " + inputSunSign);
// let inputSunSign = (whatsYourSign(1,1));

function getPlayerSign(){
    let loader = document.getElementById('loader');
        loader.style.display = 'block';
    getWiki('http://en.wikipedia.org/w/api.php?action=parse&page=Al_Horford&format=xml&prop=wikitext')
    .then((data) => {
        var birthday = findBirthday(data);
        var parsedBirthday = parseBirthday(birthday);
        var playerSign = whatsYourSign(parsedBirthday[0], parsedBirthday[1]);
        let apiUrl = `https://theastrologer-api.herokuapp.com/api/horoscope/${playerSign}/tomorrow`;
        console.log("api url:" + apiUrl);
    else {
        window.alert("Player not found, please try again");
        throw ''
    }
};

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

// console.log("input sun sign " + inputSunSign);
// let inputSunSign = (whatsYourSign(1,1));

function getPlayerSign(){
    let wikiUrl = takeInput();
    let loader = document.getElementById('loader');
    loader.style.display = 'block';
    getWiki(wikiUrl)
    .then((data) => {
        getPlayerData(data);
        var birthday = findBirthday(data);
        var parsedBirthday = parseBirthday(birthday);
        var playerSign = whatsYourSign(parsedBirthday[0], parsedBirthday[1]);
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
