function countMovieInGenre() {
    var context = getContext();
    var requestBody = context.getRequest().getBody();

    //get movies in the same partion
    var collection = context.getCollection();

    var viewWhereQuery = {
        query: "SELECT * FROM Movies m",
        parameters: [],
    };

    function SetResponse(size) {
        context.getResponse().setBody({
            genre: requestBody['primary_genre'],
            genreSize: size,
            inserted: requestBody
        })
    }

    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        viewWhereQuery,
        function (err, feed, options) {
            if (err) throw err;
            if (!feed || !feed.length)
                SetResponse(size = 0);
            else SetResponse(size = feed.length);
        }
    );

    if(!isAccepted) throw new Error("Error processing Genre Count ");

}