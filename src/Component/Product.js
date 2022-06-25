import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenClip,faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Product = ({product,index}) => {
    const {name,price,category,_id} = product;
    const updateProduct= (id) =>{
        console.log(id)
    }
    return (
        <tr>
        <th>{index}</th>
        <td>{name}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td><FontAwesomeIcon onClick={()=>updateProduct(_id)} className='text-blue-600' icon={faPenClip}/></td>
        <td><FontAwesomeIcon className='text-red-600' icon={faTrashCan}/></td>
      </tr>
    );
};

export default Product;