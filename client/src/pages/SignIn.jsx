import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent refreshing the page everytime we click signup
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', 
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate('/Explore'); // not working idk why

    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
    
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit}
      className='flex flex-col gap-4'>

        <input type='email' placeholder='email'
        id='email' onChange={handleChange}
        className='border p-3 rounded-lg' />

        <input type='password' placeholder='password'
        id='password' onChange={handleChange}
        className='border p-3 rounded-lg' />
        
        <button disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>

        <OAuth />

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Create new account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}

