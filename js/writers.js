$(document).ready(function() {
    renderHeaderFooter();
    $("#writers-section").hide();
    getAllWriters(showWriters, showError);
});

var showWriters = function(response) {
    var writers = response.documents;
    if (typeof writers !== 'undefined' && writers.length >= 1) {
        for (var i = 0; i < writers.length; i++) {
            var image = writers[i].image;
            var name = writers[i].name;
            var id = writers[i]._id;
            $("#writers-container").append(getBookTemplate(image, name, id));
        }
    }
    $("#writers-section").show();
}

var showError = function(response) {
    console.log('Error:', error);
}

var getBookTemplate = function(image, name, id) {
    return '<div class="col-md-3 mb-5"><div class="img-box"><img class="writers-section-image" src="' + image + '" alt=""></div><br/><h6 class="writers-short-desc">' + name + '</h6><div><a class="purchase_button" href="/writer.html?id=' + id + '">Detalhes</a></div></div>';
}