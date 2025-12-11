import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BlogPost } from "types";
import brain from "brain";
import { NavigationBarNew } from "components/NavigationBarNew";
import { Footer } from "components/Footer";
import { Calendar, Tag, ArrowLeft, Mail } from "lucide-react";

interface Props {
  post: BlogPost;
}

export const BlogLayout = ({ post }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  // Fetch related posts (same category) and recent posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const httpResponse = await brain.list_blog_posts();
        const response = await httpResponse.json();
        const allPosts = response.posts || [];

        // Filter related posts (same category, exclude current)
        const related = allPosts
          .filter((p: BlogPost) => p.category === post.category && p.slug !== post.slug)
          .slice(0, 3);
        setRelatedPosts(related);

        // Get recent posts (exclude current)
        const recent = allPosts
          .filter((p: BlogPost) => p.slug !== post.slug)
          .slice(0, 4);
        setRecentPosts(recent);
      } catch (err) {
        console.error('Failed to fetch related posts:', err);
      }
    };

    fetchPosts();
  }, [post.slug, post.category]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await brain.handle_subscription({ email });
      setSubscribeStatus("✅ Subscribed! Check your email.");
      setEmail("");
      setTimeout(() => setSubscribeStatus(""), 3000);
    } catch (err) {
      setSubscribeStatus("❌ Failed. Try again.");
      setTimeout(() => setSubscribeStatus(""), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  const renderContent = (content: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-white mb-5 mt-7">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-white mb-4 mt-6">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-5 text-lg">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-5 ml-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-5 ml-4">{children}</ol>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt || ""} className="w-full rounded-xl my-6 shadow-2xl" />
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-[#FFA64D] underline hover:text-[#FFC94D] transition-colors" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#FFA64D] pl-6 italic text-gray-400 my-6 py-2">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-[#1A1F2B] text-[#FFA64D] px-2 py-1 rounded text-sm">{children}</code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white min-h-screen">
      <NavigationBarNew />
      
      {/* Hero Section */}
      <section className="relative w-full pt-24 bg-gradient-to-b from-[#0C1021] to-[#181C28]">
        <div className="content-wrapper py-8">
          <Link to="/blogs" className="text-[#FFA64D] text-sm mb-6 inline-flex items-center gap-2 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>

        {/* Hero Image */}
        {post.image_url && (
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden relative">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1021] via-transparent to-transparent" />
          </div>
        )}

        {/* Title and Meta - Overlapping hero image */}
        <div className="content-wrapper relative -mt-32 z-10">
          <div className="bg-[#1A1F2B]/95 backdrop-blur-lg border border-[#FFA64D22] rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-4 py-2 bg-[#FFA64D33] text-[#FFA64D] rounded-full text-sm font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area - Two Column Layout */}
      <main className="content-wrapper py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            <article className="prose prose-invert max-w-none">
              {post.video_url && (
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-8">
                  <iframe
                    className="w-full h-full"
                    src={post.video_url}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              <div className="blog-content">
                {renderContent(post.content)}
              </div>
            </article>

            {/* Related Posts at bottom of content */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#FFA64D22]">
                <h3 className="text-2xl font-bold text-[#FFA64D] mb-6">More from {post.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blogs?slug=${relatedPost.slug}`}
                      className="group block bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,166,77,0.3)] transition-all"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.image_url || "https://placehold.co/400x300/0C1021/FFA64D?text=Blog"}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-[#FFA64D] transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-500 text-sm">{formatDate(relatedPost.published_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Sidebar (1/3 width) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              
              {/* Subscribe CTA Box */}
              <div className="bg-gradient-to-br from-[#FFA64D22] to-[#FFC94D11] border border-[#FFA64D] rounded-xl p-6 shadow-[0_0_30px_rgba(255,166,77,0.2)]">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-[#FFA64D]" />
                  <h3 className="text-xl font-bold text-white">Stay Updated</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest Beamu stories and adventures delivered to your inbox!
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-[#1A1F2B] border border-[#FFA64D22] rounded-lg text-white text-sm focus:outline-none focus:border-[#FFA64D] transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#FFA64D] text-white rounded-lg font-semibold text-sm hover:bg-[#FFC94D] transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
                {subscribeStatus && (
                  <p className="text-sm mt-2 text-center">{subscribeStatus}</p>
                )}
              </div>

              {/* Recent Posts */}
              {recentPosts.length > 0 && (
                <div className="bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#FFA64D] mb-4">Recent Stories</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.slug}
                        to={`/blogs?slug=${recentPost.slug}`}
                        className="group flex gap-3 hover:bg-[#FFA64D11] p-2 rounded-lg transition-colors"
                      >
                        <img
                          src={recentPost.image_url || "https://placehold.co/100x100/0C1021/FFA64D?text=Blog"}
                          alt={recentPost.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-[#FFA64D] transition-colors">
                            {recentPost.title}
                          </h4>
                          <p className="text-gray-500 text-xs mt-1">{formatDate(recentPost.published_at)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#FFA64D] mb-4">Explore Categories</h3>
                <div className="space-y-2">
                  {["AI Storytelling", "Educational Values", "Behind the Light", "Episode Breakdowns"].map((cat) => (
                    <Link
                      key={cat}
                      to={`/blogs?category=${encodeURIComponent(cat)}`}
                      className="block px-4 py-2 bg-[#0C1021] border border-[#FFA64D22] rounded-lg text-gray-300 text-sm hover:bg-[#FFA64D22] hover:text-[#FFA64D] hover:border-[#FFA64D] transition-all"
                    >
                      → {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};
