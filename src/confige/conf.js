// filepath: /src/confige/conf.js
const confige = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
  
  
   //These Id's coming from .evn files. These are our Database Id's coming from appwrite backend application
   //we are converting them into string because in future it should not make any problem.
   //Reason all Environment variable must be String if they convert into other type it can be create issues
}

export default confige