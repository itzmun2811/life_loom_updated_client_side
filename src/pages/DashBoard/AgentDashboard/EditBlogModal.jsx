import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditBlogModal = ({ blog, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
   const [imageUrl, setImageUrl] = useState(blog.image);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: blog.title,
      content: blog.content,
      author: blog.author,
      publishDate: blog.publishDate?.split('T')[0],
    },
  });

const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

     const res = await axios.post(imgbbUrl, formData);
    setImageUrl(res.data.data.url);
   
    
  
  };

  const onSubmit = async (data) => {
    const updatedBlog = {
      ...data,
      image: imageUrl,
    };

   
     const res= await axiosSecure.patch(`/blogs/edit/${blog._id}`, updatedBlog);
     console.log(res.data)
     if (res.data.modifiedCount > 0) {
  Swal.fire({
    icon: 'success',
    title: 'Blog Updated!',
    text: 'The blog has been successfully updated.',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
}

     closeModal();
      refetch();
   
  };

  return (
    <div className="fixed inset-0  flex 
    justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-xl max-w-xl  "
      >
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

        <label className="block mb-2">Title</label>
        <input {...register('title')} className="w-full mb-3 p-2 border" />

        <label className="block mb-2">Content</label>
        <textarea {...register('content')} className="w-full mb-3 p-2 border h-32" />

       <div className="flex justify-center items-center w-3/4 gap-4 ">
 <label className="block mb-2">Author</label>
        <input {...register('author')} readOnly className="w-full mb-3 p-2 border" />

        <label className="block mb-2">Publish Date</label>
        <input type="date" {...register('publishDate')} className="w-full mb-4 p-2 border" />
       </div>

        <label className="block mb-2">Blog Image</label>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mb-3"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogModal;
