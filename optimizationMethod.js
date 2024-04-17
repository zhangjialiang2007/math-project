
let optimizationMethod = (a, b, f, rate) => {
    let threshold = (b - a) * rate;
    let result = recursionCall(a, b, f, threshold);
    return result;
}

let recursionCall = (a, b, f, threshold, p = 0, q = 0, index = 0) => {
    if (b - a < threshold) {
        return {
            a,
            b,
            index
        }
    }


    index++;
    p = a + (b - a) * 0.382;
    q = a + (b - a) * 0.618;

    console.log('第',index,'次实验后：',{a, b, p, q});

    //上凸的单峰函数
    if (f(a) < f(p) && f(p) < f(q)) { // 舍弃AP段
        a = p;
        p = q;
        return recursionCall(a, b, f, threshold, p, q, index);
    }
    else if (f(b) < f(q) && f(q) < f(p)) { // 舍弃QB段
        b = q;
        q = p;
        return recursionCall(a, b, f, threshold, p, q, index);
    }

    //下凹的单峰函数
    if (f(a) > f(p) && f(p) > f(q)) { // 舍弃AP段
        a = p;
        p = q;
        return recursionCall(a, b, f, threshold, p, q, index);
    }
    else if (f(b) > f(q) && f(q) > f(p)) { // 舍弃QB段
        b = q;
        q = p;
        return recursionCall(a, b, f, threshold, p, q, index);
    }
}

export { optimizationMethod }
