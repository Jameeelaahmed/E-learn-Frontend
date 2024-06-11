export async function httpRequest(method, endpoint, accessToken, requestBody, contentType, headers) {
    const url = endpoint;

    const options = {
        method,
        headers: {
            ...headers,
            'Content-Type': contentType ? contentType : 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: contentType === 'multipart/form-data' ? requestBody : JSON.stringify(requestBody),
    };

    if (contentType === 'multipart/form-data') {
        delete options.headers['Content-Type']; // Let the browser set the correct boundary for multipart/form-data
    }

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
                console.log(response);
                localStorage.setItem('token', response.data.token);
            // Retry the request with the new access token
            options.headers.Authorization = `Bearer ${newAccessToken}`;
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
        console.error('An error occurred:', error);
        throw error;
    }
}
