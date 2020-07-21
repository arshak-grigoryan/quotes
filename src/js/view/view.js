import { createEL, createQuotesElement } from './viewHelpers.js'

export default class View {
  constructor() {
    this.app = document.getElementById("app")
    this.renderedQuotesCount = 16
  }

  createRandomQuotes () {
    const div = createEL({tag:'div', parentEl: this.app, className:'searchResult' })
    const randomQuotes = createEL({tag:'div', parentEl:this.app, className:'quotes'})
  }

  createSearch () {
    const searchWrapper = createEL({tag:'div', parentEl: this.app})
    const searchElement = createEL({tag:'div', parentEl:searchWrapper,className: 'searchElement'})
    const searchForm = createEL({tag:'form', parentEl: searchElement})
    const inputText = createEL({tag:'input', parentEl: searchForm, className: 'quoteInput', attributes: {'type': 'text'}}) 
    inputText.addEventListener("keydown", e => {
      if(e.keyCode === 13) { 
        this.onSearchQuotes(e.target.value)
        event.preventDefault()
      }
    })
    const inputButton = createEL({tag:'input', parentEl: searchForm, className: 'quoteInput', attributes: {'type': 'button', 'value': 'search'}}) 
    inputButton.addEventListener('click', () => this.onSearchQuotes(document.getElementsByClassName('quoteInput')[0].value))
  }

  displayRandomQuotes (quotes) {
    this.randomQuotes = document.getElementsByClassName('quotes')[0]
    quotes.forEach(quote => {
      const quoteElement = createQuotesElement(quote);
        this.randomQuotes.appendChild(quoteElement)
   })
 }

 updateExicestedQuotes (quotes) {
  const elNothingFound = document.getElementsByClassName("nothingFound")[0]
  if (elNothingFound) {
    elNothingFound.remove()
  }
  const randomAllQuotes = document.querySelectorAll('.quotes > div')
  if(randomAllQuotes.length) {
    if(quotes.length < this.renderedQuotesCount) {
      for (let i=0; i<quotes.length; i++) {
        randomAllQuotes[i].children[0].children[0].textContent = quotes[i].text
        randomAllQuotes[i].children[0].children[1].textContent = quotes[i].author
      }
      for(let i = quotes.length; i<this.renderedQuotesCount; i++) {
        randomAllQuotes[i].remove()
      }
      this.renderedQuotesCount = quotes.length
    } else {
      for (let i=0; i<this.renderedQuotesCount; i++) {
        randomAllQuotes[i].children[0].children[0].textContent = quotes[i].text
        randomAllQuotes[i].children[0].children[1].textContent = quotes[i].author
      }
      for(let i=this.renderedQuotesCount; i<quotes.length; i++){
        const newQuote = createQuotesElement({quoteText:quotes[i]['text'], quoteAuthor:quotes[i]['author']})
        this.randomQuotes.appendChild(newQuote)
      }
      this.renderedQuotesCount = quotes.length
    }  
  } else {
    for (let i=0; i<quotes.length; i++) {
      const newQuote = createQuotesElement({quoteText:quotes[i]['text'], quoteAuthor:quotes[i]['author']})
      this.randomQuotes.appendChild(newQuote)
    }
    this.renderedQuotesCount = quotes.length
  }
 }

 displaySearchResult (quotes) {
  this.updateExicestedQuotes(quotes)
 }

 displayNothingFound (res) {
    const randomAllQuotes = document.querySelectorAll('.quotes > div')
    for (const val of randomAllQuotes) {
      val.remove()
    }
    const elNothingFound = document.getElementsByClassName("nothingFound")[0]
    console.log(elNothingFound)
    if( !elNothingFound ) {
      const elDiv = createEL({tag:'div', parentEl:this.randomQuotes, className:'nothingFound'})
      const elP = createEL({tag:'p', parentEl:elDiv, content:`Not found ${res}`})
    } else {
      elNothingFound.children[0].innerText = `Not found ${res}`
    }
}
 bindonSearchQuotes (cb) {
  this.onSearchQuotes = cb
 }
}