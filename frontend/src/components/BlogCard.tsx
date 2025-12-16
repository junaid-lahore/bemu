import Link from "next/link";
import { BlogPost } from "@/brain/data-contracts";

interface Props {
  post: BlogPost;
}

export const BlogCard = ({ post }: Props) => {
  // Safely format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Recently";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch {
      return "Recently";
    }
  };

  const publishedDate = formatDate(post.published_at);

  return (
    <Link 
      href={`/blogs?slug=${post.slug}`}
      className="blog-card bg-[#1A1F2B] border border-[#FFA64D22] rounded-2xl shadow-lg hover:shadow-[#FFA64D33] transition-all cursor-pointer block overflow-hidden group"
    >
      <img 
        src={post.image_url || "https://placehold.co/600x400/0C1021/FFA64D?text=Beamu"} 
        alt={post.title} 
        className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5 text-left">
        <h3 className="text-white text-lg font-semibold mb-1 truncate group-hover:text-[#FFA64D] transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 h-10 overflow-hidden">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-[#FFA64D] h-5 overflow-hidden">
          {Array.isArray(post.tags) && post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
        </div>
        <p className="text-gray-500 text-xs mt-3">
          Published: {publishedDate}
        </p>
      </div>
    </Link>
  );
};
