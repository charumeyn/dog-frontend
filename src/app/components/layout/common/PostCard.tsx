import { Post } from "@/app/types/post.interface";

type PostCard = {
  post: Post;
}

const PostCard: React.FunctionComponent<PostCard> = ({ post }) => {
  return (
    <a href={`/posts/${post.id}`}>
      <div className="relative after:content-[''] after:block after:pb-[100%]">
        <img className="absolute w-full h-full object-cover rounded-lg"
          src={post.images.length > 0 ? post.images[0] : "https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg"}
          alt={post.title} />
      </div >
      <p className="font-bold text-xl mt-5 mb-2">{post.title}</p>
      <p className="text-gray-600 mb-2">{post.content}</p>
    </a>
  )
}


export default PostCard;