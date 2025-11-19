// 演示自动售货系统的基本功能
const { Product, SellingMachine } = require('./vending-machine.js');

// 创建售货机实例
const vendingMachine = new SellingMachine();

console.log('🏪 自动售货系统演示');
console.log('==================');

// 1. 显示初始商品列表
console.log('\n1. 初始商品列表：');
vendingMachine.listProducts();

// 2. 测试购买商品
console.log('\n2. 测试购买商品：');
let result = vendingMachine.sellProduct('可口可乐', 2, 10);
console.log(result.message);

// 3. 测试金额不足的情况
console.log('\n3. 测试金额不足：');
result = vendingMachine.sellProduct('薯片', 1, 3);
console.log(result.message);

// 4. 测试库存不足的情况
console.log('\n4. 测试库存不足：');
result = vendingMachine.sellProduct('矿泉水', 20, 50);
console.log(result.message);

// 5. 测试补货功能
console.log('\n5. 测试补货功能：');
result = vendingMachine.restock('可口可乐', 5);
console.log(result.message);

// 6. 再次查看商品列表
console.log('\n6. 补货后的商品列表：');
vendingMachine.listProducts();

// 7. 添加新商品
console.log('\n7. 添加新商品：');
result = vendingMachine.addProduct('果汁', 6.5, 8);
console.log(result.message);

// 8. 显示最终商品列表和统计信息
console.log('\n8. 最终商品列表：');
vendingMachine.listProducts();
console.log(`商品种类：${vendingMachine.getProductCount()}`);
console.log(`总库存价值：¥${vendingMachine.getTotalValue()}`);

console.log('\n✅ 演示完成！');