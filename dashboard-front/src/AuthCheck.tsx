import { PropsWithChildren, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthCheck = (props: PropsWithChildren<{}>) => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        if ((!cookies.token || cookies.token === "") && (window.location.pathname !== "/login" && window.location.pathname !== "/register")) {
            navigate("/login");
        }
    });

    return (
        <>
            {props.children}
        </>
    )
}

export default AuthCheck;
