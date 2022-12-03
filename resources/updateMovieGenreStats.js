function updateMovieGenreStats() {
    var context = getContext();
    var requestBody = context.getRequest().getBody();

    //get movies in the same partion
    var collection = context.getCollection();

    var viewWhereQuery = {
        query: "SELECT * FROM Movies m WHERE m.type = 'VIEW'",
        parameters: [],
    };

    function GenreViewFactory(view = null) {
        if (!view)
            return {
                id: ("__view__ " + requestBody['primary_genre']),
                type: "VIEW",
                primary_genre: requestBody['primary_genre'],
                size: size
            };

        else {

        }

        function countItemsInGenre() {
            var items = 0;
            var itemsWhereQuery = {
                query: "SELECT * FROM Movies m WHERE m.type <> 'VIEW'",
                parameters: []};

            var isAccepted = queryDocuments(
                collection.getSelfLink(),
                itemsWhereQuery

            );
            if(!isAccepted) throw new Error('Failed to count movies in Genre '+ requestBody['primary_genre']);

        }
    };

    //query movies in that primary genre and count
    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        viewWhereQuery,
        function (err, feed, options) {
            if (err) throw err;
            if (!feed || !feed.length) {
                // initiate meta doc if not exists
                var inserted = collection.createDocument(
                    collection.getSelfLink(),
                    GenreViewFactory(),
                    (callback = ViewReadyCallback)
                );
                if (!inserted) throw new Error('The movie was not inserted by the server.');
                //? will a break in this revert the insert?
            }
            else {
                var updated = collection.replaceDocument(
                    collection.getSelfLink(),
                    GenreViewFactory(feed[0]),
                    (callback = ViewReadyCallback)
                );
                if (!updated) throw new Error('The movie was not updated by the server.');
            }
        }
    );

    function ViewReadyCallback(err, view) {
        if (err) throw new Error("Error:" + err.message);
        context.getResponse().setBody({
            inserted: context.getRequest(),
            genreTotal: view
        });

        /*{
            inserted: context.getRequest(),
            genreTotal: view
        }*/
    }

    if (!isAccepted) throw new Error('The query was not accepted by the server.');
}