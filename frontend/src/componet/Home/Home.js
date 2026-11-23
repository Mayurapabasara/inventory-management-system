import React from 'react'

export default function Home() {
  return (
    <div>
        <h1>Home</h1>
        <button onClick={() => (window.location.href='/addItem')}>Add Item</button>



    </div>
  )
}
