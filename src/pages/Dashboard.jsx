import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCrad.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
        setFilteredCourses(response.data); 
      } catch (err) {
        setError('Error in fetching courses');
      } finally {
        setLoading(false); 
      }
    };

    fetchCourses();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      setFilteredCourses(courses.filter((course) => course.category === category));
    } else {
      setFilteredCourses(courses); 
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      const updatedCourses = courses.filter((course) => course._id !== courseId);
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses); 
    } catch (err) {
      setError('Error deleting course');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="ml-4 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 h-10 rounded-md sm:text-sm"
              >
                <option value="">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Full stack">Full stack</option>
                <option value="Application development">Application development</option>
                <option value="Testing">Testing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      </main>
      <div className='flex justify-center'>
        <Link to={'/create'}><button className='bg-green-700 text-white p-3 rounded-md'>Add course</button></Link>
      </div>
    </div>
  );
};

export default Dashboard;
