export async function httpRequest(method, endpoint, accessToken, requestBody, headers) {
    console.log('httpRequest function called');
    const url = endpoint;

    const options = {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            // Handle unauthorized error
            // You can use the refresh token to get a new access token and retry the request
            // Example: await refreshAccessToken(refreshToken);
            // Then retry the request with the new access token

            const refreshUrl = 'https://elearnapi.runasp.net/api/Account/Refresh-Token';
            const refreshOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            try {
                const refreshResponse = await fetch(refreshUrl, refreshOptions);
                const response = await refreshResponse.json();
                localStorage.setItem('token', response.data.token);
                
                // Retry the request with the new access token
                options.headers.Authorization = `Bearer ${response.data,token}`;
                const retryResponse = await fetch(url, options);

                if (retryResponse.status === 401) {
                    throw new Error('Unauthorized');
                }

                const responseData = await retryResponse.json();
                return responseData;
            } catch (error) {
                // Handle error
                console.error('An error occurred:', error);
                throw error;
            }
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // Handle error
        console.error('An error occurred:', error);
        throw error;
    }
}