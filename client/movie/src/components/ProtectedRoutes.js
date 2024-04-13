import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { message, Tooltip, Avatar, Dropdown } from "antd";
import { AppstoreTwoTone, LogoutOutlined, HomeOutlined } from "@ant-design/icons"

// API
import { getLoginUser } from "../apis/index"

// Redux Actions
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);//getting this from redux store
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shortName = user?.userName?.split(/[ .]+/)
    const getpresentUser = async () => {
        try {
            dispatch(showLoading());
            const response = await getLoginUser();// hitting the api to check the authorization
            dispatch(hideLoading());
            if (response.success) {
                console.log(response.data)
                dispatch(setUser(response.data));
            } else {
                dispatch(setUser(null));
                if (response.message === "jwt expired") {
                    message.error("Session Expired, Please login again");
                }
                else {
                    message.error(response.message);
                }
                localStorage.removeItem("token");
                navigate("/login");
            }
        } catch (error) {
            dispatch(hideLoading());
            dispatch(setUser(null));
            message.error(error.message);
        }
    };

    useEffect(() => {

        if (localStorage.getItem("token")) {
            getpresentUser(); // Get User Info from server
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //dropdown items on the profile iconn
    const items = [
        {// eslint-disable-next-line
            label: <a onClick={() => {
                if (user.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/profile");
                }
            }}>{user.isAdmin?"Admin":"Profile"}</a>,
            key: '1',
            icon: <AppstoreTwoTone twoToneColor="#424769" />,
        },
        {// eslint-disable-next-line
            label: <a onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>Logout</a>,
            key: '2',
            icon: <LogoutOutlined />,
        }]


    return (
        user &&
        (
            <div className="layout p-1">
                <div className="header bg-primary flex justify-between p-2" style={{ display: "flex", alignItems: "center" }}>
                    <div>
                    
                        <h1 className="text-2xl text-white cursor-pointer"
                            onClick={() => navigate("/")}
                        ><HomeOutlined /> Book Movies Online {user.isAdmin ? "(Admin)" : ""}</h1>
                    </div>

                    <div className="p-1 flex gap-1" style={{ display: "flex", borderRadius: "50%", justifyContent: "center", alignItems: "center" }}>
                        <h1 className="text-sm underline">
                            <Dropdown menu={{ items }} placement="bottom" trigger={"click"}>
                                <Tooltip placement="bottom" title={user.userName} color={"#9290c3"} mouseEnterDelay={2}>
                                    <Avatar size={44} icon={(shortName[0]?.slice(0, 1) + shortName[1]?.slice(0, 1))?.toUpperCase()} style={{ fontSize: "15px", backgroundColor: "#9290c3" }} />
                                </Tooltip>
                            </Dropdown>
                        </h1>
                    </div>

                </div>
                <div className="content mt-1 p-1">{children}</div>
            </div>
        )
    );
}

export default ProtectedRoute;