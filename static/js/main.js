// TrueTone AI - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize word counter
    const textArea = document.getElementById('essay-text');
    const wordCounter = document.getElementById('word-counter');
    
    if (textArea && wordCounter) {
        textArea.addEventListener('input', updateWordCounter);
        updateWordCounter(); // Initial count
    }
    
    // Initialize copy to clipboard functionality
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }
    
    // Initialize download functionality
    const downloadTxtBtn = document.getElementById('download-txt');
    const downloadDocxBtn = document.getElementById('download-docx');
    
    if (downloadTxtBtn) {
        downloadTxtBtn.addEventListener('click', () => downloadText('txt'));
    }
    
    if (downloadDocxBtn) {
        downloadDocxBtn.addEventListener('click', () => downloadText('docx'));
    }
    
    // Initialize humanize functionality
    const humanizeBtn = document.getElementById('humanize-btn');
    if (humanizeBtn) {
        humanizeBtn.addEventListener('click', humanizeText);
    }
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card, .pricing-card, .feature-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

function updateWordCounter() {
    const textArea = document.getElementById('essay-text');
    const wordCounter = document.getElementById('word-counter');
    const humanizeBtn = document.getElementById('humanize-btn');
    
    if (!textArea || !wordCounter) return;
    
    const text = textArea.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    
    wordCounter.textContent = `${wordCount} words`;
    
    // Check if user is on free plan and limit is exceeded
    const isFreePlan = document.body.dataset.userPlan === 'free';
    const maxWords = 100;
    
    if (isFreePlan) {
        if (wordCount > maxWords) {
            wordCounter.className = 'word-counter error';
            wordCounter.textContent = `${wordCount} words (Limit: ${maxWords} words)`;
            if (humanizeBtn) {
                humanizeBtn.disabled = true;
                humanizeBtn.textContent = 'Upgrade for Unlimited';
            }
        } else if (wordCount > maxWords * 0.8) {
            wordCounter.className = 'word-counter warning';
            if (humanizeBtn) {
                humanizeBtn.disabled = false;
                humanizeBtn.textContent = 'Humanize Text';
            }
        } else {
            wordCounter.className = 'word-counter';
            if (humanizeBtn) {
                humanizeBtn.disabled = false;
                humanizeBtn.textContent = 'Humanize Text';
            }
        }
    } else {
        wordCounter.className = 'word-counter';
        if (humanizeBtn) {
            humanizeBtn.disabled = false;
            humanizeBtn.textContent = 'Humanize Text';
        }
    }
}

async function humanizeText() {
    const textArea = document.getElementById('essay-text');
    const outputBox = document.getElementById('output-box');
    const humanizeBtn = document.getElementById('humanize-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (!textArea || !outputBox || !humanizeBtn) return;
    
    const text = textArea.value.trim();
    if (!text) {
        showAlert('Please enter some text to humanize.', 'danger');
        return;
    }
    
    // Show loading state
    humanizeBtn.disabled = true;
    humanizeBtn.innerHTML = '<span class="spinner"></span> Processing...';
    outputBox.textContent = 'Processing your text...';
    
    try {
        const response = await fetch('/api/humanize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            outputBox.textContent = data.humanized_text;
            showAlert('Text humanized successfully!', 'success');
            
            // Show action buttons
            const actionButtons = document.getElementById('action-buttons');
            if (actionButtons) {
                actionButtons.style.display = 'flex';
            }
        } else {
            showAlert(data.error || 'An error occurred while processing your text.', 'danger');
            outputBox.textContent = '';
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Network error. Please try again.', 'danger');
        outputBox.textContent = '';
    } finally {
        // Reset button state
        humanizeBtn.disabled = false;
        humanizeBtn.textContent = 'Humanize Text';
    }
}

async function copyToClipboard() {
    const outputBox = document.getElementById('output-box');
    const copyBtn = document.getElementById('copy-btn');
    
    if (!outputBox || !copyBtn) return;
    
    const text = outputBox.textContent;
    if (!text) {
        showAlert('No text to copy.', 'danger');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Show success feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied ✅';
        copyBtn.classList.add('btn-success');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('btn-success');
        }, 2000);
        
        showAlert('Text copied to clipboard!', 'success');
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showAlert('Failed to copy text. Please try again.', 'danger');
    }
}

async function downloadText(format) {
    const outputBox = document.getElementById('output-box');
    
    if (!outputBox) return;
    
    const text = outputBox.textContent;
    if (!text) {
        showAlert('No text to download.', 'danger');
        return;
    }
    
    try {
        const response = await fetch(`/api/download/${format}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `humanized_text.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showAlert(`Text downloaded as ${format.toUpperCase()}!`, 'success');
        } else {
            const data = await response.json();
            showAlert(data.error || 'Download failed.', 'danger');
        }
    } catch (error) {
        console.error('Error downloading:', error);
        showAlert('Download failed. Please try again.', 'danger');
    }
}

function showAlert(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fade-in`;
    alertDiv.textContent = message;
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.container') || document.body;
    mainContent.insertBefore(alertDiv, mainContent.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.card, .pricing-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// PayPal integration placeholder
function initializePayPal() {
    // This would be implemented with PayPal SDK
    console.log('PayPal integration would be initialized here');
}

// Initialize PayPal when pricing page loads
if (window.location.pathname === '/pricing') {
    document.addEventListener('DOMContentLoaded', initializePayPal);
}
