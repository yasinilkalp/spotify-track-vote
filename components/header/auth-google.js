import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../toolkit/slices/authSlice";
import { signIn } from "../../lib/firebase";

const AuthGoogle = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(((state) => state.auth));


    const onLogin = async () => dispatch(login(await signIn()));
    const onLogout = () => dispatch(logout());

    return <>
        {!isAuthenticated && <button onClick={onLogin} className="flex items-center bg-white">
            <img src="google.png" width={160} />
        </button>}
        {isAuthenticated && <div className='flex items-center justify-center p-2 bg-white rounded-md border pr-3 pl-4'>
            <img src={user.photoURL} className="rounded-full w-10 h-10 mr-3" />
            <div>
                <div className='text-gray-800 text-sm'>{user.displayName}</div>
                <div className='text-gray-500 text-xs'>{user.email}</div>
            </div>
            <button onClick={onLogout} className="bg-white ml-3">
                <img src="close.svg" className="w-10" />
            </button>
        </div>}</>
};

export default AuthGoogle;