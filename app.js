$(document).ready(function () {

    // 1. Heavy Header Logic (Fixes overflow & transparency)
    const $navbar = $('#navbar');
    const $navContainer = $('#nav-container');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $navbar.removeClass('w-full py-4 bg-black/40 border-b border-white/5')
                .addClass('top-4 left-0 right-0 mx-auto max-w-5xl rounded-full py-2 border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-black/80');
            $navContainer.height(50); // Ensure consistent height
        } else {
            $navbar.addClass('w-full py-4 bg-black/40 border-b border-white/5')
                .removeClass('top-4 max-w-5xl rounded-full py-2 border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-black/80');
            $navContainer.height(64); // Return to default
        }
    });

    $(document).ready(function () {
        const $glow = $('#cursor-glow');
        const $dot = $('#cursor-dot');

        $(document).on('mousemove', function (e) {
            const x = e.clientX;
            const y = e.clientY;

            // Move dot and glow
            $dot.css('transform', `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`);
            $glow.css('transform', `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`);

            // Create Particle
            createParticle(x, y);
        });

        function createParticle(x, y) {
            // Only spawn particles occasionally for performance
            if (Math.random() > 0.5) {
                const size = Math.random() * 4 + 2;
                const $p = $('<div class="particle"></div>').css({
                    width: size,
                    height: size,
                    left: x,
                    top: y,
                    background: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6',
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
                });

                $('body').append($p);

                // Move particle slightly in random direction
                const destinationX = (Math.random() - 0.5) * 50;
                const destinationY = (Math.random() - 0.5) * 50;

                $p.animate({
                    left: `+=${destinationX}`,
                    top: `+=${destinationY}`
                }, 1000);

                // Remove from DOM after animation
                setTimeout(() => { $p.remove(); }, 1000);
            }
        }
    });

    // // 2. Custom Cursor Logic (Performance optimized)
    const $cursorGlow = $('#cursor-glow');
    const $cursorDot = $('#cursor-dot');

    $(document).on('mousemove', function (e) {
        // Using CSS transform is more performant than top/left
        $cursorDot.css('transform', `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`);

        // Add a slight delay/drag to the glow for smooth effect
        setTimeout(function () {
            $cursorGlow.css('transform', `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`);
        }, 50);
    });

    // 3. 3D Tilt Effect on Cards
    $('.tilt-card').mousemove(function (e) {
        const card = $(this);
        const offset = card.offset();
        const width = card.width();
        const height = card.height();

        // Calculate mouse position relative to card center
        const centerX = offset.left + width / 2;
        const centerY = offset.top + height / 2;
        const mouseX = e.pageX - centerX;
        const mouseY = e.pageY - centerY;

        // Calculate rotation (max 15 degrees)
        const rotateX = (mouseY / height) * -15;
        const rotateY = (mouseX / width) * 15;

        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    }).mouseleave(function () {
        $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
    });

    // 4. Scroll Reveal "Heavy" Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    $('.reveal-up').each(function () {
        observer.observe(this);
    });

});
