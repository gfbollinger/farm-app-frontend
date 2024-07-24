import React from 'react'
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react"
import { HiOutlinePlusSm } from "react-icons/hi"

const FormAddPlant = ({categories, handleAddPlant, newPlantData, setNewPlantData, loading, res, handleSelectFile, handleUpload, file, plantTypes}) => {
  
  const selectedCategory = categories.find(category => category._id === newPlantData.category)
  const hasSubcategories = selectedCategory  && Object.keys(selectedCategory.subcategories).length > 0

  const handleAddCategory = (cat) => {
    const selectedCategory = categories.find( category => category._id === cat )
    const selectedCatType = selectedCategory.plantType[0]._id 
    console.log('selectedCategory', selectedCategory)
    setNewPlantData({ ...newPlantData, category: cat, plantType: selectedCatType })
    console.log(selectedCatType)
  }
  
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleAddPlant}>

        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="category" value="Seleccionar categoría" />
          </div>
          <div className='flex items-center gap-2'>
            <Select className='flex-1' onChange={ (e) => handleAddCategory(e.target.value)} id="category" required>
              <option>-- Seleccionar</option>
              {
                categories.map(item => {
                  return <option key={item._id} value={item._id}>{item.name}</option>
                })
              }
            </Select>
            { hasSubcategories && 
              <Select className='flex-1' onChange={ (e) => setNewPlantData( {...newPlantData, subcategory: e.target.value })} id="subcategory" required>
                <option>-- Seleccionar subcategoria</option>
                {
                  selectedCategory.subcategories.map(item => {
                    return <option key={item._id} value={item._id}>{item.name}</option>
                  })
                }
              </Select>
            }
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombre del cultivo" />
          </div>
          <TextInput onChange={ (e) => setNewPlantData( {...newPlantData, name: e.target.value })} id="name" type="text" placeholder="Ej: Tomate cherry" required shadow />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descripción del cultivo" />
          </div>
          <Textarea onChange={ (e) => setNewPlantData({ ...newPlantData, description: e.target.value})} />
        </div>

        <label htmlFor="file" className="btn-grey">
          {" "}
          select file
        </label>
        {file && <span className='text-xs'> {file.name}</span>}
        <input
          id="file"
          type="file"
          onChange={handleSelectFile}
          multiple={false}
        />
        {/* Code to check the Cloudinary response */}
        {/* <code>
          {Object.keys(res).length > 0
            ? Object.keys(res).map((key) => (
                <p className="output-item" key={key}>
                  <span>{key}:</span>
                  <span>
                    {typeof res[key] === "object" ? "object" : res[key]}
                  </span>
                </p>
              ))
            : null}
        </code> */}
        <img src={res.url} width={100} alt="" />
        {file && (
          <>
            <button onClick={handleUpload} className="btn-green">
              {loading ? "uploading..." : "upload to cloudinary"}
            </button>
          </>
        )}

        {/* <div>
          <div className="mb-2 block">
            <Label htmlhtmlFor="name" value="Nombre del cultivo" />
          </div>
          <TextInput id="name" type="text" placeholder="Ej: Tomate cherry" required shadow />
        </div> */}

        <Button type="submit">Agregar cultivo</Button>
      </form>
    </>
  )
}

export default FormAddPlant