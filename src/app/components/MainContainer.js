import React, {useState} from 'react'
import { Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi"
import PlantCard from './PlantCard'
import FormAddPlant from './FormAddPlant'
import { Modal } from "flowbite-react";

const MainContainer = ({plants, categories, fetchPlants}) => {
  const [openModal, setOpenModal] = useState(false)
  const [newPlantData, setNewPlantData] = useState({
    name: '',
    category: '',
    type: '',
    imageUrl: ''
  })

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const response = await fetch('http://localhost:5555/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setRes(result)
      setNewPlantData({ ...newPlantData, imageUrl: result.url})
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlant = (e) => {
    e.preventDefault()
    fetch('http://localhost:5555/api/plants/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlantData)
    })
    .then( response => {
      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then( data => {
      setOpenModal(false)
      fetchPlants()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })
  }

  const handleDeletePlant = (id) => {
    fetch(`http://localhost:5555/api/plants/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( response => {
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then( data => {
      fetchPlants()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })
  }

  return (
    <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="mb-4">
            <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
              <Breadcrumb.Item href="#" icon={HiHome}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#">Cultivos</Breadcrumb.Item>
              <Breadcrumb.Item>Todos los cultivos</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Todos los cultivos</h1>
          </div>

          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700 mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <form className="sm:pr-3" action="#" method="GET">
                  <label htmlFor="products-search" className="sr-only">Search</label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                      <input type="text" name="email" id="products-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for products" />
                  </div>
              </form>
              <div className="flex items-center w-full sm:justify-end">
                <div className="flex pl-2 space-x-1">
                  <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                  </a>
                  <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  </a>
                  <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  </a>
                  <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            <button onClick={ () => setOpenModal(true) } id="createProductButton" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-create-product-default" data-drawer-show="drawer-create-product-default" aria-controls="drawer-create-product-default" data-drawer-placement="right">
                Agregar Cultivo
            </button>
          </div>

          <div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'>
            { plants.map(item => {
              return (
                <PlantCard 
                  key={item._id}
                  plantData={item}
                  handleDeletePlant={handleDeletePlant}
                  fetchPlants={fetchPlants}
                />
              )
            }) }
          </div>

          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Añadir Cultivo</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">

                <FormAddPlant
                  newPlantData={newPlantData}
                  setNewPlantData={setNewPlantData}
                  categories={categories}
                  handleAddPlant={handleAddPlant}
                  file={file}
                  loading={loading}
                  res={res}
                  handleSelectFile={handleSelectFile}
                  handleUpload={handleUpload}
                />

              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button onClick={() => setOpenModal(false)}>I accept</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer> */}
          </Modal>
        </div>
      </div>
  )
}

export default MainContainer