import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
    makeStyles
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ForumIcon from '@material-ui/icons/Forum';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import SettingsIcon from '@material-ui/icons/Settings';
import RestoreIcon from '@material-ui/icons/Restore';
import PieChartIcon from '@material-ui/icons/PieChart';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import MenuIcon from '@material-ui/icons/Menu';
import NavItem from './NavItem';
import Header from '../Header'
import Footer from '../Footer'
import Container from '@material-ui/core/Container';


const items = [
    {
        href: '/app/home',
        icon: ViewModuleIcon,
        title: 'Home'
    },
    {
        href: '/app/home',
        icon: HomeIcon,
        title: 'Home'
    },
    {
        href: '/contacts',
        icon: SupervisorAccountIcon,
        title: 'Contacts'
    },
    {
        href: '/app/products',
        icon: ForumIcon,
        title: 'Forum'
    },
    {
        href: '/app/account',
        icon: FileCopyIcon,
        title: 'Files'
    },
    {
        href: '/app/settings',
        icon: CalendarTodayIcon,
        title: 'Calendar'
    },
    {
        href: '/login',
        icon: AlarmOnIcon,
        title: 'Alarm'
    },
    {
        href: '/register',
        icon: SettingsIcon,
        title: 'Settings'
    },
    {
        href: '/404',
        icon: RestoreIcon,
        title: 'Restore'
    },
    {
        href: '/404',
        icon: PieChartIcon,
        title: 'Charts'
    }
];

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    // const classes = useStyles();
    // const location = useLocation();

    // useEffect(() => {
    //     if (openMobile && onMobileClose) {
    //         onMobileClose();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname]);

    const content = (
        <Box p={2}>
            <List>
                {items.map((item) => (
                    <NavItem
                        href={item.href}
                        key={item.title}
                        icon={item.icon}
                    />
                ))}
            </List>
        </Box>
    );

    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="lg" style={{ backgroundColor: '#f4f8f9' }}>
                <Hidden mdDown>
                    <Drawer
                        anchor="left"
                        // classes={{ paper: classes.desktopDrawer }}
                        open
                        variant="persistent"
                    >
                        {content}
                    </Drawer>
                    {/* <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    {content}
                </Drawer> */}
                </Hidden>
                {/* <Footer /> */}
            </Container>
        </React.Fragment>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

// NavBar.defaultProps = {
//     onMobileClose: () => { },
//     openMobile: false
// };

export default NavBar;
