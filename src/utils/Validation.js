import { validatePhoneNumberOld } from './Common';

export const required = value => (value ? undefined : 'không được để trống.');
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Không hợp lệ.' : undefined;
export const maxLength15 = value => value && value.length < 15 ? `Phải nhỏ hơn 4 kí tự.` : undefined;
export const number = value => value && isNaN(Number(value)) ? 'Phải là số.' : undefined;
export const minValue = min => value => value && value < min ? `Phải nhỏ hơn ${min} kí tự` : undefined;
export const validPhone = phone => !validatePhoneNumberOld(phone) ? 'phải là số điện thoại !' : undefined;

