// ThemeForest Validator Pro - Framework Profiles
// Profils de validation spécifiques par type de framework

const FRAMEWORK_PROFILES = {
    html: {
        name: "HTML/CSS/JS Template",
        icon: "🌐",
        color: "blue",
        description: "Template HTML statique avec CSS et JavaScript",
        enabledCategories: [
            'structure', 'htmlQuality', 'cssQuality', 'jsQuality', 
            'designUIUX', 'performance', 'accessibility', 'seo', 
            'security', 'browserCompatibility', 'codeQuality',
            'documentation', 'demoPreview', 'requiredFiles', 
            'thirdPartyResources', 'manualTests'
        ],
        specificChecks: {
            structure: {
                additionalChecks: [
                    {
                        name: "Fichier favicon.ico",
                        required: true,
                        severity: "medium",
                        points: 5,
                        description: "Favicon présent à la racine du template",
                        fix: "Ajoutez un fichier favicon.ico à la racine de votre template"
                    }
                ]
            },
            htmlQuality: {
                additionalChecks: [
                    {
                        name: "Balises meta Open Graph",
                        required: false,
                        severity: "medium",
                        points: 8,
                        description: "Meta tags Open Graph pour le partage social",
                        fix: "Ajoutez les meta tags Open Graph (og:title, og:description, og:image)"
                    }
                ]
            }
        }
    },

    wordpress: {
        name: "WordPress Theme",
        icon: "WP",
        color: "darkblue",
        description: "Thème WordPress avec fonctionnalités spécifiques",
        enabledCategories: [
            'structure', 'htmlQuality', 'cssQuality', 'jsQuality', 
            'designUIUX', 'performance', 'accessibility', 'seo', 
            'security', 'browserCompatibility', 'codeQuality',
            'documentation', 'demoPreview', 'requiredFiles', 
            'thirdPartyResources', 'manualTests', 'wordpressSpecific'
        ],
        specificChecks: {
            structure: {
                additionalChecks: [
                    {
                        name: "Fichier style.css avec header",
                        required: true,
                        severity: "critical",
                        points: 20,
                        description: "Le fichier style.css doit contenir l'en-tête WordPress requis",
                        fix: "Ajoutez l'en-tête WordPress dans style.css avec Theme Name, Description, Version, etc."
                    },
                    {
                        name: "Fichier functions.php",
                        required: true,
                        severity: "critical",
                        points: 15,
                        description: "Le fichier functions.php est requis pour les thèmes WordPress",
                        fix: "Créez un fichier functions.php avec les fonctions de base du thème"
                    },
                    {
                        name: "Templates de base WordPress",
                        required: true,
                        severity: "high",
                        points: 12,
                        description: "Templates WordPress de base (index.php, header.php, footer.php)",
                        fix: "Créez les templates WordPress de base : index.php, header.php, footer.php"
                    }
                ]
            },
            security: {
                additionalChecks: [
                    {
                        name: "Échappement des données WordPress",
                        required: true,
                        severity: "critical",
                        points: 15,
                        description: "Utilisation des fonctions d'échappement WordPress (esc_html, esc_attr, etc.)",
                        fix: "Utilisez les fonctions d'échappement WordPress pour toutes les sorties de données"
                    },
                    {
                        name: "Nonces WordPress",
                        required: true,
                        severity: "high",
                        points: 10,
                        description: "Utilisation des nonces WordPress pour la sécurité des formulaires",
                        fix: "Implémentez les nonces WordPress pour tous vos formulaires et actions AJAX"
                    }
                ]
            }
        }
    },

    react: {
        name: "React Application",
        icon: "⚛️",
        color: "cyan",
        description: "Application React moderne avec composants",
        enabledCategories: [
            'structure', 'jsQuality', 'designUIUX', 'performance', 
            'accessibility', 'seo', 'security', 'browserCompatibility', 
            'codeQuality', 'documentation', 'demoPreview', 
            'requiredFiles', 'thirdPartyResources', 'manualTests'
        ],
        specificChecks: {
            structure: {
                additionalChecks: [
                    {
                        name: "Fichier package.json valide",
                        required: true,
                        severity: "critical",
                        points: 20,
                        description: "Le fichier package.json doit être présent et valide",
                        fix: "Assurez-vous que package.json contient toutes les dépendances et scripts nécessaires"
                    },
                    {
                        name: "Structure src/ organisée",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Le dossier src/ doit être bien organisé (components/, pages/, utils/, etc.)",
                        fix: "Organisez votre code React dans des dossiers logiques (components, pages, hooks, utils)"
                    },
                    {
                        name: "Fichier README avec instructions React",
                        required: true,
                        severity: "high",
                        points: 12,
                        description: "README avec instructions spécifiques React (npm start, build, etc.)",
                        fix: "Documentez les commandes React (npm start, npm run build, npm test)"
                    }
                ]
            },
            jsQuality: {
                additionalChecks: [
                    {
                        name: "Composants React fonctionnels",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Utilisation de composants fonctionnels avec hooks",
                        fix: "Privilégiez les composants fonctionnels avec hooks plutôt que les classes"
                    },
                    {
                        name: "PropTypes ou TypeScript",
                        required: false,
                        severity: "medium",
                        points: 10,
                        description: "Validation des props avec PropTypes ou TypeScript",
                        fix: "Ajoutez PropTypes ou utilisez TypeScript pour valider les props"
                    },
                    {
                        name: "Gestion d'état appropriée",
                        required: true,
                        severity: "medium",
                        points: 12,
                        description: "Gestion d'état avec useState, useContext ou Redux selon la complexité",
                        fix: "Utilisez la gestion d'état appropriée (useState pour local, Context/Redux pour global)"
                    }
                ]
            },
            performance: {
                additionalChecks: [
                    {
                        name: "Code splitting React",
                        required: false,
                        severity: "medium",
                        points: 10,
                        description: "Utilisation du code splitting avec React.lazy et Suspense",
                        fix: "Implémentez le code splitting pour les composants lourds avec React.lazy"
                    },
                    {
                        name: "Optimisation des re-renders",
                        required: true,
                        severity: "medium",
                        points: 8,
                        description: "Optimisation avec useMemo, useCallback, React.memo",
                        fix: "Optimisez les re-renders avec useMemo, useCallback et React.memo"
                    }
                ]
            }
        }
    },

    vue: {
        name: "Vue.js Application",
        icon: "🟢",
        color: "green",
        description: "Application Vue.js avec composants single-file",
        enabledCategories: [
            'structure', 'jsQuality', 'designUIUX', 'performance', 
            'accessibility', 'seo', 'security', 'browserCompatibility', 
            'codeQuality', 'documentation', 'demoPreview', 
            'requiredFiles', 'thirdPartyResources', 'manualTests'
        ],
        specificChecks: {
            structure: {
                additionalChecks: [
                    {
                        name: "Fichier vue.config.js",
                        required: false,
                        severity: "medium",
                        points: 8,
                        description: "Configuration Vue.js personnalisée si nécessaire",
                        fix: "Créez un fichier vue.config.js pour les configurations personnalisées"
                    },
                    {
                        name: "Structure Vue recommandée",
                        required: true,
                        severity: "high",
                        points: 12,
                        description: "Structure de dossiers Vue.js recommandée (components/, views/, router/, store/)",
                        fix: "Organisez votre projet selon la structure Vue.js recommandée"
                    }
                ]
            },
            jsQuality: {
                additionalChecks: [
                    {
                        name: "Composants Single File Components",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Utilisation de Single File Components (.vue)",
                        fix: "Organisez votre code en Single File Components avec template, script et style"
                    },
                    {
                        name: "Composition API ou Options API cohérent",
                        required: true,
                        severity: "medium",
                        points: 10,
                        description: "Utilisation cohérente de Composition API ou Options API",
                        fix: "Choisissez et utilisez de manière cohérente soit Composition API soit Options API"
                    }
                ]
            }
        }
    },

    angular: {
        name: "Angular Application",
        icon: "🅰️",
        color: "red",
        description: "Application Angular avec TypeScript",
        enabledCategories: [
            'structure', 'jsQuality', 'designUIUX', 'performance', 
            'accessibility', 'seo', 'security', 'browserCompatibility', 
            'codeQuality', 'documentation', 'demoPreview', 
            'requiredFiles', 'thirdPartyResources', 'manualTests'
        ],
        specificChecks: {
            structure: {
                additionalChecks: [
                    {
                        name: "Fichier angular.json",
                        required: true,
                        severity: "critical",
                        points: 20,
                        description: "Configuration Angular workspace valide",
                        fix: "Assurez-vous que angular.json est présent et correctement configuré"
                    },
                    {
                        name: "Structure Angular CLI",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Structure générée par Angular CLI respectée",
                        fix: "Respectez la structure de dossiers générée par Angular CLI"
                    }
                ]
            },
            jsQuality: {
                additionalChecks: [
                    {
                        name: "TypeScript strict mode",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Configuration TypeScript en mode strict",
                        fix: "Activez le mode strict de TypeScript dans tsconfig.json"
                    },
                    {
                        name: "Services et Dependency Injection",
                        required: true,
                        severity: "medium",
                        points: 12,
                        description: "Utilisation appropriée des services et de l'injection de dépendances",
                        fix: "Organisez votre logique métier dans des services avec injection de dépendances"
                    }
                ]
            }
        }
    },

    bootstrap: {
        name: "Bootstrap Template",
        icon: "🅱️",
        color: "purple",
        description: "Template utilisant Bootstrap framework",
        enabledCategories: [
            'structure', 'htmlQuality', 'cssQuality', 'jsQuality', 
            'designUIUX', 'performance', 'accessibility', 'seo', 
            'security', 'browserCompatibility', 'codeQuality',
            'documentation', 'demoPreview', 'requiredFiles', 
            'thirdPartyResources', 'manualTests'
        ],
        specificChecks: {
            cssQuality: {
                additionalChecks: [
                    {
                        name: "Utilisation appropriée des classes Bootstrap",
                        required: true,
                        severity: "high",
                        points: 15,
                        description: "Utilisation correcte et sémantique des classes Bootstrap",
                        fix: "Utilisez les classes Bootstrap de manière sémantique et évitez la sur-utilisation"
                    },
                    {
                        name: "Personnalisation Bootstrap cohérente",
                        required: true,
                        severity: "medium",
                        points: 10,
                        description: "Personnalisation cohérente des variables Bootstrap",
                        fix: "Personnalisez Bootstrap via les variables SCSS plutôt que par surcharge CSS"
                    }
                ]
            },
            designUIUX: {
                additionalChecks: [
                    {
                        name: "Système de grille Bootstrap maîtrisé",
                        required: true,
                        severity: "high",
                        points: 12,
                        description: "Utilisation appropriée du système de grille Bootstrap",
                        fix: "Maîtrisez le système de grille Bootstrap (containers, rows, cols) pour tous les breakpoints"
                    }
                ]
            }
        }
    }
};

