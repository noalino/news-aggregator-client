import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles/articles/ArticleBox.scss';

class ArticleBox extends Component {
  state = {
    isBookmark: false
  };
  // handleDragStart(e) {
  //   const dt = e.dataTransfer;
  //   dt.setData('text/plain', e.target.id);

  //   const img = new Image();
  //   img.src = '../../public/news.svg';
  //   dt.setDragImage(img, 10, 10);

  //   e.dropEffect = 'copy';
  // }
  handleBookmark = () => {
    const { isBookmark } = this.state;
    const { article } = this.props;
    const user = { username: "isabelle", password: "whatever" };
    // console.log(article);
    if (!isBookmark) {
      axios.post('http://localhost:5000/api/bookmarks', { ...user, article  });
    } else {
      axios.put(`http://localhost:5000/api/bookmarks/${article.id}`, { ...user });
    }

    // const action = isBookmark ? 'DELETE' : 'POST';
    // axios.put('http://localhost:5000/api/bookmarks', { ...user, article, actionType: action  });

    this.setState(prevState => ({ isBookmark: !prevState.isBookmark }));
  }

  render() {
    const { isBookmark } = this.state;
    const { article } = this.props;

    return (
      <article className={styles.article}>
      {/*<article id={article.title} className={style.article} draggable="true" onDragStart={this.handleDragStart}>*/}

        <p>{article.source.name}</p>
        {/* <i className={isBookmark ? "fas fa-bookmark" : "far fa-bookmark"} onClick={this.handleBookmark}></i> */}
        <i className={`${isBookmark ? "fas" : "far"} fa-bookmark`} onClick={this.handleBookmark}></i>

        <img src={article.urlToImage} alt={article.title} draggable="false"/>

        <a href={article.url} target="_blank">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </a>
        
        <p>{article.publishedAt}</p>
      </article>
    );
  }
}

export default ArticleBox;