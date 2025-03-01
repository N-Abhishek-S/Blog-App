import confige from "../confige/conf";
import {Client, Databases, ID, Storage, Query} from "appwrite"

export class DatabaseServices{
    client = new Client();
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(confige.appwriteUrl)
        .setProject(confige.appwriteProjectID)

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    
    async createPost({ title, content, slug, featuredImg, status, userId }) {
        try {
            return await this.database.createDocument(
                confige.appwriteDatabaseID, // ✅ Database ID first
                confige.appwriteCollectionID, // ✅ Collection ID second
                slug || ID.unique(), // ✅ Use unique ID if slug is missing
                { title, content, featuredImg, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    

    async updatePost(slug,{title, content,  featuredImg, status, userId}){
        try {
                return await this.database.updateDocument(
                    confige.appwriteCollectionID,
                    confige.appwriteDatabaseID,
                    slug,
                    {
                        title,
                        content,
                        status,
                        featuredImg,
                        userId
                    }
                )
        } catch (error) {
            throw error
        }
        /*Here we do some different that we took slug first than we took our property object because we need i unique id to update
    Because using slug we will identify which one object we want to update */
    }
    
    async deletePost(slug){
       try {
         await this.database.deleteDocument(
            confige.appwriteDatabaseID,
            confige.appwriteCollectionID,
            slug
        )
        return true
       } catch (error) {
        console.log("Appwrite Service :: deletePost :: error ::",error);
        return false
       }
       /*Why we not return await:-
       1)there was no need to return it because we don't want show something to user
       2)we can show a small message to user that post is deleted for that we give here return true and return false in try-catch */
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                confige.appwriteDatabaseID,
            confige.appwriteCollectionID,
            slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error ::",error)
        }
    }

  
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            
            if (!this.database) {
                throw new Error("Database instance is not initialized.");
            }
    
            return await this.database.listDocuments(
                confige.appwriteDatabaseID,
                confige.appwriteCollectionID,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error.message);
            return { success: false, error: error.message };
        }
    }
    
   
    
    

    /*FILE UPLOADER SERVICES
    (IN FUTURE CREATE IT IN SEPARATE FILE) */

    async uploadFile (file){
        try {
            return await this.storage.createFile(
                confige.appwriteBucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service420 :: uploadfile :: error ::",error);
            return false
            
        }
    }

    async deleteFile (fileId){
        try {
             await this.storage.deleteFile(
                confige.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error ::",error);
            return false;
        }
    }

    filePreview(fileId){

        return this.storage.getFilePreview(
                confige.appwriteBucketID,
                fileId
            )        
    }

    /*Here is don't need to use promise that's why we don't use async-await we just create simple method*/

}


const service = new DatabaseServices();
export default service