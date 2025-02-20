import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  History,
  Home,
  Library,
  ListVideo,
  PlaySquare,
  Radio,
  Repeat,
  ShoppingBag,
} from 'lucide-react'
import { Children, ElementType, ReactNode, useState } from 'react'
import { Button, buttonStyles } from './Button'
import { twMerge } from 'tailwind-merge'
import { playlists, subscriptions } from '../data/sidebar'
import { useSidebarContext } from '../contexts/sidebarContext'
import { PageHeaderFirstSection } from '../layouts/PageHeader'

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? 'lg:hidden' : 'lg:flex'
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky top-0 left-0 absolute overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? 'lg:flex' : 'lg: hidden'
        } ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem isActive IconOrImg={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImg={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImg={Library}
            title="Library"
            url="/Llbrary"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={History}
            title="History"
            url="/history"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={PlaySquare}
            title="Your videos"
            url="/your_videos"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={Clock}
            title="Watch later"
            url="https://www.youtube.com/playlist?list=PLkUWUJdz8w_B3D9OgSfk20qZvPN0vJvmo"
          ></LargeSidebarItem>
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImg={ListVideo}
              title={playlist.name}
              url={`https://www.youtube.com/playlist?list=${playlist.id}`}
            ></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={5}>
          {subscriptions.map((sub) => (
            <LargeSidebarItem
              key={sub.id}
              IconOrImg={sub.imgUrl}
              title={sub.channelName}
              url={`/@${sub.id}`}
            ></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore" visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImg={Flame}
            title="Trending"
            url="/trending"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={ShoppingBag}
            title="Shopping"
            url="/shopping"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={Film}
            title="Movies&TV"
            url="/movies-tv"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={Radio}
            title="Live"
            url="/live"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={Flame}
            title="Trending"
            url="/trending"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={Flame}
            title="Trending"
            url="/trending"
          ></LargeSidebarItem>
          <LargeSidebarItem
            IconOrImg={Flame}
            title="Trending"
            url="/trending"
          ></LargeSidebarItem>
        </LargeSidebarSection>
      </aside>
    </>
  )
}
type SmallSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
}
function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        ' py-4 px-1 flex flex-col items-center rounded-lg gap-1 '
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  )
}

type LargeSidebarSectionProps = {
  children: ReactNode
  title?: string
  visibleItemCount?: number
}
function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpended, setIsExpended] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const visibleChildren = isExpended
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount)
  const showExpandButton = childrenArray.length > visibleItemCount
  const ButtonIcon = isExpended ? ChevronUp : ChevronDown

  return (
    <div>
      {title && (
        <div className="flex items-start ml-4 mt-2 text-lg mb-1"> {title}</div>
      )}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpended((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpended ? 'Show less' : 'Show more'}</div>
        </Button>
      )}
    </div>
  )
}
type LargeSidebarItemProps = {
  IconOrImg: ElementType | string
  title: string
  url: string
  isActive?: boolean
}

function LargeSidebarItem({
  isActive = false,
  IconOrImg,
  title,
  url,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined
        } `
      )}
    >
      {typeof IconOrImg === 'string' ? (
        <img src={IconOrImg} className="w-6 h-6 rounded-full"></img>
      ) : (
        <IconOrImg className="w-6 h-6" />
      )}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}
