import './style.scss'
import { createElement, addClass, removeClass, resizeObserver, clearElement } from './utils'

export default class ToTopProgress {
  /**
   * @param {object} [options] - Configurações gerais.
   * @param {string} options.container - Container HTML onde o botão será incluído (query selector).
   * @param {string} options.observerContainer - Container HTML que terá seu redimensionamento observado (query selector).
   * @param {number} options.minScrollHeight - Quantidade, em pixels, da rolagem para que o botão seja exibido.
   * @param {string} options.extraClass - Classe a ser adiconada ao container do botão.
   * @param {string} options.color - Cor dos elementos do botão (CSS color).
   * @param {string} options.colorBackground - Cor de fundo do botão (CSS color).
   * @param {string} options.colorHover - Cor dos elementos do botão ao passar o mouse sobre (CSS color).
   * @param {string} options.colorTrack - Cor da trilha sob a barra de progresso (CSS color).
   */
  constructor(options) {
    // Configurações iniciais
    this.settings = {
      container: 'body',
      observerContainer: 'body',
      minScrollHeight: 200,
      extraClass: null,
      color: null,
      colorBackground: null,
      colorHover: null,
      colorTrack: null,
      ...options
    }
    this.elements = {
      containerElement: null,
      progressWrap: null,
      svgElement: null,
      svgPathCircle: null,
      svgPathArrow: null,
      observerElement: null
    }
    this.ro = null
    this.styleColorTrack = this.settings.colorTrack
      ? { boxShadow: `inset 0 0 0 1.6px ${this.settings.colorTrack}` }
      : {}
    this.styleColorCircle = this.settings.color
      ? { stroke: this.settings.color }
      : {}
    this.styleColorCircle = this.settings.colorBackground
      ? { fill: this.settings.colorBackground, ...this.styleColorCircle }
      : this.styleColorCircle
    this.styleColorArrow = this.settings.color
      ? { fill: this.settings.color }
      : {}
    this.strokeDashoffset = 307.919
    this.bodyHeight = document.body.offsetHeight + parseInt(getComputedStyle(document.body).marginTop) + parseInt(getComputedStyle(document.body).marginBottom)
    // Variáveis necessárias para usar removeEventListener
    this.handleScrollBinded = this.handleScroll.bind(this)
    this.handleClickBinded = this.handleClick.bind(this)
    this.handleMouseenterBinded = this.handleMouseenter.bind(this)
    this.handleMouseleaveBinded = this.handleMouseleave.bind(this)

    this.init()
  }

  /**
   * Cria todos os elementos HTML e SVG
   */
  createElements () {
    this.elements.containerElement = document.querySelector(this.settings.container)
    if (this.elements.containerElement) {
      this.elements.progressWrap = createElement('div', {
        className: this.settings.extraClass ? `tt-progress-wrap ${this.settings.extraClass}` : 'tt-progress-wrap',
        style: this.styleColorTrack
      })
      this.elements.svgElement = createElement(
        'svg',
        {
          class: 'tt-progress-svg',
          width: '100%',
          height: '100%',
          viewBox: '-1 -1 102 102'
        },
        true
      )
      this.elements.svgPathCircle = createElement(
        'path',
        {
          class: 'tt-progress-circle',
          d: 'M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98',
          'shape-rendering': 'geometricPrecision',
          style: {
            strokeDasharray: '307.919, 307.919',
            strokeDashoffset: this.strokeDashoffset,
            ...this.styleColorCircle
          }
        },
        true
      )
      this.elements.svgPathArrow = createElement(
        'path',
        {
          class: 'tt-progress-arrow',
          'shape-rendering': 'geometricPrecision',
          d: 'm 49.896033,35.953207 c -0.037,-5.67e-4 -0.0117,0.0051 0.0781,0.0098 h 0.0254 0.0273 c 0.5466,-0.02831 1.09262,0.154682 1.51563,0.568359 l 12.13477,11.867188 c 0.81007,0.792186 0.82857,2.058166 0.0391,2.869141 -0.78971,0.811152 -2.05676,0.829722 -2.86524,0.03906 l -8.82226,-8.628906 v 19.341797 c 0,1.13191 -0.89739,2.027343 -2.0293,2.027343 -1.13191,0 -2.02734,-0.895438 -2.02734,-2.027343 V 42.677817 l -8.82227,8.628906 c -0.80819,0.790394 -2.07777,0.771803 -2.86719,-0.03906 -0.78922,-0.810676 -0.7693,-2.076676 0.041,-2.869141 l 12.13281,-11.867188 c 0.40433,-0.395406 0.92118,-0.585341 1.43946,-0.578125 z',
          style: this.styleColorArrow
        },
        true
      )
      this.elements.svgElement.appendChild(this.elements.svgPathCircle)
      this.elements.svgElement.appendChild(this.elements.svgPathArrow)
      this.elements.progressWrap.appendChild(this.elements.svgElement)
      this.elements.containerElement.appendChild(this.elements.progressWrap)
    }
  }

