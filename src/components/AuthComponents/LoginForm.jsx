import React from 'react';
import { useDispatch } from 'react-redux'; 
import { signInUser } from '../../redux/actionCreators/authActionCreator'; 
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all the fields');
            return;
        }

        dispatch(signInUser(email, password, setSuccess)); 
    };


    React.useEffect(() => {
        if (success) {
            navigate('/dashboard');
        }
    }, [success])

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group my-2"> {}
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
