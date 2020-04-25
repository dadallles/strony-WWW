var foto = $(".big");

$(".list_element a img").on("click", function() {
    $source = $(this).attr('src');
    foto.attr( 'src', $source );
    foto.css("visibility", "visible");
});

foto.on("click", async function() {
    foto.css("visibility", "hidden");
});
