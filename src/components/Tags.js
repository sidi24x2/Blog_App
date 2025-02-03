import { NavLink } from 'react-router-dom';

function Tags(props) {
  let uniqueTags = [...new Set(props.articles.flatMap((a) => a.tag_list))];

  let handleClick = (val) => {
    console.log(props);
    let taggedArrays = props.articles.filter(
      (article) =>
        Array.isArray(article.tag_list) && article.tag_list.includes(val)
    );

    console.log(taggedArrays);

    props.filterArticles(taggedArrays);
    props.handleActiveTag(val);
  };

  return (
    <>
      <div className="container tags">
        {uniqueTags.map((tag) => (
          <button onClick={() => handleClick(tag)} value={tag} key={tag}>
            <NavLink to={`/${tag}`}>{tag}</NavLink>
          </button>
        ))}
      </div>
    </>
  );
}

export default Tags;
