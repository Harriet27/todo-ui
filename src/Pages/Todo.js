import React, { useState, useEffect } from 'react';
import { Button, Input, Table, CustomInput } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, addData, editData, deleteData } from '../Redux/Action/todoActions';
import { API_URL } from '../Support/API_URL';

const Todo = () => {

    let userId = useSelector((state) => state.auth.id);

    let dispatch = useDispatch();

    const [update, setUpdate] = useState(false);
    
    useEffect(() => {
        if (userId) {
            dispatch(
                fetchData(userId) // fetching aja sih
                
            )
            if (update) {
                setUpdate(false) // set update ke false
            }
        }
    }, [userId, dispatch, update]) // dependency : tiap ada perubahan dijlnin lagi si lifecycle

    let dataList = useSelector((state) => state.todo.dataList);

    const [todo, setTodo] = useState('');
    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined
    });

    let handleChange = (e) => {
        setTodo(e.target.value);
    }
    
    let handleImage = (e) => {
        if(e.target.files[0]){
            setImage({
                imageFile : e.target.files[0],
                imageName : e.target.files[0].name
            })
        }else{
            setImage({
                imageFile : 'Select File...',
                imageName : undefined
            })
        }
    }

    let handleSubmit = () => {
        let formData = new FormData();
        formData.append('image', image.imageFile);
        formData.append('todo', todo);
        dispatch(
            addData(userId, formData)
        )
        setUpdate(true)
    }

    let handleEdit = (id, todo) => {
        dispatch(
            editData(id, todo)
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

    let [toggle, setToggle] = useState(null);
    let [editTodo, setEditTodo] = useState('');

    let renderTable = () => {
        return dataList.map((val, index) => {
            if (toggle === val.id) {
                return(
                    <tr key={index}>
                        <td>{val.id}</td>
                        <td>
                            <Input onChange={(e) => setEditTodo(e.target.value)} defaultValue={val.todo}/>
                        </td>
                        <td>Image</td>
                        <td style={{display:'flex', justifyContent:'center'}}>
                            <Button style={{marginRight:'10px'}} outline color='danger' onClick={() => setToggle(null)}>
                                Cancel
                            </Button>
                            <Button style={{marginLeft:'10px'}} outline color='success' onClick={() => handleEdit(val.id, editTodo)}>
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
                        <img src={API_URL + val.imagePath} alt='Gambar Todo' height='100px'/>
                    </td>
                    <td style={{display:'flex', justifyContent:'center'}}>
                        <Button style={{marginRight:'10px'}} outline color='success' onClick={() => setToggle(val.id)}>
                            Edit
                        </Button>
                        <Button style={{marginLeft:'10px'}} outline color='danger' onClick={() => handleDelete(val.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return ( 
        <div>
            <Table hover    >
                <thead>
                    <tr style={{textAlign:'center'}}>
                        <th>#</th>
                        <th>Todo</th>
                        <th>Image</th>
                        <th colSpan='2'>Action</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
                <tfoot>
                    <tr>
                        <td>#</td>
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
                        <td colSpan='2'> 
                            <div>
                                <Button outline color='primary' className='form-control' onClick={handleSubmit}>
                                    Add
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