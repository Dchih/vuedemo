/**
 * 随机验证码制造函数
 * 
 * @param {*} num 
 * @param {*} letters 
 */
export default function (num = 6, letters='QWERTYUIOPLKJHGFDSAZXCVBNM1234567890') {
    let tpl = '';
    let captcha = [];

    try {
        // for(let i = 0; i < num; ++i) { captcha.push(letters[Math.random()*letters.length])}
        // 实现2
        captcha = [...Array(num)].map(() => letters[Math.floor(Math.random()*letters.length)])
    } catch(e) { console.log(e) }

    captcha.forEach((item) => {
        tpl += `<span class="flex1 hcenter">${item}</span>`
    })

    captcha = captcha.join('');

    return {
        tpl,
        captcha
    }
}