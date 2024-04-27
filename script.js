// دالة لتغيير لون الشريط على المقاومة
function changeColor(divId, color) {
    document.getElementById(divId).style.backgroundColor = color;
    // إغلاق جميع القوائم عند تغيير اللون
    document.querySelectorAll('.color-list').forEach(list => {
        list.style.display = 'none';
    });
}

// إضافة مستمعين للأحداث لكل شريط لفتح القائمة المناسبة عند النقر
document.querySelectorAll('.band').forEach(item => {
    item.addEventListener('click', event => {
        var colorListId = event.target.id.replace('colorDiv', 'colorList');
        var colorList = document.getElementById(colorListId);
        // فتح القائمة المناسبة أو إغلاقها
        colorList.style.display = (colorList.style.display === "block") ? "none" : "block";
        // إغلاق القوائم الأخرى
        document.querySelectorAll('.color-list').forEach(list => {
            if (list.id !== colorListId) {
                list.style.display = 'none';
            }
        });
    });
});

// مصفوفة لقيم الألوان
const colorValues = {
    'black': 0, 'brown': 1, 'red': 2, 'orange': 3, 'yellow': 4,
    'green': 5, 'blue': 6, 'violet': 7, 'grey': 8, 'white': 9,
    'gold': -1, 'silver': -2
};

// دالة لحساب المقاومة بناءً على ألوان الأشرطة
function calculateResistance() {
    const bands = [];
    // جمع قيم الألوان للأشرطة الثلاثة الأولى
    for (let i = 1; i <= 3; i++) {
        const color = document.getElementById(`colorDiv${i}`).style.backgroundColor;
        if (color in colorValues) {
            bands.push(colorValues[color]);
        } else {
            document.getElementById('resistanceValue').innerText = 'أدخل جميع الألوان الثلاثة أولاً';
            return;
        }
    }
    // تحويل القيم إلى رقم المقاومة
    let resistance = (bands[0] * 10 + bands[1]) * Math.pow(10, bands[2]);
    // تحديد الدقة بناءً على الشريط الرابع
    const toleranceColor = document.getElementById('colorDiv4').style.backgroundColor;
    const tolerance = toleranceColor in colorValues ? colorValues[toleranceColor] : '';
    // تعريف الدقة
    const toleranceText = tolerance === -1 ? '±5%' : tolerance === -2 ? '±10%' : '';
    // عرض القيمة
    if (resistance >= 1000 && resistance < 1000000)
    {
        
        resistance = resistance / 1000;
        document.getElementById('resistanceValue').innerText = ` ${resistance} kΩ ${toleranceText}`;
    }
    else if (resistance >= 1000000) {
        resistance = resistance / 1000000;
        document.getElementById('resistanceValue').innerText = ` ${resistance} MΩ ${toleranceText}`;
    }
    else {
        document.getElementById('resistanceValue').innerText = ` ${resistance} Ω ${toleranceText}`;
    }
}
