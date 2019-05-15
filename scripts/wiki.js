function takeInput(){ 
    // let playerName = document.getElementById('search');
    let playerName = prompt("Enter an NBA player's name");
    playerName = playerName.trim();
    playerName = playerName.replace(" ", "%20");
    console.log(`player: ${playerName}`);
    return `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${playerName}`
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

function findBirthday(data) {
    //takes data from wiki api and parses it to find the (unformatted) birthdate
    let birthdayStartInd = data.indexOf("born ") + 5;
    let birthdayEndInd = data.indexOf(")", birthdayStartInd);
    let birthday = data.substring(birthdayStartInd, birthdayEndInd);
    // console.log(birthday);
    let momentBirthday = moment(birthday, "MMMM DD, YYYY");
    let formattedMonth = momentBirthday.format("MM");
    let formattedDay = momentBirthday.format("DD");
    // console.log(formattedBirthday);
    // console.log(formattedMonth, formattedDay);
    return [parseInt(formattedMonth), parseInt(formattedDay)];
}
