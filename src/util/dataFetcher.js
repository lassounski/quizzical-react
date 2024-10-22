export function fetchQuizData(setGameMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            // Simulate a slow API response
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay of 3 seconds
            
            const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple');

            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000; // If Retry-After is provided, use it; otherwise, wait for 5 seconds

                console.warn(`Too many requests. Retrying after ${waitTime / 1000} seconds...`);
                
                // Wait for the specified time before retrying
                setTimeout(() => {
                    resolve(fetchQuizData(setGameMessage)); // Retry fetching
                }, waitTime);
                return;
            }

            if (!response.ok) {
                throw new Error('Error fetching quiz data');
            }

            const data = await response.json();
            resolve(data.results);
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}
