import axios from 'axios';

const fetchNewsFeedData = async () => {
    const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/activity";
    try {
        const response = await axios.get(apiUrl);
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default fetchNewsFeedData;