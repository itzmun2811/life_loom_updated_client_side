import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone: user?.phone || '',
      address: user?.address || ''
    }
  });

  const onSubmit = async (data) => {
    const profileInfo = {
      displayName: data.name,
      photoURL: profilePicture,
      phone: data.phone,
      address: data.address
    };

    try {
      await updateUserProfile(profileInfo);
      await axiosSecure.patch(`/users/${user?.email}`, profileInfo);
      const auth = getAuth();
      await auth.currentUser.reload();

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile was updated successfully!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    try {
      const res = await axios.post(imageUrl, formData);
      setProfilePicture(res.data.data.url);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Admin</span>;
      case 'agent':
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Agent</span>;
      default:
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Customer</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 bg-gray-50 rounded-xl shadow-md">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="User profile page" />
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Profile</h2>

      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Picture & Info */}
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg mb-4">
              <img src={profilePicture} alt="User" className="w-full h-full object-cover" />
            </div>
            <input type="file" onChange={handleImageUpload} className="text-sm mb-4" />
            <p className="text-gray-500 text-sm mb-2">
              Last Login: {user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleString()
                : 'N/A'}
            </p>
            {getRoleBadge(user?.role)}
          </div>

          {/* Editable Fields */}
          <div className="md:col-span-2 flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                defaultValue={user?.displayName}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                {...register('phone')}
                type="text"
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
              <textarea
                {...register('address')}
                rows={3}
                placeholder="Enter address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-40 mx-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all mt-4"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
