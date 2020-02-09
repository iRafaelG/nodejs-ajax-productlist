$("#getProducts").on("click", function() {
  $.ajax({
    url: "/products", // Make a Get request to this URL
    success: function(products) {
      let tbody = $("tbody"); // Get the content of the tbody tag

      tbody.html(""); // Empty the content of the tbody tag

      products.forEach(product => {
        // Go through the loop with forEach
        tbody.append(`
                <tr>
                    <td class="id">${product.id}</td>
                    <td>
                        <input type="text" class="name" value="${product.name}"/>
                    </td>
                    <td>
                        <button class="update-button">Update</button>
                        <button class="delete-button">Delete</button>
                    </td>
                </tr>
                `); // Add data to tbody tag
      });
    }
  });
});

$("#productsForm").on("submit", function(e) { // Catch the submit event
  e.preventDefault();

  let newProduct = $("#newProduct"); // Get the content of the tag whose id is #newProduct

  $.ajax({
    url: "/products",
    method: "post",
    data: { // Send this data in the body of the request
      name: newProduct.val()
    },
    success: function(response) {
      console.log(response);
      newProduct.val(""); // Delete the input value
      $("#getProducts").click(); // Click the button for itself
    }
  });
});

$("table").on("click", ".update-button", function() { // Get the table tag data since at the beginning there is no update button
  let row = $(this).closest("tr"); // Get all the data in the row where is the button that has been clicked
  let id = row.find(".id").text();
  let name = row.find(".name").val();

  $.ajax({
    url: "/products/" + id, // Send the request with parameters
    method: "put",
    data: {
      name: name
    },
    success: function(response) {
      console.log(response);
      $("#getProducts").click();
    },
    error: function(error) {
      console.log(error.status);
    }
  });
});

$("table").on("click", ".delete-button", function() {
  let row = $(this).closest("tr");
  let id = row.find(".id").text();

  $.ajax({
    url: "/products/" + id,
    method: "delete",
    success: function(response) {
      console.log(response);
      $("#getProducts").click();
    }
  });
});
