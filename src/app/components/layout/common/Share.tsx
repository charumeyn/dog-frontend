import { useMemo } from "react";
import { IconFacebook, IconShare, IconReddit, IconTwitter, IconEmail } from "../Icons";
import Heading from "./Heading";
import Modal from "./Modal";

type ShareProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: "dog" | "shelter" | "fundraiser";
  id: number;
  name: string;
}

const Share: React.FunctionComponent<ShareProps> = ({ isOpen, setIsOpen, type, id, name }) => {

  const host = process.env.HOST

  const url = useMemo(() => {
    switch (type) {
      case "dog":
        return "https://doggos.life/dogs/" + id
      case "shelter":
        return "https://doggos.life/shelters/" + id
      case "fundraiser":
        return "https://doggos.life/fundraisers/" + id
    }

  }, [type, id])

  const title = useMemo(() => {
    switch (type) {
      case "dog":
        return "Sponsor " + name + " to help this dog live a better life in the shelter <3"
      case "shelter":
        return "Check out " + name + " to know about how they help dogs live a better life in their shelter"
      case "fundraiser":
        return name
    }
  }, [type, name])

  return (
    <>
      <div
        className="flex gap-x-1 items-center text-sm text-zinc-500 cursor-pointer hover:text-zinc-700"
        onClick={() => setIsOpen(true)}>
        <IconShare className="w-3 h-3" /> Share
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Heading type={"h1"} text={"Sharing is caring"} className="mb-4" />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed luctus nunc, non bibendum ex.</p>
        <div className="flex items-center mt-4 mb-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
            <IconFacebook className="w-20 h-20" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank">
            <IconTwitter className="w-14 h-14 mx-1" />
          </a>
          <a href={`https://www.reddit.com/submit?url=${url}&title=${title}`} target="_blank">
            <IconReddit className="w-20 h-20" />
          </a>
          <a href={`mailto:?subject=${title}&body=${title}&url=${url}`}>
            <IconEmail className="w-16 h-16" />
          </a>
        </div>

        <label htmlFor="url" className="font-medium mb-2 block">Copy the link and share wherever you like!</label>
        <div className="flex gap-2 mb-3">
          <input name="url" type="text" value={url} onFocus={(e) => e.target.select()}
            className="border border-zinc-300 rounded-md text-sm text-zinc-900 w-80" />
          <div onClick={() => navigator.clipboard.writeText(url)}
            className="h-10 bg-zinc-900 text-white rounded-md px-5 pt-2.5 cursor-pointer hover:opacity-90">Copy</div>
        </div>
      </Modal>
    </>
  )
}

export default Share;