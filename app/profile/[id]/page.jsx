"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        if (!response.ok) throw new Error("Failed to fetch user posts");

        const data = await response.json();
        setUserPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  if (error) {
    return <div>Error: {error}</div>; // Handle error display
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
    </Suspense>
  );
};

export default UserProfile;
