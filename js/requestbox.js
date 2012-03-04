
function debug(object) {
	if (typeof object != 'object') {
		jQuery('<div></div>').text(object).appendTo('body');
	} else {
		jQuery('<div></div>').text(printObject(object)).appendTo('body');
	}

	jQuery('<div></div>').text('--------------').appendTo('body');
}

function printObject(object) {
	var arr = [];

	jQuery.each(object, function(key, val) {
		var next = key + ': ' + (jQuery.isPlainObject(val) ? printObject(val) : val);

		arr.push(next);
	});

	return '{ ' + arr.join(', ') + ' }';
}

(function($) {

	var queues = {};
	var templates = {};

	var config = {
		ajaxReceiver: './ajax.php',
		ajaxTemplate: 'ajax-loader',
		ajaxTemplateIdentifier: '.ajax-loader',
		templatePath: './templates/',
		templateSuffix: '.html'
	};

	$(document).ready(function() {
		$('#content').html('');

		renderTemplate('#content', 'request-list', null, function() {
			renderTemplate('#request-list', 'request', 'request', renderRequestList);
		});
	});

	function renderRequestList() {
		var requestItems = $('#request-list .request').hide();

		itemQueueSlideDown($.makeArray(requestItems), 40);

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

			$('a[href="#vote"]', requestItem).click(function() {
				$('.count', requestItem).html(parseInt($('.count', requestItem).text()) + 1);
			});

			$('a[href="#comment"]', requestItem).click(function() {
				$(this).hide();

				$('html, body').animate({scrollTop: 0}, 400);

				$(requestItems).not(requestItem).fadeOut(400);

				$('#new-request, #new-request-link').fadeOut(400);

				$('#content').css({position: 'relative'});

				var requestItemPosition = $(requestItem).position();

				$(requestItem).css({position: 'relative', zIndex: 100});
				$(requestItem).animate({top: '-' + requestItemPosition.top + 'px'}, 400, function() {
					$(this).css({position: '', zIndex: '', top: ''});

					$('#content').css({position: 'relative'});

					renderTemplate('#content', 'comment-list', null, function() {
						renderTemplate('#comment-list', 'comment', 'comment', renderCommentList);
					});
				});
			});
		});
	}

	function renderCommentList() {
		var commentItems = $('#comment-list .comment').hide();

		itemQueueSlideDown($.makeArray(commentItems), 20, function() {
			$('#new-comment').slideDown(100);
		});
	}

	function itemQueueSlideDown(itemQueue, speed, callback) {
		var item = itemQueue.shift();

		//$(itemQueue).parent().slideDown();

		//$(itemQueue).slideDown();

		$(item).slideDown(speed ,function() {
			itemQueueSlideDown(itemQueue, speed, callback);
		});

		if (callback && itemQueue.length == 0) {
			callback();
		}
	}

	function renderTemplate(container, templateName, requestAction, callback) {
		if (templateName != config.ajaxTemplate && $(container).find(config.ajaxTemplateIdentifier).length < 1) {
			renderTemplate(container, config.ajaxTemplate, null, function() {
				renderTemplate(container, templateName, requestAction, callback);
			});

			return;
		}

		if (!templates[templateName]) {
			getTemplate(templateName, function() {
				renderTemplate(container, templateName, requestAction, callback);
			});

			return;
		}

		if (requestAction && !queues[requestAction]) {
			getJson(requestAction, function() {
				renderTemplate(container, templateName, requestAction, callback);
			});

			return;
		}

		$(container).hide();

		$(container).find(config.ajaxTemplateIdentifier).remove();

		var data = (requestAction) ? queues[requestAction] : {};

		$(templates[templateName]).tmpl(data).appendTo(container);

		$(container).show();

		if (callback) {
			callback();
		}

		return;
	}

	function getTemplate(templateName, callback) {
		$.ajax({
			url: config.templatePath + templateName + config.templateSuffix,
			cache: false,
			dataType: 'html',
			success: function(html) {
				templates[templateName] = $('<div></div>').append(html);

				callback();
			}
		});
	}

	function getJson(action, callback) {
		$.ajax({
			url: config.ajaxReceiver,
			type: 'POST',
			data: {
				action: action
			},
			cache: false,
			dataType: 'json',
			success: function(response) {
				queues[action] = (response) ? response : {};

				callback();
			}
		});
	}

})(jQuery);
