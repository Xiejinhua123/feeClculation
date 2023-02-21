// 过户费
// 过户费率 0.00002
function transferFees(unitPrice, quantity) {
    var turnoverValue = turnover(unitPrice, quantity);
    var transferFeesStr = accMul(turnoverValue, 0.00002).toFixed(2);
    return parseFloat(transferFeesStr);
}

// 佣金
// 佣金费率 0.00025
function crowded(unitPrice, quantity) {
    var turnoverValue = turnover(unitPrice, quantity);
    var crowdedStr = accMul(turnoverValue, 0.00025).toFixed(2);
    var crowded = parseFloat(crowdedStr);
    if (crowded < 5) {
        crowded = 5;
    }
    return crowded;
}

// 印花税
// 印花税率 0.001
function stampDuty(unitPrice, quantity) {
    var turnoverValue = turnover(unitPrice, quantity);
    var stampDutyStr = accMul(turnoverValue, 0.001).toFixed(2);
    return parseFloat(stampDutyStr);
}

// 成交额
function turnover(unitPrice, quantity) {
    if (!unitPrice) {
        unitPrice = 0;
    }
    if (!quantity) {
        quantity = 0;
    }
    return accMul(unitPrice, quantity);
}

// 除法
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return accMul((r1 / r2), pow(10, t2 - t1));
    }
}
//乘法 
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//加法 
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//减法 
function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
}

function findObj(theObj, theDoc) {
    var p, i, foundObj;
    if (!theDoc) {
        theDoc = document;
    }

    if ((p = theObj.indexOf("?")) > 0 && parent.frames.length) {
        theDoc = parent.frames[theObj.substring(p + 1)].document;
        theObj = theObj.substring(0, p);
    }

    if (!(foundObj = theDoc[theObj]) && theDoc.all) {
        foundObj = theDoc.all[theObj];
    }

    for (i = 0; !foundObj && i < theDoc.forms.length; i++) {
        foundObj = theDoc.forms[i][theObj];
    }

    for (i = 0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) {
        foundObj = findObj(theObj, theDoc.layers[i].document);
    }

    if (!foundObj && document.getElementById) {
        foundObj = document.getElementById(theObj);
        return foundObj;
    }
}