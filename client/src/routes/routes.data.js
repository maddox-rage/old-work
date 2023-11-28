import Home from "../components/screens/home/Home.jsx";
import NewStatement from "../components/screens/new-statement/NewStatement.jsx";
import Auth from "../components/screens/auth/Auth.jsx";
import Statement from "../components/screens/Statement/Statement.jsx";
import Register from "../components/screens/auth/Register.jsx";
import SingleStatement from "../components/screens/singleStatement/SingleStatement.jsx";

export const routes = [
    {
        path: '/',
        component: Home,
        isAuth: true,
    },
    {
        path: '/auth',
        component: Auth,
        isAuth: false,
    },
    {
        path: '/new-statement',
        component: NewStatement,
        isAuth: true,
    },
    {
        path: '/statement',
        component: Statement,
        isAuth: true,
    },
    {
        path: '/register',
        component: Register,
        isAuth: false,
    },
    {
        path: '/statement/:id',
        component: SingleStatement,
        isAuth: false,
    },

]