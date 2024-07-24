"use client"
import SideNav from './components/SideNav'
import MainContainer from './components/MainContainer'
import { useEffect, useState } from "react"

export default function Home() {
  const [plantTypes, setPlantTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [plants, setPlants] = useState([])

  useEffect (() => {
    fetchCategories()
    fetchPlants()
    fetchPlantTypes()
  }, [])

  const fetchPlantTypes = () => {
    fetch('http://localhost:5555/api/plant-types')
      .then(result => result.json())
      .then(data => {
        setPlantTypes(data)
      })
  }

  const fetchCategories = () => {
    fetch('http://localhost:5555/api/categories')
      .then(result => result.json())
      .then(data => {
        setCategories(data)
      })
  }

  const fetchPlants = () => {
    fetch('http://localhost:5555/api/plants')
      .then(result => result.json())
      .then(data => {
        setPlants(data)
      })
  }  

  return (
    <>
      <SideNav />
      <MainContainer
        plantTypes={plantTypes}
        categories={categories}
        plants={plants}
        fetchPlants={fetchPlants}
      />
    </>
  );
}
