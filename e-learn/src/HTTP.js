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
                const refreshData = await refreshResponse.json();
                localStorage.setItem('token', refreshData.data.token);

                // Retry the request with the new access token
                options.headers.Authorization = `Bearer ${refreshData.data.token}`;
                const retryResponse = await fetch(url, options);

                if (retryResponse.status === 401) {
                    throw new Error('Unauthorized');
                }

                const retryResponseText = await retryResponse.text();
                if (!retryResponseText) {
                    throw new Error('Response body is empty');
                }
                const retryResponseData = JSON.parse(retryResponseText);
                return retryResponseData;
            } catch (error) {
                // Handle error
                console.error('An error occurred:', error);
                throw error;
            }
        }

        const responseText = await response.text();
        if (!responseText) {
            throw new Error('Response body is empty');
        }
        const responseData = JSON.parse(responseText);
        return responseData;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
