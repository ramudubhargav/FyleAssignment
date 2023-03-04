import React, { useEffect, useState } from "react";
import "./Booksearch.css";
import { Button, Input } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';

function Booksearch() {
  const [data, setData] = useState();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [endValue, setEnd] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://openlibrary.org/search.json?q=${value}&offset=${offset}&limit=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data.docs);
        setEnd(data.num_found);
      })
      .catch(error => alert("Unable to fetch , Refresh page"));
  }, [value, offset]);

  function handleChange() {
    setEnd(0);
    setOffset(0);
    const imp = document.querySelector("#imp").value;
    let text = imp.replace(/\s+/g, "+");
    setValue(text);
  }

  function NoDataFound() {
    return (
      <div className="no-data-found">
        {value.length==0?<h2> Start Searching</h2> : <h2>No results found</h2>}
      </div>
    );
  }

  return (
    <div className="book-search">
      <div className="input-container">
        <Input type="text" id="imp" placeholder="Search Books" />
        <Button onClick={handleChange}>
          Search
        </Button>
      </div>
      <hr />
      {value && (
        <h2 className="search-header">
          <span>{value.replace("+"," ")}</span>
        </h2>
      )}
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div>
          {data && data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>First Publish Year</th>
                  <th>Latest Publish Year</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dat, index) => (
                  <tr key={index}>
                    <td>{dat.title}</td>
                    <td>{dat.author_name}</td>
                    <td>{dat.first_publish_year}</td>
                    <td>{Math.max(...dat.publish_year)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoDataFound />
          )}
          <div className="pagination">
            <button
              className="previous"
              disabled={offset < 1}
              onClick={() => setOffset(offset - limit)}
            >
              Previous
            </button>
            <button
              className="next"
              disabled={endValue-10<0 || offset > endValue}
              onClick={() => setOffset(offset + limit)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booksearch;
