import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // İngilizce metinler buraya eklenecek
          'Sign Up':'Sign Up',
          'Password mismatch':'Password mismatch',
          'Username':'Username',
          'Display Name':'Display Name',
          'Password':'Password',
          'Password Repeat':'Password Repeat'
        }
      },
      tr: {
        translation: {
          // Türkçe metinler buraya eklenecek
          'Sign Up': 'Kayıt Ol',
          'Password mismatch':'Şifreler uyuşmuyor',
          'Username':'Kullanıcı Adı',
          'Display Name':'Tercih Edilen İsim',
          'Password':'Parola',
          'Password Repeat':'Parola Tekrar'
        }
      }
      // İhtiyaç duyduğunuz diğer dilleri buraya ekleyebilirsiniz
    },
    fallbackLng: 'en',
    ns:['translation'],
    keySeparator: false,
    interpolation: {
      escapeValue: false, // HTML etiketlerini desteklemek için false yapabilirsiniz
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });

export default i18n;
