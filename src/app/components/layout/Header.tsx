type Header = {}

const Header: React.FunctionComponent<Header> = ({ }) => {

  const menu = [
    {
      name: 'Dogs',
      url: '/dogs'
    },
    {
      name: 'Fundraisers',
      url: '/fundraisers'
    }]

  const isLoggedIn = false;

  return (
    <div className="shadow-xl">
      <div className="flex justify-between w-full max-w-screen-2xl mx-auto px-4">
        <div>Logo</div>
        <div className="flex">
          {menu.map((item: any, i: number) =>
            <a className="px-8 py-5" href={item.url}>{item.name}</a>
          )}
          {isLoggedIn ? <a href="">My Account</a> : <a className="border-l border-gray-200 py-5 px-8" href="/login">Login</a>}

        </div>
      </div>
    </div>
  )
}

export default Header;