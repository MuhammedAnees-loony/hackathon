function setStatus(statusIcon) {
    const currentStatus = document.getElementById('currentStatus');
    currentStatus.textContent = `Your Status: ${statusIcon}`;
    currentStatus.classList.add('status-updated');
    
    // Animation reset trick for status update effect
    setTimeout(() => {
        currentStatus.classList.remove('status-updated');
    }, 300);
}
