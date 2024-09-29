import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      {/* Heading */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* Post Layout */}
      <div className="mt-10 prompt_layout">
        {/* Check if data exists and is not empty */}
        {Array.isArray(data) && data.length > 0 ? (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit?.(post)}
              handleDelete={() => handleDelete?.(post)}
            />
          ))
        ) : (
          // Fallback message if no posts are available
          <p className="text-center text-gray-500">No posts to display.</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
