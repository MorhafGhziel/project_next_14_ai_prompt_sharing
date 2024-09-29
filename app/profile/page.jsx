"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        if (!response.ok) throw new Error("Failed to fetch my posts");

        const data = await response.json();
        setMyPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
        setError("Failed to delete prompt");
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Handle error display
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  );
};

export default MyProfile;
