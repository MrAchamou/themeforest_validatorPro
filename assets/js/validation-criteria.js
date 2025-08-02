// ThemeForest Validator Pro - Validation Criteria
// Critères de validation enrichis basés sur les standards ThemeForest 2025

const VALIDATION_CRITERIA = {
    structure: {
        name: "Structure & Architecture",
        weight: 18,
        icon: "🏗️",
        color: "blue",
        checks: [
            { 
                name: "Fichier index.html principal", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Un fichier index.html doit être présent à la racine du template",
                fix: "Créez un fichier index.html à la racine de votre template"
            },
            { 
                name: "Dossier assets/ organisé", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Structure organisée avec dossiers css/, js/, img/, fonts/",
                fix: "Organisez vos ressources dans un dossier assets/ avec sous-dossiers"
            },
            { 
                name: "Documentation README complète", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "README.md avec instructions d'installation et personnalisation",
                fix: "Créez un fichier README.md détaillé avec toutes les instructions"
            },
            { 
                name: "Structure responsive cohérente", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Organisation logique des breakpoints et media queries",
                fix: "Organisez vos media queries de manière cohérente (mobile-first)"
            },
            { 
                name: "Hiérarchie logique des dossiers", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Nomenclature claire et structure intuitive",
                fix: "Renommez vos dossiers avec une nomenclature claire et logique"
            },
            { 
                name: "Fichiers sources PSD/Figma", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Fichiers de design source pour personnalisation avancée",
                fix: "Incluez les fichiers sources de design (PSD, Figma, Sketch)"
            },
            { 
                name: "Guide d'installation détaillé", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Instructions pas-à-pas pour l'installation et configuration",
                fix: "Rédigez un guide d'installation étape par étape"
            },
            { 
                name: "Changelog maintenu", 
                required: false, 
                severity: "low", 
                points: 5,
                description: "Historique des versions et modifications",
                fix: "Créez un fichier CHANGELOG.md pour suivre les versions"
            },
            { 
                name: "Licence légale incluse", 
                required: true, 
                severity: "medium", 
                points: 5,
                description: "Fichier LICENSE avec droits d'usage clairement définis",
                fix: "Ajoutez un fichier LICENSE avec les termes d'utilisation"
            },
            { 
                name: "Fichier package.json/bower.json", 
                required: false, 
                severity: "medium", 
                points: 7,
                description: "Gestion des dépendances avec gestionnaire de paquets",
                fix: "Créez un package.json pour gérer les dépendances"
            },
            // Nouveaux critères de structure de dossier
            { 
                name: "Dossier /Template/", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Le dossier /Template/ doit contenir tous les fichiers finaux (HTML, CSS, JS ou thème WordPress).",
                fix: "Assurez-vous que tous les fichiers finaux sont dans le dossier /Template/"
            },
            { 
                name: "Dossier /Documentation/", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Le dossier /Documentation/ doit contenir un guide utilisateur en anglais (HTML ou PDF).",
                fix: "Créez un dossier /Documentation/ avec un guide utilisateur en anglais"
            },
            { 
                name: "Dossier /Screenshots/", 
                required: true, 
                severity: "critical", 
                points: 10,
                description: "Le dossier /Screenshots/ doit inclure main-preview.jpg (590x300px min) + captures additionnelles.",
                fix: "Ajoutez main-preview.jpg (590x300px min) et des captures additionnelles dans /Screenshots/"
            },
            { 
                name: "Dossier /Licenses/", 
                required: true, 
                severity: "critical", 
                points: 10,
                description: "Le dossier /Licenses/ doit contenir les licences des polices, bibliothèques, plugins, etc.",
                fix: "Incluez les licences des polices, bibliothèques, plugins, etc. dans le dossier /Licenses/"
            },
            { 
                name: "Fichier changelog.txt", 
                required: false, 
                severity: "low", 
                points: 5,
                description: "Le fichier changelog.txt doit contenir le journal des modifications.",
                fix: "Créez un fichier changelog.txt avec l'historique des modifications"
            },
            { 
                name: "Fichier readme.txt", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Le fichier readme.txt doit contenir les instructions de base pour l’utilisateur.",
                fix: "Créez un fichier readme.txt avec les instructions de base"
            }
        ]
    },

    htmlQuality: {
        name: "Qualité HTML",
        weight: 16,
        icon: "📝",
        color: "orange",
        checks: [
            { 
                name: "HTML5 sémantique valide", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Utilisation correcte des balises sémantiques HTML5",
                fix: "Utilisez les balises sémantiques HTML5 (header, nav, main, section, article, aside, footer)"
            },
            { 
                name: "Structure DOCTYPE correcte", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "DOCTYPE HTML5 présent et correct",
                fix: "Ajoutez <!DOCTYPE html> au début de vos fichiers HTML"
            },
            { 
                name: "Meta tags complets", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Meta viewport, description, keywords, author présents",
                fix: "Ajoutez tous les meta tags essentiels (viewport, description, keywords, author)"
            },
            { 
                name: "Accessibilité ARIA", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Attributs ARIA pour améliorer l'accessibilité",
                fix: "Ajoutez les attributs ARIA appropriés (aria-label, aria-describedby, etc.)"
            },
            { 
                name: "Alt text sur toutes images", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Attributs alt descriptifs sur toutes les images",
                fix: "Ajoutez des attributs alt descriptifs à toutes vos images"
            },
            { 
                name: "Structure heading hiérarchique", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Hiérarchie logique des titres H1-H6",
                fix: "Organisez vos titres de manière hiérarchique (H1 unique, puis H2, H3, etc.)"
            },
            { 
                name: "Formulaires accessibles", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Labels associés aux champs de formulaire",
                fix: "Associez des labels à tous vos champs de formulaire"
            },
            { 
                name: "Navigation clavier", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Navigation possible au clavier avec tabindex",
                fix: "Assurez-vous que tous les éléments interactifs sont accessibles au clavier"
            },
            { 
                name: "Validation W3C", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Code HTML valide selon les standards W3C",
                fix: "Validez votre HTML sur validator.w3.org et corrigez les erreurs"
            },
            { 
                name: "Open Graph meta tags", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Meta tags pour partage sur réseaux sociaux",
                fix: "Ajoutez les meta tags Open Graph pour Facebook/LinkedIn"
            },
            { 
                name: "Twitter Card meta tags", 
                required: false, 
                severity: "medium", 
                points: 6,
                description: "Meta tags pour partage Twitter optimisé",
                fix: "Ajoutez les meta tags Twitter Card pour un partage optimisé"
            },
            { 
                name: "Données structurées Schema.org", 
                required: false, 
                severity: "medium", 
                points: 10,
                description: "Balisage JSON-LD pour les moteurs de recherche",
                fix: "Ajoutez des données structurées Schema.org en JSON-LD"
            },
            { 
                name: "Favicon complet", 
                required: true, 
                severity: "medium", 
                points: 6,
                description: "Favicon avec toutes les tailles nécessaires",
                fix: "Incluez un favicon complet avec toutes les tailles (16x16, 32x32, etc.)"
            },
            // Nouveaux critères HTML
            { 
                name: "Pas de CSS/JS inline excessif", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Évitez le CSS et JavaScript inline excessif pour une meilleure maintenabilité.",
                fix: "Déplacez le CSS et JavaScript inline vers des fichiers externes ou des balises <style>/<script> dans le <head> ou avant </body>."
            }
        ]
    },

    cssQuality: {
        name: "Qualité CSS",
        weight: 16,
        icon: "🎨",
        color: "blue",
        checks: [
            { 
                name: "CSS3 moderne organisé", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "CSS bien structuré avec commentaires et organisation logique",
                fix: "Organisez votre CSS avec des commentaires et une structure logique"
            },
            { 
                name: "Variables CSS définies", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Utilisation de custom properties CSS pour la cohérence",
                fix: "Définissez des variables CSS (:root) pour les couleurs, tailles, etc."
            },
            { 
                name: "Mobile-first responsive", 
                required: true, 
                severity: "critical", 
                points: 18,
                description: "Approche mobile-first avec media queries appropriées",
                fix: "Adoptez une approche mobile-first avec media queries progressives"
            },
            { 
                name: "Flexbox/Grid moderne", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Layouts modernes avec Flexbox et CSS Grid",
                fix: "Utilisez Flexbox et CSS Grid pour vos layouts modernes"
            },
            { 
                name: "Animations optimisées", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Animations fluides avec transform et opacity",
                fix: "Optimisez vos animations en utilisant transform et opacity"
            },
            { 
                name: "Print styles inclus", 
                required: false, 
                severity: "low", 
                points: 5,
                description: "Feuille de style pour l'impression",
                fix: "Ajoutez des styles d'impression avec @media print"
            },
            { 
                name: "Dark mode support", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Support du mode sombre avec prefers-color-scheme",
                fix: "Implémentez le support du mode sombre avec prefers-color-scheme"
            },
            { 
                name: "CSS minifié pour prod", 
                required: false, 
                severity: "medium", 
                points: 7,
                description: "Version minifiée pour la production",
                fix: "Fournissez une version minifiée de votre CSS pour la production"
            },
            { 
                name: "Compatibilité navigateurs", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Support des navigateurs modernes avec fallbacks",
                fix: "Testez et ajoutez des fallbacks pour la compatibilité navigateurs"
            },
            { 
                name: "CSS critique inline", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "CSS critique inline pour améliorer le LCP",
                fix: "Intégrez le CSS critique inline pour améliorer les performances"
            },
            { 
                name: "Préfixes vendeurs appropriés", 
                required: true, 
                severity: "medium", 
                points: 7,
                description: "Préfixes -webkit, -moz pour compatibilité",
                fix: "Ajoutez les préfixes vendeurs nécessaires pour la compatibilité"
            },
            { 
                name: "Unités relatives utilisées", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Utilisation de rem, em, %, vw, vh pour la flexibilité",
                fix: "Utilisez des unités relatives (rem, em, %) plutôt que des pixels fixes"
            },
            // Nouveaux critères CSS
            { 
                name: "CSS structuré, préfixes auto-générés", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Le CSS doit être bien structuré et les préfixes vendeurs doivent être auto-générés (ex: Autoprefixer).",
                fix: "Utilisez un outil comme Autoprefixer pour gérer les préfixes vendeurs et organisez votre CSS."
            },
            { 
                name: "Convention de nommage claire (BEM recommandé)", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Adoptez une convention de nommage claire pour vos classes CSS (ex: BEM).",
                fix: "Implémentez une convention de nommage comme BEM pour vos classes CSS."
            },
            { 
                name: "Utilisation de polices web optimisées", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Utilisez des formats de polices web modernes (WOFF2) et préchargez-les.",
                fix: "Convertissez vos polices en WOFF2 et utilisez <link rel=\"preload\">."
            }
        ]
    },

    jsQuality: {
        name: "Qualité JavaScript",
        weight: 16,
        icon: "💻",
        color: "yellow",
        checks: [
            { 
                name: "Code JavaScript moderne (ES6+)", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Utilisation des fonctionnalités ES6+ (const, let, arrow functions, classes)",
                fix: "Mettez à jour votre code JavaScript pour utiliser les fonctionnalités ES6+"
            },
            { 
                name: "Gestion des erreurs (try/catch)", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Implémentation de try/catch pour une gestion robuste des erreurs",
                fix: "Ajoutez des blocs try/catch pour gérer les erreurs potentielles"
            },
            { 
                name: "Minification JS", 
                required: false, 
                severity: "medium", 
                points: 10,
                description: "Version minifiée pour la production",
                fix: "Fournissez une version minifiée de votre JavaScript pour la production"
            },
            { 
                name: "Absence de console.log/alert", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Suppression des console.log et alert en production",
                fix: "Supprimez tous les console.log et alert de votre code de production"
            },
            { 
                name: "Pas de JS inline", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Déplacement du JavaScript inline vers des fichiers externes",
                fix: "Déplacez tout le JavaScript inline vers des fichiers .js externes"
            },
            { 
                name: "Dépendances gérées (npm/yarn)", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Utilisation de npm ou yarn pour gérer les dépendances",
                fix: "Utilisez npm ou yarn pour installer et gérer vos dépendances JavaScript"
            },
            { 
                name: "Code asynchrone (async/await, Promises)", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Utilisation de async/await ou Promises pour les opérations asynchrones",
                fix: "Implémentez async/await ou Promises pour gérer les opérations asynchrones"
            },
            { 
                name: "Optimisation des performances JS", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Éviter les opérations coûteuses dans les boucles, debounce/throttle",
                fix: "Optimisez votre code JS pour éviter les goulots d'étranglement de performance"
            },
            { 
                name: "Compatibilité navigateurs JS", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Support des navigateurs modernes avec polyfills si nécessaire",
                fix: "Testez et ajoutez des polyfills pour la compatibilité navigateurs"
            },
            { 
                name: "Code modulaire (ES Modules)", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Utilisation des modules ES pour une meilleure organisation du code",
                fix: "Organisez votre code JavaScript en modules ES"
            },
            // Nouveaux critères JS
            { 
                name: "Code JS structuré, sans erreurs de linter", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Le code JavaScript doit être bien structuré et passer les vérifications d'un linter (ex: ESLint).",
                fix: "Utilisez un linter comme ESLint et corrigez toutes les erreurs et avertissements."
            },
            { 
                name: "Chargement différé des scripts (defer/async)", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Utilisez les attributs defer ou async pour optimiser le chargement des scripts.",
                fix: "Ajoutez defer ou async aux balises <script> pour les scripts non critiques."
            }
        ]
    },

    performance: {
        name: "Performance",
        weight: 14,
        icon: "⚡",
        color: "green",
        checks: [
            { 
                name: "Chargement rapide des pages", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Temps de chargement optimal (moins de 3 secondes)",
                fix: "Optimisez les images, minifiez les ressources, utilisez le lazy loading"
            },
            { 
                name: "Images optimisées", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Compression et formats modernes (WebP, AVIF)",
                fix: "Compressez vos images et utilisez des formats modernes comme WebP"
            },
            { 
                name: "Ressources minifiées", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "CSS, JS, HTML minifiés pour réduire la taille",
                fix: "Minifiez tous vos fichiers CSS, JS et HTML"
            },
            { 
                name: "Mise en cache du navigateur", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Utilisation des en-têtes de cache appropriés",
                fix: "Configurez les en-têtes de cache de votre serveur pour les ressources statiques"
            },
            { 
                name: "Lazy loading des images/vidéos", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Chargement différé des médias hors écran",
                fix: "Implémentez le lazy loading pour les images et vidéos"
            },
            { 
                name: "Optimisation des polices web", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Chargement asynchrone et sous-ensemble de polices",
                fix: "Optimisez le chargement de vos polices web (display=swap, preloading)"
            },
            { 
                name: "Réduction des requêtes HTTP", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Combiner les fichiers CSS/JS, utiliser des sprites",
                fix: "Réduisez le nombre de requêtes HTTP en combinant les fichiers et en utilisant des sprites"
            },
            { 
                name: "Compression GZIP/Brotli", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Activation de la compression côté serveur",
                fix: "Activez la compression GZIP ou Brotli sur votre serveur web"
            },
            { 
                name: "Éviter les redirections multiples", 
                required: true, 
                severity: "medium", 
                points: 7,
                description: "Minimiser les chaînes de redirection",
                fix: "Corrigez les redirections multiples pour accélérer le chargement"
            },
            { 
                name: "Priorisation des ressources critiques", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Utilisation de preload, preconnect, prefetch",
                fix: "Utilisez preload, preconnect, prefetch pour les ressources critiques"
            }
        ]
    },

    accessibility: {
        name: "Accessibilité",
        weight: 10,
        icon: "♿",
        color: "purple",
        checks: [
            { 
                name: "Contraste des couleurs suffisant", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Respect des WCAG 2.1 pour le contraste",
                fix: "Assurez un contraste suffisant entre le texte et l'arrière-plan"
            },
            { 
                name: "Navigation au clavier", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Tous les éléments interactifs accessibles via tabulation",
                fix: "Testez la navigation au clavier et assurez-vous que tous les éléments sont accessibles"
            },
            { 
                name: "Labels de formulaire clairs", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Chaque champ de formulaire a un label associé",
                fix: "Associez un label clair à chaque champ de formulaire"
            },
            { 
                name: "Structure sémantique", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Utilisation correcte des balises HTML sémantiques",
                fix: "Utilisez les balises HTML sémantiques (header, nav, main, footer, etc.)"
            },
            { 
                name: "Textes alternatifs pour images", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Attribut alt pour toutes les images informatives",
                fix: "Ajoutez des textes alternatifs pertinents pour toutes les images"
            },
            { 
                name: "Langue spécifiée", 
                required: true, 
                severity: "medium", 
                points: 8,
                description: "Attribut lang sur la balise html",
                fix: "Ajoutez l'attribut lang à la balise <html> (ex: <html lang=\"fr\">)"
            },
            { 
                name: "Gestion des erreurs de formulaire", 
                required: true, 
                severity: "high", 
                points: 10,
                description: "Messages d'erreur clairs et accessibles",
                fix: "Fournissez des messages d'erreur clairs et indiquez comment les corriger"
            },
            { 
                name: "Compatibilité avec lecteurs d'écran", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Testé avec des lecteurs d'écran (NVDA, JAWS)",
                fix: "Testez votre template avec des lecteurs d'écran et corrigez les problèmes"
            }
        ]
    },

    seo: {
        name: "SEO (Search Engine Optimization)",
        weight: 10,
        icon: "🔍",
        color: "red",
        checks: [
            { 
                name: "Titres de page uniques et descriptifs", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Balise <title> unique et pertinente pour chaque page",
                fix: "Assurez-vous que chaque page a un titre unique et descriptif"
            },
            { 
                name: "Meta descriptions optimisées", 
                required: true, 
                severity: "high", 
                points: 15,
                description: "Meta description unique et attrayante pour chaque page",
                fix: "Rédigez des meta descriptions uniques et incitatives pour chaque page"
            },
            { 
                name: "URLs conviviales", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "URLs courtes, descriptives et optimisées pour le SEO",
                fix: "Créez des URLs propres et sémantiques"
            },
            { 
                name: "Structure de contenu hiérarchique", 
                required: true, 
                severity: "high", 
                points: 12,
                description: "Utilisation correcte des balises H1-H6 pour la structure",
                fix: "Organisez votre contenu avec une hiérarchie de titres H1-H6"
            },
            { 
                name: "Sitemap XML inclus", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Fichier sitemap.xml pour l'indexation des moteurs",
                fix: "Générez et incluez un fichier sitemap.xml"
            },
            { 
                name: "Robots.txt configuré", 
                required: false, 
                severity: "medium", 
                points: 7,
                description: "Fichier robots.txt pour contrôler l'accès des robots",
                fix: "Configurez un fichier robots.txt pour guider les robots des moteurs de recherche"
            },
            { 
                name: "Données structurées (Schema.org)", 
                required: false, 
                severity: "high", 
                points: 10,
                description: "Implémentation de balisage Schema.org pour les extraits enrichis",
                fix: "Ajoutez des données structurées Schema.org pour améliorer la visibilité"
            },
            { 
                name: "Vitesse de chargement", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Facteur de classement important pour le SEO",
                fix: "Optimisez la vitesse de chargement de votre site"
            }
        ]
    },

    security: {
        name: "Sécurité",
        weight: 8,
        icon: "🔒",
        color: "darkred",
        checks: [
            { 
                name: "Protection XSS", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Prévention des attaques Cross-Site Scripting",
                fix: "Échappez toujours les entrées utilisateur pour prévenir les attaques XSS"
            },
            { 
                name: "Protection CSRF", 
                required: false, 
                severity: "high", 
                points: 15,
                description: "Prévention des attaques Cross-Site Request Forgery",
                fix: "Implémentez des jetons CSRF pour toutes les requêtes sensibles"
            },
            { 
                name: "Absence de vulnérabilités connues", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Utilisation de bibliothèques à jour et sans failles connues",
                fix: "Mettez à jour toutes les bibliothèques et frameworks vers leurs dernières versions stables"
            },
            { 
                name: "HTTPS for all assets", 
                required: false, 
                severity: "medium", 
                points: 10,
                description: "Tous les assets (images, scripts, styles) sont chargés via HTTPS",
                fix: "Assurez-vous que toutes les ressources sont chargées via HTTPS"
            },
            { 
                name: "Politique de sécurité de contenu (CSP)", 
                required: false, 
                severity: "medium", 
                points: 12,
                description: "En-tête CSP pour prévenir les attaques d'injection",
                fix: "Implémentez une politique de sécurité de contenu stricte"
            }
        ]
    },

    browserCompatibility: {
        name: "Compatibilité Navigateur",
        weight: 8,
        icon: "🌐",
        color: "cyan",
        checks: [
            { 
                name: "Compatibilité multi-navigateurs", 
                required: true, 
                severity: "critical", 
                points: 20,
                description: "Fonctionne correctement sur Chrome, Firefox, Edge, Safari",
                fix: "Testez votre template sur les principaux navigateurs et corrigez les problèmes"
            },
            { 
                name: "Support des anciennes versions", 
                required: false, 
                severity: "medium", 
                points: 10,
                description: "Support des versions antérieures des navigateurs (IE11 si nécessaire)",
                fix: "Fournissez des polyfills et des fallbacks pour les navigateurs plus anciens"
            },
            { 
                name: "Responsive design sur tous appareils", 
                required: true, 
                severity: "critical", 
                points: 15,
                description: "Affichage et fonctionnement optimaux sur mobiles, tablettes, desktops",
                fix: "Assurez-vous que votre design est entièrement responsive sur tous les appareils"
            },
            { 
                name: "Testé sur différents OS", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Testé sur Windows, macOS, Android, iOS",
                fix: "Testez votre template sur différentes combinaisons OS/navigateur"
            }
        ]
    },

    codeQuality: {
        name: "Qualité du Code",
        weight: 12,
        icon: "✨",
        color: "pink",
        checks: [
            { 
                name: "Code propre et commenté", 
                required: true, 
                severity: "high", 
                points: 20,
                description: "Code lisible, bien indenté et commenté",
                fix: "Nettoyez et commentez votre code pour une meilleure lisibilité"
            },
            { 
                name: "Respect des conventions de nommage", 
                required: true, 
                severity: "medium", 
                points: 15,
                description: "Utilisation cohérente de camelCase, kebab-case, snake_case",
                fix: "Adoptez une convention de nommage cohérente pour toutes vos variables, fonctions, classes"
            },
            { 
                name: "Modularité du code", 
                required: true, 
                severity: "high", 
                points: 18,
                description: "Code organisé en modules réutilisables",
                fix: "Divisez votre code en modules logiques et réutilisables"
            },
            { 
                name: "Absence de code dupliqué", 
                required: true, 
                severity: "medium", 
                points: 10,
                description: "Éviter la répétition de code (DRY principle)",
                fix: "Refactorisez votre code pour éliminer les duplications"
            },
            { 
                name: "Utilisation de linters/formatters", 
                required: false, 
                severity: "medium", 
                points: 8,
                description: "Utilisation d'outils comme ESLint, Prettier",
                fix: "Intégrez des linters et formatters dans votre workflow de développement"
            },
            { 
                name: "Tests unitaires/intégration", 
                required: false, 
                severity: "low", 
                points: 5,
                description: "Présence de tests pour assurer la qualité du code",
                fix: "Écrivez des tests unitaires et d'intégration pour votre code"
            },
            { 
                name: "Documentation interne", 
                required: false, 
                severity: "medium", 
                points: 7,
                description: "Commentaires JSDoc, documentation des API internes",
                fix: "Documentez votre code avec des commentaires JSDoc ou des outils similaires"
            }
        ]
    }
};

