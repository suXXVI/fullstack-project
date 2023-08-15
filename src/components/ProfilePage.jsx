import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { updateProfile } from 'firebase/auth';

export default function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const profilepic = localStorage.getItem('profilepic');
  const cleanedProfilePic = profilepic ? profilepic.replace(/"/g, '') : null;
  const [imageToUpload, setImageToUpload] = useState(null);
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png';
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
  });

  const handleFileChange = (e) => {
    setImageToUpload(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (currentUser) {
        const imageRef = ref(storage, currentUser.uid);
        await uploadBytes(imageRef, imageToUpload);
        const url = await getDownloadURL(imageRef);

        // Update the user's profile with the new photoURL
        await updateProfile(currentUser, { photoURL: url });
        window.location.reload(true);
        setImageToUpload(null);
        window.location.reload(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <a
          onClick={() => navigate('/dashboard')}
          href='#_'
          className='relative inline-block px-4 py-2 font-medium group text-center'
        >
          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
          <span className='relative text-black group-hover:text-white '>
            Go Back
          </span>
        </a>
      </div>
      <div className='flex flex-col p-10 sm:max-w-6xl sm:mx-auto'>
        <div className='flex flex-col w-56'>
          <img
            src={cleanedProfilePic || url}
            className='border-2 border-stone-300 h-20 w-20'
            alt='profile pic'
          />
          <input type='file' onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className='relative inline-block px-4 py-2 font-medium group text-center'
          >
            <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
            <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
            <span className='relative text-black group-hover:text-white'>
              Upload
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
