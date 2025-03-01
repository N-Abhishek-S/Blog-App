import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/DatabaseConfigration";

function Postcard({ $id, title, featuredImg }) {
  return (
    <Link to={`/post/${$id}`}>
        <div className=' bg-white rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.filePreview(featuredImg)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold text-black'
            >{title}</h2>
        </div>
    </Link>
  )
}
export default Postcard;
