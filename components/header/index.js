import Logo from "./logo";
import AuthGoogle from "./auth-google";

const Header = () => {
    return <div className='flex items-center justify-between mb-3'>
        <Logo />
        <AuthGoogle />
    </div>
};

export default Header;