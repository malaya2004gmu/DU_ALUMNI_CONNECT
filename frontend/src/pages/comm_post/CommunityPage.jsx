import React from "react";
import CreatePost from "../comm_post/CreatePost";
import PostFeed from "../comm_post/PostFeed";

const CommunityPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 pt-24">
      <h1 className="text-3xl font-bold mb-4 text-center">Community Feeds</h1>
      <CreatePost onPostCreated={() => window.location.reload()} />
      <PostFeed />
    </div>
  );
};

export default CommunityPage;
