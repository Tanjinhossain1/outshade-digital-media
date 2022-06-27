import React from 'react';

const Category = ({category,refetch}) => {
    refetch()
    return (
      
            <option>{category.category}</option>
      
    );
};

export default Category;