const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/";
const YOUTUBE_API_KEY = "AIzaSyAFrScEUoPW6ZBrHIvuAeEDsplHAqS_gl0";
const fieldName = '.js-query';
let pageToken;
let prevPageToken;
let nextPageToken;
let q;

function keyWordsearch() {
        $(".js-query").focus();
        setupYouTubeSearch();
}

function setupYouTubeSearch() {
        $('#search-button').on('click', function (e) {
                e.preventDefault();
                q = getFieldValue(fieldName);
                setupGAPIClient(e);
        });

        $('.nav-container').on('click', '.js-prev', function (e) {
                e.preventDefault();
                setFieldValue(fieldName, q);
                pageToken = prevPageToken;
                setupGAPIClient(e);
        });

        $('.nav-container').on('click', '.js-next', function (e) {
                e.preventDefault();
                pageToken = nextPageToken;
                setFieldValue(fieldName, q);
                setupGAPIClient(e);
        });
}

function setupGAPIClient(e) {

        gapi.client.setApiKey(YOUTUBE_API_KEY);
        gapi.client.load('youtube', 'v3', function () {
                makeRequest();
        });
}

function makeRequest() {       
        getResponse(getRequest(q, 'snippet, id', 6, pageToken));
        clearFieldValue(fieldName);
}


function setFieldValue(className, valueToSet) {
         $(className).val(valueToSet);
         return true;
}

function getFieldValue(className) {
        return $(className).val();
}

function clearFieldValue(className) {
        $(className).val('');
        return true;
}

function getRequest(q, paramPart, paramMaxResults, paramPageToken) {

        return gapi.client.youtube.search.list({
                q: q,
                part: paramPart,
                pageToken: paramPageToken,
                maxResults: paramMaxResults
        });
}

function getResponse(request) {
        $('#results').empty();

        request.execute(function (response) {
                let searchResults = response.result.items;
                prevPageToken = response.result.prevPageToken;
                nextPageToken = response.result.nextPageToken;
                console.log(response);
                        
                        $('.nav-container').empty();
                        $(`<button class='nav-button prev js-prev'>Previous</button>
                        <span class='nav-button search-title'><h1>Search Results</h1></span>
                        <button class='nav-button next js-next'>Next</button>`).appendTo('.nav-container');
                


                searchResults.forEach(item => $('#results').append(`
                       <row>
                          <div class='channel col-4'>
                            <div class='channel-container'>
                                <div class='img-link'>
                                  <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                  <img class="thumb" src="${item.snippet.thumbnails.high.url}" alt=${item.snippet.description}">
                                  </a>
                                </div>
                                <div class='title'>${item.snippet.title}</div>
                                <div class='channel-link'>
                                  <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">Go to Channel</a>
                                </div>
                            </div>
                        </div>
                       </row>
                       `));
        });
}

function updateResults(item, index) {
        ('#results').append(`${item.snippet.title}`);
}


// Function to reveal lightbox and adding YouTube autoplay
function revealVideo(div,video_id) {
        var video = document.getElementById(video_id).src;
        document.getElementById(video_id).src = video+'&autoplay=1'; // adding autoplay to the URL
        document.getElementById(div).style.display = 'block';
      }
      
      // Hiding the lightbox and removing YouTube autoplay
      function hideVideo(div,video_id) {
        var video = document.getElementById(video_id).src;
        var cleaned = video.replace('&autoplay=1',''); // removing autoplay form url
        document.getElementById(video_id).src = cleaned;
        document.getElementById(div).style.display = 'none';
      }


$(keyWordsearch);