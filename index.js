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

        $('.js-prev').on('click', function(e) {
                e.preventDefault();
                pageToken = prevPageToken;
                setupGAPIClient(e);
        });

        $('.js-next').on('click', function(e) {
                e.preventDefault();
                pageToken = nextPageToken;
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