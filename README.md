# Argo DidUp - Clone Fedele

Un'applicazione web completa che replica le funzionalità del registro elettronico Argo DidUp, sviluppata con HTML5, Bootstrap 5 e JavaScript vanilla con localStorage.

## 🎨 Caratteristiche Principali

### Layout e Design
- **Sidebar sinistra blu** (#1E3A8A) con navigazione principale
- **Navbar superiore** con logo DidUp e nome docente
- **Design responsivo** con Bootstrap 5
- **Colori DidUp**: Blu #1E3A8A (navbar/sidebar), Azzurro #0D6EFD (bottoni)

### Pagine Implementate

#### 1. **index.html** - Login
- Form di accesso semplificato
- Memorizzazione nome docente in localStorage
- Reindirizzamento automatico alla dashboard se loggati

#### 2. **dashboard.html** - Dashboard Principale
- 6 card di accesso rapido:
  - Registro
  - Scrutini
  - Note
  - Valutazioni Orali
  - Valutazioni Scritte
  - Giornale di Classe

#### 3. **registro.html** - Registro Elettronico
Menu orizzontale con sezioni:
- **Appello**: 
  - Tabella alunni con bottoni P (Presente) e A (Assente)
  - Colonna "Ingressi/Uscite" con modale per aggiungere dati
  - Modale con campi: Ora lezione, Ore, Minuti, Durata assenza, Motivazione, Flag "Da giustificare"
  - Selezione data per cambio giornata

- Altre sezioni (Giornale, Prog. Didattica, Valutazioni, Note, Calendario)

#### 4. **orali.html** - Valutazioni Orali
- **Filtri data**: Dal/Al con bottone Filtra
- **Bottone**: "Aggiungi Nuova Prova"
- **Tabella alunni** con colonne:
  - ALUNNO
  - OGGI (voti inseriti oggi)
  - MEDIA VOTI
  - N° VOTI
  - Bottone di azione

- **Modale Dettaglio Voto**:
  - Select voto (4, 4+, 4½, 5-, 5, 5+, 5½, 6-, 6, 6+, 6½, 7-, 7, 7+, 7½, 8-, 8, 8+, 8½, 9-, 9, 10)
  - Checkbox "Aggiungere per Media"
  - Checkbox "Mostra alla famiglia"
  - Commento famiglia (max 250 caratteri) con contatore
  - Commento personale (max 250 caratteri) con contatore

#### 5. **scritti.html** - Valutazioni Scritte
- Identico a orali.html ma separato per voti scritti
- **Filtri date** (Dal/Al)
- **Bottone**: "Aggiungi Valutazione"
- **Bottone**: "Aggiungi Valutazione Multipla"
  - Consente di inserire lo stesso voto per più alunni
- Stessa struttura di modale per dettagli voto

#### 6. **note.html** - Note Disciplinari
- **Bottone**: "Nuova Nota"
- **Form modale**:
  - Checkbox lista alunni (selezionabili multipli)
  - Data e Ora
  - Checkbox "Mostra alla famiglia"
  - Textarea "Motivazione" (max 500 caratteri) con contatore

- **Tabella note** con colonne:
  - ALUNNO
  - DATA
  - ORA
  - DOCENTE
  - DESCRIZIONE
  - MOSTRA ALLA FAMIGLIA (badge Sì/No)
  - Bottone elimina

#### 7. **scrutini.html** - Scrutini
- **Tabellone** con colonne:
  - ALUNNO
  - MEDIA ORALI (calcolata automaticamente)
  - MEDIA SCRITTI (calcolata automaticamente)
  - MEDIA GENERALE (media tra orali e scritti)
  - VOTO PROPOSTO (calcolato automaticamente dalla media generale)
  - VOTO DEFINITIVO (modificabile con modale)
  - ASSENZE (conteggio automatico)

- **Modale Modifica Voto**:
  - Select voto
  - Note facoltative
  - Salvataggio voto definitivo

#### 8. **firma.html** - Giornale di Classe
- **Filtri**: Data (Dal/Al), Materia
- **Bottone**: "Nuova Lezione"
- **Modale Nuova Lezione**:
  - Data e Ora
  - Materia
  - Argomento svolto (textarea)
  - Compiti assegnati (textarea)

- **Tabella lezioni** con colonne:
  - DATA
  - ORA
  - MATERIA
  - ARGOMENTO SVOLTO
  - COMPITI ASSEGNATI
  - Bottone "Dettagli" e "Elimina"

## 📚 Alunni di Esempio

1. BAGALINI ALISYA GIADA
2. CAVALLO MARIACELESTE
3. CICCONE LORENZA
4. COCCO REBECCA
5. D'URBANO GABRIELE
6. DE ROSSI GIADA
7. DI LUZIO NICHOLAS
8. DI TOMO MIKAELA
9. GAUDINO MATTIA
10. MALANDRA GIULIA

## 💾 Struttura LocalStorage

```javascript
{
  "teacher_name": "Nome Docente",
  "votiOrali": {
    "ALUNNO": [
      {
        "voto": "8",
        "data": "2026-06-05",
        "media": true,
        "mostraFamiglia": true,
        "commentoFamiglia": "Ottimo lavoro",
        "commentoPersonale": "Buona preparazione"
      }
    ]
  },
  "votiScritti": { /* struttura identica a votiOrali */ },
  "votiDefinitivi": {
    "ALUNNO": "8"
  },
  "note": [
    {
      "alunno": "ALUNNO",
      "data": "2026-06-05",
      "ora": "10:30",
      "motivazione": "Testo della nota",
      "mostraFamiglia": true
    }
  ],
  "lezioni": [
    {
      "data": "2026-06-05",
      "ora": "09:00",
      "materia": "Matematica",
      "argomento": "Testo argomento",
      "compiti": "Testo compiti"
    }
  ],
  "appelli": {
    "2026-06-05": {
      "ALUNNO": "presente"
    }
  }
}
```

## 🚀 Funzionalità Automatiche

### Calcoli Automatici
- **Media voti**: Calcolata dalla media aritmetica di tutti i voti inseriti
- **Voto proposto**: Generato automaticamente dalla media generale:
  - < 5.0 → 4
  - 5.0 - 5.49 → 5
  - 5.5 - 6.49 → 6
  - 6.5 - 7.49 → 7
  - 7.5 - 8.49 → 8
  - 8.5 - 9.49 → 9
  - ≥ 9.5 → 10

- **Conteggio assenze**: Automatico da appelli
- **Badge famiglia**: Automatico in base a checkbox

### Persistenza Dati
- Tutti i dati vengono salvati in localStorage
- Dati persistenti anche dopo chiusura browser
- Funzioni export/import per backup

## 🛠️ Funzioni Utility

### File: `js/app.js`
```javascript
// Funzioni disponibili
checkLogin()           // Verifica autenticazione
logout()              // Esci dall'app
formatDate(date)      // Formatta data
formatTime(time)      // Formatta ora
calcolaMedia(voti)    // Calcola media
votoToNumber(voto)    // Converte voto a numero
saveData(key, data)   // Salva in localStorage
loadData(key, def)    // Carica da localStorage
showToast(msg, type)  // Notifica toast
exportData()          // Esporta dati JSON
importData(file)      // Importa dati JSON
printTable(id, title) // Stampa tabella
debugData()           // Visualizza dati in console
```

## 📁 Struttura File

```
Argo---DIDUP-FAMILY/
├── index.html          # Login
├── dashboard.html      # Dashboard principale
├── registro.html       # Registro con appello
├── orali.html          # Valutazioni orali
├── scritti.html        # Valutazioni scritte
├── note.html           # Note disciplinari
├── scrutini.html       # Scrutini e tabellone
├── firma.html          # Giornale di classe
├── css/
│   └── style.css       # Stili Bootstrap custom
├── js/
│   └── app.js          # Funzioni JavaScript
└── README.md           # Documentazione
```

## 🎯 Utilizzo

### Login
1. Accedi con qualsiasi username (viene salvato in localStorage)
2. Password non richiesta (ambiente di test)

### Navigazione
- Usa la sidebar sinistra per spostarti tra le sezioni
- Clicca su "Home" per tornare alla dashboard
- Bottone "Esci" in fondo alla sidebar per logout

### Inserimento Dati
- Compila i form nei modali
- I dati vengono salvati automaticamente in localStorage
- Contatori caratteri per textarea lunghe
- Validazioni basiche su campi obbligatori

### Visualizzazione Dati
- Le tabelle si aggiornano automaticamente dopo ogni modifica
- Media voti calcolata in tempo reale
- Badge colorati per status (presente/assente, Sì/No)

## 🌐 Browser Supportati
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

Sidebar collassata su mobile, menù hamburger consigliato per versioni future.

## 🔐 Note Sicurezza
- Dati salvati in localStorage (non crittografati)
- Non adatto per dati reali sensibili
- Ambiente di test/demo
- Password non implementata (aggiungere se necessario)

## 📝 Licenza
MIT License

## 👨‍💻 Sviluppo
Applicazione creata come clone fedele di Argo DidUp per scopi didattici/dimostrativi.

---

**Versione**: 1.0.0  
**Data**: 2026-06-05  
**Autore**: Copilot
