import { formatRelative} from 'date-fns';
import { ru } from 'date-fns/locale';

/* eslint-disable no-useless-escape */
export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(name: string, value: string | null, props: any | null) {
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
    // value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value + '; path=/';
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
        updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
    };

    export function deleteCookie(name: string) {
        setCookie(name, null, { expires: -1 });
    };
    
    // export const sortByDate = (a: Date, b: Date) => {
    //     return new Date(b) - new Date(a);
    // }

    export const getStatus = (status: 'done' | 'pending' | 'created') => {
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

    export const getDate = (createdAt: string) => {
        const date = formatRelative(new Date(createdAt), new Date(), { locale: ru, });
        return `${date} i-GMT+3`
    };
