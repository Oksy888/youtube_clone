import { Bell, Menu, Mic, Upload, User, Search, ArrowLeft } from 'lucide-react'
import logo from '../assets/Logo.png'
import { Button } from '../components/Button'
import { useState } from 'react'
import { useSidebarContext } from '../contexts/sidebarContext'

export function PageHeader() {
  const [showFullWidthSearch, setshowFullWidthSearch] = useState(false)

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection showFullWidthSearch={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center flex-shrink-0 ${
          showFullWidthSearch ? 'flex' : 'hidden md:flex'
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setshowFullWidthSearch(false)}
            size="icon"
            variant="ghost"
          >
            <ArrowLeft />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner py-1 px-4 
            text-lg w-full focus:border-blue-500 focus:outline-none focus:ring-inset"
          />
          <Button className="py-2 rounded-r-full px-4 border-secondary-border border border-l-0">
            <Search />
          </Button>
        </div>
        <Button size="icon">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? 'hidden' : 'flex'
        }`}
      >
        <Button
          onClick={() => setshowFullWidthSearch(true)}
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  )
}
type PageHeaderFirstSectionProps = {
  showFullWidthSearch?: boolean
}
export function PageHeaderFirstSection({
  showFullWidthSearch = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext()
  return (
    <div
      className={`flex gap-4 items-center flex-shrink-0 ${
        showFullWidthSearch ? 'hidden' : 'flex'
      }`}
    >
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} alt="" width="50" />
      </a>
    </div>
  )
}
