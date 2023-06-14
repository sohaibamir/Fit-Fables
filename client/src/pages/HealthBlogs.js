import React, { useEffect, useState } from "react";
import HealthCareBreadcrumb from "../components/healthcare/HealthCareBreadcrumb";
import Tabs from "../components/navbar/Tabs";
import { Box, Skeleton } from "@chakra-ui/react";

const HealthBlogs = () => {
  const arr = [1, 2, 3, 4, 5, 6, 8, 9];
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=health&pageSize=16&apiKey=1721a75ae72543d7b8caf7432a01d5fa"
    )
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const filteredBlogs = blogPosts.filter((post) => post.urlToImage);

  return (
    <>
      <Tabs />
      <Box
        w={{ base: "90%", sm: "90%", lg: "90%", xl: "80%" }}
        margin="80px auto"
        color={"rgba(0,0,0,0.7)"}
      >
        <HealthCareBreadcrumb title="Health Blogs" />
        <div className="blog-page">
          <div className="blog-posts">
            {loading &&
              arr.map((el) => (
                <Skeleton key={el} borderRadius={"10px"}>
                  <Box width={"250px"} height="474px"></Box>
                </Skeleton>
              ))}
            {!loading &&
              filteredBlogs.map((post, index) => (
                <div
                  key={index}
                  className="blog-post"
                  onClick={() => openInNewTab(post.url)}
                >
                  <div className="blog-post-image">
                    <img src={post.urlToImage} alt={post.title} />
                  </div>
                  <div className="blog-post-content">
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-source">{post.source.name}</p>
                    <p className="blog-post-date">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="blog-post-description">{post.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Box>
    </>
  );
};

export default HealthBlogs;
