"use client"
import SideNav from './components/SideNav'
import MainContainer from './components/MainContainer'
import { useEffect, useState } from "react"

export default function Home() {
  const [plants, setPlants] = useState([])
  const [categories, setCategories] = useState([])

  useEffect (() => {
    fetchPlants()

    fetch('http://localhost:5555/api/categories')
      .then(result => result.json())
      .then(data => {
        setCategories(data)
      })
  }, [])

  const fetchPlants = () => {
    console.log('fetchPlants')
    fetch('http://localhost:5555/api/plants')
      .then(result => result.json())
      .then(data => {
        setPlants(data)
      })
  }

  console.log(plants, categories)
  return (
    <>
      <SideNav />
      <MainContainer
        plants={plants}
        categories={categories}
        fetchPlants={fetchPlants}
      />
    </>
  );
}
