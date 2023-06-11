export const queryKeys = {
  dogs: (limit?: number) => ["dogs", "limit", limit],
  dog: (id: number) => ["dog", id],
  posts: (limit?: number) => ["posts", "limit", limit],
  fundraiser: (id: number) => ["fundraiser", id],
  fundraisers: (limit?: number) => ["fundraisers", "limit", limit],
  shelter: (id: number) => ["shelter", id],
  shelters: (limit?: number) => ["shelters", "limit", limit],
};