function getPlayerImage(playerName) {
    let url = `http://en.wikipedia.org/w/api.php?action=query&titles=${playerName}&prop=pageimages&format=json&pithumbsize=200`
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyUrl + url)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        console.log(data);
        let imgUrlStart = data.indexOf("\"source\":") + 9;
        let imgUrlEnd = data.indexOf(",\"width");
        let imgUrl = data.substring(imgUrlStart, imgUrlEnd);
        console.log("imgUrl", imgUrl);
        return imgUrl;
    })
    .catch(function(error) {
        return error;
    });
}
