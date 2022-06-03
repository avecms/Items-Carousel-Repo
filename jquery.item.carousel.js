(function($) {
	$.fn.itemCarousel = function(options) {

		let settings = $.extend({
			wrapBlock: "item-carousel",
			navBlock: true
		}, options );

		let wrapper;

		return this.addClass(settings.wrapBlock)
			.append("<div class='tmb-wrap'><div class='tmb-wrap-table'>")
			.append("<div class='image-wrap'>")
			.append(settings.navBlock ? "<div class='image-nav-wrap'>" : "")
			.each(function() {

			wrapper = $(this);

			let item_images = wrapper.find("img");

			wrapper.removeClass("thumb-item");

				item_images.appendTo(wrapper.find(".image-wrap")).each(function() {
				wrapper.find(".tmb-wrap-table").append("<div>");

				if (settings.navBlock && item_images.length > 1)
					wrapper.find(".image-nav-wrap").append("<div>");
			});

			wrapper.find(".image-nav-wrap").find(":first").addClass("active");

		}).find(".tmb-wrap-table").on('touchstart', function(event) {

			let yClick = event.originalEvent.touches[0].pageY;

			$(this).on("touchmove", function (event) {

				let yMove = event.originalEvent.touches[0].pageY;

				if (Math.floor(yClick - yMove) > 5) {
					$(this).off("touchmove");
				}

				event.preventDefault();

				let myLocation = event.originalEvent.changedTouches[0];
				let realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
				let this_img = $(realTarget).parent(".tmb-wrap-table").closest("." + settings.wrapBlock).find("img");
				let all_thumbs = $(realTarget).parent(".tmb-wrap-table").find("div");

				this_img.hide().eq($(realTarget).index()).css("display", "block");
				all_thumbs.removeClass("active");
				$(realTarget).addClass("active");

				if (settings.navBlock && all_thumbs.length > 1) {
					let this_nav = $(realTarget).parent().closest("." + settings.wrapBlock).find(".image-nav-wrap").find("div");

					this_nav.removeClass("active");
					this_nav.eq($(realTarget).index()).addClass("active");
				}
			});

			$(this).on("touchend", function () {
				$(this).off("touchmove");
			});

		}).find("div").hover(function() {

			let this_img = $(this).parent(".tmb-wrap-table").closest("." + settings.wrapBlock).find("img");
			let all_thumbs = $(this).parent(".tmb-wrap-table").find("div");

			let this_nav = $(this).parent().parent().parent().find(".image-nav-wrap").find("div");

			this_img.hide().eq($(this).index()).css("display", "block");
			all_thumbs.removeClass("active");
			this_nav.removeClass("active");

			$(this).addClass("active");

			this_nav.eq($(this).index()).addClass("active");

		}).parent().closest("." + settings.wrapBlock).find(".image-nav-wrap").find("div").hover(function() {
			let this_img = $(this).parent().closest("." + settings.wrapBlock).find("img");
			let all_thumbs = $(this).parent().closest("." + settings.wrapBlock).find(".tmb-wrap-table").find("div");
			let this_nav = $(this).parent().closest("." + settings.wrapBlock).find(".image-nav-wrap").find("div");

			this_img.hide().eq($(this).index()).css("display", "block");

			all_thumbs.removeClass("active");
			all_thumbs.eq($(this).index()).addClass("active");

			this_nav.removeClass("active");
			this_nav.eq($(this).index()).addClass("active");

		}).parent().find(":first").addClass("active");
	};
})(jQuery);