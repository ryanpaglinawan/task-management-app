import { useEffect, useState } from "react";
import CONFIG from "./../config";

export default function FormFilter(props) {
  const [formFilter, setFormFilter] = useState({});

  const handleFilterChange = (e) => {
    if (e.target.value === "") {
      delete formFilter[e.target.name];
      props.onChange(formFilter);
    } else {
      setFormFilter({ ...formFilter, [e.target.name]: e.target.value });
    }
  };

  const handleClear = (e) => {
    setFormFilter({});
  };

  useEffect(() => {
    props.onChange(formFilter);
  }, [formFilter]);

  return (
    <form className="d-flex">
      <select
        className="form-select"
        aria-label="Filter by Type"
        name="type"
        onChange={handleFilterChange}
        value={formFilter.type || ""}
      >
        <option value="">Filter by Type</option>
        {CONFIG.types.map(({ name, label }) => (
          <option value={name}>{label}</option>
        ))}
      </select>
      <select
        className="form-select"
        aria-label="Filter by Status"
        name="status"
        onChange={handleFilterChange}
        value={formFilter.status || ""}
      >
        <option value="">Filter by Status</option>
        {CONFIG.statuses.map(({ name, label }) => (
          <option value={name}>{label}</option>
        ))}
      </select>

      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Name"
        aria-label="Search"
        name="search"
        value={formFilter.search || ""}
        onChange={handleFilterChange}
      />
      <button
        className="btn btn-sm btn-outline-success"
        type="button"
        onClick={handleClear}
      >
        Clear
      </button>
    </form>
  );
}
