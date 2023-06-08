var renderHeaderFooter = function() {
    $('head').load('snippets/head.html');
    $('header').load('snippets/header.html #site-header');
    $('#info-section').load('snippets/info.html #site-info');
    $('footer').load('snippets/footer.html #site-footer');
}

var showError = function(response) {
    debugger;
    console.log('Error:', error);
}

function getQueryStringId() {
    var url = new URL(window.location.href);
    var params = new URLSearchParams(url.search);
    var id = params.get('id');
    return parseInt(id);
}
