import React from 'react';
import './SavedNewsHeader.css';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ articles }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [sortedKeywordsArray, setSortedKeywordsArray] = React.useState([]);
  const savedArticlesLength = articles.length;
  const lastDigitArticlesLength = Number(sortedKeywordsArray.length.toString().split('').pop());
  const keywordsArray = articles.map((item) => item.keyword);
  function endingDescription() {
    let ending;
    if (savedArticlesLength === 0 || savedArticlesLength === 11
      || (savedArticlesLength >= 5 && lastDigitArticlesLength !== 1)) {
      ending = 'сохраненных статей';
    }
    if (savedArticlesLength === 1
      || (savedArticlesLength !== 11 && lastDigitArticlesLength === 1)) {
      ending = 'сохраненная статья';
    }
    if (savedArticlesLength > 1 && savedArticlesLength < 5) {
      ending = 'сохраненные статьи';
    }
    return ending;
  }
  function endingKeywords() {
    let ending;
    if (sortedKeywordsArray.length === 1
      || (sortedKeywordsArray.length > 1
        && sortedKeywordsArray.length !== 11
        && lastDigitArticlesLength === 1)
    ) {
      ending = 'По ключевому слову';
    }
    if (sortedKeywordsArray.length > 1) {
      ending = 'По ключевым словам';
    }
    return ending;
  }
  function endingKeywordsLength() {
    let ending;
    if (savedArticlesLength - 2 < 5) {
      ending = '-м';
    }
    if (savedArticlesLength - 2 >= 5) {
      ending = '-и';
    }
    return ending;
  }
  function sortKeywordsArray() {
    const keywordRepeat = keywordsArray.reduce((acc, cur) => {
      if (acc[cur]) {
        acc[cur] += 1;
      } else {
        acc[cur] = 1;
      }
      return acc;
    }, {});
    const sortArray = Object.entries(keywordRepeat).sort((a, b) => b[1] - a[1]);
    const finishArray = sortArray.map((item) => item[0]);
    setSortedKeywordsArray(finishArray);
  }
  React.useEffect(() => {
    sortKeywordsArray();
  }, [articles]);
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__heading">Сохранённые статьи</p>
        <h1 className="saved-news-header__title">
          {`${currentUser.name}, у вас ${savedArticlesLength} ${endingDescription()}`}
        </h1>
        {savedArticlesLength > 0 && (
          <p className="saved-news-header__keywords">
            {`${endingKeywords()}:`}
            &nbsp;
            {sortedKeywordsArray.length === 1 && <span className="saved-news-header__keyword">{sortedKeywordsArray[0]}</span>}
            {sortedKeywordsArray.length === 2 && (
            <span className="saved-news-header__keyword">
              {`${sortedKeywordsArray[0]}, ${sortedKeywordsArray[1]}`}
            </span>
            )}
            {sortedKeywordsArray.length === 3 && (
            <span className="saved-news-header__keyword">
              {`${sortedKeywordsArray[0]}, ${sortedKeywordsArray[1]} и ${sortedKeywordsArray[2]}`}
            </span>
            )}
            {sortedKeywordsArray.length > 3 && (
              <>
                <span className="saved-news-header__keyword">
                  {`${sortedKeywordsArray[0]}, ${sortedKeywordsArray[1]}`}
                </span>
                &nbsp;и&nbsp;
                <span className="saved-news-header__keyword">
                  {`${sortedKeywordsArray.length - 2}${endingKeywordsLength()} другим`}
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </section>
  );
}

SavedNewsHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};

export default SavedNewsHeader;
