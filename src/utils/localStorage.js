const ls = localStorage;

export default {
    // 写入用户数据
    setItem (name, value) {
        ls.setItem(name, JSON.stringify(value));
    },
    getItem(name) {
        try {
            return JSON.parse(ls.getItem(name));
        } catch(e) {
            console.log(`查询出错: ${e}`);
            return null;
        }
    },
    removeItem(name) {
        ls.removeItem(name)
    }
}