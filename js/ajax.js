// 封装ajax请求
// 参数1  url地址
// 参数2  请求方式
// 参数3  携带的数据
// 参数4  回调函数  默认值是空函数
function myAjax( url , type , data , cb = function(){} ){
    // 1, 创建 ajax对象  兼容低版本IE浏览器
    let xhr;
    if( XMLHttpRequest ){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 2, 设定 open get方式在url地址栏之后拼接参数
    if( type === 'get' ){
        xhr.open( type , `${url}?${data}` );
    }else{
        xhr.open( type , url );
    }

    // 3, 如果是 post方式设定响应头
    if( type === 'post' ){
        xhr.setRequestHeader( 'Content-Type' , 'application/x-www-form-urlencoded' );
    }

    // 4, 设定send()
    // 如果是 post方式 在 send() 中 设定 携带数据
    if( type === 'get' ){
        xhr.send()
    }else{
        xhr.send(data);
    }

    // 5, 接收响应体结果
    // 兼容低版本IE浏览器

    // 当 ajax状态码改变时触发
    xhr.onreadystatechange = function(){
        // ajax状态码 是 4  表示 请求结束
        // http状态码 是 200 - 299  表示 请求成功 
        // 此时可以获取响应体数据结果
        if( xhr.readyState === 4 && ( xhr.status >= 200 && xhr.status <= 299 ) ){
            // 执行 传参的回调函数 回调函数的参数是 响应体结果
            cb( xhr.response );
        }
    }

}


// 封装一个 jQuery的 promise ajax请求
// 封装了一个 promise对象 并且返回了这个对象
// 调用 jQuery 的 ajax 请求 输入请求的各项参数
function pJqueryAjax( url , type , data , dataType ){
    const p = new Promise( (f,r)=>{
        // 调用 jQuery 的 ajax 请求
        $.ajax({
            url:url,
            type:type,
            data:data,
            dataType:dataType,
            success: f,
            error: r,
        }) 
    })

    // 返回这个promise对象
    return p;
}
