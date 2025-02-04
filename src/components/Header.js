import { NavLink } from 'react-router-dom';

function Nonloggeduser() {
  return (
    <>
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
    </>
  );
}

function Loggeduser() {
  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? 'active-nav' : '')}
        to="/home"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'active-nav' : '')}
        to="/article"
      >
        New Article
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'active-nav' : '')}
        to="/settings"
      >
        Settings
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'active-nav' : '')}
        to="/profile"
      >
        Profile
      </NavLink>
    </>
  );
}

function Header({ user }) {
  return (
    <section className="header">
      <header className="flex container ">
        <div className="logo">
          <h1>BloG-App</h1>
        </div>
        {!!!user ? <Nonloggeduser /> : <Loggeduser />}
      </header>
    </section>
  );
}

export default Header;
