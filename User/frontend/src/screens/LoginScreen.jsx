import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import '../styles/Login.css';

import signin from '../images/signin1.jpg'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <img src={signin} className="cover_image" />
      <FormContainer>
        <div id="loginform" className="p-4.5 shadow">
          <h1 className="text-center mb-4 title">Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fw-bold font-monospace form_label">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputs"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label className="fw-bold font-monospace form_label">
                  Password
                </Form.Label>
                <div className="input-with-icon">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputs"
                  ></Form.Control>
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

            <Button
              disabled={isLoading}
              type="submit"
              variant="success"
              className="w-100 mt-3"
            >
              Sign In
            </Button>
          </Form>

          {isLoading && <Loader />}

          <Row className="py-3">
            <Col className="text-center fw-bold">
              New Customer? <Link to="/register" className='navigate'>Register</Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
