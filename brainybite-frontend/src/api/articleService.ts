import api from "./axiosSetup";

// Create an interface to handle the data sent from Spring Boot. (Pageable)
export interface ArticleResponse {
  id: number;
  topic: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  content: string;
}

export interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export const fetchArticles = async (
  page = 0,
  size = 10,
  search = "",
  p0: number | undefined,
) => {
  const response = await api.get<PageableResponse<ArticleResponse>>(
    "/articles",
    {
      params: { page, size, search },
    },
  );
  return response.data;
};

// get Article by slug
export const fetchArticleBySlug = async (slug: string) => {
  const response = await api.get<ArticleResponse>(`/articles/${slug}`);
  return response.data;
};
