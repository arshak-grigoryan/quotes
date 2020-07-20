import { API } from './API/searchQuotes.js'

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
    this.randomRequestNumbers = 8
  }

  init() {
    API.getSomeRandomQuotes(API.getRandomQuote, this.randomRequestNumbers).then(quotes => this.changeQuotes(quotes));
  }

  // private only for model
  
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

