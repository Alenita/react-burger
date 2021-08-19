import { formatRelative} from 'date-fns';
import { ru } from 'date-fns/locale';

/* eslint-disable no-useless-escape */
export const getCookie = (name) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value + '; path=/';
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
        updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
    console.log(document.cookie);
    };

    export function deleteCookie(name) {
        setCookie(name, null, { expires: -1 });
    };
    
    export const sortByDate = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    export const getStatus = (status) => {
        switch(status) {
            case 'pending': 
                return 'Готовится'
            case 'done': 
                return 'Выполнен'
            case 'created': 
                return 'Создан'
            default: 
                return ''
        }
    }

    export const getDate = (createdAt) => {
        const date = formatRelative(new Date(createdAt), new Date(), { locale: ru, });
        return `${date} i-GMT+3`
    };
