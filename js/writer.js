$(document).ready(function() {
    renderHeaderFooter();
    $("#writer-section").hide();
    id = getQueryStringId(); 
    getWriterById(id, showWriter, showError);
    getBooksByWriterId(id, showWritersBooks, showError);
});

var showWriter = function(response) {
    var documents = response.documents;
    if (typeof documents !== 'undefined' && documents.length == 1) {
        var writer = documents[0];
        renderWriterInfo(writer);
    } else {
        console.error("Unique book not found");
    }
    $("#writer-section").show();
}

var showWritersBooks = function(response) {
    var books = response.documents;
    if (typeof books !== 'undefined' && books.length >= 1) {
        for (var i = 0; i < books.length; i++) {
            var image = books[i].image;
            var name = (books[i].name.substr(0, 100));
            var id = books[i]._id;
            $("#books-container").append(getBookTemplate(image, name, id));
        }
    }
}

var getBookTemplate = function(image, name, id) {
    return '<div class="col-md-3 mb-5"><div class="img-box"><img class="books-section-image" src="' + image + '" alt=""></div><br/><h6 class="books-short-desc">' + name + '</h6><div><a class="purchase_button" href="/book.html?id=' + id + '">Detalhes</a></div></div>';
}

var renderWriterInfo = function(writer) {
    $('#writer-name').text(writer.name);
    $('#writer-description').text(writer.bio);
    $("#writer-image").attr("src", writer.image);
}
