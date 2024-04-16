const { useState, useEffect } = React;

function App() {
  const [collegesData, setCollegesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage).then(newData => {
      setCollegesData(prevData => [...prevData, ...newData]);
    });
  }, [currentPage]);

  function fetchData(page) {
    // Simulating fetch data from server
    return new Promise(resolve => {
      setTimeout(() => {
        // Dummy data
        const newData = [
          { name: "College A", rating: 4.5, fees: 10000, userReviewRating: 4.2, featured: true },
          { name: "College B", rating: 4.0, fees: 12000, userReviewRating: 3.8, featured: false },
          { name: "College C", rating: 4.2, fees: 15000, userReviewRating: 4.5, featured: true },
          // Add more data as needed
        ];
        resolve(newData);
      }, 1000); // Simulate delay of 1 second
    });
  }

  function displayLoader(display) {
    const loader = document.getElementById('loader');
    loader.style.display = display ? 'block' : 'none';
  }

  window.onscroll = function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreData();
    }
  };

  function loadMoreData() {
    setCurrentPage(prevPage => prevPage + 1);
    displayLoader(true);
  }

  return (
    <div>
      <table id="collegesTable">
        <thead>
          <tr>
            <th>College Name</th>
            <th>Rating</th>
            <th>Fees</th>
            <th>User Review Rating</th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
          {collegesData.map((college, index) => (
            <tr key={index}>
              <td>{college.name}</td>
              <td>{college.rating}</td>
              <td>{college.fees}</td>
              <td>{college.userReviewRating}</td>
              <td>{college.featured ? <span className="featured">Featured</span> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="loader" className="loader"></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

