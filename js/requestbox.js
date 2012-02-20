
(function($) {
	$(document).ready(function() {
		var itemTemplate = $('#item-template');

		var newItem = $('#new-item');
		var newItemLink = $('a[href="#new-item"]');

		$.ajax({
			url: './ajax.php',
			dataType: 'json',
			success: function(object) {
				$.each(object.requests, function() {
					$(itemTemplate).tmpl(this).appendTo('.request-list');
				});
			}
		});

		newItem.on('show', function() {
			$('.new-item', newItemLink).hide();
			$('.close-form', newItemLink).show();
		}).on('hide', function() {
			$('.new-item', newItemLink).show();
			$('.close-form', newItemLink).hide();
		}).collapse('hide').show();

		$('button[type="reset"]', newItem).click(function() {
			newItemLink.click();
		});

		$('button[type="submit"]', newItem).click(function() {
			alert('submit');

			return false;
		});
	});
})(jQuery);
