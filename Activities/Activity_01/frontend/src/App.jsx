import { use, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSubscription } from '@apollo/client'
import PostTableComponent from './components/DataTable'
import posts_subscription from './queries/PostQuery'

function App() {
  const { data, loading } = useSubscription(posts_subscription)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    try {
      if (data) {
        setPosts([...posts, data.newPost])
      }
    }
    catch (error) {
      console.error(error)
      if (error) throw new Error(error)
    }
  }, [data])

  if (loading) return <p>Loading...</p>

  return (
    <>
        
      <PostTableComponent data = {posts} />
    </>
  )
}

export default App