  /**
   * Manipula o evento scroll da página e aciona o progress
   */
  handleScroll () {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    this.strokeDashoffset = 307.919 - (307.919 / (this.bodyHeight - windowHeight) * scrollTop)
    this.elements.svgPathCircle.style.strokeDashoffset = this.strokeDashoffset
    if (scrollTop > this.settings.minScrollHeight) {
      addClass(this.elements.progressWrap, 'active-progress')
    } else (
      removeClass(this.elements.progressWrap, 'active-progress')
    )
  }

  /**
   * Manipula o evento click no botão ir ao topo
   */
  handleClick () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Manipula o evento click no botão ir ao topo
   */
  handleClick () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Manipula o evento mouseenter no botão ir ao topo
   */
  handleMouseenter () {
    if (this.settings.colorHover) {
      this.elements.svgPathCircle.style.stroke = this.settings.colorHover
      this.elements.svgPathArrow.style.fill = this.settings.colorHover
    }
  }

  /**
   * Manipula o evento mouseleave no botão ir ao topo
   */
  handleMouseleave () {
    if (this.settings.colorHover) {
      this.elements.svgPathCircle.style.stroke = this.settings.color
      this.elements.svgPathArrow.style.fill = this.settings.color
    }
  }

  /**
   * Inicia a biblioteca e seus eventos
   */
  init () {
    this.createElements()
    this.handleScroll()
    const oContainerElement = document.querySelector(this.settings.observerContainer)
    this.ro = resizeObserver(oContainerElement, () => {
      this.bodyHeight = document.body.offsetHeight + parseInt(getComputedStyle(document.body).marginTop) + parseInt(getComputedStyle(document.body).marginBottom)
    })
    // Eventos
    window.addEventListener('scroll', this.handleScrollBinded)
    this.elements.progressWrap.addEventListener('click', this.handleClickBinded)
    this.elements.progressWrap.addEventListener('mouseenter', this.handleMouseenterBinded)
    this.elements.progressWrap.addEventListener('mouseleave', this.handleMouseleaveBinded)
  }

  /**
   * Descartando todos os elementos e finalizando a biblioteca
   */
  dispose () {
    // Removendo os eventos
    window.removeEventListener('scroll', this.handleScrollBinded)
    this.elements.progressWrap.removeEventListener('click', this.handleClickBinded)
    this.elements.progressWrap.removeEventListener('mouseenter', this.handleMouseenterBinded)
    this.elements.progressWrap.removeEventListener('mouseleave', this.handleMouseleaveBinded)

    // Removendo os elementos HTML e SVG
    this.elements.svgPathArrow.remove()
    this.elements.svgPathArrow = null
    this.elements.svgPathCircle.remove()
    this.elements.svgPathCircle = null
    this.elements.svgElement.remove()
    this.elements.svgElement = null
    this.elements.progressWrap.remove()
    this.elements.progressWrap = null

    // Removendo o CSS injetado
    const cssStyle = document.getElementById('to-top-progress-style')
    if (cssStyle) {
      cssStyle.remove()
    }
  }
}
