import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useLoginState } from '../../../../../providers/LoginStateProvider';
import { Button } from '../../../../Button';
import { NavList } from '../../../variables';
import styles from './styles.module.css';
import useMenuButton from './useMenuButton';
export const MenuButton = () => {
  const { isShowMenu, onToggleMenu } = useMenuButton();
  const { isLogin } = useLoginState();
  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => {
          onToggleMenu();
        }}
      ></button>
      <div
        className={clsx(styles.overlay, isShowMenu && styles.isOpenMenu)}
        onClick={onToggleMenu}
      ></div>
      <div className={clsx(styles.menu, isShowMenu && styles.isOpenMenu)}>
        {isLogin && (
          <Link to="/profile" className={styles.userInfo}>
            <span>userName</span>
          </Link>
        )}
        <div className={styles.content}>
          <nav>
            <ul className={styles.menuList}>
              {NavList.map((item) => (
                <li>
                  <Link to={item.url}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {!isLogin && (
            <div className={styles.btnGroup}>
              <Button size="middle" theme="normal">
                Đăng ký
              </Button>
              <Button size="middle" theme="primary">
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
