import styles from './Layout.module.scss';
import {FC} from 'react';
import {Sidebar} from 'src/widgets/sidebar';
import {Profile} from 'src/widgets/profileInfo/';
import {Outlet} from 'react-router-dom';

interface LayoutProps {
    className?: string;
    // children?: ReactNode,
}

export const Layout: FC<LayoutProps> = ({}) => {
    return (
        // <div className={styles.wrapper}>
        //     <Profile />
        //     <div className={styles.content}>
        //         <Sidebar />
        //         <div className={styles.children}>
        //         <Outlet />
        //         </div>
        //     </div>
        // </div>

    <Outlet />
    );
};
