import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';
import { TiTick } from "react-icons/ti";
import { VscGitStashApply } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUsersViewfinder } from "react-icons/fa6";

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton component={Link} to="/Teacher/class">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`Class ${sclassName.sclassName}`} />
                </ListItemButton>


                <ListItemButton component={Link} to="/student/attendance">
                    <ListItemIcon>
                        {/* <ClassOutlinedIcon  /> */}
                        <TiTick color={location.pathname.startsWith("/student/attendance") ? 'primary' : 'inherit'}  size={30}/>

                    </ListItemIcon>
                    <ListItemText primary={"Mark Attendance"} />
                </ListItemButton>


                <ListItemButton component={Link} to="/Teacher/leave-request">
                    <ListItemIcon>
                        {/* <AnnouncementOutlinedIcon  /> */}
                        <VscGitStashApply color={location.pathname.startsWith("/Teacher/leave-request") ? 'primary' : 'inherit'} size={30}/>
                    </ListItemIcon>
                    <ListItemText primary="Apply For Leave" />
                </ListItemButton>

                <ListItemButton component={Link} to="/Teacher/get-leave-request">
                    <ListItemIcon>
                        {/* <AnnouncementOutlinedIcon  /> */}
                        <CiSquareQuestion color={location.pathname.startsWith("/Teacher/get-leave-request") ? 'primary' : 'inherit'} size={30}/>
                    </ListItemIcon>
                    <ListItemText primary="GET Leave Status" />
                </ListItemButton>

                <ListItemButton component={Link} to="/student/get-all-request">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/student/get-all-request") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Student Requests" />
                </ListItemButton>


                <ListItemButton component={Link} to="/student/view-attendance">
                    <ListItemIcon>
                        {/* <ClassOutlinedIcon /> */}
                        <FaUsersViewfinder  color={location.pathname.startsWith("/student/view-attendance") ? 'primary' : 'inherit'} size={30}/>
                    </ListItemIcon>
                    <ListItemText primary={"View Attendance"} />
                </ListItemButton>




            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar