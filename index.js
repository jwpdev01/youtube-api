function keyWordsearch(){
        $('#search-button').on('click', function(e) {
                e.preventDefault();
                gapi.client.setApiKey('AIzaSyAFrScEUoPW6ZBrHIvuAeEDsplHAqS_gl0');
                gapi.client.load('youtube', 'v3', function() {
                        makeRequest();
                });
          
        });
          
        }
        function makeRequest() {
                var q = $('#query').val();
                var request = gapi.client.youtube.search.list({
                        q: q,
                        part: 'snippet, id', 
                        type: 'video',
                        maxResults: 5
                });
                request.execute(function(response) {                                                                                    
                        $('#results').empty();
                        console.log(response);
                        var srchItems = response.result.items;                      
                        $.each(srchItems, function(index, item) {
                        vidTitle = item.snippet.title;  
                        vidThumburl =  item.snippet.thumbnails.default.url;                 
                        vidThumbimg = '<img id="thumb" src="'+vidThumburl+'" alt="No Image Available." style="width:204px;height:128px">';        
                        vidId = item.id.videoId;
                        //$('#results').append('<pre>' + vidTitle + vidThumbimg + '</pre>');                      
                        
                        $('#results').append(`
                        <pre class='framing'>
                        <div class='title'>${vidTitle}</div>
                        <div class='img-link'><a href="https://www.youtube.com/watch?v=${vidId}" target="_blank">${vidThumbimg}</a></div>
                        </pre>                  
                        `);
    
                        
                });
            });
        }
        
        $(keyWordsearch);