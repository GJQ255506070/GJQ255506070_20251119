// 商品类
class Product {
    constructor(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // 添加库存
    addStock(quantity) {
        this.stock += quantity;
    }

    // 减少库存
    reduceStock(quantity) {
        if (this.stock >= quantity) {
            this.stock -= quantity;
            return true;
        }
        return false;
    }

    // 获取商品信息
    getInfo() {
        return {
            name: this.name,
            price: this.price,
            stock: this.stock
        };
    }
}

// 售货机类
class SellingMachine {
    constructor() {
        this.products = new Map(); // 使用Map存储商品
        this.initDefaultProducts();
    }

    // 初始化默认商品
    initDefaultProducts() {
        const defaultProducts = [
            { name: '可口可乐', price: 3.0, stock: 10 },
            { name: '雪碧', price: 3.0, stock: 8 },
            { name: '矿泉水', price: 2.0, stock: 15 },
            { name: '薯片', price: 5.0, stock: 6 },
            { name: '巧克力', price: 6.0, stock: 12 }
        ];

        defaultProducts.forEach(item => {
            this.products.set(item.name, new Product(item.name, item.price, item.stock));
        });
    }

    // 列出所有商品
    listProducts() {
        console.log('=== 售货机商品列表 ===');
        if (this.products.size === 0) {
            console.log('暂无商品');
            return [];
        }

        const productList = [];
        this.products.forEach((product, name) => {
            const info = product.getInfo();
            productList.push(info);
            console.log(`商品：${info.name} | 价格：¥${info.price} | 库存：${info.stock}`);
        });
        console.log('==================');
        return productList;
    }

    // 补货
    restock(productName, quantity) {
        if (quantity <= 0) {
            return { success: false, message: '补货数量必须大于0' };
        }

        const product = this.products.get(productName);
        if (product) {
            product.addStock(quantity);
            return {
                success: true,
                message: `${productName} 补货成功，添加了 ${quantity} 件，当前库存：${product.stock}`
            };
        } else {
            return { success: false, message: `商品 "${productName}" 不存在` };
        }
    }

    // 销售商品
    sellProduct(productName, quantity, money) {
        if (quantity <= 0) {
            return { success: false, message: '购买数量必须大于0' };
        }

        if (money <= 0) {
            return { success: false, message: '支付金额必须大于0' };
        }

        const product = this.products.get(productName);
        if (!product) {
            return { success: false, message: `商品 "${productName}" 不存在` };
        }

        const totalPrice = product.price * quantity;

        // 检查库存
        if (product.stock < quantity) {
            return {
                success: false,
                message: `库存不足！当前库存：${product.stock}，需要：${quantity}`
            };
        }

        // 检查金额
        if (money < totalPrice) {
            return {
                success: false,
                message: `金额不足！需要：¥${totalPrice}，支付：¥${money}，还差：¥${(totalPrice - money).toFixed(2)}`
            };
        }

        // 完成交易
        product.reduceStock(quantity);
        const change = money - totalPrice;

        return {
            success: true,
            message: `购买成功！商品：${productName}，数量：${quantity}，总价：¥${totalPrice}，支付：¥${money}，找零：¥${change.toFixed(2)}`,
            change: change,
            productInfo: product.getInfo()
        };
    }

    // 添加新商品
    addProduct(name, price, stock) {
        if (this.products.has(name)) {
            return { success: false, message: `商品 "${name}" 已存在` };
        }

        this.products.set(name, new Product(name, price, stock));
        return { success: true, message: `商品 "${name}" 添加成功` };
    }

    // 获取商品总数
    getProductCount() {
        return this.products.size;
    }

    // 获取总库存价值
    getTotalValue() {
        let totalValue = 0;
        this.products.forEach(product => {
            totalValue += product.price * product.stock;
        });
        return totalValue.toFixed(2);
    }
}

// 导出类（如果在Node.js环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Product, SellingMachine };
}