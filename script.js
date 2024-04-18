const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');
const twitterBtn = document.getElementById('twitter-btn');
// const author = document.getElementById('author');
const author = document.querySelector('span');
console.log(author.textContent)
const endPoint = 'https://api.quotable.io/random';

async function getQuote () {
    newQuoteBtn.disabled = true;
    try {
        const response = await fetch(endPoint);

        if (!response.ok) throw Error(response.statusText);

        const json = await response.json()
        displayQuote(json.content, json.author);
        tweetQuote(json.content, json.author);
        console.log(json.author);
    } catch (error) {
        console.error(error);
    } finally {
        newQuoteBtn.disabled = false;
    }
}

function displayQuote (quote, author) {
    quoteText.textContent = quote;
    author.textContent = author;
}

function tweetQuote (quote, author) {
    twitterBtn.setAttribute('href', `https://twitter.com/share?text=${quote} - ${author}`)
}

getQuote();

newQuoteBtn.addEventListener('click', getQuote);