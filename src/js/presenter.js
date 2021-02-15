import Model from './model'
import View  from './view'
import '../css/styles'

class Presenter {
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
        if(Array.isArray(res)) {
          this.view.displaySearchResult(res)
        } else {
          this.view.displayNothingFound(res['searchValue'])
        }
      })
  }
}

const app = new Presenter(new Model(), new View());