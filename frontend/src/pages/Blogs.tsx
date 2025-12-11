import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { NavigationBarNew } from "components/NavigationBarNew";
import { Footer } from "components/Footer";
import { BlogCard } from "components/BlogCard";
import { BlogLayout } from "components/BlogLayout";
import { Link } from "react-router-dom";
import brain from "brain";
import { BlogListResponse, BlogPost } from "types";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const Blogs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  
  // If slug exists, show single blog view
  if (slug) {
    return <SingleBlogView slug={slug} />;
  }

  // Otherwise show blog listing
  return <BlogListingView />;
};

export default Blogs;

// Single Blog View Component
const SingleBlogView: React.FC<{ slug: string }> = ({ slug }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const httpResponse = await brain.get_blog_post({ slug });
        const data = await httpResponse.json();
        setPost(data);
        
        // Update page title and meta tags
        if (data) {
          document.title = `${data.title} - Beamu Adventures`;
          updateMetaTag('name', 'description', data.excerpt || data.title);
          updateMetaTag('property', 'og:title', data.title);
          updateMetaTag('property', 'og:description', data.excerpt || data.title);
          if (data.image_url) {
            updateMetaTag('property', 'og:image', data.image_url);
          }
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFA64D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
        <div className="text-center">
          <p className="text-2xl text-gray-400 mb-4">Blog post not found</p>
          <Link to="/blogs" className="text-[#FFA64D] hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return <BlogLayout post={post} />;
};

// Helper function to update meta tags
const updateMetaTag = (attribute: string, attributeValue: string, content: string) => {
  let tag = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

// Blog Listing View Component
const BlogListingView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const httpResponse = await brain.list_blog_posts();
        const data = await httpResponse.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Update URL params when search/category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, setSearchParams]);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(posts.map(p => p.category)));

  // Get latest posts for slider (first 5)
  const latestPosts = posts.slice(0, 5);

  // Group posts by category
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category] = posts.filter(p => p.category === category).slice(0, 3);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  // Get recommended posts (excluding latest 5)
  const recommendedPosts = posts.slice(5, 11);

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % latestPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + latestPosts.length) % latestPosts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play slider
  useEffect(() => {
    if (latestPosts.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [latestPosts.length, currentSlide]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0C1021] text-white">
        <NavigationBarNew />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#FFA64D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0C1021] text-white">
      <NavigationBarNew />
      
      {/* Hero Header with Search */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0C1021] to-[#181C28] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA64D22_0%,transparent_70%)] animate-pulse" />
        <div className="content-wrapper relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-[#FFA64D] mb-4 text-glow">Beamu's Stories</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Dive into magical tales, behind-the-scenes insights, and the adventures that bring Beamu to life.
            </p>
          </div>
          {/* Search Bar + Filter */}
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFA64D] transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl text-white focus:outline-none focus:border-[#FFA64D] transition-colors appearance-none cursor-pointer min-w-[200px]"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory) && (
            <div className="max-w-3xl mx-auto mt-6 flex items-center gap-3 flex-wrap">
              <span className="text-gray-400 text-sm">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-[#FFA64D22] text-[#FFA64D] rounded-full text-sm flex items-center gap-2">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-white">×</button>
                </span>
              )}
              {selectedCategory && (
                <span className="px-3 py-1 bg-[#FFA64D22] text-[#FFA64D] rounded-full text-sm flex items-center gap-2">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("")} className="hover:text-white">×</button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* If filters applied, show filtered results */}
      {(searchQuery || selectedCategory) && (
        <section className="py-16 bg-[#181C28]">
          <div className="content-wrapper">
            <h2 className="text-3xl font-bold text-white mb-8">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Result' : 'Results'} Found
            </h2>
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No blogs found matching your filters</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  className="text-[#FFA64D] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest Blogs Slider - Hero Style (only show if no filters) */}
      {!searchQuery && !selectedCategory && latestPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-[#181C28] to-[#0C1021]">
          <div className="content-wrapper">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-2 bg-[#FFA64D33] text-[#FFA64D] rounded-full text-sm font-semibold">
                Latest Stories
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#FFA64D] to-transparent" />
            </div>
            
            {/* Slider Container */}
            <div className="relative group">
              {/* Slider Wrapper */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {latestPosts.map((post) => (
                    <div key={post.slug} className="w-full flex-shrink-0">
                      <Link to={`/blogs?slug=${post.slug}`} className="group/card block">
                        <div className="grid md:grid-cols-2 gap-8 bg-[#1A1F2B] border border-[#FFA64D22] rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,166,77,0.3)] transition-all">
                          <div className="relative h-64 md:h-auto overflow-hidden">
                            <img
                              src={post.image_url || "https://placehold.co/800x600/0C1021/FFA64D?text=Latest+Blog"}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-8 flex flex-col justify-center">
                            <span className="text-[#FFA64D] text-sm font-semibold mb-2">{post.category}</span>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover/card:text-[#FFA64D] transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-400 mb-6 line-clamp-3">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-gray-500 text-sm">
                              <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {latestPosts.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#1A1F2B]/80 hover:bg-[#FFA64D] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1A1F2B]/80 hover:bg-[#FFA64D] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {latestPosts.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  {latestPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? 'w-8 h-2 bg-[#FFA64D]'
                          : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Category-wise Sections (only show if no filters) */}
      {!searchQuery && !selectedCategory && categories.map(category => {
        const categoryPosts = postsByCategory[category];
        if (!categoryPosts || categoryPosts.length === 0) return null;

        return (
          <section key={category} className="py-16 bg-[#0C1021]">
            <div className="content-wrapper">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-[#FFA64D] text-glow">{category}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FFA64D] to-transparent" />
                </div>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="text-gray-400 hover:text-[#FFA64D] text-sm transition-colors"
                >
                  View All →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Recommended Blogs Section (only show if no filters) */}
      {!searchQuery && !selectedCategory && recommendedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-[#181C28] to-[#0C1021]">
          <div className="content-wrapper">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};
