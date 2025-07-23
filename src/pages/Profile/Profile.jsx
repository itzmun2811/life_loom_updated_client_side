import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";


const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const profileInfo = {
      displayName: data.name,
      photoURL: profilePicture,
    };

    try {
      await updateUserProfile(profileInfo);
      // Optional: Save to DB
      await axios.patch(`/api/users/${user?.email}`, profileInfo); 
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
        return <span className="bg-red-100 text-red-800 text-xs 
        font-medium px-2.5 py-0.5 rounded">Admin</span>;
      case 'agent':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Agent</span>;
      default:
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Customer</span>;
    }
  };

  return (
    <div className="w-11/12 mx-auto my-12 p-6 md:p-12 bg-white rounded shadow">
      

      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col items-center">
            <img
              src={profilePicture}
              alt="User"
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
            />

            <input
              type="file"
              onChange={handleImageUpload}
              className="text-sm"
            />

            <p className="mt-2 text-sm text-gray-600">
              Last Login:  {user?.last_log_in}
            </p>
            <p className="mt-1">{getRoleBadge(user?.role)}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                {...register('name')}
                defaultValue={user?.displayName}
                type="text"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
