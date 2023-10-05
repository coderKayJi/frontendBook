import React from "react";

const Home = () => {
  return (
    <div style={{ paddingLeft: "4rem",textAlign: 'left' }}>
      <h1>Application Requirements</h1>
      <ul >
        <li>A search bar that allows users to search for books by title.</li>
        <li>A results list that displays the search results.</li>
        <li>
          The result list should have pagination, filtering, and sorting
          features.
        </li>
        <li>
          A "Add to Books List" button that allows users to add a book to the
          database.
        </li>
        <li>Edit button to allow users to edit details of a book.</li>
        <li>
          A responsive layout that works well on desktop and mobile devices.
        </li>
      </ul>
    </div>
  );
};

export default Home;
