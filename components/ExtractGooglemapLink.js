import 'react-native-url-polyfill/auto'; // Đảm bảo API URL có sẵn
import axios from 'axios';

function ExtractGooglemapLink({url}) {
  const parseGoogleMapsLink = async (url) => {
    try {
      const parsedUrl = new URL(url);
  
      // Kiểm tra các loại URL khác nhau
      if (parsedUrl.hostname === 'maps.app.goo.gl') {
        // Xử lý URL ngắn bằng cách giải mã nó
        const response = await axios.get(url, { maxRedirects: 0, validateStatus: null });
        const longUrl = response.headers.location;
        return parseGoogleMapsLink(longUrl); // Gọi lại hàm với URL đầy đủ
      } else if (parsedUrl.hostname === 'www.google.com' && parsedUrl.pathname.startsWith('/maps/place')) {
        const match = parsedUrl.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          return {
            latitude: parseFloat(match[1]),
            longitude: parseFloat(match[2])
          };
        }
      } else {
        throw new Error('Định dạng URL Google Maps không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi phân tích URL Google Maps:', error);
      return null;
    }
  };
  return parseGoogleMapsLink(url);  
}
export default ExtractGooglemapLink;
// Ví dụ sử dụng
// const url1 = 'https://maps.app.goo.gl/HfXLVKg1TKZyN3PT9';
// parseGoogleMapsLink(url1).then(result1 => {
//   console.log(result1); // { latitude: <latitude_value>, longitude: <longitude_value> }
// });
