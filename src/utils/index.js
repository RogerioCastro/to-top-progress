/**
 * Aplica regras CSS a um elemento DOM
 * via: https://www.javascripttutorial.net/dom/css/add-styles-to-an-element/
 *
 * @param {Object} element
 * @param {Object|string} style
 */
export function css (element, style) {
  for (const property in style) {
    element.style[property] = style[property]
  }
}

/**
 * Cria um elemento DOM ou SVG com vários atributos
 * via: https://github.com/usablica/intro.js
 *
 * @param {String} tagName
 * @param {Object} attrs
 * @param {boolean} isSVG
 * @return Elemento
 */
export function createElement (tagName, attrs, isSVG = false) {
  const element = !isSVG ? document.createElement(tagName) : document.createElementNS('http://www.w3.org/2000/svg', tagName)

  attrs = attrs || {}

  // atributos que precisam ser inseridos por meio da função 'setAttribute'
  const setAttRegex = /^(?:role|data-|aria-|for)/

  for (const k in attrs) {
    const v = attrs[k]

    if (k === 'style') {
      css(element, v)
    } else if (isSVG) {
      element.setAttributeNS(null, k, v)
    } else if (k.match(setAttRegex)) {
      element.setAttribute(k, v)
    } else {
      element[k] = v
    }
  }

  return element
}

/**
 * Gera um ID parecido com ObjectId do MongoDB
 * via: https://gist.github.com/solenoid/1372386
 */
export function generateId () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16)

  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}

/**
 * Verifica a existência de uma classe CSS em um elemento
 * via: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
 *
 * @param {Object} el Elemento HTML
 * @param {String} className Nome da classe
 */
export function hasClass (el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  }
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

/**
 * Insere uma classe a um elemento, caso ela já não esteja no elemento
 * via: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
 *
 * @param {Object} el Elemento HTML
 * @param {String} className Nome da classe
 */
export function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`
  }
}

/**
 * Remove uma classe de um elemento
 * via: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
 *
 * @param {Object} el Elemento HTML
 * @param {String} className Nome da classe
 */
export function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className)
  } else if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}

/**
 * Função para observar o redimensionamento de um elemento HTML utilizando a API ResizeObserver
 * @param {HTMLElement} element Elemento HTML a ser observado
 * @param {Function} fn Callback function que recebe a largura e altura do elemento { width, height }
 * @returns Retorna a instância ResizeObserver criada
 */
export function resizeObserver (element, fn) {
  const ro = new ResizeObserver((entries) => {
    // eslint-disable-next-line no-console
    // console.log('=> Resized', entries[0])
    const { width, height } = entries[0].contentRect
    fn({ width, height })
  })
  ro.observe(element)
  return ro
}

/**
 * Remove todos os elementos dentro de outro elemento HTML informado
 * @param {Object} parent HTMLElement a ser limpo
 */
export function clearElement (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
