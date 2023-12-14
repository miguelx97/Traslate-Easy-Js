export default class TranslateEasy {

    constructor() {}

    private translations:Map<string,string> = new Map();

    async init(language:string, filesRoute:string = './'):Promise<void> {
        if(!language || language === 'default') language = navigator.language.substring(0, 2)
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            // console.log(filesRoute+language+".json");
            const file:string = filesRoute+language+".json"
            xhttp.open("GET", file);
            xhttp.send();
            xhttp.onload = () => {
                if(xhttp.status !== 200) reject({name:'TranslateEasy onload',status:xhttp.status, file});
                const translationsJson = JSON.parse(xhttp.response);
                this.translations = new Map(Object.entries(translationsJson));
                resolve();
            };
            xhttp.onerror = () => {
                reject({name:'TranslateEasy onerror',status:xhttp.status, file});
            }
        })
    }

    translate(key:string) {
        return (this.translations.has(key))? this.translations.get(key) : key;
    }

    translateTemplate(){
        this.translations.forEach((value:string, key:string) => {
            if(key) {
                const elements = document.querySelectorAll("[translate="+key+"]");
                elements.forEach((element) => element.innerHTML = value || key)
            }
        })
    }
}