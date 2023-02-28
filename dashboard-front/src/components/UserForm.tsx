import { IUser } from "../react-app-env";
import React, { useEffect, useState } from "react";

interface IUserFormProps {
    creation: boolean;
    user?: IUser;
    onClose: () => void;
    onSubmit: (user: IUser) => void;
}

const UserForm = (props: IUserFormProps) => {
    const [user, setUser] = useState<IUser>(props.user ?? {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: []
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(user);
    }

    useEffect(() => {
        if (props.user) {
            setUser(props.user);
        }
    }, [props.user]);

    return (
        <div
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-49 md:inset-0 h-modal md:h-full justify-center items-center flex bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            onClick={props.onClose}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="py-9 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900">{props.creation ? "Create" : "Edit"} user</h3>
                        <form className="space-y-6" onSubmit={submit}>
                            {!props.creation && (
                                <div>
                                    <label htmlFor="id"
                                           className="block mb-2 text-sm font-medium text-gray-900">ID</label>
                                    <input type="text" name="id" id="id" value={user.id}
                                           className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           readOnly required/>
                                </div>
                            )}
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" id="email" value={user.email}
                                       onChange={(e) => setUser({...user, email: e.target.value})}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       required/>
                            </div>
                            {props.creation && (
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" value={user.password}
                                           onChange={(e) => setUser({...user, password: e.target.value})}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           required/>
                                </div>
                            )}
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First
                                    Name</label>
                                <input type="text" name="firstName" id="firstName" value={user.firstName}
                                       onChange={(e) => setUser({...user, firstName: e.target.value})}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last
                                    Name</label>
                                <input type="text" name="lastName" id="lastName" value={user.lastName}
                                       onChange={(e) => setUser({...user, lastName: e.target.value})}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       required/>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-base px-5 py-2.5 text-center">
                                {props.creation ? "Create" : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm
;
