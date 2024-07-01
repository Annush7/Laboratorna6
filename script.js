// Массив медикаментів з описами
const medicines = [  
    { name: "Noshpa", price: 170, description: "Ліки, що містять дротаверин, використовуються для зняття спазмів гладкої мускулатури, зокрема при болях у животі та м'язових спазмах." },  
    { name: "Analgin", price: 55, description: "Анальгетик і жарознижуючий засіб, що використовується для полегшення болю різного походження та зниження температури." },  
    { name: "Quanil", price: 310, description: "Антигельмінтний препарат, що застосовується для лікування різних гельмінтозів, включаючи інвазії круглими черв'яками." },  
    { name: "Alphacholine", price: 390, description: "Гепатопротекторний засіб, що застосовується для підтримки та захисту функцій печінки." },
    { name: "Paracetamol", price: 60, description: "Жарознижуючий і знеболюючий засіб, який використовується для зниження температури та полегшення болю." },
    { name: "Ibuprofen", price: 80, description: "Нестероїдний протизапальний препарат, що зменшує запалення, біль і температуру." },
    { name: "Aspirin", price: 50, description: "Ліки з протизапальною, жарознижуючою та антиагрегантною дією, часто використовуються для профілактики серцево-судинних захворювань." },
    { name: "Citramon", price: 90, description: "Комбінований препарат, що містить парацетамол, аспірин і кофеїн, використовується для полегшення головного болю та зниження температури." },
    { name: "Linex", price: 150, description: "Пробіотичний засіб, що містить корисні бактерії, використовується для нормалізації мікрофлори кишківника." },
    { name: "Mezym", price: 120, description: "Ферментний препарат, що поліпшує травлення, сприяє розщепленню білків, жирів і вуглеводів." },
    { name: "Panadol", price: 70, description: "Торгова марка парацетамолу, знеболюючий і жарознижуючий засіб, що використовується для лікування болю та гарячки." },
    { name: "Smecta", price: 110, description: "Препарат на основі діосмектиту, застосовується для лікування діареї та симптоматичного полегшення болю в шлунково-кишковому тракті." }
];

// Функція для застосування знижки
const applyDiscount = medicines => {
    return medicines.map((medicine, index) => {
        if (medicine.price > 300) {
            return { id: index + 1, ...medicine, price: medicine.price * 0.7, sale: true };
        }
        return { id: index + 1, ...medicine, sale: false };
    });
};

const discountedMedicines = applyDiscount(medicines);

// Додавання рядків до таблиці
const addTableRows = (medicines, callback) => {
    const medicineTableBody = document.getElementById('medicineTableBody');
    medicines.forEach(medicine => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medicine.id}</td>
            <td>${medicine.name}${medicine.sale ? '<span class="sale-icon">Sale</span>' : ''}</td>
            <td>${medicine.price.toFixed(2)}</td>
        `;
        medicineTableBody.appendChild(row);
    });
    callback();
};

// Додавання рядків до таблиці з callback функцією
addTableRows(discountedMedicines, () => {
    console.log('Рядки додані до таблиці.');
});

// Функція для отримання деталей продукту
const getProductDetails = (productId, successCallback, errorCallback) => {
    const product = discountedMedicines.find(medicine => medicine.id === productId);
    if (product) {
        successCallback(product);
    } else {
        errorCallback('Product not found');
    }
};

// Функція-конструктор Storage для управління складом товарів
function Storage(initialItems) {
    this.items = initialItems;

    this.getItems = () => {
        return this.items;
    };

    this.addItem = (item) => {
        this.items.push(item);
    };

    this.removeItem = (item) => {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    };
}

const arr = ["Sinupred", "Sonmil", "Melatonin B6"];
const storage = new Storage(arr);

// Функція для перевірки правильності закриття дужок
const checkBrackets = (str) => {
    const stack = [];
    const openBrackets = ['(', '{', '['];
    const closeBrackets = [')', '}', ']'];
    const bracketsMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of str) {
        if (openBrackets.includes(char)) {
            stack.push(char);
        } else if (closeBrackets.includes(char)) {
            if (stack.pop() !== bracketsMap[char]) {
                const lineNumber = (str.substring(0, str.indexOf(char)).match(/\n/g) || []).length + 1;
                return { result: false, line: lineNumber };
            }
        }
    }

    return { result: stack.length === 0, line: null };
};

// Додаткові функції для демонстрації роботи Storage
const displayItems = () => {
    const storageItemsDiv = document.getElementById('storageItems');
    storageItemsDiv.innerHTML = storage.getItems().join(', ');
};

const addItem = () => {
    const newItem = prompt('Введіть назву нового товару:');
    if (newItem) {
        storage.addItem(newItem);
        displayItems();
    }
};

const removeItem = () => {
    const itemToRemove = prompt('Введіть назву товару для видалення:');
    if (itemToRemove) {
        storage.removeItem(itemToRemove);
        displayItems();
    }
};

// Додавання товарів з масиву до таблиці
const addArrayToTable = () => {
    const medicineTableBody = document.getElementById('medicineTableBody');
    arr.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${discountedMedicines.length + index + 1}</td>
            <td>${item}</td>
            <td>N/A</td>
        `;
        medicineTableBody.appendChild(row);
    });
};

// Пошук продукту та виклик getProductDetails
const searchProduct = () => {
    const productId = parseInt(prompt('Введіть ID товару:'));
    getProductDetails(productId, 
        product => {
            const productDetailsDiv = document.getElementById('productDetails');
            productDetailsDiv.innerHTML = `
                <p>Назва: ${product.name}</p>
                <p>Ціна: ${product.price.toFixed(2)} грн</p>
                <p>Опис: ${product.description}</p>
                ${product.sale ? '<p>Знижка: Так</p>' : ''}
            `;
        },
        error => {
            alert(error);
        }
    );
};