export class Api {
    public static request(obj){
        return new Promise((resolve, reject) =>{

            if (!obj) reject(new Error('Haven\'t setting'));

            const request:XMLHttpRequest = new XMLHttpRequest();

            request.onload = function () {
                if (obj.statusAcceptence.indexOf((<any>this).status) == 0) {
                    resolve({
                        response: (<any>this).response,
                        headers: (<any>this).getAllResponseHeaders()
                    });
                } else {
                    reject(new Error((<any>this).statusText));
                }
            };

            request.onerror = function () {
                reject(new Error('XMLHttpRequest Error: ' + JSON.stringify(<any>this)));
            };

            request.ontimeout = function(){
                reject(new Error('XMLHttpRequest Error: timeout'));
            };

            request.onloadstart = function(){
                if (obj.onloadstart) obj.onloadstart();
            };

            request.onloadend = function(){
                if (obj.onloadend) obj.onloadend();
            };

            request.onprogress = function(){
                if (obj.onprogress) obj.onprogress();
            };

            //XHR settings
            if (obj.timeout){request.timeout = obj.timeout;}
            if (!obj.method){obj.method = 'GET'}
            request.open(obj.method, obj.url, true);

            if (obj.headers && obj.headers.length){
                for (let i = 0; i < obj.headers.length; i++) {
                    request.setRequestHeader(obj.headers[i].name, obj.headers[i].value);
                }
            }
            obj.body?request.send(obj.body):request.send();

        });
    };
};