import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signInErrors, isAuthenticated } = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate('/products')
        //navigate('/add-product')
        else
            console.log("No esta authenticado");
    }, [isAuthenticated])

    const onSubmit = handleSubmit((data) => {
        //console.log(data);
        signin(data);
    })

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {
                    signInErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 my-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit} >
                    <h1 className='text-3xl font-bold my-3'>Login</h1>
                    <label htmlFor='email'>Email</label>
                    <input name="email"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email'
                        {
                        ...register("email", { required: true })
                        }
                    />
                    {
                        errors.email?.type === 'required' && (
                            <p className='text-red-500' > Email requerido </p>
                        )
                    }

                    <label htmlFor='password'>Password</label>
                    <div className='flex justify-end items-center relative'>
                        <input type={passwordShown ? "text" : "password"} name="password"
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                            placeholder='Password'
                            {
                            ...register("password", { required: true, minLength: 6 })
                            }
                        />
                        {
                            passwordShown? <IoEyeSharp size={30} className='absolute mr-2 w-10'
                                onClick={togglePasswordVisibility} />
                                :
                                <IoEyeOffSharp size={30} className='absolute mr-2 w-10'
                                    onClick={togglePasswordVisibility} />
                        }
                        {
                            errors.password?.type === 'required' && (
                                <p className='text-red-500' > Password requerido </p>
                            )
                        }
                        {
                            errors.password?.type === 'minLength' && (
                                <p className='text-red-500' >La longitud mínima es de 6 caracteres </p>
                            )}
                    </div>
                    <button type='submit'
                        className=' bg-transparent hover:bg-zinc-500 text-white
                            font-semibold hover:text-white py-3 px-3 border
                          border-zinc-500 hover:border-transparent rounded'
                          disabled={!captchaValue}
                    > <IoLogIn size={30} /> </button>
                <ReCaptcha sitekey='6LdUWSQpAAAAAF6KoxR2xG_L6oRhB6_UddMWHMYR'
                onChange={ (value) => setCaptchaValue(value)} />

                </form>
                <p className='flex gap-x-2 justify-between pt-5 mt-5'>
                    ¿No tienes una cuenta?
                    <Link to='/register' className='text-sky-500'> <IoPersonAdd size={30} /> </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage