import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AuthCheck from "./AuthCheck";
import Services from "./pages/Services";
import Container from "./components/Container";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
    return (
        <>
            <AuthCheck>
                <Routes>
                    <Route path={"/"} element={<Container><Dashboard/></Container>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                    <Route path={"/services"} element={<Container><Services/></Container>}/>
                    <Route path={"/service/:serviceName"} element={<Container><Dashboard/></Container>}/>
                    <Route path={"/admin"} element={<Container><AdminPage/></Container>}/>
                </Routes>
            </AuthCheck>
        </>
    )
}

export default App;