const DETECTION_PATTERNS = {
    html: {
        doctype: /<!DOCTYPE html>/i,
        html5Elements: /<(header|nav|main|section|article|aside|footer)>/i,
        metaTags: /<meta name=\"(description|keywords|author)\">/gi,
        ariaLabels: /aria-(label|labelledby|describedby)/i,
        altText: /<img[^>]+alt=\"[^\"]*\"/gi,
        headingStructure: /<h[1-6]>/i,
        openGraph: /<meta property=\"og:[^\"]+\">/gi,
        twitterCard: /<meta name=\"twitter:[^\"]+\">/gi,
        structuredData: /<script type=\"application\/ld\+json\">/gi,
        inlineCss: /style=\"[^\"]+\"/gi,
        inlineJs: /<script[^>]*>.*?<\/script>|<[^>]+on[a-z]+\s*=\s*\"[^\"]+\"/gi // Détecte les balises script sans src et les attributs on* (onclick, onload, etc.)
    },
    css: {
        cssVariables: /var\(--[^)]+\)/gi,
        mediaQueries: /@media/gi,
        vendorPrefixes: /-(webkit|moz|ms|o)-/gi,
        minifiedCss: /\}[^\n]+\{/gi, // Heuristique simple pour détecter le CSS minifié
        importantTag: /!important/gi
    },
    js: {
        es6Features: /(const|let|class|=>|`|\.\.\.)/gi,
        tryCatchBlocks: /try\s*\{.*\}\s*catch\s*\(e\)/gis,
        minifiedJs: /\bvar\s+\w+,\w+;/gi, // Heuristique simple pour détecter le JS minifié
        consoleLog: /console\.log\(/gi,
        alert: /alert\(/gi,
        inlineJs: /<script[^>]*>.*?<\/script>|<[^>]+on[a-z]+\s*=\s*\"[^\"]+\"/gi // Détecte les balises script sans src et les attributs on* (onclick, onload, etc.)
    }
};

module.exports = { VALIDATION_CRITERIA, DETECTION_PATTERNS };


