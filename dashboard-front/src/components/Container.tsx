import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

const Container = (props: PropsWithChildren<{}>) => {
    return (
        <div className={"flex flex-row min-h-screen bg-gray-100 text-gray-800"}>
            <Sidebar/>
            {props.children}
        </div>
    )
}

export default Container;
