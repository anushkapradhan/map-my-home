import React, { useState, useEffect } from 'react';

const apiKey = import.meta.env.VITE_BLOG_API_KEY;

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  // fetching data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=real%20estate&apiKey=${apiKey}&searchIn=title`);
        const data = await response.json();
        setBlogs(data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Top articles on real-estate</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Latest news about properties, real-estate and more.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 border-t border-gray-200 pt-7 sm:mt-16 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {blogs.map((blog, index) => (
            <article key={index} className="flex max-w-xl flex-col items-start justify-between pb-10">
              <div className="flex justify-between items-center text-xs pb-1 space-x-4">
                <time dateTime={blog.publishedAt} className="text-gray-500">
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="relative z-10 rounded-full bg-gray-150 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
                  {blog.source.name}
                </p>
              </div>
              <div className='flex justify-between'>
              {blog.urlToImage ? (
                <img src={blog.urlToImage} alt="Article Image" />
                ) : (
                  <img src="./src/assets/images/img2.png" alt="Placeholder Image" />
                )}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={blog.url} target="_blank">
                    <span className="absolute inset-0" />
                    {blog.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.description}</p>
              </div>
              <div className="relative mt-4 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    By- {blog.author ? (blog.author.includes("http") ? blog.author.split("http")[0] : blog.author) : blog.source.name}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
