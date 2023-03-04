import React, { useEffect, useState } from "react";
import "./Subjectsearch.css";
import CircularProgress from '@mui/material/CircularProgress';
function Subsearch(props) {
  const text = props.inp.replace(/\s+/g, "_");
  const value=text.toLowerCase();
  const [data, setData] = useState();
  const [nodata, setNoData] = useState();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://openlibrary.org/subjects/${value}.json?limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setNoData(data.work_count);
        setData(data.works);
      })
      .catch(error => alert("Unable to fetch , Refresh page"));
  }, [value, setLoading]);

  function Loading() {
    return <div className="loading-container">
    <CircularProgress />
  </div>
  }

  function Display() {
    return (
      <div className="container">
        <div className="box">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {data.map((work, index) => (
                <tr key={index}>
                  <td>{work.title}</td>
                  <td>
                    {work.authors && work.authors[0]
                      ? work.authors[0].name
                      : "Unknown"}
                  </td>
                  <td>{work.first_publish_year || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function Print() {
    return (
      <div>
        {nodata === 0 ? (
          <div className="container">
            <div className="message">No Data Found</div>
          </div>
        ) : (
          <Display />
        )}
      </div>
    );
  }

  return <div className="subsearch">{isloading ? <Loading /> : <Print />}</div>;
}

export default Subsearch;
