import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [originalTask, setOriginalTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const status = form.status.value.toLowerCase();
    const newTask = { name, status };

    try {
      const res = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();
      console.log(data);

      setOriginalTask([...originalTask, newTask]);
      setFilteredTask([...originalTask, newTask]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        setOriginalTask(data);
        setFilteredTask(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (val) => {
    setShow(val);
    if (val === "active") {
      const filterTask = originalTask?.filter((item) => item.status === val);
      setFilteredTask(filterTask);
    } else if (val === "completed") {
      const filterTask = originalTask?.filter((item) => item.status === val);
      setFilteredTask(filterTask);
    } else {
      setFilteredTask(originalTask);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleAddTask}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                name="status"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
              {filteredTask?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
