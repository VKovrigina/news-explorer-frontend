import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import GitHub from '../../images/GitHub.svg';
import Facebook from '../../images/Facebook.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Текстовые ссылки */}
        <div className="footer__links">
          <ul className="footer__ul footer__ul_type_links">
            <li className="footer__li">
              <Link className="footer__link" to="/">Главная</Link>
            </li>
            <li className="footer__li">
              <a className="footer__link" href="https://praktikum.yandex.ru/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
          </ul>
          {/* Ссылки - иконки */}
          <ul className="footer__ul footer__ul_type_socials">
            <li>
              <a href="https://github.com/VKovrigina" target="_blank" rel="noreferrer">
                <img className="footer__socials-icon" alt="GitHub" src={GitHub} />
              </a>
            </li>
            <li>
              <a href="https://praktikum.yandex.ru/web/" target="_blank" rel="noreferrer">
                <img className="footer__socials-icon" alt="Facebook" src={Facebook} />
              </a>
            </li>
          </ul>
        </div>
        <p className="footer__copyright">&#169;Supersite, Powered by News API</p>
      </div>
    </footer>

  );
}

export default Footer;
