import React, { useEffect, useState } from 'react';
import Container from '../container/Container';
import Postcard from '../Postcard';
import service from '../../appwrite/DatabaseConfigration';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts()
      .then((posts) => {
        console.log("Fetched Posts:", posts); // Log to see the response
        if (posts && Array.isArray(posts.documents)) {
          setPosts(posts.documents);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      });
  }, []);
  

  return (
    <div className="w-full py-4 bg-gray-100">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your Posts</h1>
          <p className="text-lg text-gray-600">
            To view posts please.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:w-1/2 md:w-1/3 gap-6 mx-auto">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <Postcard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
