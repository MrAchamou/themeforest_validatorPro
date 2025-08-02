// ThemeForest Validator Pro - Main Application
// Application principale avec interface utilisateur

class ValidatorApp {
    constructor() {
        this.validator = new ThemeForestValidator();
        this.currentFile = null;
        this.analysisResults = null;
        this.scoreChart = null;
        
        this.init();
    }

    // Initialisation de l'application
    init() {
        this.setupEventListeners();
        this.createFloatingParticles();
        this.setupAccessibility();
        
        // Vérification du support des fonctionnalités
        this.checkBrowserSupport();
        
        console.log('🚀 ThemeForest Validator Pro initialisé');
    }

    // Configuration des event listeners
    setupEventListeners() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');

        // Drag & Drop
        dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
        dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        dropZone.addEventListener('drop', this.handleDrop.bind(this));

        // File input
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Gestion du drag over
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropZone = e.currentTarget;
        dropZone.classList.add('border-blue-400', 'bg-blue-500/10');
        dropZone.style.transform = 'scale(1.02)';
    }

    // Gestion du drag leave
    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropZone = e.currentTarget;
        dropZone.classList.remove('border-blue-400', 'bg-blue-500/10');
        dropZone.style.transform = 'scale(1)';
    }

    // Gestion du drop
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropZone = e.currentTarget;
        dropZone.classList.remove('border-blue-400', 'bg-blue-500/10');
        dropZone.style.transform = 'scale(1)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    // Gestion de la sélection de fichier
    handleFileSelect(e) {
        if (e.target.files.length > 0) {
            this.handleFile(e.target.files[0]);
        }
    }

    // Gestion des raccourcis clavier
    handleKeyDown(e) {
        // Échap pour réinitialiser
        if (e.key === 'Escape') {
            this.resetValidator();
        }
        
        // Ctrl+O pour ouvrir un fichier
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            document.getElementById('fileInput').click();
        }
    }

    // Gestion du redimensionnement
    handleResize() {
        if (this.scoreChart) {
            this.scoreChart.resize();
        }
    }

    // Traitement du fichier
    async handleFile(file) {
        // Validation du fichier
        if (!this.validateFile(file)) {
            return;
        }

        this.currentFile = file;
        
        try {
            // Affichage de la section de progression
            this.showProgressSection();
            
            // Lancement de l'analyse
            this.analysisResults = await this.validator.analyzeTemplate(file);
            
            // Affichage des résultats
            this.displayResults();
            
        } catch (error) {
            console.error('Erreur lors de l\'analyse:', error);
            this.showError('Erreur lors de l\'analyse du template', error.message);
        }
    }

    // Validation du fichier
    validateFile(file) {
        // Vérification de l'extension
        if (!file.name.toLowerCase().endsWith('.zip')) {
            this.showError('Format de fichier invalide', 'Seuls les fichiers ZIP sont acceptés');
            return false;
        }

        // Vérification de la taille (100MB max)
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showError('Fichier trop volumineux', `Taille maximum autorisée: ${this.formatFileSize(maxSize)}`);
            return false;
        }

        // Vérification de la taille minimum (1KB min)
        if (file.size < 1024) {
            this.showError('Fichier trop petit', 'Le fichier semble être vide ou corrompu');
            return false;
        }

        return true;
    }

    // Affichage de la section de progression
    showProgressSection() {
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('progressSection').classList.remove('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        
        // Réinitialisation de la progression
        this.updateProgressUI(0, 'Initialisation...');
        this.clearRealTimeAnalysis();
    }

    // Affichage des résultats
    displayResults() {
        document.getElementById('progressSection').classList.add('hidden');
        document.getElementById('resultsSection').classList.remove('hidden');
        
        // Affichage des différentes sections
        this.displayGlobalScore();
        this.displayCriticalIssues();
        this.displaySuccesses();
        this.displayCategoryAnalysis();
        this.displayFileAnalysis();
        this.displayRecommendations();
        
        // Animation d'apparition
        this.animateResults();
    }

    // Affichage du score global
    displayGlobalScore() {
        const results = this.analysisResults;
        const score = results.totalScore;
        
        // Mise à jour du score
        document.getElementById('finalScore').textContent = `${score}%`;
        
        // Détermination du grade et du verdict
        let grade, verdict, verdictClass, approvalChance, insight;
        
        if (score >= 90) {
            grade = 'EXCELLENT';
            verdict = '🎉 Template Exceptionnel';
            verdictClass = 'success-item';
            approvalChance = 'Approbation quasi-garantie (95%+)';
            insight = 'Votre template respecte tous les standards de qualité ThemeForest. Félicitations !';
        } else if (score >= 80) {
            grade = 'TRÈS BIEN';
            verdict = '✅ Template de Qualité';
            verdictClass = 'success-item';
            approvalChance = 'Très bonnes chances d\'approbation (80-95%)';
            insight = 'Excellent travail ! Quelques améliorations mineures pourraient parfaire votre template.';
        } else if (score >= 70) {
            grade = 'BIEN';
            verdict = '⚠️ Template Acceptable';
            verdictClass = 'warning-issue';
            approvalChance = 'Chances moyennes d\'approbation (60-80%)';
            insight = 'Votre template a du potentiel mais nécessite des améliorations pour garantir l\'approbation.';
        } else if (score >= 50) {
            grade = 'INSUFFISANT';
            verdict = '❌ Template à Améliorer';
            verdictClass = 'critical-issue';
            approvalChance = 'Faibles chances d\'approbation (30-60%)';
            insight = 'Des améliorations importantes sont nécessaires avant la soumission.';
        } else {
            grade = 'CRITIQUE';
            verdict = '🚫 Template Non Conforme';
            verdictClass = 'critical-issue';
            approvalChance = 'Approbation très improbable (<30%)';
            insight = 'Le template nécessite une refonte majeure pour respecter les standards ThemeForest.';
        }
        
        // Mise à jour de l'interface
        document.getElementById('scoreGrade').textContent = grade;
        document.getElementById('verdictTitle').textContent = verdict;
        document.getElementById('verdictText').textContent = `Score global: ${score}% • ${results.passedChecks}/${results.totalChecks} vérifications réussies`;
        document.getElementById('approvalChance').textContent = approvalChance;
        document.getElementById('insightText').textContent = insight;
        
        const verdictElement = document.getElementById('finalVerdict');
        verdictElement.className = `mb-6 p-6 rounded-2xl border-l-4 ${verdictClass}`;
        
        // Création du graphique de score
        this.createScoreChart(score);
        
        // Mise à jour des étoiles
        this.updateStarRating(score);
    }

    // Création du graphique de score
    createScoreChart(score) {
        const canvas = document.getElementById('scoreChart');
        const ctx = canvas.getContext('2d');
        
        // Destruction du graphique précédent
        if (this.scoreChart) {
            this.scoreChart.destroy();
        }
        
        // Configuration du graphique
        this.scoreChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: [
                        score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444',
                        'rgba(100, 116, 139, 0.2)'
                    ],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    // Mise à jour des étoiles
    updateStarRating(score) {
        const stars = Math.ceil(score / 20); // 5 étoiles max
        
        for (let i = 1; i <= 5; i++) {
            const star = document.getElementById(`star${i}`);
            if (i <= stars) {
                star.className = 'w-3 h-3 rounded-full bg-yellow-400';
            } else {
                star.className = 'w-3 h-3 rounded-full bg-gray-600';
            }
        }
    }

    // Affichage des issues critiques
    displayCriticalIssues() {
        const criticalIssues = this.analysisResults.issues.filter(issue => 
            issue.severity === 'critical' || issue.severity === 'high'
        );
        
        document.getElementById('criticalCount').textContent = criticalIssues.length;
        
        const container = document.getElementById('criticalIssuesList');
        container.innerHTML = '';
        
        if (criticalIssues.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <div class="text-4xl mb-4">🎉</div>
                    <p>Aucun problème critique détecté !</p>
                </div>
            `;
            return;
        }
        
        criticalIssues.forEach((issue, index) => {
            const issueElement = this.createIssueElement(issue, index);
            container.appendChild(issueElement);
        });
    }

    // Affichage des succès
    displaySuccesses() {
        const successes = this.analysisResults.successes;
        
        document.getElementById('successCount').textContent = successes.length;
        
        const container = document.getElementById('successList');
        container.innerHTML = '';
        
        if (successes.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <div class="text-4xl mb-4">😔</div>
                    <p>Aucune validation réussie</p>
                </div>
            `;
            return;
        }
        
        successes.slice(0, 10).forEach((success, index) => {
            const successElement = this.createSuccessElement(success, index);
            container.appendChild(successElement);
        });
        
        if (successes.length > 10) {
            const moreElement = document.createElement('div');
            moreElement.className = 'text-center py-4 text-slate-400';
            moreElement.innerHTML = `<p>... et ${successes.length - 10} autres validations réussies</p>`;
            container.appendChild(moreElement);
        }
    }

    // Affichage de l'analyse par catégorie
    displayCategoryAnalysis() {
        const container = document.getElementById('categoryAnalysis');
        container.innerHTML = '';
        
        Object.entries(this.analysisResults.categoryScores).forEach(([key, category]) => {
            const categoryElement = this.createCategoryElement(category);
            container.appendChild(categoryElement);
        });
    }

    // Affichage de l'analyse par fichier
    displayFileAnalysis() {
        const container = document.getElementById('fileAnalysis');
        container.innerHTML = '';
        
        const fileAnalysis = this.analysisResults.fileAnalysis;
        
        if (Object.keys(fileAnalysis).length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <p>Aucune analyse de fichier disponible</p>
                </div>
            `;
            return;
        }
        
        Object.entries(fileAnalysis).forEach(([fileName, analysis]) => {
            const fileElement = this.createFileElement(fileName, analysis);
            container.appendChild(fileElement);
        });
    }

    // Affichage des recommandations
    displayRecommendations() {
        const container = document.getElementById('expertRecommendations');
        container.innerHTML = '';
        
        const recommendations = this.analysisResults.recommendations;
        
        if (recommendations.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <div class="text-4xl mb-4">🎯</div>
                    <p>Aucune recommandation spécifique</p>
                </div>
            `;
            return;
        }
        
        recommendations.forEach((recommendation, index) => {
            const recElement = this.createRecommendationElement(recommendation, index);
            container.appendChild(recElement);
        });
    }

    // Création d'un élément d'issue
    createIssueElement(issue, index) {
        const element = document.createElement('div');
        element.className = `${issue.severity === 'critical' ? 'critical-issue' : 'warning-issue'} p-4 rounded-xl`;
        element.style.animationDelay = `${index * 0.1}s`;
        
        const severityIcon = issue.severity === 'critical' ? '🚨' : '⚠️';
        const severityColor = issue.severity === 'critical' ? 'text-red-400' : 'text-yellow-400';
        
        element.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="text-2xl">${severityIcon}</div>
                <div class="flex-1">
                    <h4 class="font-bold ${severityColor} mb-2">${issue.name}</h4>
                    <p class="text-slate-300 text-sm mb-3">${issue.description}</p>
                    <div class="text-xs text-slate-400 mb-2">
                        <span class="inline-block bg-slate-700 px-2 py-1 rounded">
                            ${issue.severity.toUpperCase()}
                        </span>
                        <span class="inline-block bg-slate-700 px-2 py-1 rounded ml-2">
                            -${issue.points} points
                        </span>
                    </div>
                    ${issue.fix ? `
                        <div class="bg-slate-800/50 p-3 rounded-lg mt-3">
                            <p class="text-sm text-slate-300">
                                <strong class="text-blue-400">💡 Solution:</strong> ${issue.fix}
                            </p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        return element;
    }

    // Création d'un élément de succès
    createSuccessElement(success, index) {
        const element = document.createElement('div');
        element.className = 'success-item p-3 rounded-lg';
        element.style.animationDelay = `${index * 0.05}s`;
        
        element.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="text-green-400 text-xl">✅</div>
                <div class="flex-1">
                    <h5 class="font-semibold text-green-400">${success.name}</h5>
                    <p class="text-slate-400 text-sm">${success.description}</p>
                </div>
                <div class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    +${success.points}
                </div>
            </div>
        `;
        
        return element;
    }

    // Création d'un élément de catégorie
    createCategoryElement(category) {
        const element = document.createElement('div');
        element.className = 'category-card';
        
        const percentage = category.percentage;
        const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red';
        const colorClass = {
            green: 'text-green-400',
            yellow: 'text-yellow-400',
            red: 'text-red-400'
        }[color];
        
        element.innerHTML = `
            <div class="text-center">
                <div class="text-3xl mb-3">${category.icon}</div>
                <h4 class="font-bold text-white mb-2">${category.name}</h4>
                <div class="category-score ${colorClass} mb-3">${percentage}%</div>
                <div class="progress-container mb-3">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="text-sm text-slate-400">
                    ${category.successes.length}/${category.checks.length} validations
                </div>
                <div class="text-xs text-slate-500 mt-2">
                    Poids: ${category.weight}%
                </div>
            </div>
        `;
        
        return element;
    }

    // Création d'un élément de fichier
    createFileElement(fileName, analysis) {
        const element = document.createElement('div');
        element.className = 'file-item';
        
        const fileType = this.getFileType(fileName);
        const fileIcon = this.getFileIcon(fileType);
        const fileSize = this.formatFileSize(analysis.size);
        
        const issuesCount = analysis.issues ? analysis.issues.length : 0;
        const successesCount = analysis.successes ? analysis.successes.length : 0;
        
        element.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="file-icon ${fileType}">${fileIcon}</div>
                <div class="flex-1">
                    <h5 class="font-semibold text-white">${fileName}</h5>
                    <p class="text-slate-400 text-sm">${fileSize} • ${analysis.type.toUpperCase()}</p>
                </div>
                <div class="text-right">
                    <div class="flex space-x-2 mb-1">
                        ${successesCount > 0 ? `<span class="text-green-400 text-sm">✅ ${successesCount}</span>` : ''}
                        ${issuesCount > 0 ? `<span class="text-red-400 text-sm">❌ ${issuesCount}</span>` : ''}
                    </div>
                    <div class="text-xs text-slate-500">
                        ${Object.keys(analysis.patterns || {}).length} patterns analysés
                    </div>
                </div>
            </div>
        `;
        
        return element;
    }

    // Création d'un élément de recommandation
    createRecommendationElement(recommendation, index) {
        const element = document.createElement('div');
        element.className = 'recommendation-item';
        element.style.animationDelay = `${index * 0.1}s`;
        
        const priorityClass = `priority-${recommendation.priority}`;
        const priorityIcon = {
            high: '🔥',
            medium: '⚡',
            low: '💡'
        }[recommendation.priority];
        
        element.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="text-2xl">${priorityIcon}</div>
                <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-3">
                        <h4 class="font-bold text-white">${recommendation.title}</h4>
                        <span class="recommendation-priority ${priorityClass}">
                            ${recommendation.priority}
                        </span>
                    </div>
                    <p class="text-slate-300 mb-4">${recommendation.description}</p>
                    ${recommendation.actions && recommendation.actions.length > 0 ? `
                        <div class="space-y-2">
                            <h5 class="font-semibold text-blue-400">Actions recommandées:</h5>
                            <ul class="space-y-1">
                                ${recommendation.actions.map(action => `
                                    <li class="text-sm text-slate-300 flex items-start space-x-2">
                                        <span class="text-blue-400 mt-1">•</span>
                                        <span>${action}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        return element;
    }

    // Utilitaires
    getFileType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'html':
            case 'htm':
                return 'html';
            case 'css':
                return 'css';
            case 'js':
                return 'js';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
            case 'webp':
                return 'img';
            default:
                return 'other';
        }
    }

    getFileIcon(fileType) {
        const icons = {
            html: 'H',
            css: 'C',
            js: 'J',
            img: '🖼️',
            other: '📄'
        };
        return icons[fileType] || '📄';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Animation des résultats
    animateResults() {
        const elements = document.querySelectorAll('#resultsSection .glass-effect');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Création des particules flottantes
    createFloatingParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Configuration de l'accessibilité
    setupAccessibility() {
        // Gestion du focus pour les éléments interactifs
        const interactiveElements = document.querySelectorAll('button, input, [tabindex]');
        interactiveElements.forEach(element => {
            element.addEventListener('focus', (e) => {
                e.target.style.outline = '2px solid #3b82f6';
                e.target.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', (e) => {
                e.target.style.outline = '';
                e.target.style.outlineOffset = '';
            });
        });

        // Support des préférences utilisateur
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }
    }

    // Vérification du support navigateur
    checkBrowserSupport() {
        const requiredFeatures = [
            'Promise',
            'fetch',
            'FileReader',
            'addEventListener'
        ];
        
        const unsupportedFeatures = requiredFeatures.filter(feature => 
            typeof window[feature] === 'undefined'
        );
        
        if (unsupportedFeatures.length > 0) {
            this.showError(
                'Navigateur non supporté',
                `Fonctionnalités manquantes: ${unsupportedFeatures.join(', ')}`
            );
        }
    }

    // Mise à jour de l'interface de progression
    updateProgressUI(percentage, message) {
        const progressPercent = document.getElementById('progressPercent');
        const progressCircle = document.getElementById('progressCircle');
        const currentCheck = document.getElementById('currentCheck');
        
        if (progressPercent) {
            progressPercent.textContent = `${percentage}%`;
        }
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 15.9155;
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDasharray = `${circumference}`;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        if (currentCheck) {
            currentCheck.textContent = message;
        }
    }

    // Mise à jour de l'analyse temps réel
    updateRealTimeAnalysis(message, type = 'info') {
        const container = document.getElementById('realTimeAnalysis');
        if (!container) return;
        
        const logElement = document.createElement('div');
        const colors = {
            success: 'text-green-400',
            error: 'text-red-400',
            warning: 'text-yellow-400',
            info: 'text-blue-400'
        };
        
        logElement.className = `flex items-center ${colors[type] || colors.info}`;
        logElement.innerHTML = `
            <span class="w-2 h-2 bg-current rounded-full mr-3 animate-pulse"></span>
            <span class="text-sm">${message}</span>
        `;
        
        container.appendChild(logElement);
        container.scrollTop = container.scrollHeight;
        
        // Limitation du nombre de logs
        while (container.children.length > 50) {
            container.removeChild(container.firstChild);
        }
    }

    // Effacement de l'analyse temps réel
    clearRealTimeAnalysis() {
        const container = document.getElementById('realTimeAnalysis');
        if (container) {
            container.innerHTML = `
                <div class="text-green-400 flex items-center">
                    <span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    ✓ Initialisation modules experts...
                </div>
            `;
        }
    }

    // Affichage d'erreur
    showError(title, message) {
        // Création d'une notification d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-2xl z-50 max-w-md';
        errorDiv.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="text-2xl">❌</div>
                <div class="flex-1">
                    <h4 class="font-bold mb-1">${title}</h4>
                    <p class="text-sm opacity-90">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-red-200">
                    ✕
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Suppression automatique après 5 secondes
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Réinitialisation du validateur
    resetValidator() {
        this.currentFile = null;
        this.analysisResults = null;
        
        if (this.scoreChart) {
            this.scoreChart.destroy();
            this.scoreChart = null;
        }
        
        // Réinitialisation de l'interface
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('progressSection').classList.add('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        
        // Réinitialisation du file input
        document.getElementById('fileInput').value = '';
        
        console.log('🔄 Validateur réinitialisé');
    }

    // Export des fonctions pour les boutons
    downloadExpertReport() {
        if (!this.analysisResults) return;
        
        const report = this.generateDetailedReport();
        const blob = new Blob([report], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `themeforest-report-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateFixScript() {
        if (!this.analysisResults) return;
        
        const script = this.generateAutoFixScript();
        const blob = new Blob([script], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `themeforest-fixes-${Date.now()}.js`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportToJSON() {
        if (!this.analysisResults) return;
        
        const jsonData = JSON.stringify(this.analysisResults, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `themeforest-analysis-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Génération du rapport détaillé
    generateDetailedReport() {
        const results = this.analysisResults;
        const date = new Date().toLocaleDateString('fr-FR');
        
        return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport ThemeForest Validator Pro</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; }
        .score { font-size: 3em; font-weight: bold; color: ${results.totalScore >= 80 ? '#10b981' : results.totalScore >= 60 ? '#f59e0b' : '#ef4444'}; }
        .section { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .critical { background-color: #fef2f2; border-color: #ef4444; }
        .success { background-color: #f0fdf4; border-color: #10b981; }
        .warning { background-color: #fffbeb; border-color: #f59e0b; }
        ul { padding-left: 20px; }
        .footer { text-align: center; margin-top: 40px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rapport ThemeForest Validator Pro</h1>
        <p>Analyse du template: <strong>${results.fileName}</strong></p>
        <p>Date: ${date}</p>
        <div class="score">${results.totalScore}%</div>
    </div>
    
    <div class="section">
        <h2>Résumé Exécutif</h2>
        <p><strong>Score global:</strong> ${results.totalScore}%</p>
        <p><strong>Validations réussies:</strong> ${results.passedChecks}/${results.totalChecks}</p>
        <p><strong>Temps d'analyse:</strong> ${Math.round(results.analysisTime / 1000)}s</p>
        <p><strong>Taille du template:</strong> ${this.formatFileSize(results.fileSize)}</p>
    </div>
    
    ${results.issues.filter(i => i.severity === 'critical').length > 0 ? `
    <div class="section critical">
        <h2>🚨 Problèmes Critiques</h2>
        <ul>
            ${results.issues.filter(i => i.severity === 'critical').map(issue => `
                <li><strong>${issue.name}:</strong> ${issue.description}</li>
            `).join('')}
        </ul>
    </div>
    ` : ''}
    
    <div class="section success">
        <h2>✅ Validations Réussies</h2>
        <ul>
            ${results.successes.slice(0, 10).map(success => `
                <li><strong>${success.name}:</strong> ${success.description}</li>
            `).join('')}
        </ul>
        ${results.successes.length > 10 ? `<p><em>... et ${results.successes.length - 10} autres validations</em></p>` : ''}
    </div>
    
    <div class="section">
        <h2>📊 Analyse par Catégorie</h2>
        ${Object.entries(results.categoryScores).map(([key, category]) => `
            <p><strong>${category.name}:</strong> ${category.percentage}% (${category.successes.length}/${category.checks.length} validations)</p>
        `).join('')}
    </div>
    
    ${results.recommendations.length > 0 ? `
    <div class="section warning">
        <h2>💡 Recommandations</h2>
        ${results.recommendations.map(rec => `
            <h3>${rec.title}</h3>
            <p>${rec.description}</p>
            ${rec.actions ? `
                <ul>
                    ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            ` : ''}
        `).join('')}
    </div>
    ` : ''}
    
    <div class="footer">
        <p>Rapport généré par ThemeForest Validator Pro</p>
        <p>Validateur Expert Masterclass - Sans API IA</p>
    </div>
</body>
</html>
        `;
    }

    // Génération du script de correction automatique
    generateAutoFixScript() {
        const results = this.analysisResults;
        const fixes = results.issues.map(issue => issue.fix).filter(fix => fix);
        
        return `
// Script de correction automatique ThemeForest
// Généré le ${new Date().toLocaleDateString('fr-FR')}

console.log('🔧 Script de correction ThemeForest Validator Pro');
console.log('Problèmes détectés: ${results.issues.length}');

// Corrections suggérées:
${fixes.map((fix, index) => `
// ${index + 1}. ${fix}
console.log('${index + 1}. ${fix}');
`).join('')}

// Fonctions utilitaires pour les corrections courantes

function addMissingMetaTags() {
    const head = document.head;
    
    // Meta viewport
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0';
        head.appendChild(viewport);
        console.log('✅ Meta viewport ajouté');
    }
    
    // Meta description
    if (!document.querySelector('meta[name="description"]')) {
        const description = document.createElement('meta');
        description.name = 'description';
        description.content = 'Description de votre template';
        head.appendChild(description);
        console.log('✅ Meta description ajouté');
    }
}

function addMissingAltAttributes() {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img, index) => {
        img.alt = \`Image \${index + 1}\`;
    });
    console.log(\`✅ \${images.length} attributs alt ajoutés\`);
}

function removeConsoleStatements() {
    console.log('⚠️ Supprimez manuellement tous les console.log de votre code JavaScript');
}

// Exécution des corrections
console.log('🚀 Début des corrections automatiques...');
addMissingMetaTags();
addMissingAltAttributes();
removeConsoleStatements();
console.log('✅ Corrections terminées');
        `;
    }
}

// Fonctions globales pour les boutons
function downloadExpertReport() {
    if (window.validatorApp) {
        window.validatorApp.downloadExpertReport();
    }
}

function generateFixScript() {
    if (window.validatorApp) {
        window.validatorApp.generateFixScript();
    }
}

function exportToJSON() {
    if (window.validatorApp) {
        window.validatorApp.exportToJSON();
    }
}

function resetValidator() {
    if (window.validatorApp) {
        window.validatorApp.resetValidator();
    }
}

// Fonctions globales pour l'interface
function updateProgressUI(percentage, message) {
    if (window.validatorApp) {
        window.validatorApp.updateProgressUI(percentage, message);
    }
}

function updateRealTimeAnalysis(message, type) {
    if (window.validatorApp) {
        window.validatorApp.updateRealTimeAnalysis(message, type);
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    window.validatorApp = new ValidatorApp();
    console.log('🎉 ThemeForest Validator Pro prêt !');
});

