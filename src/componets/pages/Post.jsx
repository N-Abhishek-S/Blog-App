import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/DatabaseConfigration";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = ()=>{
        post && userData ? post.userId === userData.$id : console.log(error);
    } 
    ;

    


   useEffect(() => {
    if (slug) {
        service.getPost(slug).then((fetchedPost) => {
            if (fetchedPost) {
                setPost(fetchedPost);
            } else {
                console.log("Post not found, navigating home.");
                navigate("/");
            }
        }).catch(error => console.error("Error fetching post:", error));
    } else {
        navigate("/");
    }
}, [slug, navigate]);


    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImg);
                navigate("/");
            }
        });


    };


    return post ? (
        <div className="py-12 flex justify-center">
            <Container className="max-w-4xl p-8 bg-white shadow-2xl rounded-2xl backdrop-blur-lg bg-opacity-70 border border-gray-300">
                {/* Post Image with Glassmorphism effect */}
                <div className="relative w-full mb-6 overflow-hidden rounded-lg shadow-lg bg-gray-200">
                    <img
                        src={service.filePreview(post.featuredImg)}
                        alt={post.title}
                        className="w-full h-80 object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all">
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Content */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="text-gray-700 text-lg leading-relaxed bg-green-500 p-6 rounded-lg shadow-md border border-gray-200">
                        {parse(post.userId)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
