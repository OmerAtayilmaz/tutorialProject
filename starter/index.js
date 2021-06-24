//routing real-world projeclerde komplike olabiliyor bunun önüne geçmek için Express kullanırız.
const fs = require('fs');
const http=require('http');
const url = require('url');//1. url seçip ctr -d yaparsak 2. url'i de oto seçer.

const slugify = require('slugify'); //node_modules klasöründe arayıp bulur.not:dependencies kısmında slugifyı belirttik!

//kendi yaptığımız modüle erişim
const replaceTemplate=require("./modules/replaceTemplates");//modul olduğu için uzantı olan .js yazmamıza gerek yok


//top-level code 1 kez çalıştırılacağı için bloklama yapamaz.
//sadece 1 kere ve başlangçta çalıştırabiir kodlarda : Synchronous - sync- kullanılabilir.


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct  = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');//. kullanmak yerine direk bu stili kullanmak daha iyi. root dosyasının yolunu alarak çalışır    
const dataObj= JSON.parse(data);
 
//slugify kullanımı - npm'den baktık
const slugs =dataObj.map(el=>slugify(el.productName,{lower:true}));
console.log(slugs);

console.log(slugify('Fresh Avocados',{lower:true}));

const server2 = http.createServer((req,res)=>{
   //console.log(req.url); - tıklanan urli verir=>/product gibi
   const  {query,pathname}=url.parse(req.url,true);
   console.log(pathname);

    //Overview page
   // const pathName = req.url;
    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('');//arrow function kullanmasaydık içteki fonks. return etmemiz gerekirdi. fakat {} olmadan arrow function zaten otomatik olarak return uygular.
        const output =tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);

        res.end(output);
        


    //Product page
    } else if (pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'});
        const product =dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
       // res.end(tempProduct);
       res.end(output);
    }

    //Api
    else if(pathname==='/api'){
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);
        //. kullanmak yerine direk bu stili kullanmak daha iyi. root dosyasının yolunu alarak çalışır
        //tarayıcıya gönderdiğimiz verinin JSON olduğunu belirtmemiz gerekir.
         //index.js in bulunduğu klasörün yolunu alır:console.log(__dirname); 
    }//Not found
    else{
        res.writeHead(404,{
            'Content-type':'text/html', //h1 etiketlerini kullanılabilir hale getirdim.
            'my-own-header':'hello-world'//network-hataya tıkla-header>> hello-world vs. detaylar görünür.
        }); //hatayı consoleda verir -tarayıcı consolunda -
            //content üzerine type belirleme her zaman res.end()'ten önce yazılır.

        res.end('<h1>This page cannot be found</h1>');
    }
    
    /*http://127.0.0.1:8080/overview link girersek 
    req.url = /overview olacaktır.

    http://127.0.0.1:8080/ olduğunda ise
    req.url=/ olacaktır.
     =/favicon.ico da var fakat göz ardı ediyoruz.
    */
});


server2.listen(8080,'127.0.0.1',()=>{
    console.log('listening to request on port 8080');
});

/* distintcion:ayrım */











/* const fs = require('fs');
const http = require('http');

//shift-alt-a blok olarak deaktif eder /* ... şeklinde */

/* //Server
const  server =http.createServer((req,res)=>{
    //console.log(req);
    res.end('Hello from the server!');
    //req(request): url,data gibi şeyleri tutar.
    //res(response): gives us a lots of tools - hazır toolslar içerir. ör: res.end(), end hazır bir tools

});
server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on port 8000');
});


//standart ip adres for localhost: 127.0.0.1, portu(8000) değiştirebiliriz.
//ctrl - c ile serverden çıkılır.


*/ 

/*
//Using async-Asynchronous way - non blocking - 
const fs = require('fs');
fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
        if(!err)console.log(data2);
        fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{//2. parametre yazdırılacak data
                console.log('Your file has been written!😊😊');
            });
        });
    });
});
console.log('önceki işlem(s) başladı fakat bu önce bittiği için bunu yazdırdı.');

*/

/*//Sync-synchronous way  - blocking 
const fs =require('fs');//modüle erişim sağladık.

//reading data
const jsonData= fs.readFileSync('./dev-data/data.json','utf-8');
const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(jsonData);

//write process
const textOut =`This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);



const hello = 'Hello World';
console.log(hello);
*/


/*const fs =require('fs');
const http =require('http');
const url = require('url');

const server = http.createServer((req,res)=>{//res:respons, req:request
    console.log(req.url);//yazılan urli verir.

    const pathName = req.url;

    if(pathName===`/`||pathName===`/overview`){
        res.end('this is the OverView!');
    }
    else if(pathName===`/product`)
    {
        res.end('this is the Product!');
    }
    else
    {
        res.writeHead(404,
            {
                'Content-type':'text/html',
                'my-own-header':'hello-text'
            });
        res.end('<h1>Page not found!</h1>');//yukarıdaki content type sayesinde h1 olarak kullanabildik
    }
    
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
});
*/

//blocking, synchronous way
/*const textIn =fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOut = `this is what we know about the avocado: ${textIn} .\nCreated on ${Date.now()}`; 

fs.writeFileSync('./txt/output.txt',textOut);
console.log(`File written`);
*/

//non-blocking, synchronous way
/*fs.readFile('./txt/start.txt',`utf-8`,(err,data1)=> {
    if(err)return console.log("ERROR!!😷☢😥");//hata verirse, döner ve biter.
    fs.readFile(`./txt/${data1}.txt`,`utf-8`,(err,data2)=> { 
        console.log(data2);//önce yazdırır
        fs.readFile(`./txt/append.txt`,`utf-8`,(err,data3)=> { 
            console.log(data3);//sonra yazdırır - en dış önceliklidir. -
            
            //dataları birleştirip finale yazdırdık
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,`utf-8`,err=>{
                console.log('Your file has been written👍😁');
            });
        });
    });
});
console.log(`will read file!`); 
*/

/*

const helloWorld ='Hello world!';
console.log(helloWorld);
*/

