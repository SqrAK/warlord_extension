// function displayeAnError(textToShow, errorToShow) {
//     "use strict";

//     alert(textToShow + '\n' + errorToShow);
// }

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

// function listenerHandler(authenticationTabId, imageSourceUrl) {
//     "use strict";
//     alert(2);
//     return function tabUpdateListener(tabId, changeInfo) {
//         var vkAccessToken,
//             vkAccessTokenExpiredFlag;
//         displayeAnError("1");
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
//                 alert("everething is correct");
//                 chrome.storage.local.set({'vkaccess_token': vkAccessToken}, function () {
//                     alert("stop");
//                     chrome.tabs.update(
//                         tabId,
//                         {
//                             'url'   : imageSourceUrl,
//                             'active': true
//                         },
//                         function (tab) {}
//                     );
//                 });
//             }
//         }
//     };
// }

// function ListenerHandler(tabId, changeInfo, tab) {

// }

function unEncrypt(theText) {
    output = new String;
    Temp = new Array();
    Temp2 = new Array();
    TextSize = theText.length;
    for (i = 0; i < TextSize; i++) {
        Temp[i] = theText.charCodeAt(i);
        Temp2[i] = theText.charCodeAt(i + 1);
    }
    for (i = 0; i < TextSize; i = i+2) {
        output += String.fromCharCode(Temp[i] - Temp2[i]);
    }
    return output;
}

document.addEventListener('DOMContentLoaded', function() {
    var
    imageSourceUrl = "https://vk.com",
    curLocation = window.location.href; 
    imageUploadHelperUrl = 'popup.html#',
    vkCLientId           = '5857939',
    vkRequestedScopes    = 'docs,offline,friends,messages,wall,notifications',
    vkAuthenticationUrl  = 'https://oauth.vk.com/authorize?client_id=' + vkCLientId + '&display=popup&scope=' + vkRequestedScopes + '&redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html&response_type=token';
    chrome.storage.local.get({'vkaccess_token': {}}, function (items) {
      console.log(items.vkaccess_token.length === undefined);
      console.log(unEncrypt(items.vkaccess_token));
      var statusElem = document.getElementById("path");
      statusElem.innerHTML = "<p>" + curLocation +"</p>";
    });
    var backgroundPage = chrome.extension.getBackgroundPage();
    console.log(backgroundPage === null);
    console.log(backgroundPage);
    var statusElem = document.getElementById("status");
    statusElem.innerHTML = "<p>Вход</p>";
});
