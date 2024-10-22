
import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { userLogin, userRegister } from '../services/api';
import swal from 'sweetalert';

function Login({ register }) {
    const [form] = Form.useForm();
   

    const navigate = useNavigate();
    const handleRegister = async (values) => {
        try {
            const response = await userRegister(values);
            if (response.status === 201) {
                swal({
                    title: 'Successful',
                    text: 'User registered successfully',
                    icon: 'success',
                });
                form.resetFields();
                navigate('/');
            } else if(response.status === 400) {
                swal({
                    title: 'Username already exists ',
                    text: 'This username has been already in use...try another username',
                    icon: 'warning',
                });
               
            }
        } catch (error) {
            swal({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
            });
            console.log(error);
        }
    };

    const handleLogin = async (values) => {
        try {
            const response = await userLogin(values);
            if (response.status === 200) {
                sessionStorage.setItem('refresh', (response.data.refresh));
                sessionStorage.setItem('access', response.data.access);
                swal({
                    title: 'Successful',
                    text: 'Login successful',
                    icon: 'success',
                });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            }
            else if(response.status === 400) {
                swal({
                    title: 'Invalid username or password',
                    
                    icon: 'error',
                });
               
            }
        } catch (error) {
            swal({
                title: 'Error',
                text: 'Login failed',
                icon: 'error',
            });
        }
    };

    const onFinish = (values) => {
        if (register) {
            handleRegister(values);
        } else {
            handleLogin(values);
        }
    };

    const sectionHeight = register ? 'auto' : '100vh';

    return (
        <>
            <section className="background-radial-gradient overflow-hidden" style={{ height: sectionHeight }}>
                <div className="container px-4 py-5 mt-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                                Hello User
                                <br />
                                {register ? (
                                    <span style={{ color: 'hsl(218, 81%, 75%)' }}>Please register to explore...</span>
                                ) : (
                                    <span style={{ color: 'hsl(218, 81%, 75%)' }}>Welcome back... Please Login</span>
                                )}
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, temporibus.
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <Form
                                        form={form}
                                        name="login-register"
                                        onFinish={onFinish}
                                        layout="vertical"
                                    >
                                        {register && (
                                            <>
                                                <Form.Item
                                                    label="First Name"
                                                    name="first_name"
                                                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                                                >
                                                    <Input style={{ color: 'black' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Last Name"
                                                    name="last_name"
                                                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                                                >
                                                    <Input style={{ color: 'black' }} />
                                                </Form.Item>
                                                <Form.Item
                                            label="User Name"
                                            name="username"
                                            style={{ color: 'white' }}
                                            rules={[{ required: true, message: 'Please enter your username!' }]}
                                        >
                                            <Input style={{ color: 'black' }} />
                                        </Form.Item>
                                                <Form.Item
                                                    label="Email"
                                                    name="email"
                                                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                                                >
                                                    <Input style={{ color: 'black' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Password"
                                                    name="password"
                                                    rules={[{ required: true, message: 'Please enter your password!' }]}
                                                >
                                                    <Input.Password style={{ color: 'black' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Confirm Password"
                                                    name="confirm_password"
                                                    dependencies={['password']}
                                                    rules={[
                                                        { required: true, message: 'Please confirm your password!' },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('password') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error('The passwords do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password style={{ color: 'black' }} />
                                                </Form.Item>
                                               
                                            </>
                                        )}
                                        {!register && (
                                            <>
                                                <Form.Item
                                                    label="Username "
                                                    name="username"
                                                    rules={[{ required: true, message: 'Please enter your username ' }]}
                                                >
                                                    <Input style={{ color: 'black' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Password"
                                                    name="password"
                                                    rules={[{ required: true, message: 'Please enter your password!' }]}
                                                >
                                                    <Input.Password style={{ color: 'black' }} />
                                                </Form.Item>
                                            </>
                                        )}

                                        <div className="d-flex justify-content-center flex-column mb-4">
                                            {register ? (
                                                <>
                                                    <Link className="text-center text-light mb-2" to={'/'}>
                                                        Already have an account? Please Login
                                                    </Link>
                                                    <Button type="primary" block htmlType="submit">
                                                        Register
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link className="text-center text-light mb-2" to={'/register'}>
                                                        Don't have an account? Please Register
                                                    </Link>
                                                    <Button type="primary" block htmlType="submit">
                                                        Login
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;

