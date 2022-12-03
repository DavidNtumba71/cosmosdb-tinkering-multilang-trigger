function interceptMovieDate() {
    var context = getContext();
    var request = context.getRequest();

    var itemToCreate = request.getBody();

    //alter movie release date format from dd/MM/yyyy to yyyy/MM/dd
    var currentDate = itemToCreate["release_date"];
    var dateParts = currentDate.split('/');
    itemToCreate["release_date"] = dateParts.reverse().join('/');
    //*update column

    //create timestamp
    var ts = new Date();
    itemToCreate["timestamp"] = ts.getTime();
    //*insert column

    request.setBody(itemToCreate);
}