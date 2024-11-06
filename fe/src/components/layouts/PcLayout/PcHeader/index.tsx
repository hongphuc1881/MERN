import { Link, useNavigate } from 'react-router-dom';
import { useLoginState } from '../../../../providers/LoginStateProvider';
import { Button } from '../../../Button';
import { NavList } from '../../variables';
import Logo from './assets/Logo@3x.png';
import UserImage from './assets/UserImage.svg';
import styles from './styles.module.css';

export default function HeaderPc() {
  const { isLogin } = useLoginState();
  const navigate = useNavigate();
  return (
    <header className={styles.module}>
      <div className={styles.top}>
        <img src={Logo} alt="Pstore" width={130} />
        <div className={styles.textBoxSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={styles.inputSearch}
          />
          <button
            onClick={() => {
              navigate('/search');
            }}
            className={styles.searchIcon}
          ></button>
        </div>
        {isLogin ? (
          <div className={styles.profile}>
            <img src={UserImage} alt="" width={30} />
            <span> Profile</span>
          </div>
        ) : (
          <div className={styles.btnGroup}>
            <Button
              size="middle"
              theme="normal"
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </Button>
            <Button
              size="middle"
              theme="primary"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NavList.map((item) => (
            <li className={styles.navItem} key={item.label}>
              <Link to={item.url} className={styles.navItemLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
