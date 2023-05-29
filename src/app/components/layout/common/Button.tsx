interface ButtonType {
}

type Button = {
  url: string
  type: "primary" | "primary-border"
}

const Footer: React.FunctionComponent<Button> = ({ url, type }) => {
  return (
    <a href={url} className="">
      <div className="flex justify-between w-full max-w-screen-2xl mx-auto px-4">
        insert footer
      </div>
    </a>
  )
}

export default Footer;