module.exports=(temp,product)=>{//module.export ile modulde dışa aktarılacak fonksiyonu seçtik.
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);//g onu global yapar, yani bütün sayfadaki product name'leri temsil eder.
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);

    if(!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g,"not-organic");
    return output;
}
//ismi olmayan fonks=anonymous fonks. - ör. yukarıdaki fonks-