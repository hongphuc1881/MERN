import { useNavigate } from 'react-router-dom';
import Logo from './assets/Logo@3x.png';
import { MenuButton } from './MenuButton';
import styles from './styles.module.css';
export default function HeaderSp() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src={Logo} alt="Pstore" width={100} className={styles.logo} />
        <div className={styles.textBoxSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className={styles.inputSearch}
          />
          <button
            onClick={() => {
              navigate('/search');
            }}
            className={styles.searchIcon}
          ></button>
        </div>
        <MenuButton />
      </div>
    </header>
  );
}
