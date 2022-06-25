import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Product from './Product';

const Home = () => {
    const [selectError, setSelectError] = useState('');
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
            fetch('http://localhost:5000/createFood', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(foodDetail)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            console.log(foodDetail)
        }

    }
    const { isLoading, data: products } = useQuery('allProducts', () =>
        fetch('http://localhost:5000/AllProducts').then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
    }
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content ">
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>


                <div class="overflow-x-auto">
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
        products.map((product,index) => <Product key={index} product={product} index={index}></Product>)
     }
    </tbody>
  </table>
</div>


            </div>

            <div class="drawer-side">

                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <form onSubmit={createProducts}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text-alt">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Type name" class="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text-alt">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Type name" class="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <label class="label">
                            <span class="label-text-alt">Category</span>
                        </label>
                        <select name='category' class="select select-primary w-full max-w-xs" required>
                            <option selected disabled>Select Your category</option>
                            <option>Fruit</option>
                            <option>Vegetables</option>
                            <option>Street Food</option>
                            <option>Dairy</option>
                        </select>
                        <label class="label">
                            <span class="label-text-alt text-red-500">{selectError}</span>
                        </label>

                        <input class="btn btn-active btn-primary w-full mt-4" type="submit" value="Add Product" />

                    </form>
                </ul>

            </div>

        </div >
    );
};

export default Home;