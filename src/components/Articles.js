import { NavLink } from 'react-router-dom';

function Articles(props) {
  const { articles } = props;

  return (
    <>
      {articles.map((article) => (
        <div className="article" key={article.id}>
          <NavLink to={`/articles/${article.slug}`}>
            <div className="flex ">
              <div className="flex start">
                <img src={article.author.image} alt={article.author.username} />
                <span>
                  {new Date(article.created_at).toLocaleString().split(',')[0]}
                </span>
              </div>
              <span>💟</span>
            </div>
          </NavLink>
          <NavLink to={`/articles/${article.slug}`}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </NavLink>

          <button>
            <NavLink to={`/articles/${article.slug}`}>Read More</NavLink>
          </button>
          <hr />
        </div>
      ))}
    </>
  );
}

export default Articles;
