import os
import asyncpg
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/blogs")

# Pydantic models for blog posts
class BlogBase(BaseModel):
    slug: str
    title: str
    image_url: Optional[str] = None
    adventure: Optional[str] = None
    episode: Optional[str] = None
    category: str
    tags: Optional[List[str]] = None
    video_url: Optional[str] = None
    content: str
    excerpt: str

class BlogCreate(BlogBase):
    pass

class BlogPost(BlogBase):
    id: int
    published_at: str

class BlogListResponse(BaseModel):
    posts: List[BlogPost]
    total: int

# Database connection pool
async def get_db_connection():
    conn = await asyncpg.connect(os.environ.get("DATABASE_URL_DEV"))
    try:
        yield conn
    finally:
        await conn.close()

# API Endpoints

@router.post("/create", response_model=BlogPost, status_code=201)
async def create_blog_post(blog: BlogCreate, conn: asyncpg.Connection = Depends(get_db_connection)):
    """
    Creates a new blog post. This endpoint will be used to add new blogs.
    """
    try:
        query = """
            INSERT INTO blogs (slug, title, image_url, adventure, episode, category, tags, video_url, content, excerpt)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, slug, title, published_at, image_url, adventure, episode, category, tags, video_url, content, excerpt;
        """
        row = await conn.fetchrow(
            query,
            blog.slug, blog.title, blog.image_url, blog.adventure, blog.episode,
            blog.category, blog.tags, blog.video_url, blog.content, blog.excerpt
        )
        return BlogPost(
            id=row['id'],
            slug=row['slug'],
            title=row['title'],
            published_at=row['published_at'].isoformat(),
            image_url=row['image_url'],
            adventure=row['adventure'],
            episode=row['episode'],
            category=row['category'],
            tags=row['tags'],
            video_url=row['video_url'],
            content=row['content'],
            excerpt=row['excerpt']
        )
    except asyncpg.UniqueViolationError:
        raise HTTPException(status_code=400, detail="A blog with this slug already exists.")
    except Exception as e:
        print(f"Error creating blog post: {e}")
        raise HTTPException(status_code=500, detail="Failed to create blog post.")

@router.get("/list", response_model=BlogListResponse)
async def list_blog_posts(
    search_query: Optional[str] = None,
    category: Optional[str] = None,
    adventure: Optional[str] = None,
    episode: Optional[str] = None,
    page: int = 1,
    limit: int = 9,
    conn: asyncpg.Connection = Depends(get_db_connection)
):
    """
    Lists blog posts with optional search, filtering, and pagination.
    """
    offset = (page - 1) * limit
    
    # Base query
    base_query = "FROM blogs"
    conditions = []
    params = []
    
    # Search logic
    if search_query:
        conditions.append("(title ILIKE $1 OR content ILIKE $1 OR excerpt ILIKE $1)")
        params.append(f"%{search_query}%")
        
    # Filtering logic
    param_index = len(params) + 1
    if category:
        conditions.append(f"category = ${param_index}")
        params.append(category)
        param_index += 1
    if adventure:
        conditions.append(f"adventure = ${param_index}")
        params.append(adventure)
        param_index += 1
    if episode:
        conditions.append(f"episode = ${param_index}")
        params.append(episode)
        
    where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""
    
    # Count total query
    total_query = f"SELECT COUNT(*) {base_query} {where_clause}"
    total_result = await conn.fetchval(total_query, *params)

    # Main query with pagination
    main_query = f"""
        SELECT id, slug, title, published_at, image_url, adventure, episode, category, tags, video_url, content, excerpt
        {base_query} {where_clause}
        ORDER BY published_at DESC
        LIMIT ${len(params) + 1} OFFSET ${len(params) + 2}
    """
    
    posts_rows = await conn.fetch(main_query, *params, limit, offset)
    
    posts = [
        BlogPost(
            id=row['id'],
            slug=row['slug'],
            title=row['title'],
            published_at=row['published_at'].isoformat(),
            image_url=row['image_url'],
            adventure=row['adventure'],
            episode=row['episode'],
            category=row['category'],
            tags=row['tags'],
            video_url=row['video_url'],
            content=row['content'],
            excerpt=row['excerpt']
        )
        for row in posts_rows
    ]

    return BlogListResponse(posts=posts, total=total_result)

@router.get("/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str, conn: asyncpg.Connection = Depends(get_db_connection)):
    """
    Retrieves a single blog post by its slug.
    """
    query = "SELECT * FROM blogs WHERE slug = $1"
    row = await conn.fetchrow(query, slug)
    
    if not row:
        raise HTTPException(status_code=404, detail="Blog post not found.")
        
    return BlogPost(
        id=row['id'],
        slug=row['slug'],
        title=row['title'],
        published_at=row['published_at'].isoformat(),
        image_url=row['image_url'],
        adventure=row['adventure'],
        episode=row['episode'],
        category=row['category'],
        tags=row['tags'],
        video_url=row['video_url'],
        content=row['content'],
        excerpt=row['excerpt']
    )
