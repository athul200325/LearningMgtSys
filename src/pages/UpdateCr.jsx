import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: '',
    category: '',
    amount: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid course ID');
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourseData({
          name: response.data.name,
          category: response.data.category,
          amount: response.data.amount,
        });
      } catch (err) {
        setError('Error fetching course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseData.name || !courseData.category || courseData.amount <= 0) {
      setError('All fields are required and amount must be positive');
      return;
    }

    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/courses/${id}`, courseData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader border-t-4 border-b-4 border-indigo-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="name"
              value={courseData.name}
              onChange={handleChange}
              placeholder="Enter course name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="Programming">Programming</option>
              <option value="Full stack">Full stack</option>
              <option value="Application development">Application development</option>
              <option value="Testing">Testing</option>
              {!['development', 'design', 'marketing', 'business'].includes(courseData.category) && (
                <option value={courseData.category}>{courseData.category}</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (in INR)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={courseData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-500' : 'bg-indigo-600'} text-white py-2 px-4 rounded-md text-sm font-medium ${!loading && 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}`}
            >
              {loading ? 'Updating...' : 'Update Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCr;
