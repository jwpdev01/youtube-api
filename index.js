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
                let fieldName =  '.js-query';
                getResponse(getRequest(getQueryFieldValue(fieldName), 'snippet, id', 5));
                clearQueryFieldValue(fieldName);                       
        }

        function getQueryFieldValue(className) {
                return $(className).val();
        }

        function clearQueryFieldValue(className) {
                $(className).val('');
                return true;
        }

        function getRequest(q, paramPart, paramMaxResults) {
                return gapi.client.youtube.search.list({
                        q: q,
                        part: paramPart,
                        maxResults: paramMaxResults
                });
        }
        
        function getResponse(request) {
                request.execute(function(response) {
                       let searchResults = response.result.items;
                       searchResults.forEach(item => $('#results').append(`<li>${item.snippet.title}</li>`));
                        });    
        }

        function updateResults(item, index) {
                ('#results').append(`${item.snippet.title}`);
        }

        $(keyWordsearch);