import React, { useState, /* useEffect */ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Register } from '../Redux/Action';

const RegisterPage = () => {

    const [formInput, setFormInput] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name] : e.target.value
        })
    }

    const dispatch = useDispatch();

    const handleRegister = () => {
        let { username, email, password, confirmPassword } = formInput;
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                dispatch(
                    Register({
                        username,
                        password
                    })
                )
            } else {
                window.alert('Invalid Password');
            }
        } else {
            window.alert('Please fill in all the forms');
        }
    }

    const loading = useSelector((state) => state.auth.loading);
    const username = useSelector(({ auth }) => auth.username);

    if (username) {
        return(
            <Redirect to='/'/>
        )
    }
    return(
        <div>
            <div className='row'
                style={{
                    minHeight : '80vh'
                }}
            >
                <div className='col-5'
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
                            Register
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
                                type='text'
                                name='email'
                                id='email'
                                placeholder='Email'
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
                            <Input
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                className='form-control btn-custom gray'
                                onClick={handleRegister}
                            >
                                {
                                    loading
                                    ?
                                    'Loading...'
                                    :
                                    'Register'
                                }
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
                <div className='col-7'
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
                            Join us!
                        </div>
                        <div
                            className='my-5'
                            style={{
                                fontWeight : 400,
                                fontSize : '20px'
                            }}
                        >
                            Join us and create your own to do list!
                        </div>
                        <div>
                            <div>
                                Already have an account?
                            </div>
                            <div>
                                <Link to='/login'>
                                    <Button
                                        className='form-control btn-custom white'
                                        >
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;