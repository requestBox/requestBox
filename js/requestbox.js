
(function($) {

	var queues = {};
	var templates = {};

	var config = {
		ajaxReceiver: './ajax.php',
		ajaxTemplate: 'ajax-loader',
		templatePath: './',
		templateSuffix: '.html'
	};

	$(document).ready(function() {

		renderTemplate('#content', 'request-list', 'request', function() {
			var newRequest = $('#new-request');
			var newRequestLink = $('a[href="#new-request"]');

			newRequest.on('show', function() {
				$('.open-form', newRequestLink).hide();
				$('.close-form', newRequestLink).show();
			}).on('hide', function() {
				$('.open-form', newRequestLink).show();
				$('.close-form', newRequestLink).hide();
			}).collapse('hide').show();

			$('button[type="reset"]', newRequest).click(function() {
				newRequestLink.click();
			});

			$('button[type="submit"]', newRequest).click(function() {
				alert('submit');

				return false;
			});
		});

	});

	function renderTemplate(container, templateName, mode, renderFunction) {
		if (!templates[templateName]) {
			getTemplate(config.ajaxTemplate, function() {
				renderTemplate(container, config.ajaxTemplate);

				getTemplate(templateName, function() {
					$(container).html('');

					renderTemplate(container, templateName, mode, renderFunction);
				});
			});

			return;
		}

		if (mode && !queues[mode]) {
			renderTemplate(container, templateName);

			renderTemplate('#' + templateName, config.ajaxTemplate);

			getJson(mode, function() {
				$('#' + templateName).html('');

				renderTemplate('#' + templateName, mode, mode, renderFunction);
			});

			return;
		}

		if (!mode) {
			$(templates[templateName]).tmpl().appendTo(container);

			if (renderFunction) {
				renderFunction();
			}

			return;
		}

		$.each(queues[mode], function() {
			$(templates[templateName]).tmpl(this).appendTo(container);
		});

		delete(queues[mode]);

		if (renderFunction) {
			renderFunction();
		}
	}

	function getTemplate(templateName, renderFunction) {
		$.ajax({
			url: config.templatePath + templateName + config.templateSuffix,
			dataType: 'html',
			success: function(html) {
				templates[templateName] = html;

				renderFunction();
			}
		});
	}

	function getJson(mode, renderFunction) {
		$.ajax({
			url: config.ajaxReceiver,
			dataType: 'json',
			success: function(object) {
				queues[mode] = object;

				renderFunction();
			}
		});
	}

})(jQuery);
