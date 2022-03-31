import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { Link } from "react-router-dom";
import CONFIG from "./../config";
import AddTask from "./AddTask";
import axios from "axios";

export default function EditTask(props) {
  const { id } = useParams();
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEditData = async () => {
    //setIsLoading(true);
    try {
      const res = await axios.get(`${CONFIG.apiHost}/api/edit-task/${id}`);
      if (res.data.status === 200) {
        //console.log(res);
        setEditData(res.data.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getEditData();
  }, []);

  return isLoading ? "Loading..." : <AddTask {...editData} />;
}
