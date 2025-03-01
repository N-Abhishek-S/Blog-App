import React, { useState, useEffect } from "react";
import Container from "../container/Container";
import service from "../../appwrite/DatabaseConfigration";
import Postcard from "../Postcard";
import { Query } from "appwrite"; // ✅ Import Query

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await service.getPosts([Query.equal("status", "active")]); // ✅ Ensure valid query

        if (postsData?.documents) {
          setPosts(postsData.documents);
        } else {
          setPosts([]); // ✅ Avoid undefined errors
        }
      } catch (error) {
        console.error("Error fetching posts in AllPost:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => <Postcard key={post.$id} {...post} />)
          ) : (
            <p className="text-center w-full">No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
