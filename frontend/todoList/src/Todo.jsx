import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Todo() {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasksList(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAdd = async () => {
    if (task.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3001/add', { task: task });
        setTasksList([...tasksList, response.data]);
        setTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      console.warn('Task cannot be empty');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      const updatedTasks = tasksList.filter(task => task._id !== id);
      setTasksList(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-4xl p-12">Todo List</div>
        <div className="flex">
          <label>
            <input
              type="text"
              placeholder="Enter Task"
              className="border border-black pr-20 flex justify-center items-center pt-2 pb-2 pl-3"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </label>
          <button className="bg-black text-white p-2" type="submit" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="pt-20">
          {tasksList.length === 0 ? (
            <div className="text-2xl">No Record Found</div>
          ) : (
            <ul>
              {tasksList.map(taskItem => (
                <li key={taskItem._id} className="flex justify-between items-center">
                  <span>{taskItem.task}</span>
                  <button onClick={() => handleDelete(taskItem._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Todo;
