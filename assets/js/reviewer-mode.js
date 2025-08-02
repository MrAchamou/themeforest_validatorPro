// ThemeForest Validator Pro - Reviewer Mode
// Mode de validation stricte simulant un reviewer ThemeForest

class ReviewerMode {
    constructor() {
        this.isActive = false;
        this.strictnessLevel = 'envato'; // 'envato', 'elite', 'perfectionist'
        this.reviewerPersonality = 'balanced'; // 'strict', 'balanced', 'encouraging'
        this.focusAreas = ['quality', 'marketability', 'usability', 'innovation'];
    }

    /**
     * Active le mode reviewer avec configuration
     */
    activate(config = {}) {
        this.isActive = true;
        this.strictnessLevel = config.strictnessLevel || 'envato';
        this.reviewerPersonality = config.reviewerPersonality || 'balanced';
        this.focusAreas = config.focusAreas || ['quality', 'marketability', 'usability', 'innovation'];
        
        return {
            message: "Mode Reviewer ThemeForest activé",
            config: {
                strictnessLevel: this.strictnessLevel,
                personality: this.reviewerPersonality,
                focusAreas: this.focusAreas
            }
        };
    }

    /**
     * Désactive le mode reviewer
     */
    deactivate() {
        this.isActive = false;
        return { message: "Mode Reviewer ThemeForest désactivé" };
    }

    /**
     * Applique les modifications du mode reviewer aux critères
     */
    applyReviewerCriteria(baseCriteria) {
        if (!this.isActive) return baseCriteria;

        const reviewerCriteria = JSON.parse(JSON.stringify(baseCriteria));

        // Ajustement des poids selon le niveau de sévérité
        const weightMultipliers = this.getWeightMultipliers();
        
        Object.keys(reviewerCriteria).forEach(categoryKey => {
            const category = reviewerCriteria[categoryKey];
            
            // Ajuster le poids de la catégorie
            if (weightMultipliers[categoryKey]) {
                category.weight = Math.round(category.weight * weightMultipliers[categoryKey]);
            }

            // Ajuster les points et sévérité des vérifications
            category.checks = category.checks.map(check => {
                const adjustedCheck = { ...check };
                
                // Augmenter les points pour les vérifications critiques
                if (check.severity === 'critical') {
                    adjustedCheck.points = Math.round(check.points * this.getCriticalMultiplier());
                }

                // Ajouter des vérifications spécifiques au reviewer
                return adjustedCheck;
            });

            // Ajouter des vérifications spécifiques au mode reviewer
            const additionalChecks = this.getAdditionalReviewerChecks(categoryKey);
            category.checks.push(...additionalChecks);
        });

        // Ajouter des catégories spécifiques au reviewer
        const reviewerSpecificCategories = this.getReviewerSpecificCategories();
        Object.assign(reviewerCriteria, reviewerSpecificCategories);

        return reviewerCriteria;
    }

    /**
     * Obtient les multiplicateurs de poids selon le niveau de sévérité
     */
    getWeightMultipliers() {
        const multipliers = {
            envato: {
                designUIUX: 1.3,
                codeQuality: 1.2,
                documentation: 1.4,
                performance: 1.2,
                browserCompatibility: 1.3
            },
            elite: {
                designUIUX: 1.5,
                codeQuality: 1.4,
                documentation: 1.6,
                performance: 1.4,
                accessibility: 1.3,
                seo: 1.2
            },
            perfectionist: {
                designUIUX: 1.8,
                codeQuality: 1.6,
                documentation: 1.8,
                performance: 1.6,
                accessibility: 1.5,
                seo: 1.4,
                security: 1.3
            }
        };

        return multipliers[this.strictnessLevel] || multipliers.envato;
    }

    /**
     * Obtient le multiplicateur pour les vérifications critiques
     */
    getCriticalMultiplier() {
        const multipliers = {
            envato: 1.5,
            elite: 2.0,
            perfectionist: 2.5
        };
        return multipliers[this.strictnessLevel] || 1.5;
    }

