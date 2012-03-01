
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
		renderTemplate('#content', 'request-list', 'request', renderRequestList);
	});

	function renderRequestList() {
		//$('#request-list').hide().slideDown();

		//$('#request-list .request').hide().slideDown();

		var requestItems = $('#request-list .request').hide();

		itemQueueSlideDown($.makeArray(requestItems));

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

		$.each(requestItems, function() {
			var requestItem = this;

			$('a[href="#comment"]', requestItem).click(function() {
				$(requestItems).parent().css({position: 'relative'});

				var requestItemPosition = $(requestItem).position();

				$(requestItem).css({position: 'relative', zIndex: 100});
				$(requestItem).animate({top: '-' + requestItemPosition.top + 'px'}, 400, function() {
					$(this).css({position: '', zIndex: '', top: ''});

					$(requestItems).parent().css({position: 'relative'});
				});

				$(requestItems).not(requestItem).fadeOut(400);
			});
		});
	}

	function itemQueueSlideDown(itemQueue) {
		var item = itemQueue.shift();

		$(item).slideDown(100 ,function() {
			itemQueueSlideDown(itemQueue);
		});
	}

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

		$(container).hide();

		if (!mode) {
			$(templates[templateName]).tmpl().appendTo(container);

			$(container).show();

			if (renderFunction) {
				renderFunction();
			}

			return;
		}

		$.each(queues[mode], function() {
			$(templates[templateName]).tmpl(this).appendTo(container);
		});

		delete(queues[mode]);

		$(container).show();

		if (renderFunction) {
			renderFunction();
		}

		return;
	}

	function getTemplate(templateName, renderFunction) {
		$.ajax({
			url: config.templatePath + templateName + config.templateSuffix,
			cache: false,
			dataType: 'html',
			success: function(html) {
				templates[templateName] = $('<div></div>').append(html);

				renderFunction();
			}
		});
	}

	function getJson(mode, renderFunction) {
		$.ajax({
			url: config.ajaxReceiver,
			cache: false,
			dataType: 'json',
			success: function(object) {
				queues[mode] = object;

				renderFunction();
			}
		});
	}

})(jQuery);
