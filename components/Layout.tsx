import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = (props: Props) => (
  <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 ">
    {props.children}
  </div>
)

export default Layout
