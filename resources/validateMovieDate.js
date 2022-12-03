    function validateMovieDate() {
        var context = getContext();
        var request = context.getRequest();
        var itemToCreate = request.getBody();
        
        if (!("timestamp" in itemToCreate))
            throw "no timestamp found in movie: "+itemToCreate["id"];    

        request.setBody(itemToCreate);
    }