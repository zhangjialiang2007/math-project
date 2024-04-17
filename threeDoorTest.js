

let randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
let onceTest = (change) => {
    // 初始化奖励
    let reward = [0, 0, 0];
    let index = randomInt(3);
    reward[index] = 1;

    // 答题人第一次选择
    index = randomInt(3);
    let result = reward[index];

    // 选择更换答案策略
    if (change) {
        // 主持人从另外两个答案中去除一个错误答案
        let leftReward = reward.filter(item => item !== result);
        for (let i = 0; i < leftReward.length; i++) {
            if (leftReward[i] == 0) {
                leftReward.splice(i, 0);
                break;
            }
        }

        //答题人更换答案
        result = leftReward[0];
    }


    return result
}
let threeDoorTest = (times, change) => {
    let sum = 0;
    for(let i = 0; i < times; i++){
        sum = sum + onceTest(change);
    }
    return sum;
}


export { threeDoorTest }
