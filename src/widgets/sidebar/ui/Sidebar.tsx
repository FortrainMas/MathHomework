import styles from './Sidebar.module.scss';
import {NavLink} from 'react-router-dom';
// @ts-ignore
import useSound from 'use-sound';
import menuSound from 'src/shared/assets/sounds/menu.mp3';
import {Timer} from 'src/shared/ui/Timer';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({}: SidebarProps) => {
    const [play] = useSound(menuSound);

    const setActive = ({isActive}: any) => isActive && `${styles.active}`;

    return (
        <>
            <ul className={styles.optionList}>
                <div style={{height: 100}}></div>
                <div>
                    <li className={styles.optionListItem}>
                        <NavLink
                            to="/"
                            onMouseEnter={play}
                            className={setActive}>
                            Задания
                        </NavLink>
                    </li>
                    <li className={styles.optionListItem}>
                        <NavLink
                            to="/news"
                            onMouseEnter={play}
                            className={setActive}>
                            Новости
                        </NavLink>
                    </li>
                    <li className={styles.optionListItem}>
                        <NavLink
                            to="/shop"
                            onMouseEnter={play}
                            className={setActive}>
                            Магазин
                        </NavLink>
                    </li>
                    <li className={styles.optionListItem}>
                        <NavLink
                            to="/profile"
                            onMouseEnter={play}
                            className={setActive}>
                            Профиль
                        </NavLink>
                    </li>
                </div>
                <Timer date={''} />
            </ul>
        </>
    );
};
