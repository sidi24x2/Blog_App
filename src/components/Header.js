import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <section className="header">
      <header className="flex container ">
        <div className="logo">
          <h1>BloG-App</h1>
        </div>
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-nav' : '')}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-nav' : '')}
            to="/signup"
          >
            Sign Up
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-nav' : '')}
            to="/login"
          >
            Log In
          </NavLink>
        </nav>
      </header>
    </section>
  );
}

export default Header;
