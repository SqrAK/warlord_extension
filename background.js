// /*global require, chrome, alert */
// var AAAAA_some_string = "asfhgasg";
// /**
//  * Display an alert with an error message, description
//  *
//  * @param  {string} textToShow  Error message text
//  * @param  {string} errorToShow Error to show
//  */
// function displayeAnError(textToShow, errorToShow) {
//     "use strict";

//     alert(textToShow + '\n' + errorToShow);
// }

// /**
//  * Retrieve a value of a parameter from the given URL string
//  *
//  * @param  {string} url           Url string
//  * @param  {string} parameterName Name of the parameter
//  *
//  * @return {string}               Value of the parameter
//  */
// function getUrlParameterValue(url, parameterName) {
//     "use strict";

//     var urlParameters  = url.substr(url.indexOf("#") + 1),
//         parameterValue = "",
//         index,
//         temp;

//     urlParameters = urlParameters.split("&");

//     for (index = 0; index < urlParameters.length; index += 1) {
//         temp = urlParameters[index].split("=");

//         if (temp[0] === parameterName) {
//             return temp[1];
//         }
//     }

//     return parameterValue;
// }

// /**
//  * Chrome tab update listener handler. Return a function which is used as a listener itself by chrome.tabs.obUpdated
//  *
//  * @param  {string} authenticationTabId Id of the tab which is waiting for grant of permissions for the application
//  * @param  {string} imageSourceUrl      URL of the image which is uploaded
//  *
//  * @return {function}                   Listener for chrome.tabs.onUpdated
//  */
// function listenerHandler(authenticationTabId, imageSourceUrl) {
//     "use strict";

//     return function tabUpdateListener(tabId, changeInfo) {
//         var vkAccessToken,
//             vkAccessTokenExpiredFlag;

//         if (tabId === authenticationTabId && changeInfo.url !== undefined && changeInfo.status === "loading") {

//             if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
//                 authenticationTabId = null;
//                 chrome.tabs.onUpdated.removeListener(tabUpdateListener);

//                 vkAccessToken = getUrlParameterValue(changeInfo.url, 'access_token');

//                 if (vkAccessToken === undefined || vkAccessToken.length === undefined) {
//                     displayeAnError('vk auth response problem', 'access_token length = 0 or vkAccessToken == undefined');
//                     return;
//                 }

//                 vkAccessTokenExpiredFlag = Number(getUrlParameterValue(changeInfo.url, 'expires_in'));

//                 if (vkAccessTokenExpiredFlag !== 0) {
//                     displayeAnError('vk auth response problem', 'vkAccessTokenExpiredFlag != 0' + vkAccessToken);
//                     return;
//                 }

//                 chrome.storage.local.set({'vkaccess_token': vkAccessToken}, function () {
//                     chrome.tabs.update(
//                         tabId,
//                         {
//                             'url'   : 'popup.html' +  "#" + vkAccessToken,
//                             'active': true
//                         },
//                         function (tab) {}
//                     );
//                 });
//             }
//         }
//     };
// }

// /**
//  * Handle main functionality of 'onlick' chrome context menu item method
//  */
// document.addEventListener('DOMContentLoaded', function() {
//     "use strict";

//     return function (info, tab) {

//         var imageSourceUrl       = info.srcUrl,
//             imageUploadHelperUrl = 'upload.html#',
//             vkCLientId           = '5857939',
//             vkRequestedScopes    = 'docs,offline',
//             vkAuthenticationUrl  = 'https://oauth.vk.com/authorize?client_id=' + vkCLientId + '&scope=' + vkRequestedScopes + '&redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html&display=page&response_type=token';

//         chrome.storage.local.get({'vkaccess_token': {}}, function (items) {

//             if (items.vkaccess_token.length === undefined) {
//                 chrome.tabs.create({url: vkAuthenticationUrl, selected: true}, function (tab) {
//                     chrome.tabs.onUpdated.addListener(listenerHandler(tab.id, imageSourceUrl));
//                 });

//                 return;
//             }
//         });
//     };
// }

// function Encrypt(theText) {
//     output = new String;
//     Temp = new Array();
//     Temp2 = new Array();
//     TextSize = theText.length;
//     for (i = 0; i < TextSize; i++) {
//         rnd = Math.round(Math.random() * 122) + 68;
//         Temp[i] = theText.charCodeAt(i) + rnd;
//         Temp2[i] = rnd;
//     }
//     for (i = 0; i < TextSize; i++) {
//         output += String.fromCharCode(Temp[i], Temp2[i]);
//     }
//     return output;
// }
//
// var vkAccessToken = undefined;
// console.log("background start");
//
// chrome.storage.local.get({'vkaccess_token': {}}, function (items) {
//     if ((items.vkaccess_token === null) || (items.vkaccess_token.length === undefined))
//     {
//         vkAccessTokenCrypt = Encrypt("vkAccessTokens");
//         chrome.storage.local.set({'vkaccess_token': vkAccessToken}, function()
//         {
//             console.log("background setup vkaccess_token (" + vkAccessTokenCrypt + ")");
//         });
//     }
//     else
//     {
//         console.log("vkacess_token is already setuped (" + items.vkaccess_token + ")");
//         chrome.storage.local.remove('vkaccess_token');
//     }
//     console.log("background finished");
// });

var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XHR();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            console.log(xhttp);
            console.log('correct_response');
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            console.log('server_error');
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});