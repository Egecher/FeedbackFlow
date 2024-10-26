# FeedbackFlow

FeedbackFlow, kullanıcıların web siteleri üzerinde geri bildirim toplamasını ve görüntülemesini sağlayan basit ve şık bir web tabanlı geri bildirim sistemidir. Kullanıcı dostu arayüzü ve API tabanlı yapısıyla, web geliştiricilerin kullanıcı geri bildirimlerini ve puanlamalarını kolayca toplaması için mükemmeldir.

![Geri Bildirim Sistemi](public/feedback-system.png)

## Özellikler

- **API Tabanlı Geri Bildirim Toplama**: Kullanıcılardan API aracılığıyla geri bildirim toplayın.
- **Duyarlı Tasarım**: Farklı ekran boyutlarına uyum sağlayan mobil dostu tasarım.
- **Puanlama Sistemi**: 1-5 arasında yıldız şeklinde puanlama toplayın ve görsel olarak görüntüleyin.
- **Geri Bildirim Görüntüleme**: Geri bildirimleri sitenizde düzenli bir tablo halinde görüntüleyin.
- **Ortalama Puan Hesaplama**: Puanlamaların ortalamasını otomatik olarak hesaplar ve görüntüler.

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/Egecher/feedbackflow.git
   ```
   
2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Uygulamayı başlatın:
   ```bash
   npm start
   ```

4. Uygulamayı yerel ortamınızda ziyaret edin:
   ```bash
   http://localhost:3000
   ```

## API Kullanımı

FeedbackFlow, geri bildirim verilerini göndermek ve almak için bir API sağlar.

### Geri Bildirim Gönderme (POST)

Geri bildirim göndermek için aşağıdaki POST isteğini kullanın:

```
POST /feedback
```

#### İstek gövdesi örneği:
```json
{
  "username": "egecher",
  "message": "Hizmet harikaydı!",
  "reason": "Hızlı ve güvenilir",
  "rating": 5
}
```

### Geri Bildirim Alma (GET)

Tüm geri bildirim verilerini almak için:
```
GET /feedbacks
```

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen geliştirmeler veya yeni özelliklerle ilgili bir çekme isteği gönderin ya da bir sorun açın.

## Teşekkürler

- Basitlik ve entegrasyon kolaylığına odaklanan modern geri bildirim sistemlerinden ilham alınmıştır.

---

*Egecher tarafından geliştirilmiştir.*