/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CONFIG from "./../config";
import axios from "axios";
import FormFilter from "../components/FormFilter";
import ListTable from "../components/ListTable";
import Notify from "../components/Notification";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasksPreview, setTasksPreview] = useState([]);
  const [alertMsg, setAlertMsg] = useState(false);

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${CONFIG.apiHost}/api/tasks`);
      if (res.data.status === 200) {
        setTasks(res.data.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleFilters = (data) => {
    setTasksPreview(
      tasks.filter((task) => {
        return Object.keys(data).every((filter) => {
          return filter === "search"
            ? task["name"].includes(data[filter])
            : data[filter] === task[filter];
        });
      })
    );
  };

  const handleDelete = async (id) => {
    console.log("edit...", id);
    try {
      const res = await axios.delete(`${CONFIG.apiHost}/api/delete-task/${id}`);
      if (res.data.status === 200) {
        setAlertMsg({ type: "success", message: res.data.message });
        getTasks();
      }
    } catch (e) {
      setAlertMsg({
        type: "danger",
        message: "Delete failed! Please try again.",
      });
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setTasksPreview(tasks);
  }, [tasks]);

  //auto-hide notif after 6secs
  useEffect(() => {
    setTimeout(() => {
      setAlertMsg(false);
    }, 6000);
  }, [alertMsg]);

  return (
    <div className="container shadow p-3 mb-5 bg-body rounded">
      <div className="row">
        <div className="col-md-12 center">
          <div className="card">
            {alertMsg && <Notify {...alertMsg} />}
            <div className="card-header">
              <h3>
                Task Management System
                <Link to="add-task" className="btn btn-primary float-end">
                  Add Task
                </Link>
              </h3>
            </div>
            <div className="card-body">
              <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                  <label className="navbar-brand">Filter</label>
                  <FormFilter onChange={handleFilters} />
                </div>
              </nav>
              <ListTable
                isLoading={isLoading}
                data={tasksPreview}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
