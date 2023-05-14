import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Admin(props) {
  const { Component } = props;
  const navigate = useNavigate();
  // Use useEffect hook to check if user is an admin on page load
  useEffect(() => {
    // Get is_admin value from local storage
    let is_admin = localStorage.getItem('is_admin');
    // If user is not an admin, redirect to login page
    if (is_admin === "false") {
      navigate('/login');
    }
  });


  return (
    <div>
      <Component />
    </div>
  )
}

export default Admin;