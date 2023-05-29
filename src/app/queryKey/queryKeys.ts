export const queryKeys = {
  dogs: (limit?: number) => ["dogs", limit],
  dog: (id: number) => ["dog", id],
  posts: () => ["posts"],
  fundraisers: () => ["fundraisers"],
};