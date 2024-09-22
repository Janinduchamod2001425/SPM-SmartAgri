import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

import '../styles/Register.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, contact, location }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>

      <div className='regform'>
        <h1 className='text-center mb-4'>Sign Up</h1>
        <Form onSubmit={submitHandler}>

          <div className="form-grid">
            <Form.Group className='my-2' controlId='name'>
              <Form.Label className='fw-bold font-monospace'>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label className='fw-bold font-monospace'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label className='fw-bold font-monospace'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label className='fw-bold font-monospace'>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='contact'>
              <Form.Label className='fw-bold font-monospace'>Contact No.</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter contact'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='location'>
              <Form.Label className='fw-bold font-monospace'>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="button-container">
              <Button type='submit' className='mt-3 reg_btn'>
                Register
              </Button>
            </div>
          </div>

          {isLoading && <Loader />}
        </Form>

        <Row className='text-center py-3'>
          <Col>
            Already have an account? <Link to={`/login`}>Login</Link>
          </Col>
        </Row>
      </div>

    </FormContainer>
  );
};

export default RegisterScreen;
