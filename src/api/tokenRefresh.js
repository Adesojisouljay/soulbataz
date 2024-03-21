const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        } else {
            console.error('Error refreshing access token:', data.message);
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
};

const fetchAuthenticatedData = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return;
    }
    try {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        };
        const response = await fetch(url, options);
        if (response.status === 401) {
            accessToken = await refreshAccessToken();
            options.headers.Authorization = `Bearer ${accessToken}`;
            return fetch(url, options);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
