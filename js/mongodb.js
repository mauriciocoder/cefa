const DATABASE = "Cefa";
const DATASOURCE = "Cefa";
// The data api is set for Read only, so we are safe to keep key here 
const API_KEY = "s3jMtGomdPP9zycCNRDYlvSagDLEaX4pDwnrr00xYF7vzu8J5hNwqy4OLbINlzdR";

async function callApi(collection, filter, success, error) {
    await loadToken();
    var token = Cookies.get('access_token');
    $.ajax({
        url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-brazg/endpoint/data/v1/action/find",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify({
            "collection": collection,
            "database": "Cefa",
            "dataSource": "Cefa",
            "filter": filter
        }),
        success: success,
        error: error
    });
}

async function loadToken() {
    var token = Cookies.get('access_token');
    if (!token || isTokenExpired(token)) {
        const response = await getBearerToken();
        if (response.access_token) {
            token = response.access_token;
            Cookies.set('access_token', token);
        }
    }
}

function isTokenExpired(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
    decodedToken = JSON.parse(jsonPayload);
    var expirationTime = decodedToken.exp;
    var currentTime = Math.floor(Date.now() / 1000);
    return expirationTime < currentTime;
}

function getBearerToken() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://realm.mongodb.com/api/client/v2.0/app/data-brazg/auth/providers/api-key/login",
            method: "POST",
            timeout: 0,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "key": API_KEY
            }),
            success: resolve,
            error: reject
        });
    });
}
////////////////////////////////////////////////////////////
// Custom search functions
////////////////////////////////////////////////////////////

function getBookById(id, success, error) {
    callApi("Books", {_id: id}, success, error);
}

function getAllBooks(success, error) {
    callApi("Books", {}, success, error);
}

function getBooksByWriterId(id, success, error) {
    callApi("Books", {"writers._id": id}, success, error);
}

function getWriterById(id, success, error) {
    callApi("Writers", {_id: id}, success, error);
}

function getAllWriters(success, error) {
    callApi("Writers", {}, success, error);
}
