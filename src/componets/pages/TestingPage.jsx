import React, { useEffect, useState } from 'react';
import Container from '../container/Container';
import Postcard from '../Postcard';
import service from '../../appwrite/DatabaseConfigration'; // ✅ For fetching posts
import authentication from "../../appwrite/authservices"; // ✅ For authentication

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ Get logged-in user data
        const userData = await authentication.getUser();
        if (!userData || !userData.$id) {
          console.warn("User not logged in or user ID missing.");
          return;
        }

        setUser(userData); // ✅ Store user info in state

        // ✅ Correctly pass queries as an array
        const response = await service.getPosts([Query.equal("userId", userData.$id)]); 

        if (response && response.documents) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  

  return (
    <div className="w-full py-4 bg-gray-100">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your Posts</h1>
          <p className="text-lg text-gray-600">
            View and manage your own posts securecly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:w-1/2 md:w-1/3 gap-6 mx-auto">
          {posts.length > 0 ? (
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
