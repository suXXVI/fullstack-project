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
  const [imageToUpload, setImageToUpload] = useState(null);
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png';
  const navigate = useNavigate();
  const [cleanedProfilePic, setCleanedProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const profilepic = localStorage.getItem('profilepic');
    const cleaned =
      profilepic === 'null'
        ? null
        : profilepic
        ? profilepic.replace(/"/g, '')
        : null;
    setCleanedProfilePic(cleaned);
  }, []);

  //Handle Edit
  const handleEdit = () => {
    setEditing(true);
    setNewName(currentUser.displayName);
  };

  //Handle Cancel
  const handleCancel = () => {
    setEditing(false);
  };

  //Image upload
  const imageSrc = cleanedProfilePic ? cleanedProfilePic : url;

  const handleFileChange = (e) => {
    setImageToUpload(e.target.files[0]);
  };

  // upload profile picture
  const handleUploadAndSubmit = async () => {
    setIsLoading(true);

    try {
      if (currentUser) {
        if (imageToUpload) {
          const imageRef = ref(storage, currentUser.uid);
          await uploadBytes(imageRef, imageToUpload);
          const userUrl = await getDownloadURL(imageRef);
          await updateProfile(currentUser, { photoURL: userUrl });
        }

        // Update the user's profile with the new photoURL
        await updateProfile(currentUser, { displayName: newName });
        console.log(currentUser);
        window.location.reload(true);
        setImageToUpload(null);
        window.location.reload(false);
      }
      setEditing(false);
      setIsLoading(false);
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
        <div className='flex mx-auto flex-col p-10 sm:max-w-6xl sm:mx-auto'>
          <div className='flex flex-col items-center w-56'>
            <p className='font-bold mt-5 text-3xl'>Your Profile</p>
            <div className='mt-10'>
              <img
                src={imageSrc}
                className='border-2 rounded-full'
                alt='profile pic'
              />
            </div>

            {/* profile pic */}
            {editing && (
              <>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='mt-5'
                />
              </>
            )}

            {/* name and email */}
            <h2 className='font-bold text-2xl mt-5'>
              {editing ? (
                <input
                  type='text'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder='Enter new username'
                  className='border-2 pl-10'
                />
              ) : (
                (currentUser && currentUser.displayName) || 'Loading...'
              )}
            </h2>
            <p className='text-stone-500'>
              {(currentUser && currentUser.email) || 'Loading...'}
            </p>

            {/* buttons */}
            {editing ? (
              <div className='flex flex-row justify-center items-center gap-3'>
                <button
                  onClick={handleUploadAndSubmit}
                  className='relative inline-block px-4 py-2 font-medium group text-center mt-5 mb-5 h-10'
                >
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                  <span className='relative text-black group-hover:text-white '>
                    {isLoading ? 'Saving...' : 'Save'}
                  </span>
                </button>
                <button
                  onClick={handleCancel}
                  className='relative inline-block px-4 py-2 font-medium group text-center h-10'
                >
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                  <span className='relative text-black group-hover:text-white '>
                    Cancel
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
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
