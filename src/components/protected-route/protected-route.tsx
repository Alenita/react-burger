import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { getUserInfo } from '../../services/actions/user';
import { useEffect, FC } from 'react';

interface IProtectedRoute {
    path: string | undefined
  }

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const { isUserLoggedIn } = useSelector(state => state.userData);

    const init = async () => {
        await dispatch(getUserInfo());
    }

    useEffect(() => {
        init();
    },[])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isUserLoggedIn ? (
                children
                ) : ( <Redirect to={{pathname: '/login', state: { from: location },}}/> )
            }
        />
    );
} 