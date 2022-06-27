import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { async } from '@firebase/util';

const SignUp = () => {
    const navigate = useNavigate()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    if (loading) {
        return <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
    }
    if (user) {
     const email = user?.user?.email;
     console.log(email)
     const currentUser = { email: email };
        if (email) {
            fetch(`https://mighty-ridge-59560.herokuapp.com/allUser/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('update user', data.token)
                    localStorage.setItem('accessToken', data.token)
                    
                })
        }
        navigate('/home')
    }
    console.log(user)
    const submitSignUp = async (event) => {
        event.preventDefault();
        const first_name = event.target.first_name.value;
        const last_name = event.target.last_name.value;
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const password2 = event.target.password2.value;
        const signUpDetail = { username, password, password2, email, first_name, last_name, };
        if (password === password2) {
            await createUserWithEmailAndPassword(email,password)
            localStorage.setItem('accessToken',)
        } else {
            toast.error('password not match')
        }
    }
    return (
        <div className='bg-[#fafafa] min-h-screen'>

            <div className='w-[330px] py-32 sm:w-[600px] md:w-[700px] mx-auto '>
                <form onSubmit={submitSignUp} className='rounded-md p-6 shadow-2xl bg-white'>
                    <div className='md:grid grid-cols-2 gap-4'>
                        <div className='flex  flex-col'>
                            <label className='font-semibold' htmlFor="first_name">First Name</label>
                            <input required className='w-full mt-1 p-3 border-2 hover:border-gray-500 focus-within:border-blue-700 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="text" name="first_name" placeholder='First Name' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="last_name">Last Name</label>
                            <input required className='w-full mt-1 p-3 border-2 hover:border-gray-500 focus-within:border-blue-700  mb-4 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="text" name="last_name" placeholder='Last Name' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="username">Username</label>
                            <input required className='w-full mt-1 p-3 border-2 hover:border-gray-500 focus-within:border-blue-700  mb-4 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="text" name="username" placeholder='Enter Your UserName' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="email">Email</label>
                            <input required className='w-full mt-1 p-3 border-2 hover:border-gray-500 focus-within:border-blue-700  mb-4 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="email" name="email" placeholder='Enter Your email' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="password">Password</label>
                            <input required className='w-full mt-1 p-3 border-2 hover:border-gray-500 focus-within:border-blue-700  mb-4 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="password" name="password" placeholder='Enter Your password' />

                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold' htmlFor="password2">Confirm Password</label>
                            <input required className='w-full mt-1 p-3 border-2 hover:border-gray-500 focus-within:border-blue-700  mb-4 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="password" name="password2" placeholder='Enter Your Confirm Password' />
                        </div>
                    </div>
                      <p className='text-red-500'>  {error?.message}</p>
                    <div className='md:flex justify-end gap-4'>
                        <Link to='/login' className='hover:bg-[#3abff8] duration-150 ease-in py-4 border-2 border-[#3abff8] font-semibold text-xl hover:text-white px-16 rounded-md'>Cancel</Link>
                        <input className='bg-[#3abff8] py-4 m-4 md:m-0 font-semibold text-xl text-white px-16 rounded-md' type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;