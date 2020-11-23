import React from 'react';
import './About.css';
import AuthorPhoto from '../../images/author-photo.jpg';

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__author-photo" alt="Фото автора" src={AuthorPhoto} />
        <div className="about__content">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__paragraph">Привет! Меня зовут Варя, и я начинающий frontend-developer. Знаю как работать с JavaScript, CSS, ReactJS, NodeJS, MongoDB :)</p>
          <p className="about__paragraph">Во время обучения в Яндекс.Практикум на себе прочувствовала фразу: &quot;The more I learn, the more I realise how much i don`t know &quot;. Не собираюсь останавливаться в изучении новых технологий :)</p>
        </div>
      </div>
    </section>
  );
}

export default About;
