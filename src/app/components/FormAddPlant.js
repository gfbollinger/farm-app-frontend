import React from 'react'
import { Button, Label, TextInput, Select } from "flowbite-react"
import { HiOutlinePlusSm } from "react-icons/hi"

const FormAddPlant = ({categories, handleAddPlant, newPlantData, setNewPlantData, loading, res, handleSelectFile, handleUpload, file}) => {
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleAddPlant}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombre del cultivo" />
          </div>
          <TextInput onChange={ (e) => setNewPlantData( {...newPlantData, name: e.target.value })} id="name" type="text" placeholder="Ej: Tomate cherry" required shadow />
        </div>

        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="category" value="Seleccionar categoría" />
          </div>
          <div className='flex items-center gap-2'>
            <Select className='flex-1' onChange={ (e) => setNewPlantData( {...newPlantData, category: e.target.value })} id="category" required>
              <option>-- Seleccionar</option>
              {
                categories.map(item => {
                  return <option key={item._id} value={item._id}>{item.name}</option>
                })
              }
            </Select>
            <Button size='xs' className='flex items-center'>
              Agregar categoría <HiOutlinePlusSm className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="plantType" value="Seleccionar tipo" />
          </div>
          <Select onChange={ (e) => setNewPlantData( {...newPlantData, type: e.target.value })} id="plantType" required>
            <option>-- Seleccionar</option>
            <option>De Hoja</option>
            <option>De fruto</option>
            <option>De Bulbo</option>
          </Select>
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