function isClass(func) {
    if (!(func && func.constructor === Function) || func.prototype === undefined)
        return false;

    if (Function.prototype !== Object.getPrototypeOf(func))
        return true;

    return Object.getOwnPropertyNames(func.prototype).length > 1;
}

export default { isClass };
