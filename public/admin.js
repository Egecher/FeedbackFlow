document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const feedbackList = document.getElementById('feedbackList');
        const feedbackEmpty = document.getElementById('feedback-empty');
        const average = document.getElementById('average');
        feedbackList.innerHTML = '';

        if (data.length === 0) {
            feedbackEmpty.innerHTML = '<p class="empty">Henüz geri bildirim yok.</p>';
        } else {
            // Burda son gelen geri bildirmi başta görmek için verileri ters çeviriyoruz.
            const reversedData = data.reverse();

            const averageRating = calculateAverageRating(reversedData);
            average.innerHTML = `Derece (${averageRating.toFixed(1)})`;

            reversedData.forEach(feedback => {
                const row = document.createElement('tr');

                // Kullanıcı Adı (e-posta bağlantısı ile)
                const usernameCell = document.createElement('td');
                const emailLink = document.createElement('a');
                emailLink.href = `mailto:${feedback.email}`; 
                emailLink.textContent = feedback.username;
                emailLink.style.color = '#4CAF50'; 
                emailLink.style.textDecoration = 'none';
                usernameCell.appendChild(emailLink);
                row.appendChild(usernameCell);

                // Mesaj
                const messageCell = document.createElement('td');
                messageCell.textContent = feedback.message;
                row.appendChild(messageCell);

                // Neden (varsa)
                const reasonCell = document.createElement('td');
                reasonCell.textContent = feedback.reason ? feedback.reason : 'N/A';
                row.appendChild(reasonCell);

                // Derecelendirme (varsa)
                const ratingCell = document.createElement('td');
                if (feedback.rating) {
                    ratingCell.innerHTML = '⭐'.repeat(feedback.rating);
                } else {
                    ratingCell.textContent = 'N/A'; 
                }
                row.appendChild(ratingCell);

                feedbackList.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error('Hata:', error);
    });
});

function calculateAverageRating(feedbacks) {
    const ratings = feedbacks
        .map(fb => Number(fb.rating))  
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);  

    if (ratings.length === 0) {
        return 0;
    }

    const sum = ratings.reduce((acc, rating) => acc + rating, 0); 
    const average = sum / ratings.length; 

    return average; 
}

