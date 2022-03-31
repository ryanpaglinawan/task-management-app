import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CONFIG from "./../config";
import axios from "axios";
import Notify from "../components/Notification";

export default function AddTask(props) {
  const formDefault = {
    name: props.name || "",
    type: props.type || "",
    status: props.status || "",
    description: props.status || "",
  };

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (props.id) {
      //do update
      try {
        const res = await axios.put(
          `${CONFIG.apiHost}/api/update-task/${props.id}`,
          formData
        );
        if (res.data.status === 200) {
          setIsLoading(false);
          setAlertMsg({ type: "success", message: res.data.message });
        }
      } catch (e) {
        setAlertMsg({
          type: "danger",
          message: "Updating task failed! Please try again.",
        });
        console.error(e);
      }
    } else {
      //do add
      try {
        const res = await axios.post(
          `${CONFIG.apiHost}/api/add-task`,
          formData
        );
        if (res.data.status === 200) {
          setFormData(formDefault);
          setAlertMsg({ type: "success", message: res.data.message });
        }
      } catch (e) {
        setAlertMsg({
          type: "danger",
          message: "Adding task failed! Please try again.",
        });
        console.error(e);
      }
    }
  };

  const setFormValue = () => {
    setFormData({
      name: props.name,
      status: props.status,
      type: props.type,
      description: props.description,
    });
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  //auto-hide notif after 6secs
  useEffect(() => {
    setTimeout(() => {
      setAlertMsg(false);
    }, 6000);
  }, [alertMsg]);

  useEffect(() => {
    if (props) setFormValue();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            {alertMsg && <Notify {...alertMsg} />}
            <div className="card-header">
              <h3>{props.id ? "Edit" : "Add"} Task</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group mb-3">
                  <label>Task Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Task Type</label>
                  <select
                    name="type"
                    className="form-select"
                    onChange={handleFormInputChange}
                    value={formData.type}
                  >
                    <option value="">-Types-</option>
                    {CONFIG.types.map(({ name, label }, ind) => (
                      <option value={name}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Task Status : </label>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Task Status"
                  >
                    {CONFIG.statuses.map(({ name, label }, ind) => (
                      <>
                        <input
                          type="radio"
                          className="btn-check"
                          name="status"
                          id={name}
                          value={name}
                          onChange={handleFormInputChange}
                          checked={formData.status === name}
                        />
                        <label
                          className="btn btn-sm btn-outline-primary"
                          htmlFor={name}
                        >
                          {label}
                        </label>
                      </>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    name="description"
                    onChange={handleFormInputChange}
                    value={formData.description}
                  ></textarea>
                </div>
                <div className="btn-toolbar btn">
                  <div className="btn-group me-3" role="group">
                    <Link to="/" className="btn btn-sm btn-danger">
                      Back
                    </Link>
                  </div>
                  <div className="btn-group me-3" role="group">
                    <button className="btn btn-success btn-sm float-end">
                      {props.id ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
