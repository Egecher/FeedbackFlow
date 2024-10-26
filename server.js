const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/rate-us', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'rate-us.html'));
});

const feedbacksFilePath = path.join(__dirname, 'feedbacks.json');

app.post('/feedback', (req, res) => {
    const newFeedback = req.body;

    fs.readFile(feedbacksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okunamadı:', err);
            return res.status(500).json({ message: 'Dosya okunamadı.' });
        }

        let feedbacks;
        try {
            feedbacks = JSON.parse(data || '[]');
        } catch (parseError) {
            console.error('JSON parse hatası:', parseError);
            return res.status(500).json({ message: 'Geri bildirim verileri okunamadı.' });
        }

        feedbacks.push(newFeedback); // Yeni geri bildirimi ekliyoruz

        // Güncellenmiş geri bildirimleri dosyaya yazıyoruz
        fs.writeFile(feedbacksFilePath, JSON.stringify(feedbacks, null, 2), (writeError) => {
            if (writeError) {
                console.error('Geri bildirim kaydedilemedi:', writeError);
                return res.status(500).json({ message: 'Geri bildirim kaydedilemedi.' });
            }
            res.status(201).json({ message: 'Geri bildirim başarıyla kaydedildi.' });
        });
    });
});


app.post('/feedbacks', (req, res) => {
    fs.readFile('feedbacks.json', 'utf8', (err, data) => {
        if(err) {
            if(err.code === 'ENOENT') {
                return res.json([]);
            } else {
                console.error('Dosya okuma hatası:', err);
                return res.status(500).json({ message: 'Dosya okuma hatası' });
            }
        }

        try {
            const feedbacks = JSON.parse(data);
            res.json(feedbacks);
        } catch (err) {
            console.error('JSON parse hatası', err);
            return res.status(500).json({ message: 'JSON parse hatası' });
            
        }
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}/`)
});