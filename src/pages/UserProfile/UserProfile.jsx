import './UserProfileStyle.css';
import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { LuUser } from "react-icons/lu";
import { FaCameraRetro } from "react-icons/fa";

const UserProfile = () => {
  const { url, token, userObj } = useContext(StoreContext);
  const [profileImage, setProfileImage] = useState(null);
  const [data, setData] = useState({
    name: userObj?.data?.name || '',
    email: userObj?.data?.email || '',
    image: userObj?.data?.image || '',
    address: userObj?.data?.address || '',
    phoneNumber: userObj?.data?.phoneNumber || '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('password', data.password);
    formData.append('phoneNumber', data.phoneNumber);

    if (profileImage) {
      formData.append('image', profileImage);
    }

    if (data.newPassword) {
      if (data.newPassword !== data.confirmPassword) {
        toast.error('New password and confirm password do not match');
        return;
      } else if (data.newPassword.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return;
      }
      formData.append('newPassword', data.newPassword);
      formData.append('confirmPassword', data.confirmPassword);
    }

    try {
      const response = await axios.patch(`${url}/api/user/update/${userObj.data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setData((prevData) => ({
          ...prevData,
          password: '',
          newPassword: '',
          confirmPassword: '',
        }));

        localStorage.setItem('userData', JSON.stringify({
          name: data.name,
          email: data.email,
          address: data.address,
          phoneNumber: data.phoneNumber,
        }));

        setTimeout(() => {
          window.location.reload();
        }, 3000);

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setData((prevData) => ({
        ...prevData,
        ...JSON.parse(storedData),
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('userData');
  }, []);


  return (
    <div className="user-profile">
      <ToastContainer />
      <div className='user-profile-container'>
        <h1>User Profile</h1>
        <div className='profile-picture'>
          <label htmlFor='profile-upload' className='upload-label'>
            <input
              type='file'
              id='profile-upload'
              className='file-input'
              accept='image/*'
              onChange={handleImageUpload}
            />
            <div className={'profile-image' + (!userObj?.data?.image ? ' no-image' : '')}>
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="Profile" />
              ) : userObj?.data?.image ? (
                <img src={url + '/images/users/' + userObj.data._id + '/' + userObj?.data?.image} alt="User Image" />
              ) : (
                <LuUser className='placeholder-icon' />
              )}
            </div>
            <div className="upload-icon">
              <FaCameraRetro />
            </div>
          </label>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className='profile-info'>
            <label>
              <span>Name:</span>
              <input
                type="text"
                name='name'
                placeholder='Your Name'
                required
                onChange={onChangeHandler}
                value={data.name}
              />
            </label>

            <label>
              <span>Email:</span>
              <input
                type="email"
                name='email'
                placeholder='Your Email'
                required
                onChange={onChangeHandler}
                value={data.email}
              />
            </label>

            <label>
              <span>Address:</span>
              <textarea
                type='text'
                placeholder='Your Address'
                name='address'
                onChange={onChangeHandler}
                value={data.address} />
            </label>

            <label>
              <span>Phone Number:</span>
              <input
                type="text"
                name='phoneNumber'
                placeholder='Your Phone Number'
                required
                onChange={onChangeHandler}
                value={data.phoneNumber}
              />
            </label>

            <label>
              <span>Password:</span>
              <input
                type="password"
                name='password'
                placeholder='Current Password'
                required
                onChange={onChangeHandler}
                value={data.password}
              />
            </label>

            <label>
              <span>
                New Password: <p className='input-noti'> (*Leave blank if you don&apos;t want to change your password)</p>
              </span>
              <input
                type="password"
                name='newPassword'
                placeholder='New Password'
                onChange={onChangeHandler}
                value={data.newPassword}
              />
            </label>

            <label>
              <span>
                Confirm Password: <p className='input-noti'> (*Leave blank if you don&apos;t want to change your password)</p>
              </span>
              <input
                type="password"
                name='confirmPassword'
                placeholder='Confirm New Password'
                onChange={onChangeHandler}
                value={data.confirmPassword}
              />
            </label>
          </div>

          <button type='submit' className='update-button'>Update Information</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
