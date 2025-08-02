// ThemeForest Validator Pro - History & Progress Module
// Module de suivi de l'historique et de la progression

class HistoryProgress {
    constructor() {
        this.dbName = "ThemeForestValidatorDB";
        this.storeName = "validations";
        this.db = null;
    }

    async openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.errorCode);
                reject(event.target.errorCode);
            };
        });
    }

    async saveValidationResult(result) {
        if (!this.db) {
            await this.openDB();
        }
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.add({ ...result, timestamp: Date.now() });

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                console.error("Error saving validation result:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    async getValidationHistory() {
        if (!this.db) {
            await this.openDB();
        }
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                console.error("Error getting validation history:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    compareResults(result1, result2) {
        const comparison = {};
        // Exemple de comparaison: nombre d'issues
        comparison.issueDifference = (result1.issues ? result1.issues.length : 0) - (result2.issues ? result2.issues.length : 0);
        // Ajoutez d'autres métriques de comparaison ici (scores, passedChecks, etc.)
        return comparison;
    }

    generateProgressGraphData(history) {
        const labels = history.map(item => new Date(item.timestamp).toLocaleDateString());
        const scores = history.map(item => item.totalScore);
        const issues = history.map(item => item.issues ? item.issues.length : 0);

        return {
            labels: labels,
            datasets: [
                {
                    label: "Score Total",
                    data: scores,
                    borderColor: "#8B5CF6",
                    fill: false
                },
                {
                    label: "Nombre d'Issues",
                    data: issues,
                    borderColor: "#EF4444",
                    fill: false
                }
            ]
        };
    }

    async updateTagSystem(validationId, tag) {
        if (!this.db) {
            await this.openDB();
        }
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.get(validationId);

            request.onsuccess = () => {
                const data = request.result;
                if (data) {
                    data.tag = tag;
                    const updateRequest = store.put(data);
                    updateRequest.onsuccess = () => resolve();
                    updateRequest.onerror = (event) => reject(event.target.error);
                } else {
                    reject("Validation not found");
                }
            };

            request.onerror = (event) => {
                console.error("Error updating tag:", event.target.error);
                reject(event.target.error);
            };
        });
    }
}

module.exports = HistoryProgress;


