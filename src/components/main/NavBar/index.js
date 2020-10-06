import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Drawer,
    Hidden,
    List
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ForumIcon from '@material-ui/icons/Forum';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import SettingsIcon from '@material-ui/icons/Settings';
import RestoreIcon from '@material-ui/icons/Restore';
import PieChartIcon from '@material-ui/icons/PieChart';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import NavItem from './NavItem';
import Header from '../Header'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const items = [
    {
        href: '/',
        icon: ViewModuleIcon,
        title: 'View'
    },
    {
        href: '/',
        icon: HomeIcon,
        title: 'Home'
    },
    {
        href: '/contacts',
        icon: SupervisorAccountIcon,
        title: 'Contacts'
    },
    {
        href: '/createcontact',
        icon: AddCircleOutlineIcon,
        title: 'Files'
    },
    {
        href: '/forum',
        icon: ForumIcon,
        title: 'Forum'
    },
    {
        href: '/calendar',
        icon: CalendarTodayIcon,
        title: 'Calendar'
    },
    {
        href: '/alarm',
        icon: AlarmOnIcon,
        title: 'Alarm'
    },
    {
        href: '/settings',
        icon: SettingsIcon,
        title: 'Settings'
    },
    {
        href: '/restore',
        icon: RestoreIcon,
        title: 'Restore'
    },
    {
        href: '/charts',
        icon: PieChartIcon,
        title: 'Charts'
    }
];

const NavBar = ({ onMobileClose, openMobile }) => {

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

    return (
        <React.Fragment>
            <Header />
                <Hidden mdDown>
                    <Drawer
                        anchor="left"
                        open
                        variant="persistent"
                    >
                        {content}
                    </Drawer>
                </Hidden>
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
