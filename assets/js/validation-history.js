// ThemeForest Validator Pro - Validation History System
// Système de gestion de l'historique des validations

class ValidationHistory {
    constructor() {
        this.storageKey = 'themeforest_validator_history';
        this.maxHistoryItems = 50; // Limite à 50 validations
        this.history = this.loadHistory();
    }

    /**
     * Charge l'historique depuis le localStorage
     */
    loadHistory() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erreur lors du chargement de l\'historique:', error);
            return [];
        }
    }

    /**
     * Sauvegarde l'historique dans le localStorage
     */
    saveHistory() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.history));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'historique:', error);
        }
    }

    /**
     * Ajoute une nouvelle validation à l'historique
     */
    addValidation(validationData) {
        const historyItem = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            templateName: validationData.templateName || 'Template sans nom',
            framework: validationData.framework || 'html',
            totalScore: validationData.totalScore || 0,
            totalChecks: validationData.totalChecks || 0,
            passedChecks: validationData.passedChecks || 0,
            analysisTime: validationData.analysisTime || 0,
            categories: validationData.categories || {},
            criticalIssues: this.extractCriticalIssues(validationData),
            recommendations: validationData.recommendations || [],
            fileCount: validationData.fileCount || 0,
            templateSize: validationData.templateSize || 0,
            grade: this.calculateGrade(validationData.totalScore || 0),
            approvalChance: this.calculateApprovalChance(validationData.totalScore || 0)
        };

        // Ajouter au début de l'historique
        this.history.unshift(historyItem);

        // Limiter la taille de l'historique
        if (this.history.length > this.maxHistoryItems) {
            this.history = this.history.slice(0, this.maxHistoryItems);
        }

        this.saveHistory();
        return historyItem.id;
    }

    /**
     * Extrait les problèmes critiques d'une validation
     */
    extractCriticalIssues(validationData) {
        const criticalIssues = [];
        
        if (validationData.categories) {
            Object.values(validationData.categories).forEach(category => {
                if (category.failures) {
                    category.failures.forEach(failure => {
                        if (failure.severity === 'critical') {
                            criticalIssues.push({
                                category: category.name,
                                issue: failure.name,
                                description: failure.description,
                                fix: failure.fix
                            });
                        }
                    });
                }
            });
        }

        return criticalIssues;
    }

    /**
     * Calcule la note basée sur le score
     */
    calculateGrade(score) {
        if (score >= 90) return 'EXCELLENT';
        if (score >= 80) return 'TRÈS BIEN';
        if (score >= 70) return 'BIEN';
        if (score >= 50) return 'INSUFFISANT';
        return 'CRITIQUE';
    }

    /**
     * Calcule les chances d'approbation
     */
    calculateApprovalChance(score) {
        if (score >= 90) return 'Très élevées (95%+)';
        if (score >= 80) return 'Élevées (80-95%)';
        if (score >= 70) return 'Moyennes (60-80%)';
        if (score >= 50) return 'Faibles (30-60%)';
        return 'Très faibles (<30%)';
    }

    /**
     * Génère un ID unique pour une validation
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Récupère l'historique complet
     */
    getHistory() {
        return [...this.history];
    }

    /**
     * Récupère une validation spécifique par ID
     */
    getValidationById(id) {
        return this.history.find(item => item.id === id);
    }

    /**
     * Supprime une validation de l'historique
     */
    deleteValidation(id) {
        this.history = this.history.filter(item => item.id !== id);
        this.saveHistory();
    }

    /**
     * Vide complètement l'historique
     */
    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    /**
     * Exporte l'historique au format JSON
     */
    exportHistory() {
        const exportData = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            validatorVersion: 'ThemeForest Validator Pro v1.0',
            totalValidations: this.history.length,
            history: this.history
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `themeforest-validator-history-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Importe un historique depuis un fichier JSON
     */
    async importHistory(file) {
        try {
            const text = await file.text();
            const importData = JSON.parse(text);

            if (importData.history && Array.isArray(importData.history)) {
                // Fusionner avec l'historique existant en évitant les doublons
                const existingIds = new Set(this.history.map(item => item.id));
                const newItems = importData.history.filter(item => !existingIds.has(item.id));

                this.history = [...newItems, ...this.history];

                // Trier par timestamp décroissant
                this.history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                // Limiter la taille
                if (this.history.length > this.maxHistoryItems) {
                    this.history = this.history.slice(0, this.maxHistoryItems);
                }

                this.saveHistory();
                return {
                    success: true,
                    imported: newItems.length,
                    total: this.history.length
                };
            } else {
                throw new Error('Format de fichier invalide');
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Obtient des statistiques sur l'historique
     */
    getStatistics() {
        if (this.history.length === 0) {
            return {
                totalValidations: 0,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0,
                frameworkDistribution: {},
                gradeDistribution: {},
                improvementTrend: 'N/A'
            };
        }

        const scores = this.history.map(item => item.totalScore);
        const frameworks = this.history.map(item => item.framework);
        const grades = this.history.map(item => item.grade);

        // Distribution des frameworks
        const frameworkDistribution = {};
        frameworks.forEach(framework => {
            frameworkDistribution[framework] = (frameworkDistribution[framework] || 0) + 1;
        });

        // Distribution des notes
        const gradeDistribution = {};
        grades.forEach(grade => {
            gradeDistribution[grade] = (gradeDistribution[grade] || 0) + 1;
        });

        // Tendance d'amélioration (comparaison des 5 dernières vs 5 précédentes)
        let improvementTrend = 'N/A';
        if (this.history.length >= 10) {
            const recent5 = scores.slice(0, 5);
            const previous5 = scores.slice(5, 10);
            const recentAvg = recent5.reduce((a, b) => a + b, 0) / recent5.length;
            const previousAvg = previous5.reduce((a, b) => a + b, 0) / previous5.length;
            
            if (recentAvg > previousAvg + 2) {
                improvementTrend = 'En amélioration';
            } else if (recentAvg < previousAvg - 2) {
                improvementTrend = 'En régression';
            } else {
                improvementTrend = 'Stable';
            }
        }

        return {
            totalValidations: this.history.length,
            averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
            bestScore: Math.max(...scores),
            worstScore: Math.min(...scores),
            frameworkDistribution,
            gradeDistribution,
            improvementTrend,
            lastValidation: this.history[0]?.timestamp,
            mostUsedFramework: Object.keys(frameworkDistribution).reduce((a, b) => 
                frameworkDistribution[a] > frameworkDistribution[b] ? a : b, 'html')
        };
    }

    /**
     * Recherche dans l'historique
     */
    searchHistory(query, filters = {}) {
        let results = [...this.history];

        // Filtrage par texte
        if (query && query.trim()) {
            const searchTerm = query.toLowerCase();
            results = results.filter(item => 
                item.templateName.toLowerCase().includes(searchTerm) ||
                item.framework.toLowerCase().includes(searchTerm) ||
                item.grade.toLowerCase().includes(searchTerm)
            );
        }

        // Filtrage par framework
        if (filters.framework && filters.framework !== 'all') {
            results = results.filter(item => item.framework === filters.framework);
        }

        // Filtrage par note
        if (filters.grade && filters.grade !== 'all') {
            results = results.filter(item => item.grade === filters.grade);
        }

        // Filtrage par score minimum
        if (filters.minScore) {
            results = results.filter(item => item.totalScore >= filters.minScore);
        }

        // Filtrage par date
        if (filters.dateFrom) {
            const fromDate = new Date(filters.dateFrom);
            results = results.filter(item => new Date(item.timestamp) >= fromDate);
        }

        if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            results = results.filter(item => new Date(item.timestamp) <= toDate);
        }

        return results;
    }

    /**
     * Compare deux validations
     */
    compareValidations(id1, id2) {
        const validation1 = this.getValidationById(id1);
        const validation2 = this.getValidationById(id2);

        if (!validation1 || !validation2) {
            return null;
        }

        return {
            validation1,
            validation2,
            scoreDifference: validation1.totalScore - validation2.totalScore,
            timeDifference: new Date(validation1.timestamp) - new Date(validation2.timestamp),
            improvements: this.findImprovements(validation1, validation2),
            regressions: this.findRegressions(validation1, validation2)
        };
    }

    /**
     * Trouve les améliorations entre deux validations
     */
    findImprovements(newer, older) {
        const improvements = [];
        
        Object.keys(newer.categories).forEach(categoryKey => {
            const newerCategory = newer.categories[categoryKey];
            const olderCategory = older.categories[categoryKey];
            
            if (olderCategory && newerCategory.percentage > olderCategory.percentage) {
                improvements.push({
                    category: newerCategory.name,
                    improvement: newerCategory.percentage - olderCategory.percentage,
                    from: olderCategory.percentage,
                    to: newerCategory.percentage
                });
            }
        });

        return improvements;
    }

    /**
     * Trouve les régressions entre deux validations
     */
    findRegressions(newer, older) {
        const regressions = [];
        
        Object.keys(newer.categories).forEach(categoryKey => {
            const newerCategory = newer.categories[categoryKey];
            const olderCategory = older.categories[categoryKey];
            
            if (olderCategory && newerCategory.percentage < olderCategory.percentage) {
                regressions.push({
                    category: newerCategory.name,
                    regression: olderCategory.percentage - newerCategory.percentage,
                    from: olderCategory.percentage,
                    to: newerCategory.percentage
                });
            }
        });

        return regressions;
    }
}

// Instance globale
const validationHistory = new ValidationHistory();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationHistory;
}

