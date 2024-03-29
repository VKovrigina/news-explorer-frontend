/* eslint-disable react/require-default-props */
import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';
/** import NewsCardButton from '../NewsCardButton/NewsCardButton'; */
import img from '../../images/image_04.jpg';

function NewsCard({
  isMainPage,
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
}) {
  return (
    <article className="news-card">
      {!isMainPage && <div className="news-card__keyword">{keyword}</div>}
      <a className="news-card__link" target="_blank" rel="noreferrer" href={link}>
        <img className="news-card__img" src={image} alt="Картинка к статье" onError={(e) => { e.target.src = img; }} />
        <div className="news-card__description">
          <p className="news-card__date">{date}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>
    </article>
  );
}

NewsCard.propTypes = {
  keyword: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.string,
  isMainPage: PropTypes.bool.isRequired,
};

export default NewsCard;
