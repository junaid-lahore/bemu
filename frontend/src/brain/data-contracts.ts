/** BlogCreate */
export interface BlogCreate {
  /** Slug */
  slug: string;
  /** Title */
  title: string;
  /** Image Url */
  image_url?: string | null;
  /** Adventure */
  adventure?: string | null;
  /** Episode */
  episode?: string | null;
  /** Category */
  category: string;
  /** Tags */
  tags?: string[] | null;
  /** Video Url */
  video_url?: string | null;
  /** Content */
  content: string;
  /** Excerpt */
  excerpt: string;
}

/** BlogListResponse */
export interface BlogListResponse {
  /** Posts */
  posts: BlogPost[];
  /** Total */
  total: number;
}

/** BlogPost */
export interface BlogPost {
  /** Slug */
  slug: string;
  /** Title */
  title: string;
  /** Image Url */
  image_url?: string | null;
  /** Adventure */
  adventure?: string | null;
  /** Episode */
  episode?: string | null;
  /** Category */
  category: string;
  /** Tags */
  tags?: string[] | null;
  /** Video Url */
  video_url?: string | null;
  /** Content */
  content: string;
  /** Excerpt */
  excerpt: string;
  /** Id */
  id: number;
  /** Published At */
  published_at: string;
}

/** Body_submit_image */
export interface BodySubmitImage {
  /** Name */
  name: string;
  /** Email */
  email?: string | null;
  /** Title */
  title: string;
  /** Age */
  age?: string | null;
  /**
   * Image
   * @format binary
   */
  image: File;
}

/** ContactFormRequest */
export interface ContactFormRequest {
  /** Name */
  name: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Category */
  category: string;
  /** Message */
  message: string;
}

/** ContactFormResponse */
export interface ContactFormResponse {
  /** Message */
  message: string;
}

/** Episode */
export interface Episode {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Summary */
  summary: string;
  /** Thumbnail Url */
  thumbnail_url: string;
  /** Shorts */
  shorts: Short[];
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** MessageSubmission */
export interface MessageSubmission {
  /** Name */
  name: string;
  /** Email */
  email?: string | null;
  /** Message */
  message: string;
  /** Age */
  age?: string | null;
}

/** Short */
export interface Short {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Url */
  url: string;
}

/** SubmissionResponse */
export interface SubmissionResponse {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Submission Type */
  submission_type: string;
  /** Message Text */
  message_text: string | null;
  /** Image Url */
  image_url: string | null;
  /** Image Title */
  image_title: string | null;
  /** Age */
  age: string | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** SubscriptionRequest */
export interface SubscriptionRequest {
  /**
   * Email
   * @format email
   */
  email: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** YouTubeStats */
export interface YouTubeStats {
  /** Subscriber Count */
  subscriber_count: string;
  /** View Count */
  view_count: string;
  /** Video Count */
  video_count: string;
  /** Channel Name */
  channel_name: string;
}

export type CheckHealthData = HealthResponse;

export type HandleContactSubmissionData = ContactFormResponse;

export type HandleContactSubmissionError = HTTPValidationError;

export type HandleSubscriptionData = any;

export type HandleSubscriptionError = HTTPValidationError;

export type CreateBlogPostData = BlogPost;

export type CreateBlogPostError = HTTPValidationError;

export interface ListBlogPostsParams {
  /** Search Query */
  search_query?: string | null;
  /** Category */
  category?: string | null;
  /** Adventure */
  adventure?: string | null;
  /** Episode */
  episode?: string | null;
  /**
   * Page
   * @default 1
   */
  page?: number;
  /**
   * Limit
   * @default 9
   */
  limit?: number;
}

export type ListBlogPostsData = BlogListResponse;

export type ListBlogPostsError = HTTPValidationError;

export interface GetBlogPostParams {
  /** Slug */
  slug: string;
}

export type GetBlogPostData = BlogPost;

export type GetBlogPostError = HTTPValidationError;

/** Response List Episodes */
export type ListEpisodesData = Episode[];

export interface GetEpisodeParams {
  /** Episode Id */
  episodeId: number;
}

export type GetEpisodeData = Episode;

export type GetEpisodeError = HTTPValidationError;

/** Response Submit Message */
export type SubmitMessageData = Record<string, any>;

export type SubmitMessageError = HTTPValidationError;

/** Response Submit Image */
export type SubmitImageData = Record<string, any>;

export type SubmitImageError = HTTPValidationError;

export interface GetSubmissionsParams {
  /**
   * Limit
   * @default 10
   */
  limit?: number;
  /**
   * Status
   * @default "approved"
   */
  status?: string;
}

/** Response Get Submissions */
export type GetSubmissionsData = SubmissionResponse[];

export type GetSubmissionsError = HTTPValidationError;

export type GetYoutubeStatsData = YouTubeStats;
