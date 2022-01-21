import React from 'react';
import './Footer.css';
import GitHub from '../../images/GitHub';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Текстовые ссылки */}
        <div className="footer__links">
          <ul className="footer__ul footer__ul_type_links">
            <li className="footer__li">
              <a className="footer__link" href="https://praktikum.yandex.ru/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
          </ul>
          {/* Ссылки - иконки */}
          <ul className="footer__ul footer__ul_type_socials">
            <li>
              <a href="https://github.com/VKovrigina" target="_blank" rel="noreferrer">
                <GitHub className="footer__socials-icon" />
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
