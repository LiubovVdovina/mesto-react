import logoPath from '../images/logo.svg';

function Header() {
  return(
    <header className="header">
      <img className="logo" src={logoPath} alt="логотип Место" /> 
    </header>
  );
}

export default Header;