    /**
     * Obtient des vérifications additionnelles spécifiques au reviewer
     */
    getAdditionalReviewerChecks(categoryKey) {
        const additionalChecks = {
            designUIUX: [
                {
                    name: "Originalité et créativité du design",
                    required: true,
                    severity: "high",
                    points: 15,
                    description: "Le design doit être original et se démarquer de la concurrence",
                    fix: "Créez un design unique qui apporte une valeur ajoutée par rapport aux templates existants",
                    reviewerNote: "Les reviewers ThemeForest rejettent souvent les designs trop génériques ou copiés"
                },
                {
                    name: "Cohérence avec les tendances actuelles",
                    required: true,
                    severity: "medium",
                    points: 10,
                    description: "Le design doit être moderne et suivre les tendances actuelles",
                    fix: "Intégrez les tendances design actuelles tout en gardant une approche intemporelle",
                    reviewerNote: "Les designs datés sont systématiquement rejetés"
                },
                {
                    name: "Potentiel commercial du design",
                    required: true,
                    severity: "high",
                    points: 12,
                    description: "Le design doit avoir un potentiel commercial évident",
                    fix: "Assurez-vous que votre design répond à un besoin réel du marché",
                    reviewerNote: "ThemeForest privilégie les templates avec un fort potentiel de vente"
                }
            ],
            
            codeQuality: [
                {
                    name: "Code prêt pour la production",
                    required: true,
                    severity: "critical",
                    points: 20,
                    description: "Le code doit être de qualité production sans aucun élément de développement",
                    fix: "Supprimez tous les commentaires de debug, console.log, et code de test",
                    reviewerNote: "Aucun code de développement ne doit subsister dans la version finale"
                },
                {
                    name: "Architecture scalable",
                    required: true,
                    severity: "high",
                    points: 15,
                    description: "L'architecture doit permettre une extension facile du template",
                    fix: "Organisez votre code de manière modulaire et extensible",
                    reviewerNote: "Les reviewers vérifient la facilité de personnalisation"
                }
            ],

            documentation: [
                {
                    name: "Documentation niveau professionnel",
                    required: true,
                    severity: "critical",
                    points: 25,
                    description: "La documentation doit être exhaustive et professionnelle",
                    fix: "Rédigez une documentation complète avec captures d'écran et exemples",
                    reviewerNote: "Une documentation insuffisante est un motif de rejet automatique"
                },
                {
                    name: "Guide de personnalisation détaillé",
                    required: true,
                    severity: "high",
                    points: 18,
                    description: "Instructions détaillées pour personnaliser tous les aspects du template",
                    fix: "Documentez chaque élément personnalisable avec des exemples concrets",
                    reviewerNote: "Les acheteurs doivent pouvoir personnaliser facilement le template"
                }
            ],

            performance: [
                {
                    name: "Optimisation pour le référencement",
                    required: true,
                    severity: "high",
                    points: 15,
                    description: "Le template doit être optimisé pour les moteurs de recherche",
                    fix: "Implémentez toutes les bonnes pratiques SEO (meta tags, structure, vitesse)",
                    reviewerNote: "Le SEO est crucial pour la valeur commerciale du template"
                }
            ]
        };

        return additionalChecks[categoryKey] || [];
    }

