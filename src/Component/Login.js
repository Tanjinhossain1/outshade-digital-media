import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faG } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate(auth);
    const [email, setEmail] = useState()
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [updatePassword] = useUpdatePassword(auth);

    const [openLogin, setOpenLogin] = useState(false);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (loading || gLoading) {
        return <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
    }
    if (user || gUser) {
        navigate('/home')
    }
    const SubmitLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setEmail(email)
        signInWithEmailAndPassword(email, password)
    }
    return (
        <div>
            <div className='bg-[#f6f2f7] min-h-screen py-20'>
                <div className='w-4/4 bg-white sm:w-[600px]  p-8  mx-auto border  rounded-md'>
                    <h1 className='text-center text-2xl font-bold mb-4'>SOCIAL LOGIN</h1>
                    <button onClick={() => signInWithGoogle()} className='w-full py-4 rounded-lg bg-black text-white flex justify-around items-center mb-4 '>
                        <FontAwesomeIcon className='text-3xl' icon={faG} />
                        <span className='text-xl'> Continue With Google</span>
                    </button>



                    <Link to='/signUp'> <button className=' mb-4 w-full py-4 rounded-lg bg-[#6e3258] text-white flex justify-around items-center'>
                        <FontAwesomeIcon className=' text-3xl ' icon={faEnvelope} />
                        <span className='text-xl'>Sign Up With Email</span>
                    </button></Link>
                    <div className='flex items-center justify-evenly'>
                        <hr className='w-[100px]' />
                        {
                            openLogin ? <p>Continue with your email address</p> :
                                <p className='mx-1'> Already have an account? <button class='text-blue-500' onClick={() => setOpenLogin(true)}>Log in</button></p>
                        }
                        <hr className='w-[100px]' />
                    </div>

                    {
                        openLogin && <>
                            <form onSubmit={SubmitLogin}>
                                <div className='mt-4'>
                                    <label htmlFor="email" className='font-bold'>Email</label>
                                    <input className='w-full mt-1 px-1 py-2 border-2 hover:border-gray-500 focus-within:border-blue-700  mb-4 outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="email" placeholder='Enter Your Email' name='email' required />
                                    {/* <label className='text-red-600' htmlFor="">{emailError}</label> */}
                                </div>
                                <p className='text-red-500'>  {error?.message}</p>
                                <p className='text-red-500'>  {gError?.message}</p>
                                <div className='mt-4'>
                                    <label htmlFor="password" className='font-bold'>Password</label>
                                    <input className='w-full mt-1 px-1 py-2 border-2 hover:border-gray-500 focus-within:border-blue-700   outline-none focus-within:hover:border-blue-700 rounded-md border-gray-300' type="password" placeholder='Enter Your Password' name='password' required />

                                </div>
                                <p className='text-center cursor-pointer w-full block text-blue-500 mt-6' onClick={async () => {
                                    if(email){
                                        await updatePassword(email);
                                        toast('Updated password');
                                    }else{
                                        toast('submit your email')
                                    }
                                   
                                }}>Change Password</p>
                                <input className='w-full bg-blue-700 py-3 mt-8 rounded-md text-white font-semibold' type="submit" value="Login" />
                                <p onClick={async () => {
                                     if(email){
                                        await sendPasswordResetEmail(email)
                                    toast('forgot password send your email')
                                    }else{
                                        toast('submit your email')
                                    }
                                    
                                }} className='text-center cursor-pointer w-full block text-blue-500 mt-6'>Forgot My Password</p>
                            </form>

                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Login;