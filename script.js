// DOM Element
const nameInput = document.getElementById('nameInput');
const designationInput = document.getElementById('designationInput');
const departmentInput = document.getElementById('departmentInput');
const idNoInput = document.getElementById('idNoInput');
const photoInput = document.getElementById('photoInput');

const previewName = document.getElementById('previewName');
const previewDesignation = document.getElementById('previewDesignation');
const previewDepartment = document.getElementById('previewDepartment');
const previewID = document.getElementById('previewID');
const profileImage = document.getElementById('profileImage');
const downloadBtn = document.getElementById('downloadBtn');
const cardToCapture = document.getElementById('cardToCapture');

// Barcode 
function generateBarcode(text) {
  
    const barcodeText = text.trim() === "" ? "JIT0030" : text;

    JsBarcode("#barcode", barcodeText, {
        format: "CODE128", 
        lineColor: "#000", 
        width: 2,          
        height: 40,        
        displayValue: false,
        background: "transparent" 
    });
}


function updatePreview() {
    previewName.textContent = nameInput.value || 'Name';
    previewDesignation.textContent = designationInput.value || 'Designation';
    previewDepartment.textContent = departmentInput.value || 'Department';
    

    const idValue = idNoInput.value || 'JIT0000';
    previewID.textContent = idValue;
    
    generateBarcode(idValue);
}

nameInput.addEventListener('input', updatePreview);
designationInput.addEventListener('input', updatePreview);
departmentInput.addEventListener('input', updatePreview);
idNoInput.addEventListener('input', updatePreview);

photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

downloadBtn.addEventListener('click', function() {
    downloadBtn.textContent = "Generating High Quality ID...";
    downloadBtn.disabled = true;

    // Yahan fix kiya hai taaki photo position aur quality sahi aaye
    html2canvas(cardToCapture, {
        scale: 3, 
        useCORS: true,
        backgroundColor: null,
        scrollX: 0, // Fixes image shifting
        scrollY: 0, // Fixes image shifting
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `JIT_ID_${idNoInput.value || 'Card'}.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        downloadBtn.textContent = "Download ID Card";
        downloadBtn.disabled = false;
    });
});

window.onload = updatePreview;