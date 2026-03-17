import api from "./axiosSetup";

// Create an interface to handle the data sent from Spring Boot. (Pageable)
export interface ArticleResponse {
  authorId: string | null;
  categoryId: number;
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
  size = 12,
  search = "",
  category = "",
) => {
  // Query Parameters
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(), // Use 9 because when displayed in a 3-column grid, it fits perfectly.
  });

  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const response = await api.get(`/articles?${params.toString()}`);
  return response.data; // The data will be a PageImpl block from Spring Boot.
};

// get Article by slug
export const fetchArticleBySlug = async (slug: string) => {
  const response = await api.get<ArticleResponse>(`/articles/${slug}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const fetchMyArticles = async () => {
  const response = await api.get("/articles/me");
  return response.data;
};
