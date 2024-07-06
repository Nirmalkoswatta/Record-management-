import React from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/actionCreators/authActionCreator';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [success, setSuccess] = React.useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !password || !passwordConfirmation) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== passwordConfirmation) {
      alert('Passwords do not match.');
      return;
    }

    dispatch(signUpUser(name, email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/dashboard'); 
    }
  }, [success, navigate]); 

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="form-group my-2">
        <input
          type="password"
          name="password"
          class="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class="form-group my-2">
        <input
          type="password"
          name="passwordConfirmation"
          class="form-control"
          placeholder="Re-type your password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button type="submit" class="btn btn-primary my-2 form-control">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
