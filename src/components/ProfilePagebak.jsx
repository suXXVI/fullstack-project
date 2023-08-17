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
  const [editing, setEditing] = useState(false); // State to control edit mode

  useEffect(() => {
    console.log(`cleanedProfilePic is ${cleanedProfilePic}`);
  });

  const handleFileChange = (e) => {
    setImageToUpload(e.target.files[0]);
  };

  // upload profile picture
  const handleUpload = async () => {
    try {
      if (currentUser) {
        const imageRef = ref(storage, currentUser.uid);
        await uploadBytes(imageRef, imageToUpload);
        const newUrl = await getDownloadURL(imageRef);

        // Update the user's profile with the new photoURL
        await updateProfile(currentUser, { photoURL: newUrl });
        window.location.reload(true);
        setImageToUpload(null);
        setEditing(false); // Disable edit mode after uploading
        window.location.reload(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col p-10 sm:max-w-6xl sm:mx-auto'>
        <div className='flex justify-end w-full'>
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
        <div className='mx-auto'>
          <div className='flex flex-col justify-center items-center w-56'>
            <div className='flex flex-col items-center'>
              <img
                src={cleanedProfilePic || url}
                className='h-56 w-56 rounded-full border-2 border-black'
                alt='profile pic'
              />
              {editing && (
                <div className=' flex flex-col justify-center items-center gap-3 w-56 mt-7'>
                  <input
                    accept='image/*'
                    type='file'
                    onChange={handleFileChange}
                    className='w-24'
                  />
                  <div className='flex gap-2'>
                    <button
                      onClick={handleUpload}
                      className='relative inline-block px-4 py-2 font-medium group text-center'
                    >
                      <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                      <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                      <span className='relative text-black group-hover:text-white '>
                        Save
                      </span>
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className='relative inline-block px-4 py-2 font-medium group text-center'
                    >
                      <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                      <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                      <span className='relative text-black group-hover:text-white '>
                        Cancel
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className='relative inline-block px-4 py-2 font-medium group text-center mt-5'
              >
                <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                <span className='relative text-black group-hover:text-white '>
                  Edit
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
