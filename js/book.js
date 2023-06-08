$(document).ready(function() {
    renderHeaderFooter();
    $("#book-section").hide();
    id = getQueryStringId();
    debugger;    
    getBookById(id, showBook, showError);
});

var showBook = function(response) {
    debugger;
    var documents = response.documents;
    if (typeof documents !== 'undefined' && documents.length == 1) {
        var book = documents[0];
        renderBookInfo(book);
        renderWriters(book);
        renderTags(book);
        renderDigital(book);
        renderPrinted(book);
    } else {
        console.error("Unique book not found");
    }
    $("#book-section").show();
}

var renderWriters = function(book) {
    var writers = book.writers
    if (typeof writers !== 'undefined') {
        if (writers.length > 1) {
            $("#book-meta").append("<strong>Autores: </strong>");
            for (var i = 0; i < writers.length; i++) {
                $("#book-meta").append("<a id='writer_url' href='writer.html?id=" + writers[i]._id + "'>" + writers[i].name + "</a>&nbsp;|&nbsp;");
            }
            $("#book-meta").append("<br/>");
        } else {
            $("#book-meta").append("<strong>Autor(a): </strong><a id='writer_url' href='writer.html?id=" + writers[0]._id + "'>" + writers[0].name + "</a>&nbsp;|&nbsp;<br/>");
        }
    }
    $("#book-meta").append("<strong>Edição: </strong>" + book.edition + "<br/>");
}

var renderTags = function(book) {
    var tags = book.tags;
    if (typeof tags !== 'undefined') {
        if (tags.length > 1) {
            $("#book-meta").append("<strong>Categoria(s):</strong>");
            for (var i = 0; i < tags.length; i++) {
            $("#book-meta").append("&nbsp;<a id='writer_url' href='categorias.html?name=" + encodeURIComponent(tags[i]) + "'>" + tags[i] + "</a>&nbsp;|&nbsp;");  
            }
        } else {
            $("#book-meta").append("<strong>Categoria:</strong> &nbsp;<a id='writer_url' href='categorias.html?name=" + encodeURIComponent(tags[0]) + "'>" + tags[0] + "</a>&nbsp;|&nbsp;");
        }
    }
}

var renderDigital = function(book) {
    var digital = book.digital;
    if (typeof digital !== 'undefined') {
        $("#book-digital-ebook").text(digital.ebook);
        $("#book-digital-year").text(digital.year);
        $("#book-digital-pages").text(digital.pages);
        $("#book-digital-isbn").text(digital.ISBN13);  
    } else {
        $("#book-digital").remove();
    }
}

var renderPrinted = function(book) {
    var printed = book.printed;
    if (typeof printed !== 'undefined') {
        $("#book-printed-year").text(printed.year);
        $("#book-printed-pages").text(printed.pages);
        $("#book-printed-isbn").text(printed.ISBN13);
        $("#book-printed-weight").text(printed.weight);  
        $("#book-printed-spine").text(printed.spine);
        $("#book-printed-bookbinding").text(printed.bookbinding);
        $("#book-printed-purchase").attr("href", printed.purchase);
    } else {
        $("#book-printed").remove();
    }
}

var renderBookInfo = function(book) {
    $('#book-name').text(book.name);
    $('#book-description').text(book.description);
    $("#book-image").attr("src", book.image);
}
