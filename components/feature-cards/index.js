import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'

import { Card } from 'components/card'
import { useScroll } from 'hooks/use-scroll'
import { clamp, mapRange } from 'lib/maths'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { useWindowSize } from 'react-use'


import s from './feature-cards.module.scss'

const cards = [
  // { text: '99.8% Accuracy' },

  {
    text: (
      <>
      Dynamic Tagging System - No more digging through endless chats. Teletubby instantly sorts your messages into categories like Work, Events, and Reminders, so you can focus on what matters.    </>
    ),
  },
  { text: 'Instant Chat Summaries- Hundreds of unread messages? No problem. Teletubby delivers quick, digestible summaries, cutting hours of scrolling into minutes.' },
  { text: 'Context Aware Understanding- Forgot where the deadline was mentioned? Just ask, and Teletubby will pinpoint the exact message—no more endless searching.' },
  {
    text: <>Stay Ahead of Deadlines- Critical dates and tasks are automatically highlighted, keeping you on track without lifting a finger.</>,
  },
  { text: 'Real-Time Updates- Teletubby works in the background, giving you live updates on what’s important—so you’re always in the loop.' },
  { text: 'Boost Team Efficiency- Ideal for study groups, startups, and remote teams. Keep projects organized and reduce miscommunication.' },
  { text: 'Advanced NLP Algorithms- Powered by cutting-edge AI models designed for efficiency and precision.' },
  {
    text: 'Zero Setup, Maximum Impact- Add Teletubby to your chats, and it works its magic instantly—no setup required.',
  },
]

export const FeatureCards = () => {
  const element = useRef()
  const [setRef, rect] = useRect()
  const { height: windowHeight } = useWindowSize()

  const [current, setCurrent] = useState()

  useScroll(
    ({ scroll }) => {
      const start = rect.top - windowHeight * 2
      const end = rect.top + rect.height - windowHeight

      const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)

      element.current.style.setProperty(
        '--progress',
        clamp(0, mapRange(rect.top, end, scroll, 0, 1), 1)
      )
      const step = Math.floor(progress * 10)
      setCurrent(step)
    },
    [rect]
  )

  return (
    <div
      ref={(node) => {
        setRef(node)
      }}
      className={s.features}
    >
      <div className={cn('layout-block-inner', s.sticky)}>
        <aside className={s.title}>
          <p className="h3">

              We bring
              <br />
              <span className="grey">the heat</span>

          </p>
        </aside>
        <div ref={element}>
          {cards.map((card, index) => (
            <SingleCard
              key={index}
              index={index}
              text={card.text}
              number={index + 1}
              current={index <= current - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const SingleCard = ({ text, number, index, current }) => {
  return (
    <div className={cn(s.card, current && s.current)} style={{ '--i': index }}>
      <Card background="rgba(239, 239, 239, 0.8)" number={number} text={text} />
    </div>
  )
}
