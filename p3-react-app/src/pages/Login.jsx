import React, {useState} from 'react'
import loginBackground from '../assets/loginBackground.jpg'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(true);

    const navigate =  useNavigate()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin001' && password === 'admin001') {
            setLoginSuccess(true)
            navigate('/kanban')
        } else {
            setLoginSuccess(false)
        }
    }

  return (
    <div className='w-full h-screen flex'>
        <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600'>
            <div className='w-full h-[550px]'>
                <img className='w-full h-full' src={loginBackground} alt="/" />
            </div>
            <div className='p-4 flex flex-col justify-around'>
                <form onSubmit={handleLogin}>
                    <h2 className='text-4xl font-bold text-center mb-8 text-purple-800'>CaliKan</h2>
                    <div>
                        <input 
                            className='border p-2 mr-2'
                            type="text" placeholder='Username'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input 
                            className='border p-2'
                            type="password" placeholder='Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button 
                        className='w-full py-2 mt-4 bg-purple-800 hover:bg-purple-700 text-white'>
                        Sign In
                    </button>
                    {!loginSuccess && (
                        <p className='text-center text-red-500 text-sm my-2'>Invalid Username or Password</p>
                    )}
                    <p className='text-center text-sm my-2'>Forgot Username or Password?</p>
                </form>
                <p className='text-center'>Sign Up</p>
            </div>
        </div>
    </div>
  )
}

export default Login