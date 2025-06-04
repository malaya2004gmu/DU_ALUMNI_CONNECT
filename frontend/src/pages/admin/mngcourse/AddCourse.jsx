import React,{useState} from 'react';
import{useNavigate} from 'react-router-dom';

const AddCourse =()=>{
    const [courseName,setCourseName]= useState("");
    const [courseDuration,setCourseDuration] =useState("");
    const [courseDescription,setCourseDescription] = useState("");
    const [message,setMessage]=useState("");
    const navigate =useNavigate();

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const res=await fetch("http://localhost:5000/api/admin/add-course",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name:courseName,
                duration:courseDuration,
                description:courseDescription
            })
        });
        const data=await res.json();
        if(res.ok){
            setMessage("course addeed successfully");
            setCourseName("");
            setCourseDuration("");
            setCourseDescription("");
            navigate("/admin/courses");
        }else{
            setMessage("Failed to add course: " + data.error);
        }
    };

    return(
<div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Duration</label>
            <input
              type="text"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
            <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                rows="4"
                required
                ></textarea>
                </div>
           <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Course
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            {message}
          </div>
        )}
      </div>
    </div>
    );
};
export default AddCourse;