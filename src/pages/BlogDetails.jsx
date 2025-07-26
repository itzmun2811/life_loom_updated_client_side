import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxios from '../hooks/useAxios';


const BlogDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
 

const {data:blog={}}=useQuery({
    queryKey:['blogs',id],
    queryFn:async()=>{
        const res=await axiosInstance(`/blogs/${id}`)
        return res.data
    }
})

console.log(blog)
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
         <Helmet>
                <title>Blog details</title>
                <meta name="description" content="This is my page description" />
              </Helmet>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{blog.title}</h1>
      <img src={blog.image} alt='' className="w-full h-96 object-cover rounded-xl mb-6" />

      <div className="flex items-center gap-4 mb-4">
        <img
          src={blog.authorImage}
          alt={blog.author}
          className="w-10 h-10 rounded-full border"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">{blog.author}</p>
          <p className="text-xs text-gray-500">
            Published on {new Date(blog.publishDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-700 leading-7">{blog.content}</p>

      <div className="mt-6 text-gray-600 text-sm">
        👁️ Total visits: {blog.totalVisitCount || 0}
      </div>
    </div>
  );
};

export default BlogDetails;
