const RI = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51];
let matrixMultVector = (arr, vector, dimension) => {
    let result = [];
    for (let row = 0; row < dimension; row++) {
        let temp = 0;
        for (let col = 0; col < dimension; col++) {
            temp += (arr[row][col] * vector[col]);  // 实际上vector这里的col为行号
        }
        result.push(temp);
    }
    return result;
}

let normalizeColumnFroMatrix = (arr, dimension) => {
    let result = [];

    // 每一列求和
    let columnTotal = [];
    for (let col = 0; col < dimension; col++) {
        let total = 0;
        for (let row = 0; row < dimension; row++) {
            total += arr[row][col];
        }
        columnTotal.push(total);
    }

    // 元素按列归一化
    for (let row = 0; row < dimension; row++) {
        result.push([]);
        for (let col = 0; col < dimension; col++) {
            let normalValue = arr[row][col] / columnTotal[col];
            result[row].push(normalValue);
        }
    }

    return result;
}

/**
 * @description 检查是否为一致阵
 * @example
 *   let mat = [[1,2,5],[0.5,1,2],[0.2,0.5,1]]
 *   let ret = isConsistentMatrix(mat, 3)
 * @param {Array[Array]} arr 
 * @param {Number} dimension
 * @returns 
 */
let isConsistentMatrix = (arr, dimension) => {
    for (let i = 0; i < dimension; i++) {
        for (let j = i; j < dimension; j++) {
            for (let k = j; k < dimension; k++) {
                let ret = arr[i][j] * arr[j][k];
                if (ret != arr[i][k]) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * @description 求最大特征根λ
 * @example
 *   let mat = [[1,2,5],[0.5,1,2],[0.2,0.5,1]]
 *   let ret = getMaxLamda(mat, 3)
 * @param {Array[Array]} arr 
 * @param {Array} vector 
 * @param {Number} dimension 
 * @returns
 */

let getMaxLamda = (arr, dimension) => {
    // 矩阵按列归一
    let newArr = normalizeColumnFroMatrix(arr, dimension);

    // 矩阵按行求和，再求平均
    let averageVector = [];
    for (let row = 0; row < dimension; row++) {
        averageVector.push(0);
        for (let col = 0; col < dimension; col++) {
            averageVector[row] = averageVector[row] + newArr[row][col];
        }
    }
    for(let i = 0; i < dimension; i++){
        averageVector[i] = averageVector[i] / dimension;
    }


    let temp =  matrixMultVector(arr,averageVector,dimension);
    // 按行与特征向量求比值，求和后，再平均
    let lamada = 0
    for (let i = 0; i < dimension; i++) {
        lamada = lamada + (temp[i] / averageVector[i])
    }
    lamada = lamada / dimension;

    return lamada;
}


/**
 * @description 方根法特征向量vector
 * @example
 *   let mat = [[1,2,5],[0.5,1,2],[0.2,0.5,1]]
 *   let ret = rootMethod(mat, 3)
 * @param {Array[Array]} arr 
 * @param {Number} dimension 
 * @returns
 */
let rootMethod = (arr, dimension) => {
    let vector = [];
    // 每行元素求积
    for (let row = 0; row < dimension; row++) {
        let temp = 1;
        for (let col = 0; col < dimension; col++) {
            temp = temp * arr[row][col];
        }
        vector.push(temp);
    }
    // 开N次方
    for (let i = 0; i < dimension; i++) {
        vector[i] = Math.pow(vector[i], 1 / dimension);
    }

    // 归一化
    let total = 0;
    for (let i = 0; i < dimension; i++) {
        total = total + vector[i];
    }
    for (let i = 0; i < dimension; i++) {
        vector[i] = vector[i] / total;
    }
    return vector;
}

/**
 * @description 和积法(Asymptotic Normalization Coefficient)求特征向量vector
 * @example
 *   let mat = [[1,2,5],[0.5,1,2],[0.2,0.5,1]]
 *   let ret = rootMethod(mat, 3)
 * @param {Array[Array]} arr 
 * @param {Number} dimension 
 * @returns
 */
let ANCMethod = (arr, dimension) => {
    let vector = [];

    // 求权重向量vector
    let total = 0;
    let newArr = normalizeColumnFroMatrix(arr, dimension);
    for (let row = 0; row < dimension; row++) {
        vector.push(0);
        for (let col = 0; col < dimension; col++) {
            vector[row] = vector[row] + newArr[row][col];
            total = total + newArr[row][col];
        }
    }
    // 归一化
    vector.forEach((value, index, arr) => {
        arr[index] = value / total
    });

    return vector;
}
/**
 * @description 层次分析法(Analytic Hierarchy Process)只能处理三维以上的矩阵
 * @example
 *   let mat = [[1,2,5],[0.5,1,2],[0.2,0.5,1]]
 *   let ret = ahpMethod(mat, 3)
 * @param {Array[Array]} arr 
 * @param {Number} dimension 
 * @returns 
 */
let ahpMethod = (arr, dimension) => {
    let result = {
        lamda: 0,
        vector: [0, 0, 0],
        CI: 0,
        CR: 0
    }

    // 求特征向量
    result.vector = ANCMethod(arr, dimension);


    // 求lamda:   
    // ps:实际上求maxlamda时也求了vector，即avaragevector
    result.lamda = getMaxLamda(arr, dimension);


    // 求CI
    result.CI = (result.lamda - dimension) / (dimension - 1);

    // 求CR
    result.CR = result.CI / RI[dimension];

    return result;
}


export { isConsistentMatrix,rootMethod,ANCMethod, ahpMethod }
