import React from 'react'
import { Link } from 'react-router-dom'

const CourseCrad = ({course,handleDelete}) => {
    console.log(course);
    
  return (
    
        
    <div
      className="bg-white overflow-hidden shadow rounded-lg p-4"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {course.name} 
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {course.category}
        </p>
        <p className="mt-1 text-sm text-gray-500">Fees: <span>{course.amount}</span></p>
      </div>
      <div className="mt-4 flex justify-between">
        <Link to={`/${course._id}/edit`}>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
              Update
            </button>
        </Link>
        <button  onClick={() => handleDelete(course._id)} className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
     )
}

export default CourseCrad