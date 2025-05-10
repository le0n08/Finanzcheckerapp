// Ein Array für die Transaktionen
let daten = [];

// Ein einfaches Budget für jede Kategorie
const limits = {
    lebensmittel: 50,
    kleidung: 100,
    freizeit: 80,
    haushalt: 60,
    transport: 40
};

// Funktion zum Hinzufügen einer Transaktion
function hinzufügen(kategorie) {
    let betrag = prompt("Wie viel hast du ausgegeben?");

    // Wenn der Benutzer keinen Betrag eingibt oder es keine Zahl ist, abbrechen
    if (!betrag || isNaN(betrag)) {
        alert("Bitte eine gültige Zahl eingeben!");
        return;
    }

    // Die Transaktion speichern
    daten.push({ kategorie, betrag: parseFloat(betrag) });

    // Anzeige der Transaktionen und Budgets aktualisieren
    anzeigen();
}

// Funktion, um alles auf der Seite anzuzeigen
function anzeigen() {
    let gesamt = 0;
    let liste = document.getElementById('liste');
    liste.innerHTML = ""; // Liste löschen, bevor neue Daten angezeigt werden

    // Alle Transaktionen anzeigen
    daten.forEach(transaktion => {
        gesamt += transaktion.betrag;

        let div = document.createElement("div");
        div.textContent = `${transaktion.kategorie}: ${transaktion.betrag} €`;
        liste.appendChild(div);
    });

    // Gesamtbetrag anzeigen
    document.getElementById('gesamt').textContent = `💰 Gesamt: ${gesamt} €`;

    // Budget-Übersicht anzeigen
    let budgetDiv = document.getElementById('budgets');
    budgetDiv.innerHTML = ""; // Überschrift löschen

    for (let kategorie in limits) {
        let summe = 0;

        // Berechne den Gesamtbetrag für jede Kategorie
        daten.forEach(transaktion => {
            if (transaktion.kategorie === kategorie) {
                summe += transaktion.betrag;
            }
        });

        let p = document.createElement("p");
        p.textContent = `${kategorie.charAt(0).toUpperCase() + kategorie.slice(1)}: ${summe} € / ${limits[kategorie]} €`;
        budgetDiv.appendChild(p);
    }
}

// Initiale Anzeige laden
anzeigen();
