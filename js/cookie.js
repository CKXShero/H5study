// 获取cookie键值对字符串 转换为对象
function myGetCookie(){
    // 定义对象储存 cookie 键值对转化的对象
    const obj = {};
    // 获取 cookie键值对字符串
    let str = document.cookie;
    // 将 str 字符串 以 分号空格为间隔转化为数组
    const arr1 = str.split('; ');
    // 循环遍历 arr1 将 储存的数据item  
    arr1.forEach(item=>{
        // item 键值对 以 等号为间隔 分割为数组
        const arr2 = item.split('=');
        // arr2,索引0储存的是 对象的键名 arr2,索引1储存的是 对象的键值
        // 使用 window.decodeURIComponent() 还原 十六进制数值
        obj[ arr2[0] ] = window.decodeURIComponent( arr2[1] );
    })
    // 返回这个对象
    return obj;
}

// 设定 cookie 键值对
// 参数1: cookie键名
// 参数2: cookie键值
// 参数3: cookie时效,默认是空字符串也就是session时效
// 参数4: cookie路径,默认是空字符串也就是当前文件所在文件夹
function mySetCookie(key,val,time = '' , path = ''){
    // 如果有时间时效参数输入 设定时间时效
    // 否则 time 就是 空字串
    if( time !== '' ){
        // 获取时间对象
        t = new Date();
        // 设定 时间戳 
        // 当前时间戳 - 8小时毫秒 + 参数时效时间毫秒
        t.setTime( t.getTime() - 8*60*60*1000 + time*1000 );
        // 赋值给 time
        time = t;
    }

    // 设定 cookie
    document.cookie = `${key}=${val};expires=${time};path=${path}`;
}