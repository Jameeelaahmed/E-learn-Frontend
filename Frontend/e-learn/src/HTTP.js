export async function httpRequest(method, endpoint, accessToken, refreshToken, requestBody, headers) {
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
                body: JSON.stringify({ refreshToken }),
            };

            try {
                const refreshResponse = await fetch(refreshUrl, refreshOptions);
                const refreshedAccessToken = await refreshResponse.json();

                // Retry the request with the new access token
                options.headers.Authorization = `Bearer ${refreshedAccessToken}`;
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