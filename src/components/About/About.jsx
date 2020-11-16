import React from 'react';
import './About.css';
import AuthorPhoto from '../../images/author-photo.jpg';

function About() {
  return (
    <div className="about">
      <div className="about__container">
        <img className="about__author-photo" alt="Фото автора" src={AuthorPhoto} />
        <div className="about__content">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__paragraph">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
          <p className="about__paragraph">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
