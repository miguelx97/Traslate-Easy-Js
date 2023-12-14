export default class TranslateEasy {

    constructor() {}

    private translations:Map<string,string> = new Map();

    async init(language:string, filesRoute:string = './'):Promise<void> {
        if(!language || language === 'default') language = navigator.language.substring(0, 2)
        return new Promise((resolve, reject) => {
            // console.log(filesRoute+language+".json");
            const file:string = filesRoute+language+".json"
            fetch(file).then(response => response.json()).then(translationsJson => {
                this.translations = new Map(Object.entries(translationsJson));
                resolve();
            }).catch(error => {
                console.log(error);
                reject({name:'TranslateEasy error', error, file});
            });
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