function pAjax(url,type,data,dataType){
    const p = new Promise(function(f,r){
        $.ajax({
            url:url,
            type:type,
            data:data,
            dataType:dataType,
            success:f,
            error:r
        })
    })
    return p;
}