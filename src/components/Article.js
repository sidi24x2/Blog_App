import React from 'react';
import { useParams } from 'react-router-dom';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      err: null,
    };
  }

  componentDidMount() {
    const slug = this.props.params.slug;
    console.log(this.props, slug);
    fetch(`/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => this.setState({ article: data }))
      .catch((err) => this.setState({ err: err.message }));
  }

  render() {
    let { article, err } = this.state;
    if (!article) {
      return <h2>{err ? 'Error Loading Page' : ''}</h2>;
    }

    return (
      <>
        <div class="singleArticle">
          <div className="flex start">
            <div className="flex start">
              <img src={article.author.image} alt={article.author.username} />
              <span>
                {new Date(article.created_at).toLocaleString().split(',')[0]}
              </span>
            </div>
            <span>💟</span>
          </div>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <h3>{article.tag_list}</h3>
        </div>
      </>
    );
  }
}

function withRouter(Component) {
  return function (props) {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}
export default withRouter(Article);
