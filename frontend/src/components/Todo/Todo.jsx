import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Navbar/Nav";
import './Todo.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from '../../../services/url'

function Todo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const userId = localStorage.getItem('id');
  const [filteredData, setFilteredData] = useState([]);

  // Function to clear local storage and redirect to login page
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  // Function to add a new todo item to the database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/todo/post`, { userId, title, description })
      toast.success("Added Successfully");
      setListItems(prev => [...prev, res.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      toast.error("Enter Data");
    }
  }

  // Function to fetch all todo items from database
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/todo/get/${userId}`)
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (!localStorage.getItem("user")) {
      navigate('/login')
    } else {
      getItemsList()
    }
  }, [userId]);

  // Function to delete item when clicked on delete button
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todo/delete/${id}`, { userId })
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
      toast.success('Deleted Successfully')
    } catch (err) {
      console.log(err);
    }
  }

  // Function to update item
  const updateItem = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${BASE_URL}/todo/${isUpdating}`, { userId, title: updateTitle, description: updateDescription })
      toast.success("Updated Successfully")
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex];
      updatedItem.title = updateTitle;
      updatedItem.description = updateDescription;
      setUpdateTitle('');
      setUpdateDescription('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  }

  // Function to render update form when user clicks on edit
  const renderUpdateForm = (item) => (
    <form onSubmit={(e) => { updateItem(e) }} > {/* onSubmit calls updateItem to post the updated data */}
      <div className="todo-content">
        <input className="item-input-title form-control" type="text" placeholder="New Title" onChange={e => { setUpdateTitle(e.target.value) }} value={updateTitle} />
        <textarea className="item-description form-control" type="text" placeholder="New Description" onChange={e => { setUpdateDescription(e.target.value) }} value={updateDescription} />
      </div>
      <div className="edit-delete">
        <button className="btn btn-primary" type="submit">Update</button>
        <button className="btn btn-danger" onClick={() => { setIsUpdating('') }}>Cancel</button>
      </div>
    </form>
  )
  // function to handle search
  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    const filteredArray = listItems.filter((item) => {
      const itemTitle = item.title.toLowerCase(); //make query lowercase to search even when user put query in uppercase
      const itemContent = item.description.toLowerCase();
      return itemTitle.includes(searchQuery.toLowerCase()) || itemContent.includes(searchQuery.toLowerCase()); //return the items whose data includes search query
    });
    setFilteredData(filteredArray);
  };

  const displayData = filteredData.length > 0 ? filteredData : listItems;

  return (
    <>
      <button className='btn logout-icon py-3 px-3' onClick={logout} title="Logout">
        <i className="fa-solid fa-power-off fa-2xl "></i>
      </button>
      <Navbar handleSearch={handleSearch} />
      <div className="container todo ">
        <h1 className="py-1">To-Do-List</h1>
        <form className="form add-todo-card py-4 px-4" onSubmit={(e) => addItem(e)}>
          <div style={{ width: "90%" }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control "
                placeholder="Add Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Add Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary ms-2">
            Add
          </button>
        </form>
        <div className="todo-item ">
          {displayData.map((item) => (
            <div className="todo-card " key={item._id}>
              {isUpdating === item._id ? (
                renderUpdateForm(item)
              ) : (
                <>
                  <div className='todo-content'>
                    <h6 className="item-title">{item.title}</h6>
                    <p className="item-description" style={{ whiteSpace: 'pre-wrap' }}>{item.description}</p>
                  </div>
                  <div className="edit-delete">

                    <i className="fa-solid fa-pen-to-square fa-lg" type="button" onClick={() => {
                      setIsUpdating(item._id);
                      setUpdateTitle(item.title);
                      setUpdateDescription(item.description);
                    }}>
                    </i>

                    <i className="fa-solid fa-trash fa-lg"
                      type="button"
                      onClick={() => { deleteItem(item._id); }}>
                    </i>

                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </>
  );

}


export default Todo;
