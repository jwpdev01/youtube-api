const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/";
const YOUTUBE_API_KEY = "AIzaSyAFrScEUoPW6ZBrHIvuAeEDsplHAqS_gl0";
let pageToken;
let prevPageToken;
let nextPageToken;

function keyWordsearch() {
        setupYouTubeSearch();
}

function setupYouTubeSearch() {
        $('#search-button').on('click', function (e) {
                e.preventDefault();
                setupGAPIClient(e);
        });

        $('.nav-container').on('click', '.js-prev', function (e) {
                e.preventDefault();
                pageToken = prevPageToken;
                setupGAPIClient(e);
        });

        $('.nav-container').on('click', '.js-next', function (e) {
                e.preventDefault();
                pageToken = nextPageToken;
                setupGAPIClient(e);
        });

       /** $(".js-video-button").modalVideo({
                youtube: {
                        controls: 0,
                        nocookie: true
                }
        });**/
}

function setupGAPIClient(e) {

        gapi.client.setApiKey(YOUTUBE_API_KEY);
        gapi.client.load('youtube', 'v3', function () {
                makeRequest();
        });
}

function makeRequest() {
        let fieldName = '.js-query';
        getResponse(getRequest(getQueryFieldValue(fieldName), 'snippet, id', 6, pageToken));
        clearQueryFieldValue(fieldName);
}

function getQueryFieldValue(className) {
        return $(className).val();
}

function clearQueryFieldValue(className) {
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

                
                        $(`<span class='nav-button prev js-prev'>Previous</span>
                        <span class='search-title'><h1>Search Results</h1></span>
                        <span class='nav-button next js-next'>Next</span>`).appendTo('.nav-container');
                


                searchResults.forEach(item => $('#results').append(`
                       <row>
                          <div class='channel col-4'>
                            <div class='channel-container'>
                                <div class='img-link'>
                                  <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                  <img class="thumb" src="${item.snippet.thumbnails.high.url}" alt="No Image Available."></a>
                                </div>
                                <div class='title'>${item.snippet.title}</div>
                                <div class='channel-link'>
                                  <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">Go to Channel</a>
                                </div>
                                <a href="#" class="js-video-button" data-video-id=${item.id.videoId}'>Play Video</a>
                            </div>
                        </div>
                       </row>
                       `));
        });
}

function updateResults(item, index) {
        ('#results').append(`${item.snippet.title}`);
}

$(keyWordsearch);