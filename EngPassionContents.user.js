// ==UserScript==
// @name         EngPassionContents
// @namespace    EngPassionContents
// @icon         https://github.com/YumaRowen/EngPassionContents/raw/main/logo.png
// @version      1.0
// @description  If available on the github repo; it will replace Japanese stories with English ones. If they don't exist, then nothing will be replaced, and everything should work as usual.
// @match        https://asobistory.asobistore.jp/*
// @grant        none
// @updateURL    https://github.com/YumaRowen/EngPassionContents/raw/main/EngPassionContents.user.js
// @downloadURL  https://github.com/YumaRowen/EngPassionContents/raw/main/EngPassionContents.user.js
// @supportURL   https://github.com/YumaRowen/EngPassionContents/issues
// ==/UserScript==


(function() {
    var hostURL = 'https://github.com/YumaRowen/EngPassionContents/raw/main/patch/'

    'use strict';

    // Store the original fetch function
    var originalFetch = window.fetch;

    // Override the fetch function
    window.fetch = function(url, options) {
        var originalURL = url
        if (url.includes('/api/adventure/content/')) {
            // Replace the URL with the desired URL
            var SplitURL = url.split('/');
            var LoadURL = hostURL + SplitURL[4] + '/' + SplitURL[5] + '.csv';
            url = LoadURL;

            // Function to fetch the response
            var fetchResponse = function(url) {
                return originalFetch(url, options)
                    .then(function(response) {
                        // Check if the response status is 404
                        if (response.status === 404) {
                            console.log('The new URL returned a 404 response. Retrying with the original URL...');
                            // Retry with the original URL
                            return originalFetch(originalURL, options);
                        }

                        // Return the response as is
                        return response;
                    })
                    .catch(function(error) {
                        console.error('Error occurred while fetching the URL:', error);
                    });
            };

            // Call the fetch function with the modified URL and options
            return fetchResponse(url);
        }

        // Call the original fetch function with the original URL and options
        return originalFetch(url, options);
    };
})();