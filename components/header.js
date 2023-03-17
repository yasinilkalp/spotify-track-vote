import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../toolkit/slices/authSlice";
import { signIn } from "../lib/firebase";

const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(((state) => state.auth));


    const onLogin = async () => dispatch(login(await signIn()));
    const onLogout = () => dispatch(logout());


    return <div className='flex justify-between'>
        <div className='flex items-center'>LOGO</div>
        {!isAuthenticated && <button onClick={onLogin}>Login</button>}
        {isAuthenticated && <div className='flex p-2 bg-white rounded-md mb-2 border px-4'>
            <img src={user.photoURL} className="rounded-full w-10 h-10 mr-3" />
            <div>
                <div className='text-gray-800 text-sm'>{user.displayName}</div>
                <div className='text-gray-500 text-xs'>{user.email}</div>
                <button onClick={onLogout}>Çıkış Yap</button>
            </div>

        </div>}
    </div>
};

export default Header;