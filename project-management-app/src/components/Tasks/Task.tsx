import React from 'react'

type Props = {
    title: string;
}

export default function Task(props: Props) {
  return (
    <h4>{props.title}</h4>
  )
}
