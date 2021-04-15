const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
    showLoadingSpinner();
    // Pick random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styling
    if (quote.text.length > 150) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner()

}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        
    }
}

// Tweet Quote
function tweetQuote() {
    const tweeterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweeterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes();