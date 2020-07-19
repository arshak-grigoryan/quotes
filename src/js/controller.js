import Model from './model.js'
import View  from './view/view.js'

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindOnQuotesChange(quote => this.onQuotesChangee(quote))
    
    this.view.bindonSearchQuotes(author => this.onSearchQuotes(author))

    this.model.init();
  }
  
  onQuotesChangee (quotes){
    this.view.createSearch()
    this.view.createRandomQuotes()
    this.view.displayRandomQuotes(quotes)
  }

  onSearchQuotes (value) {
    Promise.resolve(this.model.getQuotes(value))
      .then(res => {
        if( Array.isArray(res)) {
          this.view.displaySearchResult(res)
        } else {
          this.view.displayNothingFound(res['searchValue'])
        }
      })
  }
}

const app = new Controller(new Model(), new View());