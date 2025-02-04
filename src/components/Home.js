import React from 'react';
import Loader from './Loader';
import Articles from './Articles';
import Tags from './Tags';
// import Pagination from './Pagination';
import FeedBar from './FeedBar';

let articleUrl = '/api/';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active_tag: '',
      articles: null,
      filteredArticles: null,
      active_page: 1,
      articleCount: null,
      err: '',
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(articleUrl + '?limit=10');
      const data = await response.json();

      this.setState({
        articles: data,
        articleCount: data.length,
      });
    } catch (err) {
      this.setState({
        err: err,
      });
    }
  };

  handleActiveTag = (val) =>
    this.setState({
      active_tag: val,
    });

  removeTag = () => {
    this.setState({
      active_tag: null,
      filteredArticles: null,
    });
  };

  filterArticles = (filteredArticles) => {
    this.setState({
      filteredArticles: filteredArticles,
    });
  };

  render() {
    let articles = this.state.filteredArticles
      ? this.state.filteredArticles
      : this.state.articles;
    return (
      <>
        <div className="banner"></div>
        <section className="home">
          <section className="hero container">
            <FeedBar
              active_tag={this.state.active_tag}
              removeTag={this.removeTag}
            />

            <div className="articles flex">
              {!articles || articles.length === 0 ? (
                <Loader />
              ) : (
                <Articles articles={articles} />
              )}
            </div>
          </section>
          <section className="sidebar">
            {!articles ? (
              <Loader />
            ) : (
              <Tags
                articles={this.state.articles}
                handleActiveTag={this.handleActiveTag}
                filterArticles={this.filterArticles}
              />
            )}
          </section>
          {/* <section>
            <Pagination articles={articles} />
          </section> */}
        </section>
      </>
    );
  }
}

export default Home;
