// Contains method for array
Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

queryInfo = new Object();
queryInfo.url = "https://www.facebook.com/*";

// Array of tabIds where page action has been clicked
tabIds = [];

// Show icon only on Facebook tabs
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.search("https://www.facebook.com/*") != -1) {
        chrome.pageAction.show(tabId);
    }
}

// Listen for any changes to the URL of a tab
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// InsertCSS to show or hide Post button
chrome.pageAction.onClicked.addListener(function(tab) {
    if (tabIds.contains(tab.id)) {
        // hide Post button
        chrome.tabs.insertCSS(null, 
                         {code:"button._11b {visibility:hidden !important;}"});
        var index = tabIds.indexOf(tab.id);
        tabIds.splice(index, 1);
    } else {
        // show Post button
        chrome.tabs.insertCSS(null, 
                         {code:"button._11b {visibility:visible !important;}"});
        tabIds.push(tab.id);
    }
}
    
);



