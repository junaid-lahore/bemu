import {
  BlogCreate,
  BodySubmitImage,
  CheckHealthData,
  ContactFormRequest,
  CreateBlogPostData,
  GetBlogPostData,
  GetEpisodeData,
  GetSubmissionsData,
  GetYoutubeStatsData,
  HandleContactSubmissionData,
  HandleSubscriptionData,
  ListBlogPostsData,
  ListEpisodesData,
  MessageSubmission,
  SubmitImageData,
  SubmitMessageData,
  SubscriptionRequest,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Handles submissions from the contact form. - Sends an auto-reply to the user. - Forwards the message to the Beamu team.
   * @tags dbtn/module:contact, dbtn/hasAuth
   * @name handle_contact_submission
   * @summary Handle Contact Submission
   * @request POST:/routes/submit
   */
  export namespace handle_contact_submission {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ContactFormRequest;
    export type RequestHeaders = {};
    export type ResponseBody = HandleContactSubmissionData;
  }

  /**
   * @description Handles a new newsletter subscription. Sends a notification email to the Beamu team's specified accounts.
   * @tags dbtn/module:subscribe, dbtn/hasAuth
   * @name handle_subscription
   * @summary Handle Subscription
   * @request POST:/routes/join
   */
  export namespace handle_subscription {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubscriptionRequest;
    export type RequestHeaders = {};
    export type ResponseBody = HandleSubscriptionData;
  }

  /**
   * @description Creates a new blog post. This endpoint will be used to add new blogs.
   * @tags dbtn/module:blogs
   * @name create_blog_post
   * @summary Create Blog Post
   * @request POST:/routes/blogs/create
   */
  export namespace create_blog_post {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BlogCreate;
    export type RequestHeaders = {};
    export type ResponseBody = CreateBlogPostData;
  }

  /**
   * @description Lists blog posts with optional search, filtering, and pagination.
   * @tags dbtn/module:blogs
   * @name list_blog_posts
   * @summary List Blog Posts
   * @request GET:/routes/blogs/list
   */
  export namespace list_blog_posts {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListBlogPostsData;
  }

  /**
   * @description Retrieves a single blog post by its slug.
   * @tags dbtn/module:blogs
   * @name get_blog_post
   * @summary Get Blog Post
   * @request GET:/routes/blogs/{slug}
   */
  export namespace get_blog_post {
    export type RequestParams = {
      /** Slug */
      slug: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBlogPostData;
  }

  /**
   * No description
   * @tags dbtn/module:episodes
   * @name list_episodes
   * @summary List Episodes
   * @request GET:/routes/episodes
   */
  export namespace list_episodes {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListEpisodesData;
  }

  /**
   * No description
   * @tags dbtn/module:episodes
   * @name get_episode
   * @summary Get Episode
   * @request GET:/routes/episodes/{episode_id}
   */
  export namespace get_episode {
    export type RequestParams = {
      /** Episode Id */
      episodeId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetEpisodeData;
  }

  /**
   * @description Submit a text message to community showcase
   * @tags dbtn/module:community
   * @name submit_message
   * @summary Submit Message
   * @request POST:/routes/community/submit-message
   */
  export namespace submit_message {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MessageSubmission;
    export type RequestHeaders = {};
    export type ResponseBody = SubmitMessageData;
  }

  /**
   * @description Submit an image to community showcase
   * @tags dbtn/module:community
   * @name submit_image
   * @summary Submit Image
   * @request POST:/routes/community/submit-image
   */
  export namespace submit_image {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodySubmitImage;
    export type RequestHeaders = {};
    export type ResponseBody = SubmitImageData;
  }

  /**
   * @description Get approved community submissions (50% messages, 50% images)
   * @tags dbtn/module:community
   * @name get_submissions
   * @summary Get Submissions
   * @request GET:/routes/community/submissions
   */
  export namespace get_submissions {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSubmissionsData;
  }

  /**
   * @description Fetch real-time YouTube channel statistics
   * @tags dbtn/module:youtube
   * @name get_youtube_stats
   * @summary Get Youtube Stats
   * @request GET:/routes/youtube/stats
   */
  export namespace get_youtube_stats {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetYoutubeStatsData;
  }
}