    /**
     * Obtient des catégories spécifiques au mode reviewer
     */
    getReviewerSpecificCategories() {
        return {
            marketability: {
                name: "Potentiel Commercial",
                weight: 15,
                icon: "💰",
                color: "gold",
                checks: [
                    {
                        name: "Analyse de la concurrence",
                        required: true,
                        severity: "high",
                        points: 20,
                        description: "Le template doit se différencier de la concurrence existante",
                        fix: "Analysez les templates similaires et apportez des fonctionnalités uniques",
                        reviewerNote: "ThemeForest évite la saturation de templates similaires"
                    },
                    {
                        name: "Ciblage d'audience claire",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Le template doit viser une audience spécifique et identifiable",
                        fix: "Définissez clairement votre audience cible et adaptez le design en conséquence",
                        reviewerNote: "Les templates généralistes ont moins de chances d'être acceptés"
                    },
                    {
                        name: "Valeur ajoutée évidente",
                        required: true,
                        severity: "critical",
                        points: 25,
                        description: "Le template doit apporter une valeur ajoutée claire aux utilisateurs",
                        fix: "Identifiez et mettez en avant les fonctionnalités qui distinguent votre template",
                        reviewerNote: "La valeur ajoutée est le critère principal d'acceptation"
                    },
                    {
                        name: "Potentiel de personnalisation",
                        required: true,
                        severity: "medium",
                        points: 12,
                        description: "Le template doit offrir de nombreuses possibilités de personnalisation",
                        fix: "Intégrez des options de personnalisation flexibles (couleurs, layouts, contenus)",
                        reviewerNote: "La flexibilité augmente l'attrait commercial du template"
                    }
                ]
            },

            innovation: {
                name: "Innovation & Créativité",
                weight: 10,
                icon: "💡",
                color: "orange",
                checks: [
                    {
                        name: "Fonctionnalités innovantes",
                        required: false,
                        severity: "medium",
                        points: 15,
                        description: "Le template inclut des fonctionnalités innovantes ou créatives",
                        fix: "Ajoutez des fonctionnalités uniques qui n'existent pas dans les templates concurrents",
                        reviewerNote: "L'innovation est très appréciée par les reviewers"
                    },
                    {
                        name: "Utilisation créative des technologies",
                        required: false,
                        severity: "medium",
                        points: 12,
                        description: "Utilisation créative et appropriée des technologies modernes",
                        fix: "Exploitez les technologies modernes de manière créative et pertinente",
                        reviewerNote: "L'usage intelligent des nouvelles technologies est valorisé"
                    },
                    {
                        name: "Approche design unique",
                        required: true,
                        severity: "high",
                        points: 18,
                        description: "Le design présente une approche unique et mémorable",
                        fix: "Développez un style visuel distinctif qui marque les esprits",
                        reviewerNote: "Un design mémorable augmente les chances de vente"
                    }
                ]
            },

            professionalStandards: {
                name: "Standards Professionnels",
                weight: 12,
                icon: "🏆",
                color: "purple",
                checks: [
                    {
                        name: "Qualité niveau agence",
                        required: true,
                        severity: "critical",
                        points: 25,
                        description: "Le template doit atteindre un niveau de qualité professionnel",
                        fix: "Peaufinez chaque détail pour atteindre un niveau de qualité d'agence",
                        reviewerNote: "ThemeForest n'accepte que des templates de niveau professionnel"
                    },
                    {
                        name: "Finition et polish",
                        required: true,
                        severity: "high",
                        points: 20,
                        description: "Tous les détails doivent être soignés et polis",
                        fix: "Vérifiez et peaufinez chaque élément visuel et fonctionnel",
                        reviewerNote: "Les détails négligés sont immédiatement repérés par les reviewers"
                    },
                    {
                        name: "Cohérence globale",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Cohérence parfaite dans tout le template",
                        fix: "Assurez une cohérence totale dans le design, le code et la documentation",
                        reviewerNote: "L'incohérence est un motif de rejet fréquent"
                    },
                    {
                        name: "Attention aux détails",
                        required: true,
                        severity: "medium",
                        points: 12,
                        description: "Attention méticuleuse portée à tous les détails",
                        fix: "Examinez minutieusement chaque pixel et chaque ligne de code",
                        reviewerNote: "Les reviewers ont l'œil pour les détails négligés"
                    }
                ]
            }
        };
    }

    /**
     * Génère un feedback de reviewer personnalisé
     */
    generateReviewerFeedback(validationResults) {
        if (!this.isActive) return null;

        const feedback = {
            overallAssessment: this.generateOverallAssessment(validationResults),
            strengths: this.identifyStrengths(validationResults),
            weaknesses: this.identifyWeaknesses(validationResults),
            criticalIssues: this.identifyCriticalIssues(validationResults),
            recommendations: this.generateRecommendations(validationResults),
            approvalPrediction: this.predictApproval(validationResults),
            reviewerComments: this.generateReviewerComments(validationResults),
            nextSteps: this.suggestNextSteps(validationResults)
        };

        return feedback;
    }

