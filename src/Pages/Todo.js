import React, { useState, useEffect } from 'react';
import { Button, Input, Table, CustomInput } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, addData, editData, deleteData } from '../Redux/Action/todoActions';
import { API_URL } from '../Support/API_URL';

const Todo = () => {

    let userId = useSelector((state) => state.auth.id)
    
    let dispatch = useDispatch()
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if (userId) {
            dispatch(
                fetchData(userId)
            )
        }
        if(update){
            setUpdate(false)
        }
    },[userId, dispatch, update])

    let dataList = useSelector((state) => state.todo.dataList)
    let loading = useSelector((state) => state.todo.loading)

    // console.log(dataList)

    const [todo, setTodo] = useState('')
    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined
    })

    let handleChange = (e) => {
        setTodo(e.target.value)
    }
    let handleImage = (e) => {
        if(e.target.files[0]){
            setImage({
                imageFile : e.target.files[0],
                imageName : e.target.files[0].name
            })
        }else{
            setImage({
                imageName : 'Select File...',
                imageFile : undefined
            })
        }
    }
    // console.log(image)

    let handleSubmit = () => {
        // file image di image.imageFile
        let formData = new FormData();
        formData.append('image', image.imageFile);
        formData.append('todo', todo)

        dispatch(
            addData(userId, formData)
        )
        setUpdate(true)
    }
    let handleEdit = (id, todo) => {
        let formData = new FormData();
        formData.append('image', image.imageFile);
        formData.append('todo', editTodo)
        dispatch(
            editData(id, formData)
        )
        setUpdate(true)
        setToggle(null)
    }
    let handleDelete = (id) => {
        dispatch(
            deleteData(id)
        )
        setUpdate(true)
    }

    let [toggle, setToggle] = useState(null)
    let [editTodo, setEditTodo] = useState('')
    // console.log(editTodo)
    let renderTable = () => {
        return dataList.map((val, index) => {
            if(toggle === val.id){
                return(
                    <tr key={index}>
                        <td>{val.id}</td>
                        <td>
                            <Input
                                onChange={(e) => setEditTodo(e.target.value)}
                                defaultValue={val.todo}
                            />
                        </td>
                        <td>
                            <CustomInput
                                type='file'
                                name='imageName'
                                id='imageName'
                                label={image.imageName}
                                onChange={handleImage}
                            />
                        </td>
                        <td>
                            <Button onClick={() => setToggle(null)}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleEdit(val.id, editTodo)}>
                                Confirm
                            </Button>
                        </td>
                    </tr>
                )
            }
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.todo}</td>
                    <td>
                        <img src={API_URL+val.imagePath} alt='Gambar Todo' height='100px'/>
                    </td>
                    <td>
                        <Button onClick={() => setToggle(val.id)}>
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(val.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return ( 
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Todo
                        </th>
                        <th>
                            Image
                        </th>
                        <th colSpan='2'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            #
                        </td>
                        <td>
                            <Input 
                                type='textarea'
                                name='todo'
                                id='todo'
                                onChange={handleChange} 
                            />
                        </td>
                        <td>
                            <div>
                                <CustomInput
                                    type='file'
                                    name='imageName'
                                    id='imageName'
                                    label={image.imageName}
                                    onChange={handleImage}
                                />
                            </div>
                        </td>
                        <td>
                            <div>
                                <Button className='form-control' onClick={handleSubmit}>
                                    {
                                        loading
                                        ?
                                        'Loading...'
                                        :
                                        'Add'
                                    }
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}
 
export default Todo;