export default async function handler(req, res) {
  const { category = 'any' } = req.query

  try {
    // Try JokeAPI first
    const jokeApiUrl = `https://v2.jokeapi.dev/joke/${category}?safe-mode`
    const response = await fetch(jokeApiUrl)
    const data = await response.json()

    let joke = ''
    if (data.type === 'single') {
      joke = data.joke
    } else if (data.type === 'twopart') {
      joke = `${data.setup}\n\n${data.delivery}`
    } else {
      throw new Error('Invalid joke format')
    }

    res.status(200).json({ joke })
  } catch (error) {
    // Fallback jokes if API fails
    const fallbackJokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "Why did the developer go broke? Because he used up all his cache!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "What's a programmer's favorite hangout place? Foo Bar!",
      "Why do Java developers wear glasses? Because they don't C#!"
    ]

    const randomJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)]
    res.status(200).json({ joke: randomJoke })
  }
}
