// Funzioni globali per tutte le pagine

// Verifica login
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
});

function checkLogin() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const teacherName = localStorage.getItem('teacher_name');

    if (currentPage !== 'index.html' && !teacherName) {
        window.location.href = 'index.html';
    }
}

// Funzione logout
function logout() {
    if (confirm('Sei sicuro di voler uscire?')) {
        localStorage.removeItem('teacher_name');
        window.location.href = 'index.html';
    }
}

// Formattazione date
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('it-IT', options);
}

// Formattazione ore
function formatTime(time) {
    return time ? time.substring(0, 5) : '-';
}

// Calcolo media voti
function calcolaMedia(voti) {
    if (!voti || voti.length === 0) return '-';
    const sum = voti.reduce((acc, voto) => acc + parseFloat(voto), 0);
    return (sum / voti.length).toFixed(2);
}

// Converti voto stringa a numero
function votoToNumber(voto) {
    if (!voto) return 0;
    
    const votoMap = {
        '4': 4,
        '4+': 4.25,
        '4.5': 4.5,
        '5-': 4.75,
        '5': 5,
        '5+': 5.25,
        '5.5': 5.5,
        '6-': 5.75,
        '6': 6,
        '6+': 6.25,
        '6.5': 6.5,
        '7-': 6.75,
        '7': 7,
        '7+': 7.25,
        '7.5': 7.5,
        '8-': 7.75,
        '8': 8,
        '8+': 8.25,
        '8.5': 8.5,
        '9-': 8.75,
        '9': 9,
        '10': 10
    };
    
    return votoMap[voto] || 0;
}

// Salvataggio dati in localStorage
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Errore nel salvataggio dei dati:', e);
        return false;
    }
}

// Caricamento dati da localStorage
function loadData(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Errore nel caricamento dei dati:', e);
        return defaultValue;
    }
}

// Notifiche toast
function showToast(message, type = 'success') {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type}" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);

    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();

    setTimeout(() => toastContainer.remove(), 5000);
}

// Esporta dati in formato JSON
function exportData() {
    const allData = {
        votiOrali: loadData('votiOrali', {}),
        votiScritti: loadData('votiScritti', {}),
        votiDefinitivi: loadData('votiDefinitivi', {}),
        note: loadData('note', []),
        lezioni: loadData('lezioni', []),
        appelli: loadData('appelli', {}),
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DidUp_backup_${new Date().getTime()}.json`;
    link.click();
}

// Importa dati da file JSON
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('votiOrali', JSON.stringify(data.votiOrali || {}));
            localStorage.setItem('votiScritti', JSON.stringify(data.votiScritti || {}));
            localStorage.setItem('votiDefinitivi', JSON.stringify(data.votiDefinitivi || {}));
            localStorage.setItem('note', JSON.stringify(data.note || []));
            localStorage.setItem('lezioni', JSON.stringify(data.lezioni || []));
            localStorage.setItem('appelli', JSON.stringify(data.appelli || {}));
            showToast('Dati importati con successo', 'success');
        } catch (error) {
            showToast('Errore nell\'importazione dei dati', 'danger');
            console.error('Errore importazione:', error);
        }
    };
    reader.readAsText(file);
}

// Stampa tabella
function printTable(elementId, title) {
    const printWindow = window.open('', '', 'width=900,height=600');
    const element = document.getElementById(elementId);
    const content = element.innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { text-align: center; margin-bottom: 20px; color: #1E3A8A; }
                .date { text-align: right; color: #666; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p class="date">Stampato il: ${new Date().toLocaleDateString('it-IT')} ${new Date().toLocaleTimeString('it-IT')}</p>
            <table class="table table-bordered">${content}</table>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

// Validazione email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Formatta numero con separatori
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Calcola giorni tra due date
function daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Clear all storage
function clearAllData() {
    if (confirm('ATTENZIONE: Stai per eliminare TUTTI i dati. Sei sicuro?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

// Debug: visualizza tutti i dati in console
function debugData() {
    console.log('=== DEBUG DATA ===');
    console.log('Voti Orali:', loadData('votiOrali', {}));
    console.log('Voti Scritti:', loadData('votiScritti', {}));
    console.log('Voti Definitivi:', loadData('votiDefinitivi', {}));
    console.log('Note:', loadData('note', []));
    console.log('Lezioni:', loadData('lezioni', []));
    console.log('Appelli:', loadData('appelli', {}));
}