// Fonction de détection automatique du framework
const FRAMEWORK_DETECTION = {
    detectFramework: function(files) {
        const fileNames = files.map(f => f.name.toLowerCase());
        const fileContents = files.map(f => f.content || '').join(' ').toLowerCase();

        // Détection WordPress
        if (fileNames.includes('style.css') && fileNames.includes('functions.php')) {
            return 'wordpress';
        }
        if (fileNames.includes('index.php') || fileContents.includes('wp_')) {
            return 'wordpress';
        }

        // Détection React
        if (fileNames.includes('package.json')) {
            if (fileContents.includes('"react"') || fileContents.includes('react-scripts')) {
                return 'react';
            }
        }
        if (fileContents.includes('import react') || fileContents.includes('from \'react\'')) {
            return 'react';
        }

        // Détection Vue.js
        if (fileNames.some(name => name.endsWith('.vue'))) {
            return 'vue';
        }
        if (fileContents.includes('vue') && fileNames.includes('package.json')) {
            return 'vue';
        }

        // Détection Angular
        if (fileNames.includes('angular.json') || fileNames.includes('angular-cli.json')) {
            return 'angular';
        }
        if (fileContents.includes('@angular/') || fileContents.includes('ng ')) {
            return 'angular';
        }

        // Détection Bootstrap
        if (fileContents.includes('bootstrap') || fileContents.includes('bs-')) {
            return 'bootstrap';
        }

        // Par défaut : HTML
        return 'html';
    },

    getFrameworkProfile: function(frameworkType) {
        return FRAMEWORK_PROFILES[frameworkType] || FRAMEWORK_PROFILES.html;
    },

    mergeProfileWithCriteria: function(profile, baseCriteria) {
        const mergedCriteria = { ...baseCriteria };

        // Filtrer les catégories selon le profil
        Object.keys(mergedCriteria).forEach(categoryKey => {
            if (!profile.enabledCategories.includes(categoryKey)) {
                delete mergedCriteria[categoryKey];
            }
        });

        // Ajouter les vérifications spécifiques du profil
        if (profile.specificChecks) {
            Object.keys(profile.specificChecks).forEach(categoryKey => {
                if (mergedCriteria[categoryKey] && profile.specificChecks[categoryKey].additionalChecks) {
                    mergedCriteria[categoryKey].checks = [
                        ...mergedCriteria[categoryKey].checks,
                        ...profile.specificChecks[categoryKey].additionalChecks
                    ];
                }
            });
        }

        return mergedCriteria;
    }
};

// Export pour utilisation dans le validateur principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FRAMEWORK_PROFILES, FRAMEWORK_DETECTION };
}

