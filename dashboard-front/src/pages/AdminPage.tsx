import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { IUser } from "../react-app-env";
import UserForm from "../components/UserForm";

const AdminPage = () => {
    const [cookies] = useCookies(['token']);
    const [users, setUsers] = useState<IUser[]>();
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [isCreating, setIsCreating] = useState(false);

    const fetchUsers = async () => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }

    const createUser = async (user: IUser) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            },
            body: JSON.stringify({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                roles: user.roles
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 500) {
                    alert(data.message);
                }
            });
    }

    const updateUser = async (user: IUser) => {
        if (!cookies.token || cookies.token === "") return;
        console.log(user);
        await fetch("http://localhost:8080/api/users/" + user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            },
            body: JSON.stringify({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                roles: user.roles
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 500) {
                    alert(data.message);
                }
            });
    }

    const deleteUser = async (id: number) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 500) {
                    alert(data.message);
                }
            });
    }

    const openEditModal = (id?: number, creation?: boolean) => {
        if (creation) {
            setIsCreating(true);
            setSelectedUser(undefined);
        } else {
            setIsCreating(false);
            setSelectedUser(users?.find(user => user.id === id));
        }
        setShowForm(true);
    }

    useEffect(() => {
        fetchUsers().then();
    }, [users]);

    return (
        <>
            <div className={"flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-200 ease-in"}>
                <div className={"bg-gray-50 h-16 shadow py-4 px-4 sticky top-0"}>
                    <div className={"flex items-center flex-row"}>
                        <h1 className="font-bold text-2xl text-gray-700">Admin panel</h1>
                    </div>
                </div>
                <div className={"flex flex-col flex-grow p-4"}>
                    <div className="lg:flex items-start mx-5 my-3">
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-medium ml-3">User Management</h1>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 hover:text-gray-200 font-medium text-gray-100 px-4 py-2 rounded-md mr-3 mb-3 flex flex-nowrap justify-center"
                                    onClick={() => openEditModal(undefined, true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6 mr-1">
                                        <path fillRule="evenodd"
                                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Create
                                </button>
                            </div>
                            <div className="overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">ID</th>
                                        <th scope="col" className="py-3 px-6">Email</th>
                                        <th scope="col" className="py-3 px-6">Password</th>
                                        <th scope="col" className="py-3 px-6">First Name</th>
                                        <th scope="col" className="py-3 px-6">Last Name</th>
                                        <th scope="col" className="py-3 px-6">Roles</th>
                                        <th scope="col" className="py-3 px-6"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users && users?.map((user, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row"
                                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{user.id}</th>
                                            <td className="py-4 px-6">{user.email}</td>
                                            <td className="py-4 px-6">••••••••••</td>
                                            <td className="py-4 px-6">{user.firstName}</td>
                                            <td className="py-4 px-6">{user.lastName}</td>
                                            <td className="py-4 px-6 space-x-2">{user.roles.map((role, index) => {
                                                switch (role.name) {
                                                    case "ROLE_ADMIN":
                                                        return <span key={index}
                                                            className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">Admin</span>
                                                    case "ROLE_USER":
                                                        return <span key={index}
                                                            className="bg-blue-200 text-blue-700 py-1 px-3 rounded-full text-xs">User</span>
                                                    default:
                                                        return <span key={index}
                                                            className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-xs">Unknown</span>
                                                }
                                            })}
                                            </td>
                                            <td className="flex py-4 px-6 text-right space-x-1.5">
                                                <button
                                                    className="text-blue-500 transform hover:text-blue-600 hover:scale-110"
                                                    title="Modify"
                                                    onClick={() => openEditModal(user.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="currentColor"
                                                         className="w-5 h-5">
                                                        <path
                                                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"/>
                                                        <path
                                                            d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"/>
                                                    </svg>
                                                </button>
                                                <button
                                                    className="text-red-500 transform hover:text-red-600 hover:scale-110"
                                                    title="Delete"
                                                    onClick={() => deleteUser(user.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="currentColor"
                                                         className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && <UserForm user={selectedUser} creation={isCreating} onClose={() => setShowForm(false)} onSubmit={(user) => {
                setShowForm(false);
                if (isCreating) {
                    createUser(user).then();
                } else {
                    updateUser(user).then();
                }
            }}/>}
        </>
    );
}

export default AdminPage;
