import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';

const BlogPost = ({ setShowModal, refetch }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
 const [publishDate] = useState(new Date().toISOString());
 const [imageUrl, setImageUrl] = useState('');
 const [uploading, setUploading] = useState(false);


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = {
      title,
      content,
      author: user.displayName,
      authorImage:user.photoURL,
      authorEmail: user.email,
      image: imageUrl,
      publishDate,
      totalVisitCount:0
    };
   

    const res = await axiosSecure.post('/blogs', blog);
    if (res.data.insertedId) {
       Swal.fire({
       icon: 'success',
       title: 'Blog published!',
       toast: true,
       position: 'top-end',
       showConfirmButton: false,
       timer: 2000,
       timerProgressBar: true,
});

refetch();
setShowModal(false);
    }
  };

  const handleImageUpload = async (e) => {
  const image = e.target.files[0];
  if (!image) return;
  
  const formData = new FormData();
  formData.append('image', image);
  
  const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

  setUploading(true);
  try {
    const res = await axios.post(imageUrl, formData);
    setImageUrl(res.data.data.url);
  
  } catch (err) {
    console.error("Image upload failed:", err);
   
  } finally {
    setUploading(false); 
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Create New Blog</h3>
        <input
          type="text"
          placeholder="Blog Title"
          className="input input-bordered w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          className="textarea textarea-bordered w-full mb-3"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
  <div>
          <label
      htmlFor="photo"
      className="block mb-1 text-sm font-medium text-white dark:text-white"
    >
      Your Photo
    </label>
    <input
      type="file"
  
    onChange={handleImageUpload}
     placeholder="Photo URL"
    


className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     
  
    />
  </div>
         <div className="mb-3">
  <label className="block mb-1 font-medium">Author Name</label>
  <input
    type="text"
    value={user?.displayName}
    readOnly
    className="input input-bordered w-full"
  />
</div>

<div className="mb-3">
  <p className="font-medium">Publish Date - {new Date(publishDate).toLocaleDateString()}</p>
</div>
        <div className="flex justify-between mt-4">
          <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button type="submit" className="btn btn-success"   disabled={uploading || !imageUrl}>

              {uploading ? "Uploading..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogPost;
