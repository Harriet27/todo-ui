import React, { useState, /* useEffect */ } from 'react';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../Redux/Action';

const LoginPage = () => {
    const [formInput, setFormInput] = useState({
        username : '',
        password : ''
    })

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name] : e.target.value
        })
    }

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(
            Login(formInput)
        )
    }

    const loading = useSelector((state) => state.auth.loading);
    const username = useSelector(({ auth }) => auth.username);

    if (username) {
        return(
            <Redirect to='/'/>
        )
    }
    return ( 
        <div>
            <div className='row'
                style={{
                    minHeight : '80vh'
                }}
            >
                <div className='col-7 p-0'
                    style={{
                        backgroundColor : 'grey',
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems : 'center',
                        textAlign : 'center'
                    }}
                >
                    <div
                        style={{
                            color : 'white'
                        }}
                    >
                        <div
                            style={{
                                fontWeight : 500,
                                fontSize : '40px'
                            }}
                            className='my-3'
                        >
                            Welcome Back !
                        </div>
                        <div
                            className='my-5'
                            style={{
                                fontWeight : 400,
                                fontSize : '20px'
                            }}
                        >
                            Sign in to continue access
                        </div>
                        <div>
                            <div>
                                Don't have an account? Click here!
                            </div>
                            <div>
                                <Link to='/register'>
                                    <Button
                                        className='form-control btn-custom white'
                                        >
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-5 p-0'
                    style={{
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems : 'center',
                        textAlign : 'center'
                    }}
                >
                    <Form
                        style={{
                            padding : '50px',
                            width : '400px'
                        }}
                    >
                        <Label>
                            Login
                        </Label>
                        <FormGroup>
                            <Input
                                type='text'
                                name='username'
                                id='username'
                                placeholder='Username'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                className='form-control btn-custom gray'
                                onClick={handleLogin}
                            >
                                {
                                    loading
                                    ?
                                    'Loading...'
                                    :
                                    'Login'
                                }
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;