/* eslint-disable class-methods-use-this */
import { html, css, LitElement } from 'lit';

export class MenuHamburguesa extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--menu-hamburguesa-text-color, #000);
        --h2-color: #999;
      }

      a strong {
        color: var(--h2-color);
      }
    * {
      margin: 0;
      padding: 0;
    }

    .main-header{
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 0 0.4rem;
    }

    .main-logo{
      color: black;
      font-size:32px;
      text-decoration:none;
    }

    .main-nav{
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      margin-left: -100%;
      transition: all .2s linear;
      background-color: rgba(0,0,0,.7);
      z-index: 100;
    }

    .main-nav.show{
      margin-left: 0;
    }

    .nav-links{
      background-color: rgb(250,250,250);
      display: flex;
      flex-direction: column;
      width: 70%;
      height: 100%;
      align-items: center;
      justify-content: flex-start;
    }

    .link-item{
      margin-top: 2rem;
      color: #444444;
      text-decoration: none;
      font-weight: bold;
      position: relative;
    }

    .link-item::after {
      position: absolute;
      content: "";
      background-color: black;
      bottom: -5px;
      left: 0;
      width: 0%;
      height: 3px;
      transition: 0.3s ease all;
    }

    .link-item:hover::after {
      width: 100%;
    }

    .button-menu{
      z-index: 200;
      width: 40px;
      height: 40px;
      border: none;
      display: flex;
      background: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .button-menu span{
      width: 37px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #444444;
      border-radius: 3px;
      transform-origin: 4px 0px;
      transition: all .2s linear;
    }

    .button-menu.close span {
      opacity: 1;
      transform: rotate(45deg) translate(0px, 0px);
      background: #ffffff;
    }

    .button-menu.close span:nth-child(2){
      transform: rotate(-45deg) translate(-8px, 5px);
    }

    .button-menu.close span:nth-child(3){
      display: none;
    }


    @media screen and (min-width:768px) {
      .button-menu{
        display: none;
      }

      .main-logo{
        flex-basis: 30%;
      }

      .main-nav{
        position: static;
        margin-left: 0;
        flex-basis: 70%;
        height: 100%;
      }

      .nav-links{
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        background: white;
      }

      .link-item{
        display: inline-block;
        margin-top: 0;
        margin-right: 2rem;
      }
    }
    `;
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
    this.toggleButton = null;
    this.navWrapper = null;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.navWrapperClick = this.navWrapperClick.bind(this);

    this.links = [...this.querySelectorAll('a')];
    const titleDOM = this.querySelector('h2');
    this.title = (titleDOM) ? titleDOM.innerText : 'Menu Hamburguesa';
  }

  // eslint-disable-next-line class-methods-use-this
  firstUpdated() { 
    this.toggleButton = this.shadowRoot.querySelector('#button-menu')
    this.navWrapper =  this.shadowRoot.querySelector('#nav')

    this.toggleButton.addEventListener('click', this.toggleMenu)
    this.navWrapper.addEventListener('click', this.navWrapperClick)
  }

  toggleMenu() {
    this.toggleButton.classList.toggle('close')
    this.navWrapper.classList.toggle('show')
  }

  navWrapperClick(e) {
    if(e.target.id === 'nav'){
      this.navWrapper.classList.remove('show')
      this.toggleButton.classList.remove('close')
    }
  }

  render() {
    return html`
    <header class="main-header" >
      <a class="main-logo" href="https://progradudi.netlify.app" >
        <strong>${this.title}</strong>
      </a>
      <nav id="nav" class="main-nav" >
        <div class="nav-links" >
          ${this.links.map(link => html`
            <a class="link-item" href="${link.href}" >${link.text}</a>
          `)}
        </div>
      </nav>
      <button id="button-menu" class="button-menu" >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
    `;
  }
}
