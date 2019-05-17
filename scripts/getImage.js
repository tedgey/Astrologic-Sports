
function addPlayerImage(playerName, height) {
    let url = `http://en.wikipedia.org/w/api.php?action=query&titles=${playerName}&prop=pageimages&format=json&pithumbsize=${height}`
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyUrl + url)
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        let imgUrlStart = data.indexOf("\"source\":") + 9;
        let imgUrlEnd = data.indexOf(",\"width");
        let imgUrl = data.substring(imgUrlStart, imgUrlEnd);
        console.log("imgUrl2", imgUrl)
        let imgDiv = document.getElementById("playerImage");
        // imgDiv.src = imgUrl;
        imgDiv.setAttribute('src', imgUrl.replace(/"/g, ''));
        // let loader = document.getElementById('loader');
        // loader.style.display = 'none';
        imgDiv.onload = function(){
            loader.style.display = 'none';
        }
    })
    .catch(function(error) {
        return error;
    });
}