    /**
     * Génère une évaluation globale
     */
    generateOverallAssessment(results) {
        const score = results.totalScore || 0;
        const personality = this.reviewerPersonality;

        const assessments = {
            strict: {
                excellent: "Template de qualité exceptionnelle. Prêt pour soumission.",
                good: "Bon template mais nécessite des améliorations avant soumission.",
                average: "Template moyen. Travail significatif requis avant soumission.",
                poor: "Template en dessous des standards. Refonte majeure nécessaire."
            },
            balanced: {
                excellent: "Excellent travail ! Ce template a de très bonnes chances d'être accepté.",
                good: "Bon template avec du potentiel. Quelques ajustements et ce sera parfait.",
                average: "Template correct mais qui nécessite des améliorations pour être compétitif.",
                poor: "Ce template nécessite des améliorations importantes avant soumission."
            },
            encouraging: {
                excellent: "Fantastique ! Vous avez créé un template exceptionnel !",
                good: "Très bon travail ! Avec quelques petites améliorations, ce sera parfait.",
                average: "Bon début ! Continuez à travailler sur les points d'amélioration.",
                poor: "Ne vous découragez pas ! Avec du travail, ce template peut devenir excellent."
            }
        };

        let level = 'poor';
        if (score >= 85) level = 'excellent';
        else if (score >= 70) level = 'good';
        else if (score >= 50) level = 'average';

        return {
            score,
            level,
            message: assessments[personality][level],
            confidence: this.calculateConfidence(score)
        };
    }

    /**
     * Identifie les points forts
     */
    identifyStrengths(results) {
        const strengths = [];
        
        Object.values(results.categories || {}).forEach(category => {
            if (category.percentage >= 80) {
                strengths.push({
                    category: category.name,
                    score: category.percentage,
                    comment: this.getStrengthComment(category.name, category.percentage)
                });
            }
        });

        return strengths;
    }

    /**
     * Identifie les faiblesses
     */
    identifyWeaknesses(results) {
        const weaknesses = [];
        
        Object.values(results.categories || {}).forEach(category => {
            if (category.percentage < 60) {
                weaknesses.push({
                    category: category.name,
                    score: category.percentage,
                    priority: category.percentage < 40 ? 'high' : 'medium',
                    comment: this.getWeaknessComment(category.name, category.percentage)
                });
            }
        });

        return weaknesses.sort((a, b) => a.score - b.score);
    }

    /**
     * Identifie les problèmes critiques
     */
    identifyCriticalIssues(results) {
        const criticalIssues = [];
        
        Object.values(results.categories || {}).forEach(category => {
            if (category.failures) {
                category.failures.forEach(failure => {
                    if (failure.severity === 'critical') {
                        criticalIssues.push({
                            category: category.name,
                            issue: failure.name,
                            impact: "Rejet automatique probable",
                            urgency: "Critique",
                            fix: failure.fix,
                            reviewerNote: failure.reviewerNote || "Ce type d'erreur entraîne généralement un rejet"
                        });
                    }
                });
            }
        });

        return criticalIssues;
    }

    /**
     * Génère des recommandations personnalisées
     */
    generateRecommendations(results) {
        const recommendations = [];
        const score = results.totalScore || 0;

        // Recommandations basées sur le score global
        if (score < 50) {
            recommendations.push({
                priority: "critical",
                title: "Refonte majeure nécessaire",
                description: "Le template nécessite une refonte importante avant soumission",
                actions: [
                    "Revoir complètement le design",
                    "Améliorer la qualité du code",
                    "Réécrire la documentation",
                    "Optimiser les performances"
                ]
            });
        } else if (score < 70) {
            recommendations.push({
                priority: "high",
                title: "Améliorations importantes requises",
                description: "Plusieurs aspects du template doivent être améliorés",
                actions: [
                    "Corriger tous les problèmes critiques",
                    "Améliorer les catégories les plus faibles",
                    "Peaufiner le design et l'UX",
                    "Compléter la documentation"
                ]
            });
        } else if (score < 85) {
            recommendations.push({
                priority: "medium",
                title: "Peaufinage nécessaire",
                description: "Le template est bon mais nécessite des ajustements",
                actions: [
                    "Corriger les derniers détails",
                    "Optimiser les performances",
                    "Améliorer l'accessibilité",
                    "Finaliser la documentation"
                ]
            });
        }

        return recommendations;
    }

    /**
     * Prédit les chances d'approbation
     */
    predictApproval(results) {
        const score = results.totalScore || 0;
        const criticalIssues = this.identifyCriticalIssues(results).length;
        
        let probability = 0;
        let verdict = "Rejet probable";
        let reasoning = "";

        if (criticalIssues > 0) {
            probability = Math.max(5, 20 - (criticalIssues * 5));
            verdict = "Rejet très probable";
            reasoning = `${criticalIssues} problème(s) critique(s) détecté(s)`;
        } else if (score >= 85) {
            probability = 90;
            verdict = "Approbation très probable";
            reasoning = "Excellent score sans problèmes critiques";
        } else if (score >= 75) {
            probability = 70;
            verdict = "Approbation probable";
            reasoning = "Bon score avec quelques améliorations mineures nécessaires";
        } else if (score >= 60) {
            probability = 40;
            verdict = "Approbation incertaine";
            reasoning = "Score moyen nécessitant des améliorations";
        } else {
            probability = 15;
            verdict = "Rejet probable";
            reasoning = "Score insuffisant pour les standards ThemeForest";
        }

        return {
            probability,
            verdict,
            reasoning,
            confidence: this.calculateConfidence(score)
        };
    }

