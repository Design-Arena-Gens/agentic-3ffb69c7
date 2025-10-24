import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [joke, setJoke] = useState('')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('any')

  const fetchJoke = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/joke?category=${category}`)
      const data = await response.json()
      setJoke(data.joke)
    } catch (error) {
      setJoke('Failed to fetch joke. Please try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Joke Agent</title>
        <meta name="description" content="AI-powered joke fetching agent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className="card">
          <h1 className="title">🤖 Joke Agent</h1>
          <p className="subtitle">Your AI-powered joke fetching companion</p>

          <div className="controls">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
            >
              <option value="any">Any Category</option>
              <option value="programming">Programming</option>
              <option value="misc">Miscellaneous</option>
              <option value="dark">Dark Humor</option>
              <option value="pun">Puns</option>
              <option value="spooky">Spooky</option>
              <option value="christmas">Christmas</option>
            </select>

            <button
              onClick={fetchJoke}
              disabled={loading}
              className="button"
            >
              {loading ? 'Fetching...' : 'Get Joke'}
            </button>
          </div>

          {joke && (
            <div className="joke-container">
              <p className="joke">{joke}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
