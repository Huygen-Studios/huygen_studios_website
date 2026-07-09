document.addEventListener('DOMContentLoaded', () => {
    const layerBg = document.querySelector('.layer-bg');
    const layerText = document.querySelector('.layer-text');
    const layerSubject = document.querySelector('.layer-subject');

    // Wait slightly to let entrance animations finish before applying parallax
    setTimeout(() => {
        // Enable transition for smooth parallax catching up, then remove it for instant mouse tracking
        [layerBg, layerText, layerSubject].forEach(layer => {
            layer.style.transition = 'transform 0.3s ease-out';
        });

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

            // Subtle parallax movements
            // Background moves slightly opposite to mouse
            layerBg.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
            
            // Text moves with the mouse
            layerText.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
            
            // Subject moves opposite to the mouse (more pronounced to create depth)
            layerSubject.style.transform = `translate(${x * -25}px, ${y * -20}px)`;
        });

        // Remove the transition after a brief moment to allow direct 1:1 mouse tracking
        setTimeout(() => {
            [layerBg, layerText, layerSubject].forEach(layer => {
                layer.style.transition = 'transform 0.1s linear';
            });
        }, 300);

    }, 2000); // Wait 2s for initial CSS animations to settle
});
