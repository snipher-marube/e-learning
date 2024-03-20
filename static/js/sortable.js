document.addEventListener("DOMContentLoaded", function() {
    const modules = document.getElementById('modules');
    const moduleContents = document.getElementById('module-contents');

    new Sortable(modules, {
        onEnd: function(event) {
            const modulesOrder = {};
            Array.from(modules.children).forEach(function(module, index) {
                const moduleId = module.dataset.id;
                module.querySelector('.order').textContent = index + 1;
                modulesOrder[moduleId] = index;
            });
            sendOrderData('{% url "module_order" %}', modulesOrder);
        }
    });

    new Sortable(moduleContents, {
        onEnd: function(event) {
            const contentsOrder = {};
            Array.from(moduleContents.children).forEach(function(content, index) {
                const contentId = content.dataset.id;
                contentsOrder[contentId] = index;
            });
            sendOrderData('{% url "content_order" %}', contentsOrder);
        }
    });

    function sendOrderData(url, data) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Ensure to implement getCookie function
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data)) // Handle the response accordingly
        .catch(error => console.error('Error:', error));
    }
});
