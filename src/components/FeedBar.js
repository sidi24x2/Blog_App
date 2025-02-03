import { NavLink } from 'react-router-dom';

function FeedBar(props) {
  let active_tag = props.active_tag ? props.active_tag : '';

  function hanldeClick() {
    props.removeTag();
  }

  return (
    <>
      <div className="feeds flex start">
        <NavLink onClick={hanldeClick} to="/">
          <h3 className={active_tag ? '' : 'active'}>Global Posts</h3>
        </NavLink>

        <NavLink>
          <h3> {active_tag} </h3>{' '}
        </NavLink>
      </div>
    </>
  );
}

export default FeedBar;
