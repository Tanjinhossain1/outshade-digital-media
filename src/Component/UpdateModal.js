import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UpdateModal = ({ productId,setButtonDisabled, refetch, setOpenModal }) => {
    const [selectError, setSelectError] = useState('');
    const updateProduct = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const price = event.target.price.value;
        const category = event.target.category.value;
        if (category === 'Select Your category') {
            setSelectError('Please select you category')
        } else {
            setSelectError('')
            const foodDetail = { name, price, category };
            console.log(foodDetail)
            fetch(`http://localhost:5000/updateProduct/${productId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(foodDetail)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    refetch()
                    event.target.reset();
                    setButtonDisabled(false)
                    toast.success('SuccessFully Update')
                    setOpenModal(false)
                })

        }

    }
    return (
        <div>

            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h1 className='text-2xl text-green-500 text-center font-bold'>Update Product</h1>
                    <form className='ml-16 bg-transparent' onSubmit={updateProduct}>
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text-alt">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Type name" class={`input input-bordered input-primary w-full max-w-xs`} required />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text-alt">Price</span>
                                </label>
                                <input type="number" name='price' placeholder="Type name" class={`input input-bordered input-primary w-full max-w-xs `} required />
                            </div>
                            <label class="label">
                                <span class="label-text-alt">Category</span>
                            </label>
                            <select name='category' class={`select select-primary w-full max-w-xs`} required>
                                <option selected disabled>Select Your category</option>
                                <option>Fruit</option>
                                <option>Vegetables</option>
                                <option>Street Food</option>
                                <option>Dairy</option>
                            </select>
                            <label class="label">
                                <span class="label-text-alt text-red-500">{selectError}</span>
                            </label>
                            <div className='flex justify-center mr-12'>
                                <input class="btn btn-active btn-primary w-3/4 mt-4" type="submit" value="Update Product" />
                            </div>
                        </div>
                    </form>
                    <div class="modal-action">
                        <label for="my-modal-6" onClick={()=> setButtonDisabled(false)} class="btn bg-red-600 border-0">Cancel</label>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default UpdateModal;