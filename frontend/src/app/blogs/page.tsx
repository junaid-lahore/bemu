import Link from "next/link";
import { NavigationBarNew } from "@/components/NavigationBarNew";
import { Footer } from "@/components/Footer";

type SearchParams = {
  slug?: string;
  search?: string;
  category?: string;
  page?: string;
};

type BlogPost = {
  slug: string;
  title: string;
  image_url?: string | null;
  adventure?: string | null;
  episode?: string | null;
  category: string;
  tags?: string[] | null;
  video_url?: string | null;
  content: string;
  excerpt: string;
  id: number;
  published_at: string;
};

type BlogListResponse = {
  posts: BlogPost[];
  total: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default async function Blogs({ searchParams }: { searchParams: SearchParams }) {
  const slug = searchParams.slug;

  if (slug) {
    let post: BlogPost | null = null;
    try {
      const res = await fetch(`${API_URL}/routes/blogs/${slug}`, { cache: "no-store" });
      if (res.ok) {
        post = await res.json();
      }
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
    }

    if (!post) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
          <div className="text-center">
            <p className="text-2xl text-gray-400 mb-4">Blog post not found</p>
            <Link href="/blogs" className="text-[#FFA64D] hover:underline">
              ← Back to Blogs
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen bg-[#0C1021] text-white">
        <NavigationBarNew />
        <main className="content-wrapper py-16">
          <div className="mb-8">
            <Link href="/blogs" className="text-[#FFA64D] hover:underline">
              ← Back to Blogs
            </Link>
          </div>
          <article className="prose prose-invert max-w-none">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full max-h-[480px] object-cover rounded-xl mb-6"
              />
            )}
            {post.video_url && (
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-8">
                <iframe
                  src={post.video_url}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
            {post.excerpt && <p className="text-gray-300 text-lg mb-6">{post.excerpt}</p>}
            <div className="text-gray-500 text-sm mb-6">
              {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              {post.category ? ` • ${post.category}` : ""}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  const url = new URL(`${API_URL}/routes/blogs/list`);
  if (searchParams.search) url.searchParams.set("search_query", searchParams.search);
  if (searchParams.category) url.searchParams.set("category", searchParams.category);
  if (searchParams.page) url.searchParams.set("page", searchParams.page);

  let data: BlogListResponse = { posts: [], total: 0 };
  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
  const posts = data.posts || [];
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
      <NavigationBarNew />
      <section className="py-16 bg-[#0C1021]">
        <div className="content-wrapper">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Beamu Blog</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Insights, stories, and updates from the Beamu world.
          </p>
        </div>
      </section>

      <section className="py-8 bg-[#0C1021]">
        <div className="content-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <form className="relative md:col-span-2" method="get" action="/blogs">
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search || ""}
                placeholder="Search blogs..."
                className="w-full pl-4 pr-4 py-3 bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFA64D] transition-colors"
              />
            </form>
            <form className="relative" method="get" action="/blogs">
              <select
                name="category"
                defaultValue={searchParams.category || ""}
                className="pl-4 pr-8 py-3 bg-[#1A1F2B] border border-[#FFA64D22] rounded-xl text-white focus:outline-none focus:border-[#FFA64D] transition-colors appearance-none cursor-pointer min-w-[200px]"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#181C28]">
        <div className="content-wrapper">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blogs?slug=${post.slug}`}
                  className="bg-[#1A1F2B] border border-[#FFA64D22] rounded-2xl shadow-lg hover:shadow-[#FFA64D33] transition-all cursor-pointer block overflow-hidden group"
                >
                  <img
                    src={post.image_url || "https://placehold.co/600x400/0C1021/FFA64D?text=Beamu"}
                    alt={post.title}
                    className="w-full h-[220px] object-cover"
                  />
                  <div className="p-5 text-left">
                    <h3 className="text-white text-lg font-semibold mb-1 truncate">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 h-10 overflow-hidden">{post.excerpt}</p>
                    <p className="text-gray-500 text-xs mt-3">
                      Published: {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No blogs found</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}


