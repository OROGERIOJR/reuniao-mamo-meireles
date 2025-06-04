// Main JavaScript for Mamô Meireles Landing Page

// Progress Bar
window.onscroll = function() {
  updateProgressBar();
};

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize charts with a slight delay to ensure DOM is fully loaded
  setTimeout(function() {
    initCharts();
  }, 500);
});

// Animation functions
function initAnimations() {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Fade in animations for sections
  const fadeElements = document.querySelectorAll('.section-title, .metric-card, .highlight-card, .ranking-card, .strategy-card, .campaign-large-card, .team-card, .insight-card, .action-card, .timeline-week');
  
  fadeElements.forEach((element, index) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        delay: index % 3 * 0.1 // Stagger effect for grouped elements
      }
    );
  });
  
  // Slide in from left
  const leftElements = document.querySelectorAll('.executive-summary, .analysis-box, .campaigns-container, .topics-container, .risks-container');
  
  leftElements.forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Slide in from right
  const rightElements = document.querySelectorAll('.chart-container, .culture-message, .final-message');
  
  rightElements.forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Scale in animations
  const scaleElements = document.querySelectorAll('.ranking-position, .metric-value, .pillar-icon, .final-goal');
  
  scaleElements.forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Staggered list animations
  const lists = document.querySelectorAll('.strategy-list, .team-list, .insight-list, .action-list, .vm-list, .dynamics-grid, .topics-grid');
  
  lists.forEach(list => {
    const items = list.children;
    gsap.fromTo(items, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: list,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Special animation for the header
  gsap.fromTo('.header', 
    { y: -100 },
    { y: 0, duration: 1, ease: "power2.out" }
  );
  
  // Special animation for the cover section
  gsap.fromTo('.section-capa .content-wrapper', 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
  );
}

// Chart initialization
function initCharts() {
  console.log("Initializing charts...");
  
  // Performance Chart
  const performanceCtx = document.getElementById('performanceChart');
  
  if (performanceCtx) {
    console.log("Performance chart canvas found");
    
    // Data from June 2024
    const dates = ['01/06', '03/06', '12/06', '13/06', '19/06', '25/06', '29/06'];
    const sales = [9192.58, 2280.78, 8496.89, 5219.79, 5994.77, 3244.86, 10876.00];
    const ticketAvg = [835.69, 285.10, 472.05, 652.47, 599.48, 811.22, 639.76];
    const priceAvg = [255.35, 162.91, 229.65, 237.26, 230.57, 180.27, 184.34];
    
    try {
      // Create chart with animation
      const performanceChart = new Chart(performanceCtx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Faturamento (R$)',
              data: sales,
              backgroundColor: 'rgba(230, 57, 70, 0.7)',
              borderColor: 'rgba(230, 57, 70, 1)',
              borderWidth: 1,
              order: 1
            },
            {
              label: 'Ticket Médio (R$)',
              data: ticketAvg,
              backgroundColor: 'rgba(248, 165, 165, 0.7)',
              borderColor: 'rgba(248, 165, 165, 1)',
              borderWidth: 1,
              order: 2
            },
            {
              label: 'Preço Médio (R$)',
              data: priceAvg,
              type: 'line',
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              borderColor: 'rgba(212, 175, 55, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(212, 175, 55, 1)',
              pointRadius: 4,
              tension: 0.3,
              order: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                font: {
                  family: "'Montserrat', sans-serif"
                }
              }
            },
            title: {
              display: true,
              text: 'Desempenho Junho 2024',
              font: {
                family: "'Playfair Display', serif",
                size: 16
              },
              padding: {
                bottom: 20
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                  }
                  return label;
                }
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart',
            delay: function(context) {
              // Stagger the animation of each dataset
              return context.datasetIndex * 300;
            }
          }
        }
      });
      
      console.log("Performance chart created successfully");
      
      // Create a simple fallback chart if the main one fails
      if (!performanceChart) {
        createFallbackChart(performanceCtx, dates, sales);
      }
    } catch (error) {
      console.error("Error creating performance chart:", error);
      createFallbackChart(performanceCtx, dates, sales);
    }
  } else {
    console.error("Performance chart canvas not found");
  }
  
  // Create a simple fallback chart if needed
  function createFallbackChart(canvas, labels, data) {
    console.log("Creating fallback chart");
    try {
      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Faturamento (R$)',
            data: data,
            backgroundColor: 'rgba(230, 57, 70, 0.7)',
            borderColor: 'rgba(230, 57, 70, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } catch (error) {
      console.error("Error creating fallback chart:", error);
    }
  }
  
  // Create a static chart if dynamic fails
  function createStaticChart() {
    const container = document.querySelector('.chart-container');
    if (container && !document.getElementById('staticChart')) {
      console.log("Creating static chart");
      const img = document.createElement('img');
      img.id = 'staticChart';
      img.alt = 'Gráfico de Desempenho Junho 2024';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.maxHeight = '350px';
      
      // Create a simple canvas to draw a static chart
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      
      // Draw background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw title
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Desempenho Junho 2024', canvas.width/2, 30);
      
      // Draw bars
      const barData = [9192.58, 2280.78, 8496.89, 5219.79, 5994.77, 3244.86, 10876.00];
      const barLabels = ['01/06', '03/06', '12/06', '13/06', '19/06', '25/06', '29/06'];
      const maxValue = Math.max(...barData);
      const barWidth = 60;
      const spacing = 30;
      const startX = 100;
      const startY = 350;
      const heightScale = 250 / maxValue;
      
      // Draw bars
      ctx.fillStyle = 'rgba(230, 57, 70, 0.7)';
      barData.forEach((value, index) => {
        const height = value * heightScale;
        const x = startX + index * (barWidth + spacing);
        const y = startY - height;
        ctx.fillRect(x, y, barWidth, height);
        
        // Draw value
        ctx.fillStyle = '#333333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`R$${Math.round(value)}`, x + barWidth/2, y - 10);
        
        // Draw label
        ctx.fillText(barLabels[index], x + barWidth/2, startY + 20);
        
        ctx.fillStyle = 'rgba(230, 57, 70, 0.7)';
      });
      
      // Draw axes
      ctx.strokeStyle = '#333333';
      ctx.beginPath();
      ctx.moveTo(80, 50);
      ctx.lineTo(80, startY);
      ctx.lineTo(canvas.width - 50, startY);
      ctx.stroke();
      
      // Convert canvas to image
      img.src = canvas.toDataURL();
      
      // Replace chart container content
      container.innerHTML = '';
      container.appendChild(img);
    }
  }
  
  // If chart doesn't appear after 2 seconds, create static version
  setTimeout(function() {
    const chartExists = document.querySelector('.chart-container canvas') && 
                        document.querySelector('.chart-container canvas').__chartjs__;
    if (!chartExists) {
      console.log("Chart not rendered after timeout, creating static version");
      createStaticChart();
    }
  }, 2000);
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add hover effects for interactive elements
document.querySelectorAll('.ranking-card, .campaign-card, .dynamic-card, .topic-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    gsap.to(this, { y: -5, duration: 0.3, ease: "power2.out" });
  });
  
  card.addEventListener('mouseleave', function() {
    gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" });
  });
});

// Add RGB animation to progress bar
gsap.to('.progress-bar', {
  backgroundPosition: '100% 50%',
  repeat: -1,
  duration: 10,
  ease: "none"
});

// Ensure Chart.js is loaded
window.addEventListener('load', function() {
  if (typeof Chart === 'undefined') {
    console.error("Chart.js not loaded");
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
      console.log("Chart.js loaded dynamically");
      initCharts();
    };
    document.head.appendChild(script);
  } else {
    console.log("Chart.js already loaded");
  }
});
