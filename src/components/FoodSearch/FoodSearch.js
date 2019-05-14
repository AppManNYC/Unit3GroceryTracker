import React, { useState } from 'react';

import { useFoodSearch } from '../../hooks/foodSearch';

const FoodSearch = props => {
	const [searchString, setSearchString] = useState('');
	const { foodList, isLoading, hasError } = useFoodSearch(searchString);
	
	const renderResults = () => {
		if (isLoading) {
			return <div>Loading...</div>;
		}
		
		if (hasError) {
			return <div>Something went wrong!</div>;
		}
		
		return (
			<ul>
        {foodList.map(item => (
	        <li key={item.food_name}>{item.food_name}</li>
        ))}
      </ul>
		);
	};
	
	return (
		<div className={}>
      <input
	      className={styles.input}
	      type="text"
	      value={searchString}
	      onChange={e => setSearchString(e.target.value)}
      />
			{renderResults()}
    </div>
	);
};

export default FoodSearch;