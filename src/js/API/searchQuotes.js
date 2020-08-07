let QUOTES, AUTHORS, GENRES

async function loadData () {
    QUOTES = (await import('./data/quotes')).QUOTES
    AUTHORS = (await import('./data/authors')).AUTHORS
    GENRES = (await import('./data/genres')).GENRES
}

loadData()

let API
export default class SearchData {
    constructor () {
        if (API instanceof SearchData) { return API}
        else {return this}
    }

    async getRandomQuote() {
        try {
            const res = await fetch(
            "https://quote-garden.herokuapp.com/api/v2/quotes/random"
            );
            const json = await res.json();
            return json.quote;
        } catch (err) {
            console.error(err);
        }
    }
    
    async getSomeRandomQuotes(cb, responseCount) {
        try {
            const res = await Promise.all(
            new Array(responseCount).fill(null).map(() => cb())
            );
            return res;
        } catch (err) {
            console.error(err);
        }
    }

    getAuthor (str) {
        let nameLetters = str.trim().split('')
        for (let i = 0; i<nameLetters.length; i++) {
            if(
                nameLetters[i-1] === undefined || 
                nameLetters[i-1] === " " || 
                nameLetters[i-1] === "-"
            ) {
                if(
                    !(nameLetters[i] === 'd' && nameLetters[i+1] === 'a' || 
                    nameLetters[i] === 'd' && nameLetters[i+1] === 'e' || 
                    nameLetters[i] === 'l' && nameLetters[i+1] === 'a')
                ) {
                    nameLetters[i] = nameLetters[i].toUpperCase()

                }
            }
        }
        const name = nameLetters.join("")
        for (let i = 0; i < AUTHORS.length; i++) {
            if(AUTHORS[i].includes(name)) {
                return AUTHORS[i]
            }
        }
    }

    getGenre (str) {
        let nstr = str.trim().toLowerCase()
        for (let i = 0; i < GENRES.length; i++) {
            if(GENRES[i].includes(nstr)) {
                return GENRES[i]
            }
        }
    }

    getQuotesByAuthor (author) {
        const authorQuotes = []
        QUOTES.forEach(q => {
            if(q.author === author) {
                authorQuotes.push(q)
            }
        })
        return authorQuotes
    }

    getQuotesByGenre (genre) {
        const authorQuotes = []
        QUOTES.forEach(q => {
            if(q.genre === genre) {
                authorQuotes.push(q)
            }
        })
        return authorQuotes
    }

    getQuotesByPhrase (str) {
        let nstr = str.trim().toLowerCase()
        let res = []
        QUOTES.forEach(quote => {
            if(quote["text"]){
                if(quote["text"].includes(nstr)) {
                    res.push(quote)
                }
            }
        })
        return res
    }

    searchData (str) {
        if ( this.getGenre(str) ) {
            return this.getQuotesByGenre(this.getGenre(str))
        }
        else if( this.getAuthor(str) ) {
            return this.getQuotesByAuthor(this.getAuthor(str))
        } 
        else if( this.getQuotesByPhrase(str).length !== 0 ) {
            return this.getQuotesByPhrase(str)
        }
        else {
            return {searchValue:str, result:null}
        }
    }
    
    // foo() {
    //     const authors = {}
    //     const genres = new Set()
    //     const quotes = new Set()
    //     // take top 100 authors
    //     for(let i = 100; i > 0; i--) {
    //         authors[this.AUTHORS[i]] = {}
    //     }
    //     this.QUOTES.forEach(({author, genre='general', text}) => {
    //         // skip quote if auth is not taken
    //         if (!authors[author]) {
    //             return;
    //         }
    //         const authorU = authors[author]
    //         // create author genre if it’s not created
    //         if (!authorU[genre]) {
    //             genres.add(genre)
    //             authorU[genre] = new Set()
    //         }
    //         if (authorU[genre].size <= 15) {
    //             authorU[genre].add(text)
    //             quotes.add(text);
    //         }
    //     });
    //     window.authors = Object.keys(authors);
    //     window.genres = [...genres];
    //     window.quotes = [...quotes];
    //     window.quotesByGeneresByAuthor = authors;
        
    //     console.log(genres)
    //   }
}

API = new SearchData()

export { API }
