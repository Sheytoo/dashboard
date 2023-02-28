import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: event.target.email.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                password: event.target.password.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status && data.status !== 200) {
                    toast.error(data.message);
                } else {
                    setCookie("token", data.token, { sameSite: "strict", path: "/" });
                    navigate("/");
                }
            });
    }

    return (
        <div className="bg-gray-100">
            <Toaster position={"bottom-right"} reverseOrder={false}/>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <svg className={"w-12 h-12 text-primary-50"} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
                              clipRule="evenodd"
                        />
                    </svg>
                    <span className="leading-10 text-background text-3xl font-bold ml-1 uppercase">Dash<span className={"text-primary-50"}>board</span></span>
                </div>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tacking-tight text-gray-900 md:text-2xl">
                            Register your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First
                                    Name</label>
                                <input type="text" name="firstName" id="firstName"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last
                                    Name</label>
                                <input type="text" name="lastName" id="lastName"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your
                                    email</label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                                       placeholder="name@company.com" required/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                                       required/>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-primary-50 hover:bg-primary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Register
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Do you have an account? <Link to="/login" className="font-medium text-sky-600 hover:underline">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
