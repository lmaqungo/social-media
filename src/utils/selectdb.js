
const { VITE_ENV, VITE_DEV_API_URL, VITE_PROD_API_URL } = import.meta.env;

function getApiUrl() {
    switch(VITE_ENV) {
        case 'dev': 
            return VITE_DEV_API_URL; 
        case 'prod': 
            return VITE_PROD_API_URL; 
    }; 
}

const apiURL = getApiUrl();

export { apiURL };