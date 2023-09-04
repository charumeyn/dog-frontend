import { PaginationDto } from "../hooks/api/useDogs";
import { FundraiserStatus } from "../types/enum/fundraiserStatus.enum";

export const queryKeys = {
  dog: (id: number) => ["dog", id],
  dogs: (limit: number, offset?: number, gender?: string, size?: string, color?: string, coatLength?: string) => ["dogs", "limit", limit, "offset", offset, "gender", gender, "size", size, "color", color, "coatLength", coatLength],
  post: (id: number) => ["post", id],
  posts: (limit?: number) => ["posts", "limit", limit],
  fundraiser: (id: number) => ["fundraiser", id],
  fundraisers: (limit: number, offset?: Number, status?: FundraiserStatus) => ["fundraisers", "limit", limit, "offset", offset, "status", status],
  shelter: (id: number) => ["shelter", id],
  shelters: (limit?: number) => ["shelters", "limit", limit],
  donation: (id: number) => ["donation", id],
  donations: (limit?: number) => ["donations", "limit", limit],
  account: () => ["account"],
  accounts: () => ["accounts"],
  accountId: (id: number) => ["account", id],
  comment: (id: number) => ["comment", id],
};