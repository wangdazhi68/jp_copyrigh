export function identityType() {
    switch (this.userinfo.identityType) {
        case '101':
            return '身份证'
            break;
        case '102':
            return '军官证'
            break;
        case '103':
            return '护照'
            break;
        case '104':
            return '士兵证'
            break;
        case '111':
            return '组织机构代码或统一社会信用代码'
            break;
        case '999':
            return '其它'
            break;
    }
}