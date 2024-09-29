"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Don't fetch data while session is loading

    if (!session?.user?.id) {
      // Redirect to login if no session
      router.push("/auth/login");
    } else {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setMyPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setIsLoading(false); // Stop loading after the fetch
        }
      };

      fetchPosts();
    }
  }, [session?.user?.id, status, router]);

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
      }
    }
  };

  // Show a loading message until the posts are fetched
  if (isLoading) {
    return <p>Loading your posts...</p>;
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
