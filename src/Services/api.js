const NUTRITIONIX_API_BASE = 'https://api.nutritionix.com/v1_1';
const APP_ID = 'f95dc4d9';
const APP_KEY = '25ec40f8781dd35636bf9456ff98197b';
const FIELDS = 'results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_ingredient_statement%2Cnf_calories%2Cnf_cholesterol';
const AUTHORIZATION = 'appId=f95dc4d9&appKey=25ec40f8781dd35636bf9456ff98197b';
	searchURL: ''
const headers = {
	'x-app-id': APP_ID,
	'x-app-key': APP_KEY
};

export async function searchFood(query) {
	if (!query) {
		return [];
	}
	
	const requestUrl = `${NUTRITIONIX_API_BASE}/search/${query}?${FIELDS}&${AUTHORIZATION}`;
	const options = {
		headers
	};
	const response = await fetch(requestUrl, options);
	
	if (!response.ok) {
		throw new Error('Bad Request');
	}
	
	const { common = [] } = await response.json();
	
	return common;
}