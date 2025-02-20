import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'
import { useEffect, useRef, useState } from 'react'

type CategoryPillProps = {
  categories: string[]
  selectedCategory: string
  onSelect: (category: string) => void
}
export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const TRANSTATE_AMOUNT = 200
  const [isLeftVisible, setIsLeftVisible] = useState(true)
  const [isRightVisible, setIsRighVisible] = useState(true)
  const [translate, setTranslate] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target
      if (container == null) return
      setIsLeftVisible(translate > 0)
      setIsRighVisible(
        translate + container.clientWidth < container.scrollWidth
      )
    })

    observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            onClick={() => onSelect(category)}
            key={category}
            variant={selectedCategory === category ? 'dark' : 'default'}
            className="py-1 px-3 rounded-lg"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white
         from-50% to-transparent w-24 h-full"
        >
          <Button
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSTATE_AMOUNT
                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}
            variant="ghost"
            size="icon"
            className="w-auto aspect-square h-full p-0"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div
          className="flex justify-end absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l
         from-white from-50% to-transparent w-24 h-full"
        >
          <Button
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef == null) {
                  return translate
                }
                const newTranslate = translate + TRANSTATE_AMOUNT
                const edge = containerRef.current?.scrollWidth
                const width = containerRef.current?.clientWidth
                if (edge && width && newTranslate + width >= edge) {
                  return edge - width
                }
                return newTranslate
              })
            }}
            variant="ghost"
            size="icon"
            className="p-1,5 w-auto aspect-square h-full"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
