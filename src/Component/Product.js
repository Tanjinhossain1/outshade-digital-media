import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UpdateModal from './UpdateModal';
import { toast } from 'react-toastify';

const Product = ({ product,refetch, index,setButtonDisabled }) => {
    const { name, price, category, _id } = product;
    const [openModal, setOpenModal] = useState(null);
    const updateProduct = (id) => {
        setOpenModal(id)
        setButtonDisabled(true)
    }

   
    const deleteProduct = (id) =>{
        const confirmDelete = window.confirm('Are You Sure To delete it!');
        if(confirmDelete){
        fetch(`http://localhost:5000/deleteProduct/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    toast.success('Deleted Success')
                    refetch();
                })
            }
    }
    return (
        <tr>
            <th>{index}</th>
            <td>{name}</td>
            <td>{price}</td>
            <td>{category}</td>
            <td><label htmlFor="my-modal-6"><FontAwesomeIcon onClick={() => updateProduct(_id)} className='text-blue-600' icon={faPenClip} /></label></td>
            {openModal && <UpdateModal refetch={refetch} setButtonDisabled={setButtonDisabled}  productId={openModal} setOpenModal={setOpenModal} />}

            <td><FontAwesomeIcon onClick={()=>deleteProduct(_id)} className='text-red-600' icon={faTrashCan} /></td>
        </tr>
    );
};

export default Product;