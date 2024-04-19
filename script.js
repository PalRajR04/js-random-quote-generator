const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');
const twitterBtn = document.getElementById('twitter-btn');
const authorName = document.getElementById('author');

const endPoint = 'https://api.quotable.io/random';

async function getQuote () {
    newQuoteBtn.disabled = true;
    try {
        const response = await fetch(endPoint);

        if (!response.ok) throw Error(response.statusText);

        const data = await response.json()

        displayQuote(data.content, data.author);
        tweetQuote(data.content, data.author);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch new quote!')
    } finally {
        newQuoteBtn.disabled = false;
    }
}

function displayQuote (quote, author) {
    quoteText.textContent = quote;
    authorName.textContent = author;
}

function tweetQuote (quote, author) {
    twitterBtn.setAttribute('href', `https://twitter.com/share?text=${quote} - ${author}`)
}

document.addEventListener('DOMContentLoaded', () => {
    getQuote();
})

newQuoteBtn.addEventListener('click', getQuote);