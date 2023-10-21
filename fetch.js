import {ref} from './vue3.js';

export function fetchDatas(url) {
    const datas = ref([]);

    fetch(url)
    .then(res => res.json())
    .then(json => datas.value = json);

    return datas;
}