import { useState, useEffect } from 'react';

import { searchFood } from '../services/api';

export const useFoodSearch = searchString => {
	const [foodList, setFoodList] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [hasError, setError] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		setError(false);
		
		const debounced = setTimeout(async () => {
			try {
				const data = await searchFood(searchString);
				setFoodList(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError(true);
			}
		}, 300);
		
		return () => {
			clearTimeout(debounced);
		};
	}, [searchString]);
	
	return { foodList, isLoading, hasError };
};