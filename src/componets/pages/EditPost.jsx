import React,{useState,useEffect} from 'react'
import Container from '../container/Container'
import { PostForm } from '../index'
import service from '../../appwrite/DatabaseConfigration'
import {useParams, useNavigate} from 'react-router-dom'

function EditPost() {
    const [post, setPosts]= useState()
    const {slug} = useParams()
    const Navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }else{
            Navigate('/')
        }
    },[slug, Navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null 

  
  
}

export default EditPost
