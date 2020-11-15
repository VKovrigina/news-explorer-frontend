import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';
import SaveCardInactive from '../../images/Book-mark-inactive.svg';
import SaveCardActive from '../../images/Book-mark-active.svg';

function NewsCard({
  title,
  text,
  date,
  source,
  link,
  image,
}) {
  const [isCardSave, setCardSave] = React.useState(false);
  return (
    <article className="news-card">
      <button className={`news-card__button ${!isCardSave ? 'news-card__button_inactive' : ''}`} type="button" aria-label="Сохранить статью" onClick={() => setCardSave(!isCardSave)}>
        <img className="news-card__button-img" src={`${isCardSave ? SaveCardActive : SaveCardInactive}`} alt="Сохранить статью" />
      </button>
      <a className="news-card__link" target="_blank" rel="noreferrer" href={link}>
        <img className="news-card__img" src={image} alt="Картинка к статье" />
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
  // keyword: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default NewsCard;
