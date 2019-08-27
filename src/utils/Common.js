import ImgToBase64 from 'react-native-image-base64';
// import ImageResizer from 'react-native-image-resizer';
import { ImageEditor, Image, ImageStore } from 'react-native';

const validatePhoneNumberOld = (phoneNumber) => {
  let flag = false;
  const carriers_number11 = [
    '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169', // viettel
    '0120', '0121', '0122', '0126', '0128', // mobile
    '0123', '0124', '0125', '0127', '0129', // vinaphone
    '0199', // Gmobile
    '0186', '0188' // Vietnamobile
  ]
  const carriers_number = [
    '086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039', //Viettel
    '089', '090', '093', '070', '079', '077', '076', '078', // mobile
    '091', '094', '088', '081', '082', '083', '084', '085', // vinaphone
    '099', '059', // Gmobile
    '092', '056', '058' // Vietnamobile
  ]
  if (phoneNumber) {
    let phone = convertPhoneNumber(phoneNumber);
    if (phone !== '') {
      if (phone.length === 10) {
        flag = (phone.match(/^\d{10}/) && carriers_number.includes(phone.substring(0, 3))) ? true : false
      } else if (phone.length === 11) {
        flag = (phone.match(/^\d{11}/) && carriers_number11.includes(phone.substring(0, 4))) ? true : false
      } else {
        flag = false;
      }
    }
  } else {
    flag = false; // when input text empty
  }
  return flag;
}

cropImage = (uri, succes, failure) => {
  let sizeWidth;
  Image.getSize(uri, (width, height) => {
    if(width > height) {
      sizeWidth = height;
    } else {
      sizeWidth = width;
    }
  })
  const cropData = {
    offset:{x: 0, y: 0},
    size:{width: sizeWidth, height: sizeWidth},
    displaySize: {width: 400, height: 400},
    resizeMode: 'contain',
  }
  ImageEditor.cropImage(uri, cropData, (succesUri) => {
    succes(succesUri);
  }, (err) => {
    failure(err)
  })
}

const imageResize = (uri, callback) => ImageResizer.createResizedImage(uri, 400, 400, 'JPEG', 100).then((response) => {
  // response.uri is the URI of the new image that can now be displayed, uploaded...
  // response.path is the path of the new image
  // response.name is the name of the new image with the extension
  // response.size is the size of the new image
  return response;
})

const convertToBase64 = (uri, callback) => {
  ImgToBase64.getBase64String(`${uri}`)
    .then(base64String => {
      console.log("base64String: ", base64String);
      callback(base64String)
    })
}

const convertBase64ByTag = (uri, callback) => {
  ImageStore.getBase64ForTag(uri, (base64String) => {
    callback(base64String)
  })
}

const convertPhoneOldToNew = (phoneNumber) => {
  let phone = convertPhoneNumber(phoneNumber);
  let arrPhone11 = ['0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169', '0120', '0121', '0122', '0126', '0128', '0123', '0124', '0125', '0127', '0129', '0186', '0188', '0199'];
  let arrPhone10 = ['032', '033', '034', '035', '036', '037', '038', '039', '070', '079', '077', '076', '078', '083', '084', '085', '081', '082', '056', '058', '059'];
  let phoneNew = phone;
  if (phone.length === 11) {
    for (var i = 0; i < arrPhone11.length; i++) {
      if (phone.startsWith(arrPhone11[i])) {
        phoneNew = phone.replace(arrPhone11[i], arrPhone10[i]);
      }
    }
  }
  return phoneNew;
}

const validatePhoneNumberV2 = (phoneNumber) => {
  let flag = false;
  const carriers_number = [
    '086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039', //Viettel
    '089', '090', '093', '070', '079', '077', '076', '078', // mobile
    '091', '094', '088', '081', '082', '083', '084', '085', // vinaphone
    '099', '059', // Gmobile
    '092', '056', '058' // Vietnamobile
  ]
  if (phoneNumber) {
    let phone = convertPhoneNumber(phoneNumber);
    if (phone !== '') {
      flag = (phone.match(/^\d{10}/) && phone.length == 10 && carriers_number.includes(phone.substring(0, 3))) ? true : false
    }
  } else {
    flag = false; // when input text empty
  }
  return flag;
}



const convertPhoneNumber = (phoneNumber) => {
  let phone = phoneNumber.toString();
  phone = phone.replace('+84', '0');
  phone = phone.replace('(+84)', '0');
  phone = phone.replace('0084', '0');
  phone = phone.replace(/ /g, '');
  return phone;
}


const convertSeconds = (totalSeconds) => {
  if (totalSeconds < 1) return '00:00';
  let h = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let m = Math.floor(totalSeconds / 60);
  let s = totalSeconds % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  if (h > 0) return `${h}:${m}:${s}`;
  else return m + ':' + s;
}

module.exports = {
  validatePhoneNumberOld,
  convertPhoneOldToNew,
  convertPhoneNumber,
  validatePhoneNumberV2,
  convertSeconds,
  convertToBase64,
  imageResize,
  cropImage,
  convertBase64ByTag
}