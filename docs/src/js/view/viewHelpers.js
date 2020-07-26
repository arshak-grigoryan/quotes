function createEL({tag, parentEl, className, attributes, content}) {
  const el = document.createElement(tag)

  if(className) {el.classList.add(className)}
  if(attributes) {
    for (const name in attributes) {  
      el.setAttribute(name, attributes[name])
    }
  }
  if(content) {el.textContent = content}
  if(parentEl) {parentEl.appendChild(el)}
  return el
}

function createQuotesElement(quotesData) {
    const { quoteText, quoteAuthor} = quotesData; 
    const quoteWrapper = createEL({tag:'div'})
    const quoteElement = createEL({tag:'div', parentEl:quoteWrapper, className: 'box'})
    const quoteTextEl = createEL({tag:'p', parentEl:quoteElement,className:'text', content:quoteText})
    const quoteAuthorEl = createEL({tag:'h2', parentEl:quoteElement, className:'author', content:quoteAuthor})
    return quoteWrapper
}


export { createEL, createQuotesElement}