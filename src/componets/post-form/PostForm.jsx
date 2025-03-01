import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/DatabaseConfigration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData); // 🔍 Check if userData is available


  const slugTransform = (value) =>
    value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/g, "-")
      .replace(/\s+/g, "-");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const submit = async (data) => {
    if (!user || !user.$id) {
      console.error("🚨 User is not authenticated or user ID is missing.");
      alert("You must be logged in to submit a post."); // ✅ User feedback
      return;
    }

    try {
      let file;
      if (data.image && data.image.length > 0) {
        file = await service.uploadFile(data.image[0]);
        if (post?.featuredImg) await service.deleteFile(post.featuredImg);
      }

      const payload = {
        ...data,
        featuredImg: file ? file.$id : post?.featuredImg,
        userId: user.$id,
      };


      const dbPost = post
        ? await service.updatePost(post.$id, payload)
        : await service.createPost(payload);

      if (dbPost) {
        console.log("✅ Post successfully submitted:", dbPost);
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("⚠️ Error handling post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-3 gap-6 p-6 bg-white shadow-lg rounded-lg">
      <div className="col-span-2 space-y-4">
        <Input label="Title" placeholder="Enter title" {...register("title", { required: true })} className="w-full p-3 border rounded-lg" />
        <Input
          label="Slug"
          placeholder="Generated slug"
          {...register("slug", { required: true })}
          onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
          className="w-full p-3 border rounded-lg"
        />
        <RTE label="Content" name="content" control={control} defaultValue={getValues("content") || ""} className="border p-3 rounded-lg" />
      </div>

      <div className="space-y-4">
        <Input
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
          className="w-full p-3 border border-green-500 rounded-lg"
        />
        {post?.featuredImg && (
          <img src={service.filePreview(post.featuredImg)} alt={post.title} className="rounded-lg w-full shadow-md" />
        )}
        <Select options={["active", "inactive"]} {...register("status", { required: true })} className="w-full p-3 border rounded-lg" />
        <Button type="submit" className={`w-full p-3 rounded-lg text-white ${post ? "bg-green-500" : "bg-blue-500"}`}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