    /**
     * Génère des commentaires de reviewer
     */
    generateReviewerComments(results) {
        const comments = [];
        const personality = this.reviewerPersonality;

        // Commentaires basés sur les catégories
        Object.values(results.categories || {}).forEach(category => {
            if (category.percentage < 50) {
                comments.push(this.generateCategoryComment(category, 'negative', personality));
            } else if (category.percentage > 80) {
                comments.push(this.generateCategoryComment(category, 'positive', personality));
            }
        });

        return comments;
    }

    /**
     * Suggère les prochaines étapes
     */
    suggestNextSteps(results) {
        const score = results.totalScore || 0;
        const criticalIssues = this.identifyCriticalIssues(results).length;

        if (criticalIssues > 0) {
            return {
                immediate: "Corriger tous les problèmes critiques",
                shortTerm: "Améliorer les catégories les plus faibles",
                longTerm: "Peaufiner et optimiser l'ensemble du template",
                timeline: "2-4 semaines avant soumission"
            };
        } else if (score >= 85) {
            return {
                immediate: "Dernière vérification et tests",
                shortTerm: "Préparer les fichiers de soumission",
                longTerm: "Soumettre le template",
                timeline: "Prêt pour soumission immédiate"
            };
        } else {
            return {
                immediate: "Améliorer les catégories sous 70%",
                shortTerm: "Optimiser les performances et l'accessibilité",
                longTerm: "Tests finaux et soumission",
                timeline: "1-2 semaines d'améliorations"
            };
        }
    }

    /**
     * Calcule la confiance de l'évaluation
     */
    calculateConfidence(score) {
        if (score >= 85 || score <= 30) return "Très élevée";
        if (score >= 70 || score <= 50) return "Élevée";
        return "Modérée";
    }

    /**
     * Génère un commentaire pour une catégorie
     */
    generateCategoryComment(category, type, personality) {
        const comments = {
            positive: {
                strict: `${category.name}: Niveau acceptable (${category.percentage}%)`,
                balanced: `${category.name}: Bon travail ! (${category.percentage}%)`,
                encouraging: `${category.name}: Excellent ! Continuez comme ça ! (${category.percentage}%)`
            },
            negative: {
                strict: `${category.name}: Insuffisant (${category.percentage}%). Amélioration requise.`,
                balanced: `${category.name}: Nécessite des améliorations (${category.percentage}%)`,
                encouraging: `${category.name}: Potentiel d'amélioration (${category.percentage}%). Vous pouvez y arriver !`
            }
        };

        return {
            category: category.name,
            type,
            message: comments[type][personality],
            score: category.percentage
        };
    }

    /**
     * Obtient un commentaire de force
     */
    getStrengthComment(categoryName, score) {
        const comments = {
            "Design et UI/UX": "Design visuellement attrayant et bien exécuté",
            "Qualité du Code": "Code propre et bien structuré",
            "Performance": "Excellentes performances, bon pour le SEO",
            "Documentation": "Documentation complète et professionnelle",
            "Accessibilité": "Bonne prise en compte de l'accessibilité"
        };
        return comments[categoryName] || `Excellente performance dans cette catégorie (${score}%)`;
    }

    /**
     * Obtient un commentaire de faiblesse
     */
    getWeaknessComment(categoryName, score) {
        const comments = {
            "Design et UI/UX": "Le design nécessite des améliorations pour être compétitif",
            "Qualité du Code": "La qualité du code doit être améliorée",
            "Performance": "Les performances doivent être optimisées",
            "Documentation": "La documentation est insuffisante",
            "Accessibilité": "L'accessibilité doit être améliorée"
        };
        return comments[categoryName] || `Cette catégorie nécessite des améliorations (${score}%)`;
    }
}

// Instance globale
const reviewerMode = new ReviewerMode();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewerMode;
}

