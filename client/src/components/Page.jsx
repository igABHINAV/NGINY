import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/'); // Updated URL for proxy server
        const temp = await res.json();
        setData(temp);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Hi there!
      <h4>{data.message}</h4>
    </div>
  );
};

export default Page;
