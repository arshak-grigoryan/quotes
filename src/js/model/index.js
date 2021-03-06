import { API } from '../API/searchQuotes'
import { RANDOM_QUOTES_COUNT } from '../constants';

function check(arr, str) {
  for (const quote of arr) {
    if(quote["text"] === str) {
      return true
    }
  }
  return false
}

export default class Model {
  constructor() {
    this.quotes = [];
  }

  init() {
    API.getSomeRandomQuotes(API.getRandomQuote, RANDOM_QUOTES_COUNT).then(quotes => this.changeQuotes(quotes));
  }
  
  changeQuotes(quotes) {
    this.quotes = quotes;
    this.onQuotesChange(this.quotes);
  }

  bindOnQuotesChange(cb) {
    this.onQuotesChange = cb;
  }
  
  getQuotes (value) {
    const res = API.searchData(value)
    if(Array.isArray(res)) {
      let nres = []
      res.forEach(quote => {
        if( !(check(nres, quote["text"])) ) {
          nres.push(quote)
        }
      })
      return nres      
    }
    return res
  }
  
}

