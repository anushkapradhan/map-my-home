import { React, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is '+ progress + '% done');
      setFilePercent(Math.round(progress));
    }, (error) => {
      setFileUploadError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }));
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // preventing default refreshing of page
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile Page</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

      <input onChange={(e) => setFile(e.target.files[0])} type = 'file' hidden accept='image/*' ref={fileRef} />

      <img onClick={() => fileRef.current.click()} src={ formData.avatar || currentUser.avatar } alt='profile picture' className='rounded-full h-24 object-cover cursor-pointer self-center mt-2' />

      <p className='text-sm self-center'>
        { fileUploadError ? (
          <span className='text-red-700'>
            Error Image Upload (image must be less than 2 mb)
          </span>
        ) : filePercent > 0 && filePercent < 100 ? (
          <span className='text-slate-700'>
            {`Uploading ${filePercent}%`}
          </span>
        ) : filePercent === 100 ? (
          <span className='text-green-700'>
            Image successfully uploaded!
          </span>
        ): ('')}
      </p>

      <input type='text' placeholder='username' defaultValue={ currentUser.username } id='username' className='border p-3 rounded-lg' onChange={handleChange} />

      <input type='email' placeholder='email' defaultValue={ currentUser.email } id='email' className='border p-3 rounded-lg' onChange={handleChange} />

      <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />

      <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
        { loading ? 'Loading...' : 'Update'}
      </button>

      {/* <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={ '/' }>
        Create Listing
      </Link> */}

      </form>

      <div className='flex justify-between mt-5'>

        <span className='text-red-700 cursor-pointer'>
          Delete Account
        </span>

        <span className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully' : ''}</p>
    </div>
  )
}
