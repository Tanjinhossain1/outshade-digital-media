import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Product from './Product';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Category from './Category';
const Home = () => {
    const [selectError, setSelectError] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [categorySorted, setCategorySorted] = useState('');
    const [categoryOn, setCategoryOn] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);
    const { isLoading, data: products, refetch } = useQuery('allProducts', () =>
        fetch('https://infinite-springs-80402.herokuapp.com/AllProducts').then(res =>
            res.json()
        )
    )
   
    const { data: categorys,isLoading: reload } = useQuery('category', () =>
        fetch('https://infinite-springs-80402.herokuapp.com/category').then(res =>
            res.json()
        )
    )
    
  
    const createProducts = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const price = event.target.price.value;
        const category = event.target.category.value;
        if (category === 'Select Your category') {
            setSelectError('Please select you category')
        } else {
            setSelectError('')
            const foodDetail = { name, price, category };
            fetch('https://infinite-springs-80402.herokuapp.com/createFood', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(foodDetail)
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    event.target.reset();
                    toast.success('Product add Success full')
                    console.log(data)
                })
            
        }

    }
   
   
    if (isLoading) {
        return <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
    }
    if (reload) {
        return <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
    }
    const sortedCategory = products.filter(c => c.category.includes(categorySorted))
  
    const createCategory = (event) => {
        event.preventDefault()
        const category = event.target.category.value;
        fetch('https://infinite-springs-80402.herokuapp.com/createCategory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ category })
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                toast.success('Category Create done')
                event.target.reset()
            })
    }
   const deleteCategories = (event) =>{
    event.preventDefault()
    const deleteCategory = event.target.deleteCategory.value;
    fetch('https://infinite-springs-80402.herokuapp.com/deleteCategory', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ deleteCategory })
    })
        .then(res => res.json())
        .then(data => {
            refetch()
            console.log(data)
            fetch('https://infinite-springs-80402.herokuapp.com/categoryProduct',{
                method:'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify({deleteCategory})
            })
            .then(result=>result.json())
            .then(value=>{
                refetch()
                toast.success('product delete done')
                console.log('value',value)
            })
            toast.success('Category Delete done')
            event.target.reset()
        })
   }
  
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content ">
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Add Product</label>


                <div class="overflow-x-auto">
                    <div className='flex  mt-12 mb-4 justify-around items-center'>
                        <div></div>
                        <select onChange={(e) => setCategorySorted(e.target.value)} name='category' class={`select select-primary w-full max-w-xs border-gray-400 text-center  ${buttonDisabled && 'bg-transparent border-gray-400'}`} required>

                            <option selected disabled> <span className='text-green-500'>Sorted by Categories</span> </option>
                           {
                            categorys?
                                categorys.map(category => <Category key={category._id} refetch={refetch} category={category} />):
                                <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
                            
                           }

                        </select>

                        {
                            categoryOn ? <div className='flex justify-between items-center'>
                                <form onSubmit={createCategory} className='flex items-center'><input name='category' type="text" placeholder="Category Name" class="input input-bordered input-primary w-full max-w-xs" /> <input className='btn btn-outline btn-accent' type="submit" value="Add Category" /> </form>
                                <span onClick={() => setCategoryOn(false)} className='text-blue-500 font-semibold cursor-pointer'>Back</span></div> : <h1 onClick={() => setCategoryOn(true)} className='text-blue-500 cursor-pointer text-xl font-semibold'> <FontAwesomeIcon icon={faPlus} /> Add Category</h1>
                        }
                        {
                            deleteCategory ? <div className='flex justify-between items-center'>
                                <form onSubmit={deleteCategories} className='flex items-center'><input name='deleteCategory' type="text" placeholder="Category Name" class="input input-bordered input-primary w-full max-w-xs" /> <input className='btn btn-outline btn-error' type="submit" value="Delete Category" /> </form>
                                <span onClick={() => setDeleteCategory(false)} className='text-blue-500 font-semibold cursor-pointer'>Back</span></div> : <h1 onClick={() => setDeleteCategory(true)} className='text-red-500 cursor-pointer text-xl font-semibold'> <FontAwesomeIcon icon={faPlus} /> Delete Category</h1>
                        }

                    </div>
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedCategory.map((product, index) => <Product refetch={refetch} key={index} buttonDisabled={buttonDisabled} categorySorted={categorySorted} setButtonDisabled={setButtonDisabled} product={product} index={index}></Product>)
                            }
                        </tbody>
                    </table>
                </div>


            </div>

            <div class="drawer-side ">

                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 bg-transparent overflow-y-auto w-80 bg-base-100 text-base-content">
                    <form className='bg-transparent' onSubmit={createProducts}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text-alt">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Type name" class={`input input-bordered input-primary w-full max-w-xs ${buttonDisabled && "bg-transparent border-gray-400"}`} required />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text-alt">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Type name" class={`input input-bordered input-primary w-full max-w-xs ${buttonDisabled && 'bg-transparent border-gray-400'}`} required />
                        </div>
                        <label class="label">
                            <span class="label-text-alt">Category</span>
                        </label>
                        <select name='category' class={`select select-primary w-full max-w-xs  ${buttonDisabled && 'bg-transparent border-gray-400'}`} required>
                            <option selected disabled>Select Your category</option>
                            {
                                categorys.map(category => <Category key={category._id} refetch={refetch} category={category} />)
                            }
                        </select>
                        <label class="label">
                            <span class="label-text-alt text-red-500">{selectError}</span>
                        </label>

                        <input class="btn btn-active btn-primary w-full mt-4" type="submit" value="Add Product"
                            disabled={buttonDisabled} />

                    </form>
                </ul>

            </div>

        </div >
    );
};

export default Home;