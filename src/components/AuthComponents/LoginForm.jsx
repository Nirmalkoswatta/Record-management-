import React from 'react';
import { useDispatch } from 'react-redux'; 
import { signInUser } from '../../redux/actionCreators/authActionCreator'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModernAuth.css';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all the fields');
            return;
        }

        dispatch(signInUser(email, password, setSuccess)); 
    };

    React.useEffect(() => {
        if (success) {
            navigate('/dashboard');
        }
    }, [success, navigate]);

    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="modern-form">
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
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
            <div className="form-group my-2">
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control" style={{ color: 'black' }}>
                Login
            </button>
        </form>
    );
};

export default LoginForm;
