import { Link } from "react-router-dom";
export default function ListTable({ isLoading, data, onDelete }) {
  const handleDelete = (e, id) => {
    e.preventDefault();
    onDelete(id);
  };
  return (
    <table className="table table-bordered table-hover shadow-sm p-3 mb-5 bg-body rounded">
      <caption>List of Tasks</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={5}>Loading...</td>
          </tr>
        )}
        {!isLoading && data.length <= 0 && (
          <tr>
            <td colSpan={5}>No data</td>
          </tr>
        )}
        {data.map((row, ind) => (
          <tr key={ind}>
            <td>{++ind}</td>
            <td>{row.name}</td>
            <td>{row.type}</td>
            <td>{row.status}</td>
            <td>{row.description}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger float-end"
                onClick={(e) => handleDelete(e, row.id)}
              >
                <i className="bi-trash " role="img" aria-label="delete" />
              </button>
              <div className="vr float-end"></div>
              <Link
                to={`edit-task/${row.id}`}
                className="btn btn-success float-end"
              >
                <i className="bi-hammer" role="img" aria-label="edit" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
