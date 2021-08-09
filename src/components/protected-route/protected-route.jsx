import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
    const { isUserLoggedIn } = useSelector(state => state.userData);

    return (
        <Route
            {...rest}
            render={() =>
                isUserLoggedIn ? (
                children
                ) : ( <Redirect to='/login'/> )
            }
        />
    );
} 