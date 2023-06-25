export const queryKeys = {
  dog: (id: number) => ["dog", id],
  dogs: (limit?: number) => ["dogs", "limit", limit],
  post: (id: number) => ["post", id],
  posts: (limit?: number) => ["posts", "limit", limit],
  fundraiser: (id: number) => ["fundraiser", id],
  fundraisers: (limit?: number) => ["fundraisers", "limit", limit],
  shelter: (id: number) => ["shelter", id],
  shelters: (limit?: number) => ["shelters", "limit", limit],
};