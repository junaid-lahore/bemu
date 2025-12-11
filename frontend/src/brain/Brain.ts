import {
  BlogCreate,
  BodySubmitImage,
  CheckHealthData,
  ContactFormRequest,
  CreateBlogPostData,
  CreateBlogPostError,
  GetBlogPostData,
  GetBlogPostError,
  GetBlogPostParams,
  GetEpisodeData,
  GetEpisodeError,
  GetEpisodeParams,
  GetSubmissionsData,
  GetSubmissionsError,
  GetSubmissionsParams,
  GetYoutubeStatsData,
  HandleContactSubmissionData,
  HandleContactSubmissionError,
  HandleSubscriptionData,
  HandleSubscriptionError,
  ListBlogPostsData,
  ListBlogPostsError,
  ListBlogPostsParams,
  ListEpisodesData,
  MessageSubmission,
  SubmitImageData,
  SubmitImageError,
  SubmitMessageData,
  SubmitMessageError,
  SubscriptionRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Handles submissions from the contact form. - Sends an auto-reply to the user. - Forwards the message to the Beamu team.
   *
   * @tags dbtn/module:contact, dbtn/hasAuth
   * @name handle_contact_submission
   * @summary Handle Contact Submission
   * @request POST:/routes/submit
   */
  handle_contact_submission = (data: ContactFormRequest, params: RequestParams = {}) =>
    this.request<HandleContactSubmissionData, HandleContactSubmissionError>({
      path: `/routes/submit`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Handles a new newsletter subscription. Sends a notification email to the Beamu team's specified accounts.
   *
   * @tags dbtn/module:subscribe, dbtn/hasAuth
   * @name handle_subscription
   * @summary Handle Subscription
   * @request POST:/routes/join
   */
  handle_subscription = (data: SubscriptionRequest, params: RequestParams = {}) =>
    this.request<HandleSubscriptionData, HandleSubscriptionError>({
      path: `/routes/join`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Creates a new blog post. This endpoint will be used to add new blogs.
   *
   * @tags dbtn/module:blogs
   * @name create_blog_post
   * @summary Create Blog Post
   * @request POST:/routes/blogs/create
   */
  create_blog_post = (data: BlogCreate, params: RequestParams = {}) =>
    this.request<CreateBlogPostData, CreateBlogPostError>({
      path: `/routes/blogs/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Lists blog posts with optional search, filtering, and pagination.
   *
   * @tags dbtn/module:blogs
   * @name list_blog_posts
   * @summary List Blog Posts
   * @request GET:/routes/blogs/list
   */
  list_blog_posts = (query: ListBlogPostsParams, params: RequestParams = {}) =>
    this.request<ListBlogPostsData, ListBlogPostsError>({
      path: `/routes/blogs/list`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Retrieves a single blog post by its slug.
   *
   * @tags dbtn/module:blogs
   * @name get_blog_post
   * @summary Get Blog Post
   * @request GET:/routes/blogs/{slug}
   */
  get_blog_post = ({ slug, ...query }: GetBlogPostParams, params: RequestParams = {}) =>
    this.request<GetBlogPostData, GetBlogPostError>({
      path: `/routes/blogs/${slug}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:episodes
   * @name list_episodes
   * @summary List Episodes
   * @request GET:/routes/episodes
   */
  list_episodes = (params: RequestParams = {}) =>
    this.request<ListEpisodesData, any>({
      path: `/routes/episodes`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags dbtn/module:episodes
   * @name get_episode
   * @summary Get Episode
   * @request GET:/routes/episodes/{episode_id}
   */
  get_episode = ({ episodeId, ...query }: GetEpisodeParams, params: RequestParams = {}) =>
    this.request<GetEpisodeData, GetEpisodeError>({
      path: `/routes/episodes/${episodeId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Submit a text message to community showcase
   *
   * @tags dbtn/module:community
   * @name submit_message
   * @summary Submit Message
   * @request POST:/routes/community/submit-message
   */
  submit_message = (data: MessageSubmission, params: RequestParams = {}) =>
    this.request<SubmitMessageData, SubmitMessageError>({
      path: `/routes/community/submit-message`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Submit an image to community showcase
   *
   * @tags dbtn/module:community
   * @name submit_image
   * @summary Submit Image
   * @request POST:/routes/community/submit-image
   */
  submit_image = (data: BodySubmitImage, params: RequestParams = {}) =>
    this.request<SubmitImageData, SubmitImageError>({
      path: `/routes/community/submit-image`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * @description Get approved community submissions (50% messages, 50% images)
   *
   * @tags dbtn/module:community
   * @name get_submissions
   * @summary Get Submissions
   * @request GET:/routes/community/submissions
   */
  get_submissions = (query: GetSubmissionsParams, params: RequestParams = {}) =>
    this.request<GetSubmissionsData, GetSubmissionsError>({
      path: `/routes/community/submissions`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Fetch real-time YouTube channel statistics
   *
   * @tags dbtn/module:youtube
   * @name get_youtube_stats
   * @summary Get Youtube Stats
   * @request GET:/routes/youtube/stats
   */
  get_youtube_stats = (params: RequestParams = {}) =>
    this.request<GetYoutubeStatsData, any>({
      path: `/routes/youtube/stats`,
      method: "GET",
      ...params,
    });
}
