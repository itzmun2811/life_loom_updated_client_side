import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PolicyForm from "./PolicyForm";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


  const ManagePolicies = () => {
         const { user } = useContext(AuthContext);
          const {role}= useRole();
         const axiosSecure = useAxiosSecure();
         const [showModal, setShowModal] = useState(false);
         const [editPolicy, setEditPolicy] = useState(null);

    const { data: policies = [], refetch } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const res = await axiosSecure(`/getAllPolicy`);
      return res.data;
    },

  });

  const handleDelete = async (id) => {

     const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  refetch()
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete blog.', 'error',error.message);
    }
  }
  }

//   const handleEdit =async(id)=>{
//     const res=await axiosSecure.patch(`/blogs/edit/${id}`)
//     console.log(res.data)
//   }
  const handleEdit = (blog) => {
  setEditBlog(blog); // this opens the modal with that blog
};

  return (
    <div>
      <div className='flex justify-between'>
<h2 className="text-2xl font-bold mb-4 text-center">Manage Policy</h2>
      <button onClick={() => setShowModal(true)} 
      className="btn btn-primary mb-4 text-center">
        ➕ Add New Policy
      </button>
      </div>










      {/* Table */}
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Policy Title</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Minimum Age</th>
            <th scope="col" className="px-6 py-3">Maximum Age</th>
            <th scope="col" className="px-6 py-3">Coverage Range</th>
            <th scope="col" className="px-6 py-3">Duration</th>
            <th scope="col" className="px-6 py-3">Base Premium Rate</th>
            <th scope="col" className="px-6 py-3">Policy Image </th>
          </tr>
        </thead>
         <tbody>
    {/* {policies.map((policy) => (
      <tr
        key={policy._id}
        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
      >
        
        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
          {policy.title}
        </td>

        
        <td className="px-6 py-4">
          {policy.category}...
        </td>

        
        <td className="px-6 py-4">{policy.description}</td>
        <td className="px-6 py-4">{policy.minAge}</td>
        <td className="px-6 py-4">{policy.maxAge}</td>
        <td className="px-6 py-4">{policy.coverage}</td>

    
        <td className="px-6 py-4">
          {policy.duration}
        </td>
        <td className="px-6 py-4">
          {policy.basePremium}
        </td>


        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <button
               onClick={() => handleEdit(singleBlog)}
              
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
            onClick={() => handleDelete(singleBlog._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
           
          </div>
        </td>
      </tr>
    ))} */}
  </tbody>
      </table>
    </div>

      {/* Modal */}
      {showModal && <PolicyForm setShowModal={setShowModal} refetch={refetch} />}
      {/* {editBlog && (
        <EditBlogModal
        blog={editBlog}
        closeModal={() => setEditBlog(null)}
        refetch={refetch}/>
)} */}
    </div>
  );
};

export default ManagePolicies;
