"use client"
import { useEffect, useState } from "react"
import { HiHome } from "react-icons/hi"
import SideNav from './../components/SideNav'
import MainContainer from './../components/MainContainer'
import { Breadcrumb } from "flowbite-react"
import { Modal } from "flowbite-react"
import { Button, Label, TextInput, Select, Radio } from "flowbite-react"

interface PlantTypes {
  _id : string
  name: string
  desription: string
}

interface Subcategory {
  _id: string
  name: string
  description: string
  subcategories: Subcategory[]
  parentId: string
  __v: number
}

interface Category {
  _id: string
  type: string
  name: string
  description: string
  subcategories: Subcategory[]
}

const PlantsPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [plantTypes, setPlantTypes] = useState<PlantTypes[]>([])
  const [openModalCategory, setOpenModalCategory] = useState(false)
  const [openModalSubCategory, setOpenModalSubCategory] = useState(false)
  const [newCategoryData, setNewCategoryData] = useState({
    typeId: '',
    name: '',
    description: '',
  })
  const [newSubCategoryData, setNewSubCategoryData] = useState({
    parentId: '',
    name: '',
    description: '',
  })

  const fetchPlantTypes = () => {
    fetch('http://localhost:5555/api/plant-types')
      .then(response => response.json())
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

  useEffect(() => {
    fetchCategories()
    fetchPlantTypes()
  },[])

  const handleAddCategory = (e:any) => {
    e.preventDefault()
    fetch('http://localhost:5555/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategoryData)
    })
  }

  const handleAddSubCategory = (e:any) => {
    e.preventDefault()
    fetch(`http://localhost:5555/api/categories/${newSubCategoryData.parentId}/subcategories`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSubCategoryData)
    })
    .then(response => {
      if(!response.ok){
        throw new Error(`HTTP Error. status: ${response.status}` )
      }
      return response.json()
    })
    .then( data => {
      console.log('Subcategory added succesfully', data)
    })
    .catch( err => {
      console.log('Error adding subcategory', err)
    })
  }

  console.log(categories)
  return (
    <>
      <SideNav />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="mb-4">
            <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
              <Breadcrumb.Item href="#" icon={HiHome}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#">Categorías</Breadcrumb.Item>
              <Breadcrumb.Item>Todos las categorías</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Todas las categorías</h1>
          </div>

          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700 mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <form className="sm:pr-3" action="#" method="GET">
                  <label htmlFor="products-search" className="sr-only">Buscar</label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                      <input type="text" name="email" id="products-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar categorías" />
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
            <div>
              <button onClick={ () => setOpenModalCategory(true) } id="createProductButton" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-create-product-default" data-drawer-show="drawer-create-product-default" aria-controls="drawer-create-product-default" data-drawer-placement="right">
                  Agregar Categoría
              </button>
              <button onClick={ () => setOpenModalSubCategory(true) } id="createProductButton" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-create-product-default" data-drawer-show="drawer-create-product-default" aria-controls="drawer-create-product-default" data-drawer-placement="right">
                  Agregar SubCategoría
              </button>
            </div>
          </div>

          <ul>
          {
            categories && categories.map(cat => {
              return (
                <li key={cat._id}>
                  {cat.name}
                  {
                    cat.subcategories && cat.subcategories.map(subcat => {
                      return (
                        <>- {subcat.name}</>
                      )
                    })
                  }

                </li>
              )})
          }
          </ul>


          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                  Categoría
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                  -
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

            {
              categories && categories.map(item => {
                return(
                  <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={item._id}>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-194556" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-194556" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-xs font-normal text-gray-500 dark:text-gray-400">{item.description.slice(0, 50)} ...</div>
                    </td>
                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">...</td>
                    <td className="p-4 space-x-2 whitespace-nowrap">
                      <button type="button" id="updateProductButton" data-drawer-target="drawer-update-product-default" data-drawer-show="drawer-update-product-default" aria-controls="drawer-update-product-default" data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                          Actualizar
                      </button>
                      <button type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                          Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>

          <Modal show={openModalCategory} onClose={() => setOpenModalCategory(false)}>
            <Modal.Header>Añadir Categoría</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <form onSubmit={handleAddCategory}>

                  <div className="mb-8">
                    <fieldset>
                      <legend className="mb-4">Elegir tipo de planta</legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        { plantTypes && plantTypes.map((item, index) => {
                          return (
                            <div className="flex items-center gap-2" key={item._id}>
                              <Radio
                                id={item._id}
                                name="plantTypes"
                                value={item.name}
                                defaultChecked={index === 0}
                                onChange={(e) => setNewCategoryData({ ...newCategoryData, typeId: item._id })}
                              />
                              <Label htmlFor={item._id}>{item.name}</Label>
                            </div>
                          )
                        })}
                      </div>
                    </fieldset>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Nombre de la Categoría" />
                    </div>
                    <TextInput onChange={ (e) => setNewCategoryData( {...newCategoryData, name: e.target.value })} id="name" type="text" placeholder="Ej: Tomate" required shadow />
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="description" value="Descripción de la categoría" />
                    </div>
                    <TextInput onChange={ (e) => setNewCategoryData( {...newCategoryData, description: e.target.value })} id="description" type="text" placeholder="" shadow />
                  </div>
                  <Button type="submit">Agregar Categoría</Button>
                </form>
              </div>
            </Modal.Body>

          </Modal>

          <Modal show={openModalSubCategory} onClose={() => setOpenModalSubCategory(false)}>
            <Modal.Header>Añadir SubCategoría</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
              <form onSubmit={handleAddSubCategory}>

              <div className="">
                  <div className="mb-2 block">
                    <Label htmlFor="plantType" value="Seleccionar tipo" />
                  </div>
                  <Select onChange={ (e) => setNewSubCategoryData( {...newSubCategoryData, parentId: e.target.value })} id="subcategoy-parent" required>
                    <option value=''>-- Seleccionar</option>
                    {
                      categories && categories.map(item => {
                        return (
                          <option key={item._id} value={item._id}>{item.name}</option>
                        )
                      })
                    }
                  </Select>
                </div>

                <div className="mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Nombre de la Categoría" />
                  </div>
                  <TextInput onChange={ (e) => setNewSubCategoryData( {...newSubCategoryData, name: e.target.value })} id="name" type="text" required shadow />
                </div>

                <div className="mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="description" value="Descripción de la categoría" />
                  </div>
                  <TextInput onChange={ (e) => setNewSubCategoryData( {...newSubCategoryData, description: e.target.value })} id="description" type="text" shadow />
                </div>
                <Button type="submit">Agregar SubCategoría</Button>
              </form>


              </div>
            </Modal.Body>

          </Modal>
        </div>
      </div>
    </>
  )
}

export default PlantsPage