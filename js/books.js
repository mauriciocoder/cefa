$(document).ready(function() {
    renderHeaderFooter();
    $("#books-section").hide();
    getAllBooks(showBooks, showError);
});

var showBooks = function(response) {
    debugger;
    var books = response.documents;
    if (typeof books !== 'undefined' && books.length >= 1) {
        for (var i = 0; i < books.length; i++) {
            var image = books[i].image;
            var name = (books[i].name.substr(0, 100));
            var id = books[i]._id;
            $("#books-container").append(getBookTemplate(image, name, id));
        }
    }
    $("#books-section").show();
}

var getBookTemplate = function(image, name, id) {
    return '<div class="col-md-3 mb-5"><div class="img-box"><img class="books-section-image" src="' + image + '" alt=""></div><br/><h6 class="books-short-desc">' + name + '</h6><div><a class="purchase_button" href="/book.html?id=' + id + '">Detalhes</a></div></div>';
}