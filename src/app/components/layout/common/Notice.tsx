import { ReactNode } from "react";
import { IconInformation } from "../Icons";


export default function Notice({ children, url, urlText }: { children: ReactNode, url?: string, urlText?: string }) {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <IconInformation className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-700">{children}</p>
          {url ?
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <a href={url} className="whitespace-nowrap font-medium text-yellow-700 hover:text-yellow-600">
                {urlText}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p> : null}
        </div>
      </div>
    </div>
  )
}